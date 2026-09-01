// Client for the arnav-ai agent's SSE chat endpoint.
//
// The stream is server-sent events over a POST fetch (EventSource can't POST),
// so frames are parsed by hand from the response body:
//   event: meta     data: {"session_id": "..."}
//   event: receipt  data: {"query": "...", "chunks": 6, "seconds": 2.1}
//                   (+ "items": [{path, content}] from the dev agent only)
//   event: delta    data: {"text": "..."}
//   event: done     data: {}
//   event: error    data: {"message": "..."}
// Dev-mode telemetry (agent-dev only; never sent by the production agent):
//   event: step     data: {"kind": "guardrail"|"decide"|"search"|"answer",
//                          "seconds", "tokens_in", "tokens_out", "cost",
//                          "estimated", "model"}
//   event: turn     data: {"seconds", "ttft_server", "context_used",
//                          "context_limit", "reply_tokens", "tokens_in",
//                          "tokens_out", "cost"}

const CHAT_API_BASE = import.meta.env.VITE_CHAT_API_BASE || 'https://chat.arnavjagetia.com';

/**
 * Stream one chat exchange. Callbacks fire as frames arrive.
 * Resolves true if the server sent a terminal `done` frame.
 *
 * @param {Object} opts
 * @param {string} opts.message
 * @param {string|null} opts.sessionId
 * @param {(meta: {session_id: string}) => void} [opts.onMeta]
 * @param {(receipt: {query: string, chunks: number, seconds: number}) => void} [opts.onReceipt]
 * @param {(text: string) => void} [opts.onDelta]
 * @param {(step: Object) => void} [opts.onStep]
 * @param {(turn: Object) => void} [opts.onTurn]
 * @param {(message: string) => void} [opts.onError]
 * @returns {Promise<boolean>}
 */
export async function streamChat({
	message,
	sessionId,
	onMeta,
	onReceipt,
	onDelta,
	onStep,
	onTurn,
	onError
}) {
	const res = await fetch(`${CHAT_API_BASE}/chat`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ message, session_id: sessionId })
	});
	if (!res.ok || !res.body) {
		throw new Error(`chat request failed with status ${res.status}`);
	}

	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let buffer = '';
	let done = false;

	for (;;) {
		const { value, done: finished } = await reader.read();
		if (finished) break;
		buffer += decoder.decode(value, { stream: true });

		let sep;
		while ((sep = buffer.indexOf('\n\n')) !== -1) {
			const frame = buffer.slice(0, sep);
			buffer = buffer.slice(sep + 2);

			let event = 'message';
			let data = '';
			for (const line of frame.split('\n')) {
				if (line.startsWith('event: ')) event = line.slice(7).trim();
				else if (line.startsWith('data: ')) data += line.slice(6);
			}
			if (!data) continue;

			const payload = JSON.parse(data);
			if (event === 'meta') onMeta?.(payload);
			else if (event === 'receipt') onReceipt?.(payload);
			else if (event === 'delta') onDelta?.(payload.text);
			else if (event === 'step') onStep?.(payload);
			else if (event === 'turn') onTurn?.(payload);
			else if (event === 'error') onError?.(payload.message);
			else if (event === 'done') done = true;
		}
	}

	return done;
}

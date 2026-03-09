import { error } from '@sveltejs/kit';
import { calculateReadingTime } from '$lib/utils/blog.js';

export async function load({ params }) {
	try {
		const post = await import(`../posts/${params.slug}.svx`);
		const rawPost = await import(`../posts/${params.slug}.svx?raw`);
		const postBody = rawPost.default.replace(/^---[\s\S]*?---\s*/, '');
		const readingTime = calculateReadingTime(postBody);

		return {
			content: post.default,
			metadata: post.metadata,
			readingTime
		};
	} catch (e) {
		throw error(404, `Post not found: ${params.slug}`);
	}
}

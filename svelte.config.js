import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from "node:path";
import { fileURLToPath } from 'node:url';
import { mdsvex, code_highlighter } from "mdsvex";

const dir = path.resolve(fileURLToPath(import.meta.url), "../");

const mdsvexOptions = {
	extensions: [".md", ".svx"],
	highlight: {
		// mdsvex only escapes \t \r \n in template literal, other backslash (like \b \d \w) get reinterpreted. fix by escape all remaining backslashes
		highlighter: (code, lang, meta) => code_highlighter(code, lang, meta).replace(/\\/g, '&#92;')
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};
export default config;

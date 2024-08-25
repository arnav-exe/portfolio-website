import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from "node:path";
import { fileURLToPath } from 'node:url';
import { mdsvex } from "mdsvex";

const dir = path.resolve(fileURLToPath(import.meta.url), "../");

const mdsvexOptions = {
	extensions: [".md", ".svx"],
	layout: {
		blog: path.join(dir, "./src/lib/components/blog-layout.svelte")
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
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
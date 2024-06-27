import { join } from 'path'

import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { minimalist } from './src/minimalist'

export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			colors: {
				"logosurface": "#2f2f2f",
				"logoprimary": "#d4c9ae",
			},
		},
	},
	plugins: [
		forms,
		skeleton({
			themes: {
				custom: [
					minimalist,
				],
			},
		}),
	],
};

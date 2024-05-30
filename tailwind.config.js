import { join } from 'path'

import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { minimalist } from './src/minimalist'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			colors: {
				"logosurface": "#2f2f2f",
				"logoprimary": "#d4c9ae",
				"newred": "#ff0000"
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

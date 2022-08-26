import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		environment: 'jsdom',
		setupFiles: './vitest.setup.ts',
		globals: true,
		coverage: {
			reporter: 'lcov',
		},
	},
});

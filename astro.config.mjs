// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://zacheryglass.com',
	markdown: {
		// Both themes are emitted as CSS variables; the post page picks one by prefers-color-scheme.
		shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
	},
});

// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://zacheryglass.com',
	markdown: {
		// Both themes are emitted as CSS variables; the post page picks one by prefers-color-scheme.
		shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
	},
	// Downloaded at build time and served from this site. The optical size axis is kept so large text gets the
	// tighter display cuts.
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-sans',
			weights: ['400 800'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
			options: { experimental: { variableAxis: { opsz: [[14, 32]] } } },
		},
		{
			provider: fontProviders.google(),
			name: 'Bricolage Grotesque',
			cssVariable: '--font-display',
			weights: ['500 700'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
			options: { experimental: { variableAxis: { opsz: [[12, 96]] } } },
		},
	],
});

// @ts-check
import fs from 'node:fs';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import { ExpressiveCodeTheme } from 'astro-expressive-code';

// Custom Shiki themes need to be ExpressiveCodeTheme instances, not raw
// JSON objects. Loading the JSON file as a string and parsing through
// `fromJSONString` is the path EC's docs recommend.
const zkmcuDark = ExpressiveCodeTheme.fromJSONString(
	fs.readFileSync(
		new URL('./src/styles/zkmcu-dark.json', import.meta.url),
		'utf-8',
	),
);
const zkmcuLight = ExpressiveCodeTheme.fromJSONString(
	fs.readFileSync(
		new URL('./src/styles/zkmcu-light.json', import.meta.url),
		'utf-8',
	),
);

export default defineConfig({
	site: 'https://zkmcu.dev',
	integrations: [
		starlight({
			title: 'zkmcu',
			description:
				'no_std Rust family of SNARK and STARK verifiers for ARM Cortex-M and RISC-V microcontrollers.',
			favicon: '/favicon.ico',
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						type: 'image/png',
						sizes: '16x16',
						href: '/favicon-16x16.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						type: 'image/png',
						sizes: '32x32',
						href: '/favicon-32x32.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'apple-touch-icon',
						sizes: '180x180',
						href: '/apple-touch-icon.png',
					},
				},
				{ tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#b07348' } },
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://zkmcu.dev/android-chrome-512x512.png',
					},
				},
				{
					tag: 'meta',
					attrs: { property: 'og:site_name', content: 'zkmcu' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary' },
				},
				{
					tag: 'link',
					attrs: {
						rel: 'alternate',
						type: 'application/rss+xml',
						title: 'zkmcu',
						href: 'https://zkmcu.dev/rss.xml',
					},
				},
			],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/Niek-Kamer/zkmcu',
				},
			],
			customCss: ['./src/styles/custom.css'],
			components: {
				Footer: './src/components/Footer.astro',
			},
			expressiveCode: {
				// Custom themes tuned to the umber/peach palette. Token
				// hierarchy is consistent between dark + light: keywords get
				// the strongest accent, types and string-class tokens form a
				// secondary tier, comments and operators recede. Editor bg
				// sits one step off the page bg so blocks visually pop without
				// going dark-on-light. See `src/styles/zkmcu-{dark,light}.json`.
				themes: [zkmcuDark, zkmcuLight],
				styleOverrides: {
					borderColor: 'var(--sl-color-hairline)',
					borderRadius: '8px',
					frames: {
						editorActiveTabBackground: 'var(--sl-color-gray-6)',
						terminalTitlebarBackground: 'var(--sl-color-gray-6)',
					},
				},
			},
			sidebar: [
				{ label: 'Home', link: '/' },
				{ label: 'Roadmap', link: '/roadmap/' },
				{ label: 'Getting started', link: '/getting-started/' },
				{ label: 'Architecture', link: '/architecture/' },
				{ label: 'Wire formats', link: '/wire-format/' },
				{
					label: 'On silicon',
					items: [
						{ label: 'STARK verify (75 ms, 100 KB)', link: '/stark/' },
						{ label: 'STARK prover (148 ms, 95-bit)', link: '/stark-prover/' },
						{
							label: 'BabyBear × Quartic (cross-ISA 1.04×)',
							link: '/babybear/',
						},
						{ label: 'Semaphore (real-world)', link: '/semaphore/' },
						{ label: 'Benchmarks', link: '/benchmarks/' },
						{ label: 'Deterministic timing', link: '/determinism/' },
					],
				},
				{
					label: 'Research',
					items: [
						{
							label: 'PQ-Semaphore at 128-bit (Apr 2026)',
							link: '/research/2026-04-30-pq-semaphore-128bit/',
							badge: { text: 'draft', variant: 'caution' },
						},
						{ label: 'Prior-art survey', link: '/research-prior-art/' },
						{ label: 'Whitepaper', link: '/research-whitepaper/' },
					],
				},
				{
					label: 'Audits',
					items: [
						{ label: 'Self-audit', link: '/self-audit/' },
						{ label: 'Poseidon2 audit', link: '/audit-poseidon2/' },
					],
				},
				{ label: 'Findings', link: '/findings/' },
				{ label: 'Security', link: '/security/' },
				{ label: 'AI disclosure', link: '/ai-disclosure/' },
				{ label: 'Contact', link: '/contact/' },
			],
			editLink: {
				baseUrl: 'https://github.com/Niek-Kamer/zkmcu/edit/main/web/',
			},
			lastUpdated: true,
			disable404Route: true,
		}),
	],
	vite: {
		ssr: {
			external: ['node:path', 'node:fs', 'node:url'],
		},
	},
});

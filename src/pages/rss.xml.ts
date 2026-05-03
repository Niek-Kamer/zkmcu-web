import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const SITE_DESCRIPTION =
	'Dated research posts and writeups from zkmcu: post-quantum Semaphore, STARK + Groth16 verifiers on $7 microcontrollers, and the methodology behind the numbers.';

const DATED_SLUG_RE = /^(\d{4}-\d{2}-\d{2})-/;

function pubDateFromId(id: string): Date | undefined {
	const base = id.split('/').pop() ?? id;
	const match = DATED_SLUG_RE.exec(base);
	return match ? new Date(`${match[1]}T00:00:00Z`) : undefined;
}

export async function GET(context: APIContext) {
	const docs = await getCollection('docs');
	const research = docs
		.filter((entry) => entry.id.startsWith('research/'))
		.map((entry) => ({
			entry,
			pubDate: pubDateFromId(entry.id),
		}))
		.filter((row): row is { entry: typeof row.entry; pubDate: Date } =>
			row.pubDate !== undefined,
		)
		.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

	return rss({
		title: 'zkmcu',
		description: SITE_DESCRIPTION,
		site: context.site ?? 'https://zkmcu.dev',
		items: research.map(({ entry, pubDate }) => ({
			title: entry.data.title,
			description: entry.data.description ?? '',
			link: `/${entry.id.replace(/\.mdx?$/, '').replace(/\/index$/, '')}/`,
			pubDate,
		})),
	});
}

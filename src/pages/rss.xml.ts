import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../data/writing';
import { description } from '../data/site';

export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: 'Zachery Glass',
		description,
		site: context.site ?? 'https://zacheryglass.com',
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: `/writing/${post.id}/`,
		})),
	});
}

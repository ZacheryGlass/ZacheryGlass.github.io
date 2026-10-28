// The numbers on the project cards, read from the GitHub API when the site is built.
// A failed request returns nothing, so the card leaves its stat line out rather than show a wrong number.

import { formatDate } from './site';
import type { Project } from './projects';

const token = process.env.GITHUB_TOKEN;
const requests = new Map<string, Promise<unknown>>();

/** One request per path per build, however many pages ask. */
function github<T>(path: string): Promise<T | undefined> {
	if (!requests.has(path)) requests.set(path, request(path));
	return requests.get(path) as Promise<T | undefined>;
}

async function request(path: string): Promise<unknown> {
	try {
		const response = await fetch(`https://api.github.com/${path}`, {
			headers: {
				accept: 'application/vnd.github+json',
				'user-agent': 'zacheryglass.com build',
				...(token ? { authorization: `Bearer ${token}` } : {}),
			},
		});
		if (!response.ok) {
			console.warn(`GitHub API ${path}: ${response.status}; leaving the stat line out`);
			return undefined;
		}
		return await response.json();
	} catch (error) {
		console.warn(`GitHub API ${path}: ${error}; leaving the stat line out`);
		return undefined;
	}
}

export interface Release {
	tag: string;
	date: Date;
}

export async function latestRelease(repo: string): Promise<Release | undefined> {
	const release = await github<{ tag_name: string; published_at: string }>(`repos/${repo}/releases/latest`);
	return release && { tag: release.tag_name, date: new Date(release.published_at) };
}

const count = (n: number, noun: string) => `${n.toLocaleString('en-US')} ${noun}${n === 1 ? '' : 's'}`;

/** The line under a card's description: "600 stars · 54 forks" or "v1.3.0 · released 27 Oct 2026". */
export async function statLine(project: Project): Promise<string | undefined> {
	if (!project.repo || !project.stat) return undefined;
	if (project.stat === 'stars') {
		const repo = await github<{ stargazers_count: number; forks_count: number }>(`repos/${project.repo}`);
		return repo && `${count(repo.stargazers_count, 'star')} · ${count(repo.forks_count, 'fork')}`;
	}
	const release = await latestRelease(project.repo);
	return release && `${release.tag} · released ${formatDate(release.date)}`;
}

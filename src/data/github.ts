// The numbers on the project cards, read from the GitHub API when the site is built.
// A failed request returns nothing, so the card leaves those numbers out rather than show wrong ones.

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
			console.warn(`GitHub API ${path}: ${response.status}; leaving the numbers out`);
			return undefined;
		}
		return await response.json();
	} catch (error) {
		console.warn(`GitHub API ${path}: ${error}; leaving the numbers out`);
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

export interface Counts {
	stars: number;
	forks: number;
}

export async function repoCounts(repo: string): Promise<Counts | undefined> {
	const data = await github<{ stargazers_count: number; forks_count: number }>(`repos/${repo}`);
	return data && { stars: data.stargazers_count, forks: data.forks_count };
}

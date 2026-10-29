// The projects on the home page, in the order shown. Add one by adding an entry.

/** A link that peels this page away to reveal the page it goes to (see PagePeel). */
export interface Peel {
	href: string;
	/** The page's color, shown while it loads. */
	background: string;
	/** For a page that refuses to be framed, a page of this site the peel reveals in its place before the page loads. */
	standIn?: string;
}

export interface Project {
	name: string;
	/** What kind of thing it is, shown above the name. */
	kind: string;
	description: string;
	/** The first is the main one: the hero card's button, and where a small card goes when clicked. */
	links: { label: string; href: string }[];
	/** Shown above the rest: 'hero' is the dark card, 'card' a large white card. */
	featured?: 'hero' | 'card';
	/** The drawing beside a large card's text. */
	art?: 'git-graph' | 'chain-supply';
	/**
	 * Clicking the card, or a link to `href`, peels this page away to reveal that page. Without this, the card peels
	 * as its main link does (see linkPeel).
	 */
	peel?: Peel;
	/** GitHub repository (owner/name) whose numbers the card shows, read when the site is built. */
	repo?: string;
	/** Which numbers: stars and forks, or the latest release. */
	stat?: 'stars' | 'release';
}

export const projects: Project[] = [
	{
		name: 'Sidereal',
		kind: 'VS Code extension',
		description:
			"A free Git graph, log and file history for VS Code, in the style of TortoiseGit's log view. Branches, tags, stashes, worktrees and submodules in one view, with checkout, merge, rebase and cherry-pick run from the graph. No account, no ads, no telemetry.",
		links: [
			{ label: 'Marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=zglass.sidereal' },
			{ label: 'Overview', href: '/sidereal/' },
			{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/sidereal' },
		],
		featured: 'hero',
		art: 'git-graph',
		// The Marketplace refuses to be framed, so the card peels to the overview page instead.
		peel: { href: '/sidereal/', background: 'var(--bg)' },
		repo: 'ZacheryGlass/sidereal',
		stat: 'release',
	},
	{
		name: 'StablecoinWatch',
		kind: 'Website',
		description:
			'Tracks stablecoin issuance across blockchains, including coins issued on more than one, partly by reading the chains directly.',
		links: [
			{ label: 'stablecoinwatch.com', href: 'https://stablecoinwatch.com' },
			{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/StablecoinWatch' },
		],
		featured: 'card',
		art: 'chain-supply',
		peel: { href: 'https://stablecoinwatch.com', background: '#0f172a' },
	},
	{
		name: '.claude',
		kind: 'Claude Code configuration',
		description:
			'The settings, hooks, sub-agents, skills and slash commands I run Claude Code with, plus a Go status line that keeps cache, context and git state in view. Clone it and keep what fits.',
		links: [{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/.claude' }],
	},
	{
		name: 'agent-sync',
		kind: 'Developer tool',
		description: 'Keeps agents, settings and preferences in sync across AI assistants.',
		links: [{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/agent-sync' }],
	},
	{
		name: 'BindKit',
		kind: 'Windows app',
		description: 'A system tray app that finds standalone Python scripts and runs them from a menu.',
		links: [
			// The bare bindkit.com doesn't answer over HTTPS; www does.
			{ label: 'bindkit.com', href: 'https://www.bindkit.com' },
			{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/BindKit' },
		],
		peel: { href: 'https://www.bindkit.com', background: '#0f172a' },
	},
	{
		name: 'copilot-quota-tray',
		kind: 'Windows app',
		description: 'A system tray app that shows how far through the month you should be with your GitHub Copilot quota.',
		links: [{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/copilot-quota-tray' }],
	},
	{
		name: 'personal-context-builder',
		kind: 'Script',
		description: 'Downloads and archives your Reddit history so AI assistants can use it as personal context.',
		links: [{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/personal-context-builder' }],
	},
];

/** How a link to `href` peels, if it does: links on this site and to GitHub peel. */
export function linkPeel(href: string): Peel | undefined {
	if (href.startsWith('/')) return { href, background: 'var(--bg)' };
	// GitHub refuses to be framed, so the peel reveals a blurred, made-up page for the repository, and GitHub loads after.
	const url = new URL(href);
	if (url.hostname === 'github.com') {
		return { href, background: '#ffffff', standIn: `/peel/github/#${url.pathname.slice(1)}` };
	}
	return undefined;
}

/** Where a project's card peels to, if anywhere. */
export const cardPeel = (project: Project) => project.peel ?? linkPeel(project.links[0].href);

/** The attributes PagePeel reads from a link that peels, or none. */
export const peelAttrs = (peel?: Peel) => (peel ? { 'data-peel': peel.background, 'data-peel-stand-in': peel.standIn } : {});

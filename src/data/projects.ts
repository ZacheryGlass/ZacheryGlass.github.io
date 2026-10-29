// The projects on the home page, in the order shown. Add one by adding an entry.

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
	 * Following the main link peels this page away to reveal that site. `background` is the site's page color,
	 * shown while it loads.
	 */
	peel?: { background: string };
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
		peel: { background: '#0f172a' },
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
		links: [{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/BindKit' }],
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

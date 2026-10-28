// The projects on the home page, in the order shown. Add one by adding an entry.

export interface Project {
	name: string;
	/** What kind of thing it is, shown above the name. */
	kind: string;
	description: string;
	links: { label: string; href: string }[];
	/** Shown in the large cards above the rest. */
	featured?: boolean;
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
			{ label: 'Overview', href: '/sidereal/' },
			{ label: 'Marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=zglass.sidereal' },
			{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/sidereal' },
		],
		featured: true,
		repo: 'ZacheryGlass/sidereal',
		stat: 'release',
	},
	{
		name: '.claude',
		kind: 'Claude Code configuration',
		description:
			'The settings, hooks, sub-agents, skills and slash commands I run Claude Code with, plus a Go status line that keeps cache, context and git state in view. Clone it and keep what fits.',
		links: [{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/.claude' }],
		featured: true,
		repo: 'ZacheryGlass/.claude',
		stat: 'stars',
	},
	{
		name: 'agent-sync',
		kind: 'Developer tool',
		description:
			'Keeps agents, settings and preferences in sync across AI coding assistants: Claude Code, GitHub Copilot, Codex, Gemini CLI and more.',
		links: [{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/agent-sync' }],
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
	},
	{
		name: 'BindKit',
		kind: 'Windows app',
		description:
			'A system tray app that finds standalone Python scripts and runs them from a menu, on a schedule or with global hotkeys, each in isolation.',
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

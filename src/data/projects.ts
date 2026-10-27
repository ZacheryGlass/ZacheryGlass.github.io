// The projects on the home page, in the order shown. Add one by adding an entry.

export interface Project {
	name: string;
	/** What kind of thing it is, shown above the name. */
	kind: string;
	description: string;
	links: { label: string; href: string }[];
}

export const projects: Project[] = [
	{
		name: 'Sidereal',
		kind: 'VS Code extension',
		description:
			'A free Git graph, log and file history for VS Code, with worktrees and submodules. No account, no ads, no telemetry.',
		links: [
			{ label: 'Marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=zglass.sidereal' },
			{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/sidereal' },
		],
	},
	{
		name: '.claude',
		kind: 'Claude Code configuration',
		description: "My personal configuration for Claude Code, Anthropic's command-line coding tool.",
		links: [{ label: 'GitHub', href: 'https://github.com/ZacheryGlass/.claude' }],
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

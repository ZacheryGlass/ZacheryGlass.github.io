// Sidereal's tutorial videos, listed on /sidereal/tutorials/ in the order to watch them. A video's files are in
// public/sidereal/tutorials: <slug>.mp4, and <slug>.jpg, the frame shown before it plays. They are recorded from the
// app, with a voice saying what the captions say, by marketing/tools/capture/tutorial-videos.mjs in Sidereal's source
// repository, which writes both files.

export interface Tutorial {
	/** Names the video's files, and its place on the page (/sidereal/tutorials/#slug). */
	slug: string;
	title: string;
	description: string;
	/** How long it plays, in seconds. */
	seconds: number;
	/** The video's size, in pixels. */
	width: number;
	height: number;
	/** The day it was added. */
	date: Date;
}

export const tutorials: Tutorial[] = [
	{
		slug: 'getting-around',
		title: 'Getting around the graph',
		description: "Read the commit graph, open a commit's details and diffs, move through the history, and find commits with the filters.",
		seconds: 77,
		width: 1920,
		height: 1200,
		date: new Date('2026-11-15'),
	},
	{
		slug: 'committing',
		title: 'Committing and syncing',
		description: 'Commit with the commit form, then push, stash and pull with the Git buttons.',
		seconds: 72,
		width: 1920,
		height: 1200,
		date: new Date('2026-11-15'),
	},
	{
		slug: 'hunk-staging',
		title: 'Staging one hunk at a time',
		description: 'In the desktop app, stage one hunk of a file at a time, leaving its other changes for a later commit.',
		seconds: 104,
		width: 1920,
		height: 1200,
		date: new Date('2026-11-15'),
	},
	{
		slug: 'edit-commit-message',
		title: "Editing a commit's message",
		description: "Fix the message of a commit you haven't pushed, even with more commits on top of it: no rebase to step through, and the commits on top keep their changes and authors under new SHA-1s.",
		seconds: 72,
		width: 1920,
		height: 1200,
		date: new Date('2026-11-25'),
	},
	{
		slug: 'branches',
		title: 'Branches, merging and cherry-picking',
		description: 'Create and check out branches, merge and cherry-pick by dragging in the graph, and revert a commit.',
		seconds: 61,
		width: 1920,
		height: 1200,
		date: new Date('2026-11-15'),
	},
	{
		slug: 'worktrees-submodules',
		title: 'Worktrees and submodules',
		description: "Create a worktree and open it, and follow a submodule's change into its own history.",
		seconds: 85,
		width: 1920,
		height: 1200,
		date: new Date('2026-11-15'),
	},
	{
		slug: 'submodule-state',
		title: 'When a submodule is out of step',
		description: 'What the desktop app shows when a submodule is on another commit than its repository records, or has changes of its own, and how to put it right.',
		seconds: 91,
		width: 1920,
		height: 1200,
		date: new Date('2026-11-23'),
	},
];

/** "1 min 18 s" */
export function formatLength(seconds: number): string {
	const minutes = Math.floor(seconds / 60);
	const rest = seconds % 60;
	return [minutes > 0 ? `${minutes} min` : '', rest > 0 || minutes === 0 ? `${rest} s` : ''].filter((part) => part !== '').join(' ');
}

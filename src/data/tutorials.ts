// Sidereal's tutorial videos, listed on /sidereal/tutorials/, newest first. A video's files are in
// public/sidereal/tutorials: <slug>.mp4, and <slug>.jpg, the frame shown before it plays. They are recorded from the
// app by marketing/tools/capture/tutorial-videos.mjs in Sidereal's source repository, which writes both files.

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
		slug: 'hunk-staging',
		title: 'Staging one hunk at a time',
		description: 'In the desktop app, stage one hunk of a file at a time, leaving its other changes for a later commit.',
		seconds: 78,
		width: 1920,
		height: 1200,
		date: new Date('2026-11-15'),
	},
];

/** "1 min 18 s" */
export function formatLength(seconds: number): string {
	const minutes = Math.floor(seconds / 60);
	const rest = seconds % 60;
	return [minutes > 0 ? `${minutes} min` : '', rest > 0 || minutes === 0 ? `${rest} s` : ''].filter((part) => part !== '').join(' ');
}

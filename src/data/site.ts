// Text shared by the home page, the share card and the page metadata.

export const bio =
	'I make developer tools, mostly around Git and AI coding agents: Sidereal, a Git graph for VS Code, and the Claude Code configuration I use every day.';

export const description =
	'Zachery Glass makes developer tools around Git and AI coding agents: Sidereal, a Git graph for VS Code, and an open Claude Code configuration.';

/** Schema.org Person, used in the structured data on the home page and as a post's author. */
export const person = {
	'@type': 'Person',
	name: 'Zachery Glass',
	url: 'https://zacheryglass.com/',
	sameAs: ['https://github.com/ZacheryGlass'],
};

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** "27 Oct 2026" */
export function formatDate(date: Date): string {
	return dateFormat.format(date);
}

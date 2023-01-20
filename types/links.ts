export interface ILink {
	name: string;
	href: string;
}

export interface Sections {
	[value: string]: string | ILink[];
}

export interface Navigation {
	categories: Sections[];
	pages: ILink[];
}
export interface AboutMeItem {
	text	: string;
	label	: string;
}

export interface AboutItemSkill {
	sort?	: number;
	filter?	: string;
	date?	: string;
	items?	: AboutMeItem[];
}

export interface AboutSkill {
	items?	: AboutMeItem[];
	sort?	: number;
	filter?	: string;
	date?	: string;
}

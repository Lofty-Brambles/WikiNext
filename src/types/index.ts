export type fsSnap = {
	[folder: string]: {
		[file: string]: {
			tags: string;
		};
	};
};

export type fsFlat = {
	[file: string]: {
		tags: string[];
	};
};

export type PageSnap = {
	content: string;
	tags: string[];
};

export type fsSnap = {
	[folder: string]: {
		[file: string]: {
			tags: string;
		};
	};
};

export type fsSnapPage = {
	[file: string]: {
		tags: string;
	};
};

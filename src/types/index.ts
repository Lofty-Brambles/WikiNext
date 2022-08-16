export type fsSnap = {
	[folder: string]: {
		[file: string]: {
			tags: string[];
		};
	};
};

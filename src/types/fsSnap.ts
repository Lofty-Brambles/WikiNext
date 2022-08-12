export type fsSnap = {
	[folder: string]: {
		[file: string]: {
			path: string;
			tags: string[];
		};
	};
};

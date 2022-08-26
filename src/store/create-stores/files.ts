import Global, { ZustandSetFnType } from "../types";

const files = (set: ZustandSetFnType) => ({
	fileStore: {} as { [name: string]: string[] },
	navDrops: {} as { [name: string]: boolean },

	setFileStore: (val: { [name: string]: string[] }) =>
		set((state: Global) => ({ ...state, fileStore: val })),
	setNavDrops: (val: { [name: string]: boolean }) =>
		set((state: Global) => ({ ...state, navDrops: val })),

	turnOffDrops: () =>
		set((state: Global) => ({
			...state,
			navDrops: Object.fromEntries(
				Object.keys(state.navDrops).map(key => [key, false])
			),
		})),
	turnOffDropsxOne: (val: string) =>
		set((state: Global) => ({
			...state,
			navDrops: Object.fromEntries(
				Object.keys(state.navDrops).map(key =>
					key === val ? [key, true] : [key, false]
				)
			),
		})),
});

export default files;

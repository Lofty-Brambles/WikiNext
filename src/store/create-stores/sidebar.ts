import Global, { ZustandSetFnType } from "../types";

const sideBar = (set: ZustandSetFnType) => ({
	burger: false,
	setBurger: (val: boolean) =>
		set((state: Global) => ({ ...state, burger: val })),
	sideDropdown: false,
	toggleSideDropdown: () =>
		set((state: Global) => ({
			...state,
			sideDropdown: !state.sideDropdown,
		})),
});

export default sideBar;

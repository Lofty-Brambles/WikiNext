import Global, { ZustandSetFnType } from "../types";

const navbar = (set: ZustandSetFnType) => ({
	navbarLength: 0,
	setNavbarLength: (val: number) =>
		set((state: Global) => ({ ...state, navbarLength: val })),
});

export default navbar;

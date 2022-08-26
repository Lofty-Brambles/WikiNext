import Global, { ZustandSetFnType } from "../types";

const sidebarDropdown = (set: ZustandSetFnType) => ({
	looks: {
		sans: false,
		darkMode: false,
		sideSpace: "md",
		justify: false,
	} as {
		sans: boolean;
		darkMode: boolean;
		sideSpace: "sm" | "md" | "lg";
		justify: boolean;
	},

	toggleFont: () =>
		set((state: Global) => ({
			...state,
			looks: { ...state.looks, sans: !state.looks.sans },
		})),
	toggleDarkMode: () =>
		set((state: Global) => ({
			...state,
			looks: {
				...state.looks,
				darkMode: !state.looks.darkMode,
			},
		})),
	toggleSideSpace: (val: "sm" | "md" | "lg") =>
		set((state: Global) => ({
			...state,
			looks: { ...state.looks, sideSpace: val },
		})),
	toggleJustify: () =>
		set((state: Global) => ({
			...state,
			looks: {
				...state.looks,
				justify: !state.looks.justify,
			},
		})),
});

export default sidebarDropdown;

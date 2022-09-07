import Global, { ZustandSetFnType } from "../types";

const sidebarDropdown = (set: ZustandSetFnType) => ({
	toggleFont: () =>
		set((state: Global) => ({
			...state,
			userData: {
				...state.userData,
				customise_sans: !state.userData.customise_sans,
			},
		})),
	toggleDarkMode: () =>
		set((state: Global) => ({
			...state,
			userData: {
				...state.userData,
				customise_darkMode: !state.userData.customise_darkMode,
			},
		})),
	toggleSideSpace: (val: "sm" | "md" | "lg") =>
		set((state: Global) => ({
			...state,
			userData: { ...state.userData, customise_sideSpace: val },
		})),
	toggleJustify: () =>
		set((state: Global) => ({
			...state,
			userData: {
				...state.userData,
				customise_justify: !state.userData.customise_justify,
			},
		})),
});

export default sidebarDropdown;

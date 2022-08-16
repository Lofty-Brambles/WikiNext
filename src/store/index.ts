import create from "zustand";
import Global, { ZustandSetFnType } from "./types";

const createSideBarState = (set: ZustandSetFnType) => ({
	sidebarState: false,
	toggleSidebarState: (value: boolean) =>
		set((state: Global) => ({ ...state, sidebarState: value })),
});

// eslint-disable-next-line no-unused-vars
const createCustomizationsState = (set: ZustandSetFnType) => ({
	customiserDropdown: false,
	toggleCustomiserDrop: () =>
		set((state: Global) => ({
			...state,
			customiserDropdown: !state.customiserDropdown,
		})),
});

const createCustomFormState = (set: ZustandSetFnType) => ({
	customFormDtls: {
		sans: false,
		darkMode: false,
		textSize: "md",
		sideSpace: "md",
		justify: false,
	} as {
		sans: boolean;
		darkMode: boolean;
		textSize: "sm" | "md" | "lg";
		sideSpace: "sm" | "md" | "lg";
		justify: boolean;
	},
	toggleFont: () =>
		set((state: Global) => ({
			...state,
			customFormDtls: {
				...state.customFormDtls,
				sans: !state.customFormDtls.sans,
			},
		})),
	toggleDarkMode: () =>
		set((state: Global) => ({
			...state,
			customFormDtls: {
				...state.customFormDtls,
				darkMode: !state.customFormDtls.darkMode,
			},
		})),
	toggleTextSize: (val: "sm" | "md" | "lg") =>
		set((state: Global) => ({
			...state,
			customFormDtls: {
				...state.customFormDtls,
				textSize: val,
			},
		})),
	toggleSideSpace: (val: "sm" | "md" | "lg") =>
		set((state: Global) => ({
			...state,
			customFormDtls: {
				...state.customFormDtls,
				sideSpace: val,
			},
		})),
	toggleJustify: () =>
		set((state: Global) => ({
			...state,
			customFormDtls: {
				...state.customFormDtls,
				justify: !state.customFormDtls.justify,
			},
		})),
});

const useStore = create<Global>()(set => ({
	...createSideBarState(set),
	...createCustomizationsState(set),
	...createCustomFormState(set),
}));

export default useStore;

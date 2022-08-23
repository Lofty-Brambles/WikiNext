import create from "zustand";
import Global, { ZustandSetFnType } from "./types";

const createSideBarState = (set: ZustandSetFnType) => ({
	sidebarState: false,
	toggleSidebarState: (value: boolean) =>
		set((state: Global) => ({ ...state, sidebarState: value })),
});

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

const createDropdownMenuStates = (set: ZustandSetFnType) => ({
	dropdownMenuStates: {} as { [name: string]: boolean },
	initDropdownStates: (value: { [name: string]: boolean }) =>
		set((state: Global) => ({ ...state, dropdownMenuStates: value })),
	turnoffDrops: () =>
		set((state: Global) => ({
			...state,
			dropdownMenuStates: Object.fromEntries(
				Object.keys(state.dropdownMenuStates).map(key => [key, false])
			),
		})),
	turnoffDropsExceptOne: (val: string, bool: boolean) =>
		set((state: Global) => ({
			...state,
			dropdownMenuStates: Object.fromEntries(
				Object.keys(state.dropdownMenuStates).map(key =>
					key === val ? [key, bool] : [key, false]
				)
			),
		})),
});

const createFlatFileStore = (set: ZustandSetFnType) => ({
	flatFileStore: {} as { [name: string]: string[] },
	initFlatFileStore: (val: { [name: string]: string[] }) =>
		set((state: Global) => ({ ...state, flatFileStore: val })),
});

const createNavStore = (set: ZustandSetFnType) => ({
	navBarLength: 0,
	setNavBarLength: (val: number) =>
		set((state: Global) => ({ ...state, navBarLength: val })),
});

const useStore = create<Global>()(set => ({
	...createSideBarState(set),
	...createCustomizationsState(set),
	...createCustomFormState(set),
	...createDropdownMenuStates(set),
	...createFlatFileStore(set),
	...createNavStore(set),
}));

export default useStore;

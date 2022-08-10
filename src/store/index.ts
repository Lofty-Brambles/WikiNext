import create from "zustand";
import Global, { ZustandSetFnType } from "./types";

const createSideBarState = (set: ZustandSetFnType) => ({
	sidebarState: false,
	toggleSidebarState: (value: boolean) =>
		set((state: Global) => ({ ...state, sidebarState: value })),
});

const useStore = create<Global>()(set => ({
	...createSideBarState(set)
}));

export default useStore;

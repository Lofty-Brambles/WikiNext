import { User } from "firebase/auth";

/* eslint-disable no-unused-vars */
interface Global {
	// The sidebar options and dropdowns
	burger: boolean;
	setBurger: (v: boolean) => void;
	sideDropdown: boolean;
	toggleSideDropdown: () => void;

	// The markdown looks and settings
	looks: {
		sans: boolean;
		darkMode: boolean;
		sideSpace: "sm" | "md" | "lg";
		justify: boolean;
	};
	toggleFont: () => void;
	toggleDarkMode: () => void;
	toggleSideSpace: (v: "sm" | "md" | "lg") => void;
	toggleJustify: () => void;

	// Nav-bar length, and it's management for dropdown sticking
	navbarLength: number;
	setNavbarLength: (v: number) => void;

	// The file-structure and dropdowns-states in the state
	fileStore: { [name: string]: string[] };
	navDrops: { [name: string]: boolean };
	setFileStore: (v: { [name: string]: string[] }) => void;
	setNavDrops: (v: { [name: string]: boolean }) => void;

	turnOffDrops: () => void;
	turnOffDropsxOne: (v: string, c: boolean) => void;

	// The auth states
	user: User | undefined;
	setUser: (user: User | undefined) => void;
}

type ZustandSetFnType = (
	partial:
		| Global
		| Partial<Global>
		| ((state: Global) => Global | Partial<Global>),
	replace?: boolean | undefined
) => void;

export default Global;
export type { ZustandSetFnType };

import { User } from "firebase/auth";
import { UserDataType } from "../hooks-&-utils/fetch-user-data";

/* eslint-disable no-unused-vars */
interface Global {
	// The sidebar options and dropdowns
	burger: boolean;
	setBurger: (v: boolean) => void;
	sideDropdown: boolean;
	toggleSideDropdown: () => void;

	// The markdown settings togglers
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
	userData: UserDataType;
	initUserData: (userData: UserDataType) => void;
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

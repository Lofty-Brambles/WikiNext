/* eslint-disable no-unused-vars */
interface Global {
	sidebarState: boolean;
	toggleSidebarState: (value: boolean) => void;

	customiserDropdown: boolean;
	toggleCustomiserDrop: () => void;

	customFormDtls: {
		sans: boolean;
		darkMode: boolean;
		sideSpace: "sm" | "md" | "lg";
		justify: boolean;
	};
	toggleFont: () => void;
	toggleDarkMode: () => void;
	toggleSideSpace: (input: "sm" | "md" | "lg") => void;
	toggleJustify: () => void;

	dropdownMenuStates: { [name: string]: boolean };
	initDropdownStates: (value: { [name: string]: boolean }) => void;
	turnoffDrops: () => void;
	turnoffDropsExceptOne: (val: string, bool: boolean) => void;
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

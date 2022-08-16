/* eslint-disable no-unused-vars */
interface Global {
	sidebarState: boolean;
	toggleSidebarState: (value: boolean) => void;

	customiserDropdown: boolean;
	toggleCustomiserDrop: () => void;

	customFormDtls: {
		sans: boolean;
		darkMode: boolean;
		textSize: "sm" | "md" | "lg";
		sideSpace: "sm" | "md" | "lg";
		justify: boolean;
	};
	toggleFont: () => void;
	toggleDarkMode: () => void;
	toggleTextSize: (input: "sm" | "md" | "lg") => void;
	toggleSideSpace: (input: "sm" | "md" | "lg") => void;
	toggleJustify: () => void;
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

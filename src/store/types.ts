/* eslint-disable no-unused-vars */
interface Global {
	sidebarState: boolean;
	toggleSidebarState: (value: boolean) => void;


}

type ZustandSetFnType = (
	partial: Global | Partial<Global> | ((state: Global) => Global | Partial<Global>),
	replace?: boolean | undefined
) => void;

export default Global;
export type { ZustandSetFnType };

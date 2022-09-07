import { User } from "firebase/auth";
import { UserDataInit, UserDataType } from "../../hooks-&-utils/fetch-user-data";
import Global, { ZustandSetFnType } from "../types";

const authStates = (set: ZustandSetFnType) => ({
	user: undefined,
	setUser: (user: User | undefined) =>
		set((states: Global) => ({ ...states, user })),

	userData: UserDataInit,
	initUserData: (userData: UserDataType) =>
		set((states: Global) => ({ ...states, userData })),
});

export default authStates;

import { User } from "firebase/auth";
import Global, { ZustandSetFnType } from "../types";

const authStates = (set: ZustandSetFnType) => ({
	user: undefined,
	setUser: (user: User | undefined) => set((states: Global) => ({ ...states, user })),
});

export default authStates;

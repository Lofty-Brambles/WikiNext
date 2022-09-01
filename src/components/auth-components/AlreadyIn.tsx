import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-init";
import store from "../../store";
import LoginButtons from "../input-components/LoginButtons";

const AlreadyIn = () => {
	const [userSetter, looks] = store(state => [state.setUser, state.looks]);

	return (
		<div
			className={`p-8 my-auto mdx:mr-8 flex flex-col items-center gap-3 w-[300px] sm:w-[357px] border-2 border-neutral-400 rounded-sm ${
				looks.darkMode ? "bg-slate-900" : "bg-slate-100"
			}`}
		>
			<p>✅ You are already logged in! Click below to log out.</p>
			<LoginButtons
				name="Log-Out"
				clickAction={() => {
					userSetter(undefined);
					signOut(auth);
				}}
				disabled={false}
				colors={{
					main: "bg-blue-700",
					disabled: "disabled:bg-blue-300",
				}}
			/>
		</div>
	);
};

export default AlreadyIn;

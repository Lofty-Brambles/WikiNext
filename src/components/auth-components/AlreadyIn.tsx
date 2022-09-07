import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-init";
import store from "../../store";
import Buttons from "../input-components/Button";

const AlreadyIn = () => {
	const [userSetter, darkMode, sans] = store(state => [
		state.setUser,
		state.userData.customise_darkMode,
		state.userData.customise_sans,
	]);

	return (
		<div
			className={`p-8 my-auto mdx:mr-8 flex flex-col items-center gap-3 w-[300px] sm:w-[357px] border-2 border-neutral-400 rounded-sm ${
				darkMode ? "bg-slate-900 text-white" : "bg-slate-100"
			} ${sans ? "font-sans" : ""}`}
		>
			<p className="text-center">✅ You are already logged in!</p>
			<Buttons
				name="Log-Out"
				clickAction={() => {
					userSetter(undefined);
					signOut(auth);
				}}
				disabled={false}
				colors={{
					main: "bg-blue-700",
					hover: "hover:bg-blue-600",
				}}
			/>
		</div>
	);
};

export default AlreadyIn;

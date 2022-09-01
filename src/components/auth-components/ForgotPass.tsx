import React, { useState } from "react";
import { AuthError } from "firebase/auth";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { Send } from "react-feather";
import { auth } from "../../firebase/firebase-init";
import store from "../../store";
import LoginButtons from "../input-components/LoginButtons";
import LoginInputs from "../input-components/LoginInputs";
import AlreadyIn from "./AlreadyIn";
import AuthHeaders from "./AuthHeaders";
import LinkTxt from "./LinkTxt";

const ForgotPass = () => {
	// Form elements
	const [email, setEmail] = useState<string>("");

	const [sendPasswordResetEmail, loading, error] =
		useSendPasswordResetEmail(auth);

	const [user, looks] = store(state => [state.user, state.looks]);

	const emailValidation = () =>
		!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{user !== undefined ? (
				<AlreadyIn />
			) : (
				<form
					className={`relative p-8 my-auto mdx:mr-8 flex flex-col items-center gap-3 w-[300px] sm:w-[357px] border-2 border-neutral-400 rounded-sm ${
						looks.darkMode ? "bg-slate-900" : "bg-slate-100"
					}`}
				>
					<AuthHeaders loading={loading} error={error as AuthError} />
					<LoginInputs
						name="Email Address"
						type="email"
						val={email}
						setVal={setEmail}
						error={
							(error as AuthError)?.code === "auth/user-not-found"
						}
					/>
					<LoginButtons
						name={
							<>
								<Send color="white" size={24} /> Reset password
							</>
						}
						clickAction={() => {
							sendPasswordResetEmail(email);
						}}
						disabled={emailValidation()}
						colors={{
							main: "bg-blue-700",
							disabled: "disabled:bg-blue-300",
							hover: "hover:bg-blue-600",
						}}
					/>
					<LinkTxt
						className="-mt-1"
						nonLinkTxt="Remember your passord?"
						linkTxt="Sign in!"
						to="/sign-in"
					/>
				</form>
			)}
		</>
	);
};

export default ForgotPass;

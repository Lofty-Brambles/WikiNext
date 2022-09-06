/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from "react";
import { CheckCircle } from "react-feather";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase-init";
import store from "../../store";
import Buttons from "../input-components/Button";
import LoginInputs from "../input-components/LoginInput";
import AlreadyIn from "./AlreadyIn";
import AuthHeaders from "./AuthHeaders";
import LinkTxt from "./LinkTxt";

const SignUp = () => {
	// Form elements
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [pass, setPass] = useState<string>("");
	const [conPass, setConPass] = useState<string>("");

	const [user, looks] = store(state => [state.user, state.looks]);

	const [createUser, userReg, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	// Form validaton methods
	const passMatchesConfPass = () => pass === conPass;
	const enableCreation = () => {
		const emailIsValid =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			);
		const usernameIsValid = username !== "";
		const passIsValid = /^.{8,}$/.test(pass);
		const passMatches = passMatchesConfPass();

		return !(emailIsValid && usernameIsValid && passIsValid && passMatches);
	};

	return (
		<>
			{user !== undefined ? (
				<AlreadyIn />
			) : (
				<form
					className={`relative p-8 my-auto mdx:mr-8 flex flex-col items-center gap-3 w-[300px] sm:w-[357px] border-2 border-neutral-400 rounded-sm ${
						looks.darkMode ? "bg-slate-900" : "bg-slate-100"
					}`}
				>
					<AuthHeaders loading={loading} error={error} />
					{userReg !== undefined && (
						<div className="w-full p-2 flex justify-center items-center gap-4 rounded border-2 border-green-700">
							<CheckCircle
								color="green"
								size={36}
								className="block"
							/>
							<LinkTxt
								className="flex flex-col justify-center items-center"
								nonLinkTxt="Your account is registered!"
								linkTxt="Click here to sign in!"
								to="/sign-in"
							/>
						</div>
					)}
					<LoginInputs
						name="Email Address"
						type="email"
						val={email}
						setVal={setEmail}
						error={error?.code === "auth/email-already-in-use"}
					/>
					<LoginInputs
						name="Username"
						type="text"
						val={username}
						setVal={setUsername}
						error={false}
					/>
					<LoginInputs
						name="Password"
						type="text"
						val={pass}
						setVal={setPass}
						error={false}
					/>
					<LoginInputs
						name="Confirm Password"
						type="text"
						val={conPass}
						setVal={setConPass}
						error={!passMatchesConfPass()}
					/>
					<Buttons
						name="Sign up"
						clickAction={() => {
							createUser(email, pass);
						}}
						disabled={enableCreation()}
						colors={{
							main: "bg-blue-900",
							hover: "hover:bg-blue-800",
							disabled: "disabled:bg-blue-300",
						}}
					/>
					<LinkTxt
						className="-mt-1"
						nonLinkTxt="Already made an account?"
						linkTxt="Sign in!"
						to="/sign-in"
					/>
				</form>
			)}
		</>
	);
};

export default SignUp;

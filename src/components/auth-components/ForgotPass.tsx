import React, { useState } from "react";
import { AuthError, signOut } from "firebase/auth";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { AlertCircle, Send } from "react-feather";
import { auth } from "../../firebase/firebase-init";
import store from "../../store";
import LoginButtons from "../input-components/LoginButtons";
import LoginInputs from "../input-components/LoginInputs";

const ForgotPass = () => {
	const [email, setEmail] = useState<string>("");

	const [sendPasswordResetEmail, loading, error] =
		useSendPasswordResetEmail(auth);

	const [user, userSetter, looks] = store(state => [
		state.user,
		state.setUser,
		state.looks,
	]);

	const emailValidation = () =>
		!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{user !== undefined ? (
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
							disabled: "bg-blue-300",
						}}
					/>
				</div>
			) : (
				<form
					className={`relative p-8 my-auto mdx:mr-8 flex flex-col items-center gap-3 w-[300px] sm:w-[357px] border-2 border-neutral-400 rounded-sm ${
						looks.darkMode ? "bg-slate-900" : "bg-slate-100"
					}`}
				>
					<div
						className={`flex justify-center items-center gap-3 font-titan text-4xl ${
							looks.darkMode ? "text-white" : ""
						}`}
					>
						<img src="/favicon.png" alt="icon" className="w-12" />
						Wiki
					</div>
					{error !== undefined && (
						<div className="w-full px-3 py-2 flex justify-start items-center gap-4 rounded border-2 border-red-700 font-serif text-sm text-red-700">
							<AlertCircle color="red" />
							<span className="flex-grow">
								{(error as AuthError).code}
							</span>
						</div>
					)}
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
							disabled: "bg-blue-300",
						}}
					/>
					{loading === true && (
						<div className="absolute -top-[2px] -left-[2px] w-[300px] sm:w-[357px] h-[calc(100%+0.25rem)] flex justify-center items-center border-2 border-neutral-400 bg-slate-500 opacity-60">
							<img
								className="h-36"
								src="/loading.gif"
								alt="loading"
							/>
						</div>
					)}
				</form>
			)}
		</>
	);
};

export default ForgotPass;

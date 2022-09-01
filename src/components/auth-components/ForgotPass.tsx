import React, { useRef, useState } from "react";
import { AuthError } from "firebase/auth";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { AlertCircle, Send } from "react-feather";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-init";
import store from "../../store";
import LoginButtons from "../input-components/LoginButtons";
import LoginInputs from "../input-components/LoginInputs";
import AlreadyIn from "./AlreadyIn";

const ForgotPass = () => {
	const [email, setEmail] = useState<string>("");

	const [sendPasswordResetEmail, loading, error] =
		useSendPasswordResetEmail(auth);

	const [user, looks] = store(state => [state.user, state.looks]);

	const signInPage = useRef<HTMLAnchorElement>(null);

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
							disabled: "disabled:bg-blue-300",
							hover: "hover:bg-blue-600",
						}}
					/>
					<p
						className={`-mt-1 ${
							looks.darkMode ? "text-white" : ""
						}`}
					>
						Remember your passord?{" "}
						<Link
							to="/sign-in"
							style={{
								color: "blue",
								textDecoration: "underline",
							}}
							ref={signInPage}
							onMouseOver={() => {
								signInPage.current!.style.color = "purple";
							}}
							onMouseLeave={() => {
								signInPage.current!.style.color = "blue";
							}}
						>
							Sign in!
						</Link>
					</p>
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
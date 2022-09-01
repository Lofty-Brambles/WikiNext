import React, { useRef, useState } from "react";
import { AlertCircle, GitHub, Mail } from "react-feather";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-init";
import useLoginMethods from "../../hooks/useLoginMethod";
import store from "../../store";
import LoginButtons from "../input-components/LoginButtons";
import LoginInputs from "../input-components/LoginInputs";
import AlreadyIn from "./AlreadyIn";

const SignIn = () => {
	const [emailVal, setEmailVal] = useState<string>("");
	const [passVal, setPassVal] = useState<string>("");

	const signInLink = useRef<HTMLAnchorElement | null>(null);
	const forgotPw = useRef<HTMLAnchorElement | null>(null);

	const [signInEmail, signInGmail, signInGh, loading, error] =
		useLoginMethods(auth);
	const [looks, user] = store(state => [state.looks, state.user]);

	const signInValidation = () => {
		const emailIsValid =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				emailVal
			);
		const passIsValid = /^.{8,}$/.test(passVal);

		return !(emailIsValid && passIsValid);
	};

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
							<span className="flex-grow">{error.code}</span>
						</div>
					)}
					<LoginInputs
						name="Email Address"
						type="email"
						val={emailVal}
						setVal={setEmailVal}
						error={error?.code === "auth/email-already-in-use"}
					/>
					<LoginInputs
						name="Password"
						type="password"
						val={passVal}
						setVal={setPassVal}
						error={false}
					/>
					<LoginButtons
						name="Log-in"
						clickAction={() => {
							signInEmail(emailVal, passVal);
						}}
						disabled={signInValidation()}
						colors={{
							main: "bg-blue-700",
							disabled: "disabled:bg-blue-300",
							hover: "hover:bg-blue-600",
						}}
					/>
					<p
						className={`-mb-1 ${
							looks.darkMode ? "text-white" : ""
						}`}
					>
						Forgot your password?{" "}
						<Link
							to="/forgot-password"
							style={{
								color: "blue",
								textDecoration: "underline",
							}}
							ref={forgotPw}
							onMouseOver={() => {
								forgotPw.current!.style.color = "purple";
							}}
							onMouseLeave={() => {
								forgotPw.current!.style.color = "blue";
							}}
						>
							Reset it!
						</Link>
					</p>
					<h6
						className={`font-mono relative before:absolute before:right-8 before:top-[calc(50%-1px)] before:w-[100px] before:h-px after:absolute after:left-8 after:top-[calc(50%-1px)] after:w-[100px] after:h-px ${
							looks.darkMode
								? "text-gray-400 before:bg-gray-400 after:bg-gray-400"
								: "text-gray-700 before:bg-gray-700 after:bg-gray-700"
						}`}
					>
						OR
					</h6>
					<p
						className={`-mt-1 ${
							looks.darkMode ? "text-white" : ""
						}`}
					>
						Don&apos;t have an account?{" "}
						<Link
							to="/sign-up"
							style={{
								color: "blue",
								textDecoration: "underline",
							}}
							ref={signInLink}
							onMouseOver={() => {
								signInLink.current!.style.color = "purple";
							}}
							onMouseLeave={() => {
								signInLink.current!.style.color = "blue";
							}}
						>
							Sign up!
						</Link>
					</p>
					<LoginButtons
						name={
							<>
								<Mail color="white" size={24} /> Gmail
							</>
						}
						clickAction={() => {
							signInGmail();
						}}
						disabled={false}
						colors={{
							main: "bg-red-600",
							hover: "hover:bg-red-500",
						}}
					/>
					<LoginButtons
						name={
							<>
								<GitHub color="white" size={24} /> Github
							</>
						}
						clickAction={() => {
							signInGh();
						}}
						disabled={false}
						colors={{
							main: looks.darkMode
								? "bg-gray-500"
								: "bg-gray-900",
							hover: looks.darkMode
								? "hover:bg-gray-400"
								: "hover:bg-gray-800",
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

export default SignIn;

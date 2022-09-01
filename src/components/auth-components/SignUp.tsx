/* eslint-disable react/jsx-no-useless-fragment */
import React, { useRef, useState } from "react";
import { AlertCircle, CheckCircle } from "react-feather";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-init";
import store from "../../store";
import LoginButtons from "../input-components/LoginButtons";
import LoginInputs from "../input-components/LoginInputs";
import AlreadyIn from "./AlreadyIn";

const SignUp = () => {
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [pass, setPass] = useState<string>("");
	const [conPass, setConPass] = useState<string>("");

	const [user, looks] = store(state => [state.user, state.looks]);

	const [createUser, userReg, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	const signInPage = useRef<HTMLAnchorElement>(null);
	const signInPage2 = useRef<HTMLAnchorElement>(null);

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
					{userReg !== undefined && (
						<div className="w-full p-2 flex justify-center items-center gap-4 rounded border-2 border-green-700">
							<CheckCircle
								color="green"
								size={36}
								className="block"
							/>
							<div
								className={`flex flex-col justify-center items-center ${
									looks.darkMode ? "text-white" : ""
								}`}
							>
								Your account is registered!
								<Link
									to="/sign-in"
									style={{
										color: "blue",
										textDecoration: "underline",
									}}
									ref={signInPage2}
									onMouseOver={() => {
										signInPage2.current!.style.color =
											"purple";
									}}
									onMouseLeave={() => {
										signInPage2.current!.style.color =
											"blue";
									}}
								>
									Click here to sign in!
								</Link>
							</div>
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
					<LoginButtons
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
					<p
						className={`-mt-1 ${
							looks.darkMode ? "text-white" : ""
						}`}
					>
						Already made an account?{" "}
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

export default SignUp;

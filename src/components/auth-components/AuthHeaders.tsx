import React from "react";
import { AuthError } from "firebase/auth";
import { AlertCircle } from "react-feather";
import store from "../../store";

// Error prompts for the login modals
type LoginErrorProps = {
	error: AuthError;
};

const LoginError = ({ error }: LoginErrorProps) => (
	<div className="w-full px-3 py-2 flex justify-start items-center gap-4 rounded border-2 border-red-700 font-serif text-sm text-red-700">
		<AlertCircle color="red" />
		<span className="flex-grow">{error.code}</span>
	</div>
);

// Loading prompts for the login modals
const LoginLoading = () => (
	<div className="absolute -top-[2px] -left-[2px] w-[300px] sm:w-[357px] h-[calc(100%+0.25rem)] flex justify-center items-center border-2 border-neutral-400 bg-slate-500 opacity-60">
		<img className="h-36" src="/loading.gif" alt="loading" />
	</div>
);

// The logo for the login modals
const WikiLogo = () => {
	const looks = store(state => state.looks);

	return (
		<div
			className={`flex justify-center items-center gap-3 font-titan text-4xl ${
				looks.darkMode ? "text-white" : ""
			}`}
		>
			<img src="/favicon.png" alt="icon" className="w-12" />
			Wiki
		</div>
	);
};

type Props = {
	error: AuthError | undefined;
	loading: boolean;
};

// Abstraction over the necessary details in an auth modal
const AuthHeaders = ({ error, loading }: Props) => (
	<>
		<WikiLogo />
		{error !== undefined && <LoginError error={error} />}
		{loading === true && <LoginLoading />}
	</>
);

export default AuthHeaders;

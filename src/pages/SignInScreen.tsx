import React from "react";
import Image from "../assets/Monaco-display.png";
import SignInModal from "../components/auth-components/SignInModal";
import store from "../store";

type Props = {
	type: "sign-in" | "sign-up" | "forgot-password";
};

const SignInScreen = ({ type }: Props) => {
	const looks = store(state => state.looks);

	return (
		<div
			className={`box-border w-full h-[calc(100%-84px)] lg:w-[calc(80vw-10px)] flex justify-center items-center gap-4 overflow-y-scroll ${
				looks.darkMode ? "bg-gray-600" : "bg-zinc-200"
			}`}
		>
			<img
				src={Image}
				alt="wiki-next logo"
				className="h-[544px] hidden mdx:block"
			/>
			{type === "sign-in" && <SignInModal />}
		</div>
	);
};

export default SignInScreen;
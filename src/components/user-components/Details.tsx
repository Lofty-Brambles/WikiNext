import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import store from "../../store";
import { auth } from "../../firebase/firebase-init";
import Button from "../input-components/Button";

const Details = () => {
	const navigate = useNavigate();
	const [user, userSetter] = store(state => [state.user, state.setUser]);

	return (
		<div className="w-full flex justify-between items-center gap-4">
			<img
				referrerPolicy="no-referrer"
				src={user?.providerData[0].photoURL!}
				alt="pfp"
				className="w-20 sm:w-32 rounded-full border-2 border-black"
			/>
			<div>middle element</div>
			<div className="flex flex-wrap justify-evenly items-center gap-x-4">
				<Button
					name="Edit Profile"
					clickAction={() => {
						navigate("/sign-in", { replace: true });
					}}
					disabled={false}
					colors={{
						main: "bg-blue-700",
						hover: "hover:bg-blue-600",
					}}
					width="w-fit"
					textSize="text-sm sm:text-base"
				/>
				<Button
					name="Log out"
					clickAction={() => {
						userSetter(undefined);
						signOut(auth);
					}}
					disabled={false}
					colors={{ main: "bg-blue-700", hover: "hover:bg-blue-600" }}
					width="w-fit"
					textSize="text-sm sm:text-base"
				/>
			</div>
		</div>
	);
};

export default Details;

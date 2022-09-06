import React, { useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { Edit3 } from "react-feather";
import store from "../../store";
import { auth } from "../../firebase/firebase-init";
import Button from "../input-components/Button";

const Details = () => {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [val, setVal] = useState<string>("");

	const [user, userSetter, looks] = store(state => [
		state.user,
		state.setUser,
		state.looks,
	]);

	return (
		<div className="w-full flex justify-around items-center gap-4 flex-wrap">
			<div className="w-fit flex justify-around items-center gap-6 flex-wrap">
				<img
					referrerPolicy="no-referrer"
					src={user?.providerData[0].photoURL!}
					alt="pfp"
					className="w-14 sm:w-20 border border-black rounded-full"
				/>
				<p className="whitespace-nowrap">
					{" "}
					Hey,{" "}
					{editMode ? (
						<>
							<input
								type="text"
								value={val}
								onChange={e => {
									setVal(e.currentTarget.value);
								}}
								className={`w-60 sm:w-[30vw] p-1 px-3 py-3 border border-neutral-400 rounded outline-none focus:border-blue-700 shadow-lg ${
									looks.darkMode
										? "bg-slate-700"
										: "bg-slate-100"
								}`}
							/>
							<button
								type="button"
								className="inline-block -ml-12 py-[6px] px-3 rounded bg-blue-700 hover:bg-blue-600 text-white"
								onClick={async () => {
									await updateProfile(user!, {
										displayName: val,
									});
									setEditMode(e => !e);
								}}
							>
								Save
							</button>
						</>
					) : (
						<strong className="relative before:absolute before:bg-cyan-400 before:opacity-50 before:left-0 before:bottom-[3px] before:w-full before:h-1">
							@{user?.providerData[0].displayName}
						</strong>
					)}{" "}
					<button
						type="button"
						onClick={() => {
							setVal(user?.providerData[0].displayName!);
							setEditMode(e => !e);
						}}
					>
						{!editMode && (
							<Edit3
								className="inline p-1 rounded-md hover:bg-slate-500"
								size={32}
							/>
						)}
					</button>
				</p>
			</div>
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
	);
};

export default Details;

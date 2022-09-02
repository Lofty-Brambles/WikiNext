/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import store from "../../store";

type Props = {
	name: string;
	type: string;
	val: string;
	setVal: React.Dispatch<React.SetStateAction<string>>;
	error: boolean;
};

const LoginInputs = ({ name, type, val, setVal, error }: Props) => {
	const [err, setErr] = useState<boolean>(false);
	const looks = store(state => state.looks);

	useEffect(() => {
		setErr(error);
	}, [error]);

	return (
		<div
			className={`relative w-full ${looks.darkMode ? "text-white" : ""}`}
		>
			<input
				type={type}
				id={name}
				value={val}
				onChange={e => {
					setVal(e.currentTarget.value);
				}}
				className={`floater z-10 w-full px-3 py-2 border border-neutral-400 rounded outline-none bg-transparent focus:border-blue-700 font-sans ${
					err === true ? "error-border" : ""
				}`}
			/>
			<label
				htmlFor={name}
				className={`absolute left-1 top-[9px] px-2 font-serif ${
					val !== ""
						? "transition-transform ease-in-out scale-75 -translate-x-3 -translate-y-5 border-blue-700"
						: ""
				} ${err === true ? "text-red-600" : ""} ${
					looks.darkMode ? "bg-slate-900" : " bg-slate-100"
				}`}
			>
				{name}...
			</label>
		</div>
	);
};

export default LoginInputs;

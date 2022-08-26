import React from "react";

type PropsToggleBtn = {
	prop: boolean;
	toggleFunction: () => void;
	param: string;
	name: string;
};

const ToggleBtn = ({ toggleFunction, param, name, prop }: PropsToggleBtn) => (
	<li className="flex justify-center items-center gap-2">
		<span>{param}</span>
		<label htmlFor="font">
			<input
				type="checkbox"
				className="absolute peer appearance-none rounded-md w-12 h-[1.875rem] opacity-0 z-10 cursor-pointer"
				name={name}
				onClick={toggleFunction}
				checked={prop}
			/>
			<span className="relative w-12 h-[1.875rem] flex items-center flex-shrink-0 bg-gray-200 border-2 border-gray-700 rounded-full duration-300 ease-in-out peer-checked:bg-emerald-500 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5 group-hover:after:translate-x-1" />
		</label>
	</li>
);

export default ToggleBtn;

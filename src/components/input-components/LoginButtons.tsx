import React from "react";

type Props = {
	name: string | JSX.Element;
	clickAction: () => void;
	disabled: boolean;
	colors: {
		main: string;
		hover?: string;
		disabled?: string;
	};
};

const LoginButtons = ({ name, clickAction, disabled, colors }: Props) => (
	<button
		type="button"
		disabled={disabled}
		onClick={clickAction}
		onKeyDown={clickAction}
		className={`w-full px-3 py-2 rounded flex justify-center items-center gap-2 text-white text-lg font-serif ${
			colors.main
		}${colors.hover !== undefined ? ` hover:${colors.hover}` : ""}${
			colors.disabled !== undefined ? ` disabled:${colors.disabled}` : ""
		}`}
	>
		{name}
	</button>
);

export default LoginButtons;

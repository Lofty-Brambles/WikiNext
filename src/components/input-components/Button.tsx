/* eslint-disable react/require-default-props */
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
	width?: string;
	textSize?: string;
};

const LoginButtons = ({
	name,
	clickAction,
	disabled,
	colors,
	width,
	textSize,
}: Props) => (
	<button
		type="button"
		disabled={disabled}
		onClick={clickAction}
		onKeyDown={clickAction}
		className={`${
			width || "w-full"
		} px-3 py-2 rounded flex justify-center items-center gap-2 text-white ${
			textSize || "text-lg"
		} font-serif ${colors.main} ${colors.hover} ${colors.disabled}`}
	>
		{name}
	</button>
);

export default LoginButtons;

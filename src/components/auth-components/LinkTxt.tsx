import React, { useRef } from "react";
import { Link } from "react-router-dom";
import store from "../../store";

type Props = {
	className: string;
	nonLinkTxt: string;
	linkTxt: string;
	to: string;
};

const LinkTxt = ({ className, nonLinkTxt, linkTxt, to }: Props) => {
	const linkRef = useRef<HTMLAnchorElement>(null);

	const [darkMode, sans] = store(state => [
		state.userData.customise_darkMode,
		state.userData.customise_sans,
	]);

	return (
		<p
			className={`${className} ${darkMode ? "text-white" : ""} ${
				sans ? "font-sans" : "font-serif"
			}`}
		>
			{`${nonLinkTxt} `}
			<Link
				to={to}
				style={{
					color: "blue",
					textDecoration: "underline",
				}}
				ref={linkRef}
				onMouseOver={() => {
					linkRef.current!.style.color = "purple";
				}}
				onMouseLeave={() => {
					linkRef.current!.style.color = "blue";
				}}
			>
				{linkTxt}
			</Link>
		</p>
	);
};

export default LinkTxt;

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

	const looks = store(state => state.looks);

	return (
		<p className={`${className} ${looks.darkMode ? "text-white" : ""}`}>
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

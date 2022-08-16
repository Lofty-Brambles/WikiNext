import React, { useState } from "react";
import { ChevronDown, ExternalLink } from "react-feather";
import { fsSnap } from "../../../types";

type Props = {
	content: string;
	dir: fsSnap;
};

const NavDropdown = ({ content, dir }: Props) => {
	const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

	const toggleOptionState = () => {
		setIsOptionsOpen(s => !s);
	};

	const handleBtnKeyDown = e => {};

	return (
		<div>
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={isOptionsOpen}
				onClick={toggleOptionState}
				onKeyDown={handleBtnKeyDown}
				className="relative inline-flex justify-center font-serif p-2 m-2 rounded-lg hover:bg-teal-600 whitespace-nowrap focus:outline-none focus:border-2 focus:border-white"
			>
				{content}&nbsp;
				<ChevronDown />
			</button>
			<ul
				className={`absolute text-black ${
					isOptionsOpen ? "block" : "hidden"
				}`}
			>
				{Object.keys(dir[content]).map(page => (
					<li className="flex justify-center align-middle">
						{page}&nbsp;
						<ExternalLink />
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavDropdown;

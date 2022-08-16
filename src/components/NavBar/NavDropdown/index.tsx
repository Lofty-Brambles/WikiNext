import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink } from "react-feather";
import { Link } from "react-router-dom";
import { fsSnap } from "../../../types";

type Props = {
	content: string;
	dir: fsSnap;
};

const NavDropdown = ({ content, dir }: Props) => {
	const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
	const [listWidth, setListWidth] = useState<number>(0);

	const reference = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (reference.current?.offsetWidth !== undefined)
			setListWidth(reference.current?.offsetWidth);
	});

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
				ref={reference}
				onClick={toggleOptionState}
				onKeyDown={handleBtnKeyDown}
				className={`relative inline-flex justify-center font-serif p-2 mx-2 mt-2 rounded-t-lg focus:bg-teal-600 whitespace-nowrap outline-none focus:border-2 focus:border-white ${
					isOptionsOpen ? "border-2 border-white bg-teal-600" : ""
				}`}
			>
				{content}&nbsp;
				<ChevronDown />
			</button>
			<ul
				className={`absolute mx-2 text-white bg-teal-600 rounded-b outline-none ${
					isOptionsOpen ? "block" : "hidden"
				}`}
				style={{ minWidth: `${listWidth}px`, width: "fit-content" }}
				role="listbox"
				tabIndex={-1}
				onKeyDown={handleBtnKeyDown}
			>
				{Object.keys(dir[content]).map(page => (
					<li id={page}>
						<Link
							to={`/${encodeURIComponent(page)}`}
							tabIndex={0}
							className="flex justify-center align-middle p-1 last:rounded outline-none focus:text-black"
						>
							{page}&nbsp;
							<ExternalLink />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavDropdown;

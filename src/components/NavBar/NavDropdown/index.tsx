import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink } from "react-feather";
import { Link } from "react-router-dom";
import useStore from "../../../store";
import { fsSnap } from "../../../types";

type Props = {
	content: string;
	dir: fsSnap;
};

const NavDropdown = ({ content, dir }: Props) => {
	const [listWidth, setListWidth] = useState<number>(0);

	const reference = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (reference.current?.offsetWidth !== undefined)
			setListWidth(reference.current?.offsetWidth);
	});

	const dropdownMenuStates = useStore(state => state.dropdownMenuStates);
	const turnoffDropsExceptOne = useStore(state => state.turnoffDropsExceptOne);

	const toggleOptionState = () => {
		turnoffDropsExceptOne(content, !dropdownMenuStates[content]);
	};

	const handleBtnKeyDown = (e: React.KeyboardEvent<HTMLUListElement | HTMLButtonElement>) => {
		if (e.key === "Escape") {
			e.preventDefault();
			turnoffDropsExceptOne(content, false);
		}
	};

	return (
		<div>
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={dropdownMenuStates[content]}
				ref={reference}
				onClick={toggleOptionState}
				onKeyDown={(e) => {
					handleBtnKeyDown(e);
				}}
				className={`relative inline-flex justify-center font-serif p-2 mx-2 rounded-t-lg focus:bg-teal-600 whitespace-nowrap outline-2 outline-white ${
					dropdownMenuStates[content] ? "bg-teal-600" : ""
				}`}
			>
				{content}&nbsp;
				<ChevronDown />
			</button>
			<ul
				className={`absolute mx-2 text-white bg-teal-600 rounded-b outline-none ${
					dropdownMenuStates[content] ? "block" : "hidden"
				}`}
				style={{ minWidth: `${listWidth}px`, width: "fit-content" }}
				role="listbox"
				tabIndex={-1}
				onKeyDown={handleBtnKeyDown}
			>
				{Object.keys(dir[content]).map(page => (
					<li key={page} id={page}>
						<Link
							to={`/${encodeURIComponent(page)}`}
							tabIndex={0}
							className="flex justify-center align-middle p-1 last:rounded outline-none focus:text-black hover:bg-teal-800"
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

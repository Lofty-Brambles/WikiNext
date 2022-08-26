import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink } from "react-feather";
import { Link } from "react-router-dom";
import { FileStructure } from "../../pages/App";
import store from "../../store";

type Props = {
	directory: FileStructure;
	content: string;
};

const NavDropdown = ({ directory, content }: Props) => {
	// The maximum, uniform width of the list
	const [listWidth, setListWidth] = useState<number>(0);

	// The alignment offset of the dropdowns
	const [align, setAlign] = useState<number>(0);

	// References to the button and list, used for display alignment
	const button = useRef<HTMLButtonElement>(null);
	const list = useRef<HTMLUListElement>(null);

	// Hook to track the alignment of the dropdowns
	useEffect(() => {
		if (button.current?.offsetWidth !== undefined)
			setListWidth(button.current.offsetWidth);
		setAlign(button.current?.getBoundingClientRect().left!);
	}, []);

	// Fetches the entire navbar length and dropdown states, with resetters
	const [navLen, navDrops, turnOffDrops, turnOffDropsxOne] = store(state => [
		state.navbarLength,
		state.navDrops,
		state.turnOffDrops,
		state.turnOffDropsxOne,
	]);

	// Handler for dropdown states, on clicking one
	const toggleOptionState = () => {
		turnOffDropsxOne(content);
	};

	// Keyboard handler for the escape button
	const handleBtnKeyDown = (
		e: React.KeyboardEvent<HTMLUListElement | HTMLButtonElement>
	) => {
		if (e.key === "Escape") {
			e.preventDefault();
			turnOffDropsxOne(content);
		}
	};

	return (
		<div>
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={navDrops[content]}
				ref={button}
				onClick={toggleOptionState}
				onKeyDown={e => {
					handleBtnKeyDown(e);
				}}
				className={`relative inline-flex justify-center font-serif p-2 mx-2 rounded-t-lg focus:bg-teal-600 whitespace-nowrap outline-2 outline-white ${
					navDrops[content] ? "bg-teal-600" : ""
				}`}
			>
				{content}&nbsp;
				<ChevronDown />
			</button>
			<ul
				ref={list}
				className={`absolute w-fit text-white bg-teal-600 outline-none ${
					navDrops[content] ? "block" : "hidden"
				}`}
				style={{
					minWidth: `${listWidth}px`,
					left:
						navLen + 58 > Math.max(align, 58) + listWidth
							? `${Math.max(align, 58)}px`
							: `${navLen + 58 - listWidth}px`,
				}}
				role="listbox"
				tabIndex={-1}
				onKeyDown={handleBtnKeyDown}
			>
				{Object.keys(directory[content]).map(pg => (
					<li key={pg}>
						<Link
							to={`/wiki/${encodeURIComponent(pg)}`}
							tabIndex={0}
							onClick={turnOffDrops}
							className="flex justify-center items-center p-2 outline-none focus:text-black hover:bg-teal-800"
						>
							{pg}&nbsp;&nbsp;
							<ExternalLink size={16} />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavDropdown;

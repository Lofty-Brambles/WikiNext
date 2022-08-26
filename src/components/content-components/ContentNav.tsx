import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { FileStructure } from "../../pages/App";
import store from "../../store";
import NavDropdown from "./NavDropdown";

type Props = {
	snap: FileStructure | null;
	load: boolean;
	err: Error | undefined;
};

const ContentNav = ({ snap, load, err }: Props) => {
	// Actual navbar, without the buttons
	const navbar = useRef<HTMLElement>(null);

	// State handlers to turn off dropdowns on scrolling
	const turnOffDrops = store(state => state.turnOffDrops);

	// State handlers to update the length of the navbar component
	const setNavLength = store(state => state.setNavbarLength);
	const resizeHandler = () => {
		setNavLength(navbar.current?.getBoundingClientRect().width!);
	};

	useEffect(() => {
		setNavLength(navbar.current?.getBoundingClientRect().width!);
	}, [navbar.current]);
	useEffect(() => {
		window.addEventListener("resize", resizeHandler);
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	// Timer interval stores, used for smooth scrolling
	const leftTimer = useRef<NodeJS.Timer>();
	const rightTimer = useRef<NodeJS.Timer>();

	const scroll = (val: "l" | "r") => {
		if (val === "l" && navbar !== null)
			return setInterval(() => {
				navbar.current!.scrollLeft -= 100;
			}, 100);
		return setInterval(() => {
			navbar.current!.scrollLeft += 100;
		}, 100);
	};

	// Function to turn off all dropdowns when called, during scrolling

	return (
		<div className="box-border w-full min-h-[4rem] flex items-center gap-2 pl-2 pr-2 mr-[2px] lg:mr-0 lg:pr-[calc(1rem+2px)] border-l-2 bg-teal-800 text-white shadow-md border-b-2">
			{err && (
				<code className="m-auto">
					❗ | An unexpected error occured. Please try again.
				</code>
			)}
			{load && <code className="m-auto">🔄 | Loading all content.</code>}
			{!load &&
				// eslint-disable-next-line no-nested-ternary
				(typeof snap === "undefined" || snap === null ? (
					<code className="m-auto">❗ | No content was found.</code>
				) : Object.keys(snap).length <= 0 ? (
					<code className="m-auto">❗ | No content was found.</code>
				) : (
					<>
						<button
							type="button"
							aria-label="Scroll left"
							className="h-fit p-2 rounded-full hover:bg-teal-600 outline-[1px] outline-white"
							onMouseDown={() => {
								leftTimer.current = scroll("l");
								turnOffDrops();
							}}
							onMouseUp={() => {
								clearInterval(leftTimer.current);
							}}
						>
							<ChevronLeft />
						</button>
						<nav
							className="flex justify-between items-center w-full overflow-x-scroll scrollbar-hide scroll-smooth"
							ref={navbar}
						>
							{Object.keys(snap).map(e => (
								<NavDropdown
									key={e}
									directory={snap}
									content={e}
								/>
							))}
						</nav>
						<button
							type="button"
							aria-label="Scroll Right"
							className="h-fit p-2 mr-1 rounded-full hover:bg-teal-600 outline-[1px] outline-white"
							onMouseDown={() => {
								rightTimer.current = scroll("r");
								turnOffDrops();
							}}
							onMouseUp={() => {
								clearInterval(rightTimer.current);
							}}
						>
							<ChevronRight />
						</button>
					</>
				))}
		</div>
	);
};

export default ContentNav;

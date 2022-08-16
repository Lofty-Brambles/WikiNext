import React, { useRef } from "react";
import { ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather";
import { fs } from "../../../firebase/firebase-init";
import { fsSnap } from "../../../types";

const ContentNav = () => {
	const [snap, load, err] = useObjectVal<fsSnap>(ref(fs));
	const reference = useRef<HTMLDivElement>(null);
	const leftTimer = useRef<NodeJS.Timer>();
	const rightTimer = useRef<NodeJS.Timer>();

	const scroll = (val: "l" | "r") => {
		if (val === "l" && reference !== null)
			return setInterval(() => {
				reference.current!.scrollLeft -= 100;
			}, 100);
		return setInterval(() => {
			reference.current!.scrollLeft += 100;
		}, 100);
	};

	return (
		<div className="box-border w-full min-h-[4rem] flex items-center gap-2 pl-2 pr-2 lg:pr-[calc(1rem+2px)] border-l-2 bg-teal-800 text-white shadow-md border-b-2">
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
							aria-label="Scroll Left"
							className="h-fit p-2 rounded-full hover:bg-teal-600 focus:outline-none focus:border-2 focus:border-white"
							onMouseDown={() => {
								leftTimer.current = scroll("l");
							}}
							onMouseUp={() => {
								clearInterval(leftTimer.current);
							}}
						>
							<ChevronLeft />
						</button>
						<div
							className="flex justify-between items-center w-full overflow-x-scroll scrollbar-hide scroll-smooth"
							ref={reference}
						>
							{Object.keys(snap).map(ele => (
								<button
									type="button"
									className="inline-flex justify-center font-serif p-2 m-2 rounded-lg hover:bg-teal-600 whitespace-nowrap focus:outline-none focus:border-2 focus:border-white"
								>
									{ele}&nbsp;
									<ChevronDown />
								</button>
							))}
						</div>
						<button
							type="button"
							aria-label="Scroll Right"
							className="h-fit p-2 rounded-full hover:bg-teal-600 focus:outline-none focus:border-2 focus:border-white"
							onMouseDown={() => {
								rightTimer.current = scroll("r");
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

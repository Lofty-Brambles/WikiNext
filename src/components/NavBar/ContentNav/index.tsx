import React from "react";
import { ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { ChevronDown } from "react-feather";
import { fs } from "../../../firebase/firebase-init";
import { fsSnap } from "../../../types";

const ContentNav = () => {
	const [snap, load, err] = useObjectVal<fsSnap>(ref(fs));

	return ( // TODO: Responsive scrolling
		<nav className="box-border w-full min-h-[3rem] flex border-l-2 bg-teal-800 text-white shadow-md border-b-2">
			{err && (
				<code className="m-auto">❗ | An unexpected error occured. Please try again.</code>
			)}
			{load && <code className="m-auto">🔄 | Loading all content.</code>}
			{!load &&
				// eslint-disable-next-line no-nested-ternary
				(typeof snap === "undefined" || snap === null ? (
					<code className="m-auto">❗ | No content was found.</code>
				) : Object.keys(snap).length <= 0 ? (
					<code className="m-auto">❗ | No content was found.</code>
				) : (
					Object.keys(snap).map(ele => (
						<button type="button" className="inline-flex justify-center font-serif p-2 m-2 rounded-lg hover:bg-teal-600 whitespace-nowrap">
							{ele}&nbsp;
							<ChevronDown />
						</button>
					))
				))}
		</nav>
	);
};

export default ContentNav;

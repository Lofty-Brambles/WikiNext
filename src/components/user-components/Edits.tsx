import React from "react";
import store from "../../store";

const Edits = () => {
	const looks = store(state => state.looks);
	return (
		<section
			className={`w-full p-5 border ${
				looks.darkMode ? "border-white" : "border-black"
			}`}
		>
			p
		</section>
	);
};

export default Edits;

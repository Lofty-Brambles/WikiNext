import React from "react";
import store from "../../store";

const Edits = () => {
	const darkMode = store(state => state.userData.customise_darkMode);
	return (
		<section
			className={`w-full p-5 border ${
				darkMode ? "border-white" : "border-black"
			}`}
		>
			p
		</section>
	);
};

export default Edits;

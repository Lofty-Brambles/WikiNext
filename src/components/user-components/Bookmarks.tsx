import React from "react";
import store from "../../store";

// eslint-disable-next-line arrow-body-style
const Bookmarks = () => {
	const darkMode = store(state => state.userData.customise_darkMode);
	return (
		<section
			className={`w-full p-5 border ${
				darkMode ? "border-white" : "border-black"
			}`}
		>
			bookmarks
		</section>
	);
};

export default Bookmarks;

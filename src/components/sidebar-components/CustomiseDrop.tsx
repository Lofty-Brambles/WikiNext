/* eslint-disable no-unused-vars */
import React, { ReactElement } from "react";
import { FileText, Icon, Type } from "react-feather";
import ToggleBtn from "../input-components/ToggleBtn";
import ThreeBtn from "../input-components/ThreeBtn";
import store from "../../store";

const CustomMenu = () => {
	const [looks, tFont, tDark, tSpace, tJust] = store(state => [
		{
			sans: state.userData.customise_sans,
			darkMode: state.userData.customise_darkMode,
			sideSpace: state.userData.customise_sideSpace,
			justify: state.userData.customise_justify,
		},
		state.toggleFont,
		state.toggleDarkMode,
		state.toggleSideSpace,
		state.toggleJustify,
	]);

	return (
		<ul className="flex flex-col px-4 py-2 mb-2 gap-2 rounded-b-lg border-2 border-gray-700">
			<ThreeBtn
				prop={looks.sideSpace}
				toggleFunction={tSpace}
				IconP={FileText}
				name="Side Spacing"
			/>
			<ToggleBtn
				prop={looks.sans}
				toggleFunction={tFont}
				param="Sans font?"
				name="Sans or serif fonts"
			/>
			<ToggleBtn
				prop={looks.darkMode}
				toggleFunction={tDark}
				param="Darkmode?"
				name="Light mode/Dark mode"
			/>
			<ToggleBtn
				prop={looks.justify}
				toggleFunction={tJust}
				param="Justify?"
				name="Justify content?"
			/>
		</ul>
	);
};

export default CustomMenu;

import React from "react";
import { useParams } from "react-router-dom";
import ContentNav from "../../components/NavBar/ContentNav";

// eslint-disable-next-line arrow-body-style
const Display = () => {
	const { name } = useParams();

	return (
		<div className="box-border w-full h-full lg:w-[80vw] flex justify-start items-center flex-col text-center">
			<ContentNav />
		</div>
	);
};

export default Display;

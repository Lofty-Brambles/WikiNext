import React from "react";

type Props = {
	info: string;
};

const Tag = ({ info }: Props) => (
	<span className="text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
		{info}
	</span>
);

export default Tag;

import React from "react";
import { FirestoreError } from "firebase/firestore";

type Props = {
	// eslint-disable-next-line react/require-default-props
	error?: FirestoreError | undefined;
};

const Error404 = ({ error }: Props) => (
	<>
		<h1 className="text-gray-400">Error ${error?.code}</h1>
		<p className="text-gray-400">Oh no, an unexpected error occured...</p>
	</>
);

export default Error404;

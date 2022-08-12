/* eslint-disable react/require-default-props */
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import { db } from "../../firebase/firebase-init";
import Error404 from "../../components/Error404";

type Props = {
	name?: string;
	customErr?: boolean;
};

const Display = ({ name, customErr }: Props) => {
	const pageRef = doc(db, `pages/${name}`);
	const [value, loading, error] = useDocumentData(pageRef);

	return (
		<div className="box-border w-full h-full lg:w-[80vw] flex justify-center items-center flex-col text-center">
			<DirectoryBar />
			{loading && <img className="w-16 h-16" src="/loading.gif" alt="loading" />}
			{error && <Error404 error={error} />}
			{customErr && <Error404 />}
			{!error && !loading && (
				<div className="w-full h-full flex justify-start items-center overflow-y-scroll text-left">
					<ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw]} >{value?.content}</ReactMarkdown>
				</div>
			)}
		</div>
	);
};

export default Display;

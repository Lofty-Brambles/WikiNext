import { doc, DocumentReference } from "firebase/firestore";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useOutletContext, useParams } from "react-router-dom";
import { Edit, Share } from "react-feather";
import ReactMarkdown from "react-markdown";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import { FileStructure } from "./App";
import store from "../store";
import { db } from "../firebase/firebase-init";
import ContentNav from "../components/content-components/ContentNav";
import Tag from "../components/content-components/Tags";

type PageSnap = {
	content: string;
	tags: string[];
};

const Display = () => {
	const [snap, load, err] =
		useOutletContext<[FileStructure | null, boolean, Error | undefined]>();

	// Fetches the page and its details
	const { name } = useParams();

	const ref = doc(db, "pages", decodeURIComponent(name!));
	const [value, loading, error] = useDocumentData<PageSnap>(
		ref as DocumentReference<PageSnap>
	);

	// Fetches the styles for the markdown display
	const customStyles = store(state => state.looks);

	return (
		<div className="box-border w-full h-[calc(100%-84px)] lg:w-[80vw] flex justify-start items-center flex-col text-center">
			<ContentNav snap={snap} load={load} err={err} />
			<div
				className={`grow w-full py-10 lg:mr-6 overflow-y-scroll ${
					// eslint-disable-next-line no-nested-ternary
					customStyles.sideSpace === "sm"
						? "px-10"
						: // eslint-disable-next-line no-nested-ternary
						customStyles.sideSpace === "md"
						? "px-20"
						: customStyles.sideSpace === "lg"
						? "px-[7.5rem]"
						: ""
				} ${customStyles.darkMode ? "bg-[#0d1117]" : ""}`}
			>
				{error && (
					<code
						className={`text-center text-black ${
							customStyles.darkMode ? "text-white" : ""
						}`}
					>
						❗ | An unexpected error occured. Please try again.
					</code>
				)}
				{loading && (
					<code
						className={`text-center text-black ${
							customStyles.darkMode ? "text-white" : ""
						}`}
					>
						🔄 | Loading all content.
					</code>
				)}
				{!loading && !error && (
					<>
						<div className="flex justify-between items-center gap-2 mb-4">
							<div className="flex gap-2 whitespace-nowrap flex-wrap">
								{value?.tags.map(txt => (
									<Tag key={txt} info={txt} />
								))}
							</div>
							<div
								className={`flex ${
									customStyles.darkMode ? "text-white" : ""
								}`}
							>
								<button
									type="button"
									className="p-1"
									name="edit"
								>
									<Edit />
								</button>
								<button
									type="button"
									className="p-1"
									name="share"
								>
									<Share
										onClick={async () => {
											try {
												await navigator.share({
													title: "",
													text: "",
													url: window.location.href,
												});
											} catch (e) {
												// eslint-disable-next-line no-ex-assign
												e = "";
											}
										}}
									/>
								</button>
							</div>
						</div>
						<ReactMarkdown
							className={`markdown-body text-left ${
								customStyles.sans ? "sans" : ""
							} ${customStyles.darkMode ? "dark" : ""} ${
								customStyles.justify ? "text-justify" : ""
							}`}
							remarkPlugins={[remarkToc, remarkMath, remarkGfm]}
							rehypePlugins={[rehypeKatex, rehypeSlug]}
						>
							{value?.content!}
						</ReactMarkdown>
					</>
				)}
			</div>
		</div>
	);
};

export default Display;

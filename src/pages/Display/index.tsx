import React from "react";
import { useParams } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, DocumentReference } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import { Edit, Share } from "react-feather";
import { PageSnap } from "../../types";
import { db } from "../../firebase/firebase-init";
import ContentNav from "../../components/ContentNav";
import useStore from "../../store";
import Tag from "../../components/Tags";

// eslint-disable-next-line arrow-body-style
const Display = () => {
	const { name } = useParams();
	const reference = doc(db, "pages", decodeURIComponent(name!));
	const [value, load, err] = useDocumentData<PageSnap>(
		reference as DocumentReference<PageSnap>
	);

	const customStyles = useStore(state => state.customFormDtls);

	return (
		<div className="box-border w-full h-[calc(100%-84px)] lg:w-[80vw] flex justify-start items-center flex-col text-center">
			<ContentNav />
			<div
				className={`grow w-full py-10 lg:mr-4 overflow-y-scroll ${
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
				{err && (
					<code className="text-center text-black">
						❗ | An unexpected error occured. Please try again.
					</code>
				)}
				{load && (
					<code className="text-center text-black">
						🔄 | Loading all content.
					</code>
				)}
				{!load && !err && (
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

import React, { useEffect } from "react";
import { ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { Outlet } from "react-router-dom";
import HeroHead from "../components/head-components/HeroHead";
import Sidebar from "../components/sidebar-components/SideBar";
import { auth, fs } from "../firebase/firebase-init";
import store from "../store";

type FileStructure = {
	[Folder: string]: {
		[File: string]: string;
	};
};

const App = () => {
	// Fetch the file structure for the wiki
	const [snap, load, err] = useObjectVal<FileStructure>(ref(fs));

	// Fetches the file states which need to be set on load
	const [setNavDrops, setFileStore] = store(state => [
		state.setNavDrops,
		state.setFileStore,
	]);

	// Sets up the states for the file structure
	useEffect(() => {
		if (snap !== undefined) {
			const values = Object.values(snap) as unknown as {
				[file: string]: { tags: string };
			}[];
			const flattenedFiles = values.reduce((p, n) => ({ ...p, ...n }));
			setFileStore(
				Object.fromEntries(
					Object.keys(flattenedFiles).map(key => [
						key,
						flattenedFiles[key].tags?.split("`"),
					])
				)
			);
			setNavDrops(
				Object.fromEntries(Object.keys(snap).map(key => [key, false]))
			);
		}
	}, [snap]);

	const [user] = useAuthState(auth);
	const setter = store(state => state.setUser);

	useEffect(() => {
		setter(user === null ? undefined : user);
	}, [user]);

	return (
		<>
			<Sidebar />
			<HeroHead />
			<Outlet context={[snap, load, err]} />
		</>
	);
};

export default App;
export type { FileStructure };

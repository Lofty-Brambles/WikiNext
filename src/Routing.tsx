import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import App from "./pages/App";
import Landing from "./pages/Landing";
import Display from "./pages/Display";
import { fs } from "./firebase/firebase-init";
import { fsSnap } from "./types/fsSnap";
import Error404 from "./components/Error404";

const Routing = () => {
	const [fsSnapshot, loadStat] = useList(ref(fs));
	const object: fsSnap = fsSnapshot ? fsSnapshot[0].val() : {};
	const flattenedRoutes = Object.values(object).reduce((p, n) => ({
		...p,
		...n,
	}));

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Landing />} />
					{!loadStat &&
						fsSnapshot &&
						Object.keys(flattenedRoutes).map(e => (
							<Route
								path={flattenedRoutes[e].path}
								element={
									<Display
										name={e}
									/>
								}
							/>
						))}
					<Route path="*" element={<Display customErr />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Routing;

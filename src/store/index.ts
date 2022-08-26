import create from "zustand";
import Global from "./types";
import sideBar from "./create-stores/sidebar";
import sidebarDropdown from "./create-stores/sidebar-dropdown";
import navbar from "./create-stores/navbar";
import files from "./create-stores/files";

const store = create<Global>()(set => ({
	...sideBar(set),
	...sidebarDropdown(set),
	...navbar(set),
	...files(set),
}));

export default store;

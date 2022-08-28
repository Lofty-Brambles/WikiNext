import React from "react";
import { Search } from "react-feather";
import store from "../../store";

const SearchBar = () => {
	const fileStore = store(state => state.fileStore);

	return (
		<form className="flex justify-between items-center min-h-[48px] w-[100%] sm:w-[50vw] order-last sm:order-none justify-self-center font-serif bg-gray-50 rounded-lg border border-gray-300 outline-2 outline-black">
			<div className="flex items-center px-3 pointer-events-none">
				<Search />
			</div>
			<input
				type="search"
				id="default-search"
				className="block flex-grow py-4 pl-1 pr-3 w-full text-sm text-gray-900 bg-gray-50 out-none border-none appearance-none"
				placeholder="Search for content..."
				required
			/>
			<button
				type="submit"
				className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Search
			</button>
		</form>
	);
};

export default SearchBar;

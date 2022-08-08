/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{ts,tsx}", "./index.html"],
	theme: {
		extend: {
			fontFamily: {
				titan: ["'Titan One'", "Copperplate", "cursive"],
				serif: ["Merriweather", "Garamond", "Georgia", "serif"]
			},
		},
	},
	plugins: [
		// eslint-disable-next-line import/no-extraneous-dependencies, global-require
		require("@tailwindcss/forms")
	],
};

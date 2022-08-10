/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{ts,tsx}", "./index.html"],
	theme: {
		extend: {
			fontFamily: {
				titan: ["'Titan One'", "Copperplate", "cursive"],
				serif: ["Merriweather", "Garamond", "Georgia", "serif"],
			},
			animation: {
				open: "open 0.4s ease-in-out",
			},
			keyframes: {
				open: {
					from: {
						right: "-15vw",
						opacity: "0",
					},
					to: {
						right: "0",
						opacity: "1",
					},
				},
			},
		},
	},
	plugins: [
		// eslint-disable-next-line import/no-extraneous-dependencies, global-require
		require("@tailwindcss/forms"),
	],
};

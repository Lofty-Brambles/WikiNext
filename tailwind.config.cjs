/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{ts,tsx}", "./index.html"],
	theme: {
		screens: {
			smx: "450px",
			mdx: "850px",
			...defaultTheme.screens,
		},
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
	plugins: [],
};

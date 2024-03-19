import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
		screens: {
			phone: "375px",
			// => @media (min-width: 375px) { ... }

			desktop: "1280px",
			// => @media (min-width: 1280px) { ... }
		},
		colors: {
			black_main: "#222222",
			red: "#D81229",
			pink_light: "#FFF3F9",
			white: "#FFFFFF",
			grey_medium: "#D5D6DF",
			primary: "#FD84C7",
			grey_dark: "#898C93",
			backgroundOpacity: "#00000066",
			addition: "#F7F262",
		},
	},
	plugins: [],
};
export default config;

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"custom-gradient":
					"linear-gradient(to bottom right, #111827, #2d3748)",
			},
			animation: {
				"spin-reverse": "spin-reverse 1s linear infinite",
				"fade-in-up": "fadeInUp 0.5s ease-out",
			},
			keyframes: {
				"spin-reverse": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(-360deg)" },
				},
				fadeInUp: {
					"0%": {
						opacity: 0,
						transform: "translateY(20px)",
					},
					"100%": {
						opacity: 1,
						transform: "translateY(0)",
					},
				},
			},
		},
	},
	plugins: [],
};

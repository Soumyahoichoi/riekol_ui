// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// tailwind.config.js
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// ...
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {}
	},
	safelist: ['text-2xl', 'text-4xl', 'py-5', 'py-3', 'pt-3', 'pb-5', 'text-sm'],
	darkMode: 'class',
	plugins: [nextui()]
};

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
	safelist: [
		'text-2xl',
		'text-4xl',
		'py-5',
		'py-3',
		'pt-3',
		'pb-5',
		'text-sm',
		'border-1',
		'border-slate-300',
		'w-8/12',
		'grid',
		'mt-4',
		'text-rose-700',
		'text-gray-500',
		'text-green-700',
		'text-sm',
		'w-100',
		'rounded-md',
		'mt-20',
		'text-lg',
		'mt-12'
	],
	darkMode: 'class',
	plugins: [nextui()]
};

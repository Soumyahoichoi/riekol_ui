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

const classNames = [
    'min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16',
    'w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700',
    'mb-3',
    'font-bold text-sm mb-2 ml-1',
    'w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors',
    'mb-3',
    'font-bold text-sm mb-2 ml-1',
    'w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors',
    'mb-3 -mx-2 flex items-end',
    'px-2 w-1/2',
    'font-bold text-sm mb-2 ml-1',
    'form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer',
    'px-2 w-1/2',
    'form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer',
    'mb-10',
    'font-bold text-sm mb-2 ml-1',
    'w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors',
    'block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold',
    ,
    'mdi mdi-lock-outline mr-1'
]
    .map((item) => item.split(' '))
    .flat();

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
        'rounded-lg',
        'mt-20',
        'text-lg',
        'mt-12',
        'float-right',
        'text-gray-400',
        'text-lg',
        'font-bold',
        'text-3xl',
        'bg-gradient-to-tr',
        'from-pink-500',
        'to-yellow-500',
        'text-white',
        'shadow-lg',
        'ml-12',
        'w-[200px]',
        'space-y-5',
        'rounded-lg',
        'bg-default-200',
        'w-[250px]',
        'w-[400px]',
        'h-20',
        'h-5',
        'm-10',
        'justify-end',
        'justify-center',
        'mb-4',
        'mb-8',
        'mt-8',
        'text-red-700',
        'mt-6',
        ...classNames
    ],
    darkMode: 'class',
    plugins: [nextui()]
};

// const purgecss = require('@fullhuman/postcss-purgecss');

import purgeCSSPlugin from '@fullhuman/postcss-purgecss';

export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {}
        // purgecss: purgeCSSPlugin({
        //     content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js']
        // })
    }
};

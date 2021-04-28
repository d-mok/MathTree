const path = require('path');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'mathtree.js',
        path: path.resolve(__dirname, 'dist/type'),
        clean: true
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new WebpackConcatPlugin({
            bundles: [
                {
                    dest: './dist/type/mathtree.intellisense.txt',
                    src: [
                        './dist/type/declaration/Math/Code/**/*.d.ts',
                        './dist/type/declaration/Math/Algebra/**/*.d.ts',
                    ],
                    transforms: {
                        after: (code) => code.replace(new RegExp('import.*', 'g'), '')
                    },
                },
            ],
        }),
    ],

};
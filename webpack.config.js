const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    }, // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        library: "PersonManagementApp",
        libraryTarget: "umd",
        umdNamedDefine: true,
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader' // Use Babel for JavaScript and JSX files
                },
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // Use style-loader and css-loader for CSS files
            },
            {
                test: /\.svg$/,
                use: ['svg-inline-loader'] // Use svg-inline-loader for SVG files
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader', // Use file-loader for other file types like images
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html' // HTML template
        })
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    }
};

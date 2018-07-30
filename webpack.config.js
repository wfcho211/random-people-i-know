const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const PATHS = {
    bundle  : path.resolve(__dirname, 'bundle'),
    dist    : path.resolve(__dirname, 'dist')
}

module.exports = {
    mode: 'production',
    entry: path.join(PATHS.bundle, 'index.js'),
    output: {
        path        : path.resolve(__dirname, PATHS.dist),
        filename    : 'index.js'
    },
    stats: {
        colors: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'not_exist_path')
                ],
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.exec\.js$/,
                use: ['script-loader']
            }
        ]
    },
    devServer: {
        contentBase: 'dist'
    },
    node: {
        fs: "empty"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template    : path.join(__dirname, 'bundle', 'index.html'),
            filename    : 'index.html',
            inject      : 'body',
            meta        : {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
            minify      : true
        }),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};

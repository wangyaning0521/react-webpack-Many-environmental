const path                              = require("path");
const HtmlWebpackPlugin                 = require("html-webpack-plugin");
const merge                             = require("webpack-merge");
const common                            = require("./webpack.common");
const MiniCssExtractPlugin              = require("mini-css-extract-plugin");
const CleanWebpackPlugin                = require("clean-webpack-plugin");
const TerserWebpackPlugin               = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin    = require("optimize-css-assets-webpack-plugin");
const webpack                           = require("webpack");
const config                            = require('../config/build.js')

module.exports = merge(common, {
    mode: "production",
    devtool: config.build.productionSourceMap ? "source-map" : '',
    output: {
        filename: "javascript/[name].[contentHash].js",
        chunkFilename: "javascript/[name].[contentHash].chunk.js",
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader",
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1024 * 8,
                        name: "img/[name].[hash:8].[ext]",
                        outputPath: 'images/'
                    }
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: "single",
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin({
                sourceMap: true
            }),
            new HtmlWebpackPlugin({
                template: "./src/template.html",
                filename: config.build.index,
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeAttributeQuotes: true
                }
            })
        ],
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 80 * 1024,
            minChunks: 1,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: function (module, chunks, chacheGroupKey) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
                        return `vendor_${packageName.replace("@", "")}`;
                    }
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css",
            chunkFilename: "[id].[contentHash].css"
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
    ]
});
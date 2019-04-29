const path              = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge             = require("webpack-merge");
const common            = require("./webpack.common");
const webpack           = require("webpack");
const config            = require('../config/build.js')


module.exports = merge(common, {
    mode    : "development",
    devtool : "inline-source-map",
    output: {
        filename        : "main.js",
        chunkFilename   : "[name].chunk.js",
        path            : path.resolve(__dirname, "dist"),
        publicPath      : config.dev.assetsPublicPath
    },
    devServer: {
        historyApiFallback: true,
        port:config.dev.port,
        proxy: {
			'/api': {
				target: 'http://test.weifenghr.com',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader",'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
    ]
});
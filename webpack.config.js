const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const path = require("path");

module.exports = {
 entry: [
        "webpack-dev-server/client?http://localhost:9999",
        "webpack/hot/only-dev-server",
        "./src/index.jsx"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js"
    },
    module:{
        loaders: [{
            test:/\.jsx?$/,
            exclude: /node_modules/,
            loader: "react-hot-loader!babel-loader"
        }]
    },
    plugins:[
        new webpack.ProgressPlugin(),
        new UglifyJsWebpackPlugin({
            sourceMap: true
        }),
        new CompressionWebpackPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html|css)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    devServer: {
        contentBase: "./dist",
        hot: true
    },    
    plugins: {

    }    
};
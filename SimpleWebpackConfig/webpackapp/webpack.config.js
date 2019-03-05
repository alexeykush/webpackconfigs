const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const scripts = glob.sync("./src/**/*.js");
const styles = glob.sync("./src/**/*.scss");

module.exports = {
	entry: {
        'css/style': styles,
        'js/bundle': scripts
    },
	output:{
		filename:"[name].js",
		path: path.resolve(__dirname,"dist")
	},
	devServer: {
        quiet: true
    },
	optimization: {
	    minimizer: [
	    	new TerserPlugin(),
	      	new OptimizeCSSAssetsPlugin({})
	    ]
  	},
	module:{
		rules:[
			{
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "url-loader",
            },
			{
				test: /\.scss$/,
				use : [
					{loader: "style-loader"},
					{loader: MiniCssExtractPlugin.loader},
					{loader: "css-loader"},
					{loader: "sass-loader"}
				]
			}
		]
	},
	plugins: [
	    new HtmlWebpackPlugin({
	    	template: "src/index.html",
            filename: "./index.html"
	    }),
	    new MiniCssExtractPlugin({
	      filename: "[name].css"
	    }),
	    new CopyWebpackPlugin([{
	      from: path.resolve(__dirname,"src") + "/images/",
	      to : path.resolve(__dirname,"dist") + "/images/"
	    }]),
    	new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
	    new CleanWebpackPlugin("dist")
	],
	watch:true
};

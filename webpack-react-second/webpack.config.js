const file = "./ReactCourse/third/"

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const webpack = require('webpack');
const glob = require('glob');
const CopyWebpackPlugin = require("copy-webpack-plugin")


module.exports = {
	entry:{
		"bundle" : file + "src/index.js",
		"style" : file + "src/style.css"
	},
	output:{
		path: path.join(__dirname,file + "dist"),
		filename: "[name].js"
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:["babel-loader"]
			},
			{
				test:/\.css$/,
				use : [ExtractCssChunks.loader,"css-loader"]
			},
			{
				test:/\.less$/,
				use : ["style-loader","css-loader","less-loader"]
			}
		]
	},
	plugins:[
		new ExtractCssChunks(
	        {
	          filename: "[name].css",
	          chunkFilename: "[id].css"
	        }
	    ),
		new HtmlWebpackPlugin({
			template:file + "src/index.html"
		}),
		new CleanWebpackPlugin([file+ 'dist'])
	]
}



// another

// module.exports = {
// 	entry:{
// 		"styles/normalize" : file + "src/styles/normalize.css",
// 		"styles/styles" : glob.sync(file + "src/styles/!(normalize.css)"),
// 		"index" : file + "src/index.js"
// 	},
// 	output:{
// 		path: path.join(__dirname,file + "dist"),
// 		filename: "[name].js"
// 	},
// 	module:{
// 		rules:[
// 			{
// 				test:/\.js$/,
// 				use:["babel-loader"]
// 			},
// 			{
// 				test:/\.css$/,
// 				use : [ExtractCssChunks.loader,"css-loader"]
// 			}
// 		]
// 	},
// 	plugins:[
// 		new ExtractCssChunks(
// 	        {
// 	          filename: "[name].css",
// 	          chunkFilename: "[id].css"
// 	        }
// 	    ),
// 		new HtmlWebpackPlugin({
// 			template:file + "src/index.html"
// 		}),
// 		new CopyWebpackPlugin([{
//             from: file + 'src/components/',
//             to:   'components'
//         }]),
// 		new CleanWebpackPlugin([file+ 'dist'])
// 	]
// }

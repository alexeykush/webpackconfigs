const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const glob = require('glob');
const styles = glob.sync('./src/**/*.scss');
const script = glob.sync('./src/**/*.js');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NotifierPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

module.exports = {
    entry: {
        'css/style': styles,
        'js/index': script
    },
    devtool: "source-map",
    devServer: {
        quiet: true
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { map: { inline: false, annotation: true}}})
        ]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: "html-loader", options: { minimize: true } }]
            },
            {
                test: /\.(png|jpe?g|svg)$/,
                loader: "url-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader, options: {sourceMap: true}},
                    {loader: "css-loader", options: {sourceMap: true}},
                    {loader: "postcss-loader", options: {sourceMap: true}},
                    {loader: "sass-loader", options: {sourceMap: true}},
                    
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([{
            from: './src/img/',
            to: './img'
        }]),
        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
        new CleanWebpackPlugin(['dist']),
        new NotifierPlugin({
            onErrors: (severity, errors) => {
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                notifier.notify({
                    title: "Webpack error",
                    message: severity + ': ' + error.name,
                    subtitle: error.file || '',
                });
            }
        })
    ]
};


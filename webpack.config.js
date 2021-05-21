const path = require('path');
const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');
// HTMLを出力するため
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 古いファイルの削除
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// コピー
const CopyWebpackPlugin = require('copy-webpack-plugin');
// cssをjsにバンドルしない
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
	mode: process.env.NODE_ENV,
    entry: {
		index: './src/assets/scripts/index.js',
	},
    output: {
        path: distPath,
        filename: 'assets/js/index.js'
    },
    devServer: {
		hot: true,
        contentBase: srcPath,
        watchContentBase: true,
        port: 3000,
    },
	resolve: {
        extensions: ['.js'],
        alias : {
            '@styles': path.resolve(__dirname, 'src/assets/styles'),
            '@scripts': path.resolve(__dirname, 'src/assets/scripts')
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									useBuiltIns: 'usage',
									corejs: "3.9.1",
								},
							],
						]
					},
				},
                exclude: /node_modules/,
            },
            {
                test: /(\.s[ac]ss)$/,
                use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					'postcss-loader'
				],
            },
        ],
    },
    plugins: [
		new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
            verbose: false,
        }),
        new HtmlWebpackPlugin({
			inject: 'head',
            filename: 'index.html', //出力するためのHTML
			template: srcPath + '/index.html',
			scriptLoading: 'defer',
            minify: false,
        }),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src/assets/img',
					to: 'assets/img'
				}
			]
		}),
		new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css?[chunkhash]',
        }),
    ],
};

module.exports = config;

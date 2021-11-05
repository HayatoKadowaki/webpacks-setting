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
        index: `${srcPath}/assets/scripts/index.js`,
    },
    output: {
        path: distPath,
        filename: 'assets/js/index.js',
        assetModuleFilename: 'assets/img/[name][ext]',
    },
    devServer: {
        static: {
            directory: path.join(srcPath),
            staticOptions: {},
            serveIndex: true,
            watch: true,
        },
        hot: 'only',
        port: 3000,
    },
    experiments: {
        asset: true,
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@styles': `${srcPath}/assets/styles`,
            '@scripts': `${srcPath}/assets/scripts`,
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
                                    corejs: '3.9',
                                },
                            ],
                        ],
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
                    'postcss-loader',
                ],
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                type: 'asset/resource',
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
            template: `${srcPath}/index.html`,
            scriptLoading: 'defer',
            minify: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${srcPath}/assets/img`,
                    to: `${distPath}/assets/img`,
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css?[chunkhash]',
        }),
    ],
};

module.exports = config;

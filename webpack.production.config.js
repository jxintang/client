/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/14/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/09/2017
 */

var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const svgDirs = [
	require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
	// path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];

var config = {
	devtool: "eval",
	entry: [path.resolve(__dirname, 'app/main.js')],
	resolve: {
		extensions: [
			'.web.tsx',
			'.web.ts',
			'.web.jsx',
			'.web.js',
			'.ts',
			'.tsx',
			'.js',
			'.jsx',
			'.css',
			'.json'
		]
	},
	output: {
		path: path.resolve(__dirname, 'build/static'),
		publicPath: "static/",
		filename: 'bundle.js'
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: 'app/static',
				to: 'static'
			}
		]),
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		      	warnings: false,
		      	drop_console: false,
		    }
		}),
	],
	// plugins: [new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity })],
	module: {
		rules: [
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			}, {
				test: /\.jsx?$/,
				loader: ['babel-loader?{"presets": ["es2015", "react", "stage-0", "stage-3"], "plugins": [ "transform-decorators-legacy","transform-runtime", "syntax-async-functions", "transform-function-bind"]}'],
				// loader: 'babel-loader'
				exclude: /node_modules/
			}, {
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			}, {
				test: /\.css$/, // Only .css files
				loader: 'style-loader!css-loader' // Run both loaders
			}, {
				test: /\.(svg)$/i,
				loader: 'svg-sprite-loader',
				include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
			}
		],
		// noParse: [pathToReact]
	},
	devServer: {
		contentBase: "build/",
		hot: true,
		proxy:
		[
		  {
		    context: ['/issuer/**', '/bondf/**', '/bond/**', '/cbond/**', '/content/**'],
		    // target: 'http://zhai.barcapp.com:5000',
		    target: 'http://10.1.36.117:5000',
		    secure: false,
			changeOrigin: true
		  }
		],
		historyApiFallback: true
	}
};

module.exports = config;

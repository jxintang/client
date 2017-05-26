/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/21/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/10/2017
 */

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const svgDirs = [
	require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
	// path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];

var argv = require('yargs')
    .options('port', {default:8080, type:'number', describe:'port the server will listen'})
  .argv;

var proxy=(argv.env||{}).proxy || `http://localhost:${argv.port+1}`;

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
		],
		alias:{
			static:`${__dirname}/app/static`,
			component:`${__dirname}/app/component`,
			logics:`${__dirname}/app/logics`,
			'mobx-state':`${__dirname}/app/mobx`,
			'fixed-data-table.min.css':`${__dirname}/node_modules/fixed-data-table/dist/fixed-data-table.min.css`,
		}
	},
	output: {
		path: path.resolve(__dirname,'build/static'),
		publicPath: "static/",
		filename: 'bundle.js'
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				context: 'app/static',
                from: '**/*'
			}
		]),
		new webpack.DefinePlugin({
		     __DEV__: process.argv.indexOf('-p') === -1
		}),
		//new UglifyJSPlugin(),
	],
	// plugins: [new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity })],
	module: {
		rules: [
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			}, {
				test: /\.jsx?$/,
				loader: ['babel-loader?{"presets": ["es2015", "react", "stage-0", "stage-3"], "plugins": [ "transform-decorators-legacy", "transform-runtime", "syntax-async-functions", "transform-function-bind"]}'],
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
    host:'0.0.0.0',
		proxy:
		[
		  {
		    context: ['**','!**/*.html', '!**/*.css', '!**/*.js'],
		    target: proxy,
		    secure: false,
		  }
		],
		historyApiFallback: true
	}
};

module.exports = config;

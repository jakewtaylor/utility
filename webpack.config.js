const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	mode: 'development',
	watch: true,
	entry: ['./src/index.js', './styles/main.scss'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'lib'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'bundle.css',
			allChunks: true,
		}),
	],
};
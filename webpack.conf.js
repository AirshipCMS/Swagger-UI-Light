const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
    path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
    publicPath: '/api/docs'
	},
	devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader'
    },
    {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }],
    }]
	},
	devServer: {
		contentBase: './',
		port: 8080,
		noInfo: false,
		hot: true,
		inline: true,
		proxy: {
      '/api/swagger': {
				bypass: function (req, res, proxyOptions) {
          if(req.url === '/api/swagger'){
            return '/mock-data/multiple-tags.json';
          }
				}
      }
    }
  },
	plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
		new webpack.HotModuleReplacementPlugin()
  ]
};

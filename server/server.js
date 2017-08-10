const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const app = express();

//uncomment this when ready to hook up the database
//const db = require('../database/index.js');
const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/../public'));
app.use('/static', express.static(__dirname + '/../public'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

var port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

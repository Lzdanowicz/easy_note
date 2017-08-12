var express = require('express');
var path = require('path');
var config = require(path.resolve('webpack.config.js'));
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');


var app = express();

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static('./dist'));


app.use('/', (req, res) => {
	res.sendFile(path.resolve('client/index.html'));
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'));
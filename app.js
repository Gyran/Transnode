var express = require('express')
  , http = require('http')
  , path = require('path')
  , minify = require('express-minify')
  , transmissionRpc = require('../node-transmission-rpc/lib/transmission-rpc');


var app = express();

var auth = {username: 'user', password: 'pass'};
var transmission = new transmissionRpc('http://examplte.com', auth);

app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.logger("dev"));
app.use(express.compress());
app.use(minify());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/transmission/torrents', function (req, res) {
	transmission.torrentGet(null, null, null, function (error, result) {
		if (!error) {
			res.send(JSON.stringify(result));
		}
	});
});

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
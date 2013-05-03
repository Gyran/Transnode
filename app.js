var express = require('express')
  , http = require('http')
  , path = require('path')
  , minify = require('express-minify')
  , transmissionRpc = require('../node-transmission-rpc/lib/transmission-rpc');


var app = express();

var auth = '';
var transmission = new transmissionRpc('http://example.com', auth);

app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.logger("dev"));
app.use(express.compress());
app.use(minify());
app.use(express.static(path.join(__dirname, 'public')));

var torrentsRoute = function (req, res) {
    ids = null;

    console.log(req.params.id);

    if (req.params.id) {
        ids = parseInt(req.params.id, 10);
    }

    transmission.torrentGet(ids, null, null, function (error, result) {
        if (!error) {
            res.end(JSON.stringify(result));
        } else {
            console.log(error);
        }
    });
};

app.get('/transmission/torrents', torrentsRoute);
app.get('/transmission/torrents/:id', torrentsRoute);

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var express = require('express')
  , http = require('http')
  , path = require('path')
  , minify = require('express-minify')
  , transmissionRpc = require('../node-transmission-rpc/lib/transmission-rpc');


var app = express();

var transmission = new transmissionRpc('http://localhost:9091', null);

app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.compress());
app.use(minify());

app.get('/transmission/torrents', function (req, res) {
    transmission.torrentGet(null, null, null, function (error, result) {
        if (!error) {
            res.end(JSON.stringify(result));
        } else {
            console.log("torrentsRoute error:", error);
        }
    });
});

// TODO should be moved to a plugin
app.post('/transmission/torrents/start', function (req, res) {
    ids = req.body.ids.map(function (id) {
         return parseInt(id, 10);
    });

    transmission.torrentStart(ids, null, function (error, result) {
        if (!error) {
            res.end(JSON.stringify(result));
        } else {
            console.log("torrentsStart error:", error);
        }
    });
});

app.post('/transmission/torrents/stop', function (req, res) {
    ids = req.body.ids.map(function (id) {
         return parseInt(id, 10);
    });

    transmission.torrentStop(ids, null, function (error, result) {
        if (!error) {
            res.end(JSON.stringify(result));
        } else {
            console.log("torrentsStop error:", error);
        }
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var express = require('express')
  , http = require('http')
  , path = require('path')
  , minify = require('express-minify')
  , transmissionRpc = require('../node-transmission-rpc/lib/transmission-rpc');

transmission = new transmissionRpc('http://localhost:9091', null); // global transmission object

settings = {
    entrances: [],

    getEntrances: function () {
        return this.entrances;
    },

    addEntrances: function (entrances) {
        entrances.forEach(function (entrance) {
            settings.addEntrance(entrance);
        });
    },

    addEntrance: function (entrance) {
        this.entrances.push(entrance);
    }
};

var plugins = [
    'controlTorrent'
];

plugins.forEach(function (pluginName) {
    // load each plugin
    var plugin = require('./plugins/' + pluginName + '/backend');
    console.log('PLUGIN', 'loaded', plugin.name);
});

var getTorrentsEntrance = {
    verb:   'get',
    path:   '/transmission/torrents',
    cb:     function (req, res) {
        transmission.torrentGet(null, null, null, function (error, result) {
            if (!error) {
                res.end(JSON.stringify(result));
            } else {
                console.log("torrentsRoute error:", error);
            }
        });
    }
};
settings.addEntrance(getTorrentsEntrance);

var app = express();

app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.compress());
app.use(minify());

settings.getEntrances().forEach(function (entrance) {
    app[entrance.verb](entrance.path, entrance.cb);
    console.log('ENTRANCE', 'new path', entrance.path);
});

app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
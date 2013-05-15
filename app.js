var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , minify = require('express-minify')
  , transmissionRpc = require('../node-transmission-rpc/lib/transmission-rpc')
  , config = require('./config');

transmission = new transmissionRpc(config.transmission.host, config.transmission.auth); // global transmission object

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

// load backend plugins
config.plugins.forEach(function (pluginName) {
    var pluginPath = './plugins/' + pluginName + '/backend';
    if (fs.existsSync(pluginPath + '.js'))  {
        var plugin = require(pluginPath);
        console.log('PLUGIN', 'loaded', plugin.name);
    }
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

app.set('port', config.port);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
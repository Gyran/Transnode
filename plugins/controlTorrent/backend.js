/******** control torrent plugin *****/
var plugin = require('../../transnodePlugin');

var controlTorrentPlugin = new plugin('Control Torrent');

var startTorrentEntrance = new plugin.Entrance(
    'post',
    '/transmission/torrents/start',
    function (req, res) {
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
    }
);
controlTorrentPlugin.addEntrance(startTorrentEntrance);

var stopTorrentEntrance = new plugin.Entrance(
    'post',
    '/transmission/torrents/stop',
    function (req, res) {
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
    }
);
controlTorrentPlugin.addEntrance(stopTorrentEntrance);

/**********************/

module.exports = controlTorrentPlugin;

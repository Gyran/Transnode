/******** remove torrent plugin *****/
var plugin = require('../transnodeBackendPlugin');

var removeTorrentPlugin = new plugin('Remove Torrent');

var removeTorrentEntrance = new plugin.entrance(
    'post',
    '/transmission/torrents/removeTorrents',
    function (req, res) {
        ids = req.body.ids.map(function (id) {
            return parseInt(id, 10);
        });

        transmission.torrentRemove(ids, false, null, function (error, result) {
            if (!error) {
                res.end(JSON.stringify(result));
            } else {
                console.log("torrentRemove error:", error);
            }
        });
    }
);
removeTorrentPlugin.addEntrance(removeTorrentEntrance);

var removeDataEntrance = new plugin.entrance(
    'post',
    '/transmission/torrents/removeData',
    function (req, res) {
        ids = req.body.ids.map(function (id) {
             return parseInt(id, 10);
        });

        transmission.torrentRemove(ids, true, null, function (error, result) {
            if (!error) {
                res.end(JSON.stringify(result));
            } else {
                console.log("torrentsStop error:", error);
            }
        });
    }
);
removeTorrentPlugin.addEntrance(removeDataEntrance);

/**********************/

module.exports = removeTorrentPlugin;
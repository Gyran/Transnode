/******** add torrent plugin *****/
var plugin = require('../transnodeBackendPlugin');

var addTorrentPlugin = new plugin('Add Torrent');

var addTorrentEntrance = new plugin.entrance(
    'post',
    '/transmission/add',
    function (req, res) {
        var folder = req.body.folder;
        var url = req.body.url;
        var start = req.body.startWhenAdded;

        var extra = {
            'download-dir': folder,
            'paused': !start
        };

        transmission.torrentAddFile(url, extra, null, function (error, result) {
            if (!error) {
                res.end(JSON.stringify(result));
            } else {
                console.log('torrentAdd error', error);
                throw error;
            }
        });
    }
);
addTorrentPlugin.addEntrance(addTorrentEntrance);



/**********************/

module.exports = addTorrentPlugin;

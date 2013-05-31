var plugin = require('../transnodePlugin');

var backend = require('./backend.js');
var removeTorrentPlugin = new plugin('Remove Torrent', true, backend);

module.exports = removeTorrentPlugin;
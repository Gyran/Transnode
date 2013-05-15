var plugin = require('../transnodePlugin');

var backend = require('./backend.js');

var controlTorrentPlugin = new plugin('Control Torrent', true, backend);

module.exports = controlTorrentPlugin;

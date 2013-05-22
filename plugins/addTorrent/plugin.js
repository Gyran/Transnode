var plugin = require('../transnodePlugin');

var backend = require('./backend.js');

var addTorrentPlugin = new plugin('Add Torrent', true, backend);

module.exports = addTorrentPlugin;
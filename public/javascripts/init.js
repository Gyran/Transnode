settings.plugins.forEach(function(plugin, index, e) {
    if  (typeof plugin.preInit === 'function') {
        plugin.preInit();
    }
});

// initial settins
settings.addNeed('torrents');
settings.addNeed('transmissionSession');
settings.addNeed('selectedTorrents');
settings.addNeed('torrentColumns');
settings.addNeed('tabs');
settings.addNeed('toolbar');
settings.addNeed('leftColumn');

settings.addTorrentColumn({ name: 'Status',     dataField: 'statusString' });
settings.addTorrentColumn({ name: 'Name',       dataField: 'name' });
settings.addTorrentColumn({ name: 'Size',       dataField: 'sizeConverted' });
settings.addTorrentColumn({ name: 'Done',       dataField: 'percentDoneConverted' });
settings.addTorrentColumn({ name: 'DL',         dataField: 'downloadedConverted' });
settings.addTorrentColumn({ name: 'UL',         dataField: 'uploadedConverted' });
settings.addTorrentColumn({ name: 'Ratio',      dataField: 'ratioConverted' });
settings.addTorrentColumn({ name: 'Date added', dataField: 'addedDateConverted' });
settings.addTorrentColumn({ name: 'DL Rate',    dataField: 'rateDownloadConverted' });
settings.addTorrentColumn({ name: 'UL Rate',    dataField: 'rateUploadConverted' });
settings.addTorrentColumn({ name: 'ETA',        dataField: 'etaConverted' });

settings.addToUpdateQueue('controllers.torrents');
settings.addToUpdateQueue('controllers.transmissionSession');

var App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

settings.plugins.forEach(function(plugin, index, e) {
    if  (typeof plugin.postInit === 'function') {
        plugin.postInit();
    }
});

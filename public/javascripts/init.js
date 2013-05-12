var settings = {
    applicationNeeds: Ember.A(),
    plugins: Ember.A(),
    torrentColumns: Ember.A(),

    // fields where stuff can be displayed
    leftColumnViews: Ember.A(),
    tabs: Ember.A(),
    toolbarViews: Ember.A(),

    // Some settings
    defaultTab: {view: null, name: ''},

    addPlugin: function (plugin) {
        this.plugins.pushObject(plugin);
    },

    addNeed: function (controller) {
        this.applicationNeeds.pushObject(controller);
    },

    addTorrentColumn: function (column) {
        this.torrentColumns.pushObject(column);
    },

    addLeftColumnView: function (view) {
        this.leftColumnViews.pushObject(view);
    },

    addTab: function (tab) {
        this.tabs.pushObject(tab);
    },

    addToolbarView: function (view) {
        this.toolbarViews.pushObject(view);
    },

    getPlugins: function () {
        return this.plugins;
    },

    getNeedsArray: function () {
        return this.applicationNeeds.toArray();
    },

    getTorrentColumnsArray: function () {
        return this.torrentColumns.toArray();
    },

    getLeftColumnViewsArray: function () {
        return this.leftColumnViews.toArray();
    },

    getTabsArray: function () {
        return this.tabs.toArray();
    },

    getToolbarViewsArray: function () {
        return this.toolbarViews.toArray();
    },

    setDefaultTab: function (tab) {
        this.defaultTab = tab;
    },

    getDefaultTab: function () {
        return this.defaultTab;
    }
};

// initial settins
settings.addNeed('torrents');
settings.addNeed('selectedTorrents');
settings.addNeed('torrentColumns');
settings.addNeed('tabs');

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


var App = Ember.Application.create({
    LOG_TRANSITIONS: true
});
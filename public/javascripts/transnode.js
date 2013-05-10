function bytesToSize(bytes) {
    var sizes = [ 'n/a', 'bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    if (bytes === 0) {
        return "0 " + sizes[1];
    }
    var i = +Math.floor(Math.log(bytes) / Math.log(1024));
    return  (bytes / Math.pow(1024, i)).toFixed( i ? 1 : 0 ) + ' ' + sizes[ isNaN( bytes ) ? 0 : i+1 ];
}

DS.RESTSerializer.reopen({
   keyForAttributeName: function(type, name) {
        return name;
    }
});

App.Store = DS.Store.extend({
    revision: 12
});

App.Torrent = Ember.Object.extend({
    _STATUS_STOPPED:        0,
    _STATUS_CHECK_WAIT:     1,
    _STATUS_CHECK:          2,
    _STATUS_DOWNLOAD_WAIT:  3,
    _STATUS_DOWNLOAD:       4,
    _STATUS_SEED_WAIT:      5,
    _STATUS_SEED:           6,

    _ERROR_NONE:            0,
    _ERROR_TRACKER_WARNING: 1,
    _ERROR_TRACKER_ERROR:   2,
    _ERROR_LOCAL_ERROR:     3,

    name:           DS.attr('string'),
    status:         DS.attr('number'),
    rateDownload:   DS.attr('number'),
    rateUpload:     DS.attr('number'),
    addedDate:      DS.attr('number'),
    eta:            DS.attr('number'),
    percentDone:    DS.attr('number'),
    sizeWhenDone:   DS.attr('number'),
    downloadedEver: DS.attr('number'),
    uploadedEver:   DS.attr('number'),
    uploadRatio:    DS.attr('number'),
    error:          DS.attr('number'),
    leftUntilDone:  DS.attr('number'),

    statusString: function () {
        switch (this.get('status')) {
            case this._STATUS_STOPPED:
                return "Stopped";
            case this._STATUS_CHECK_WAIT:
                return "Waiting to verify local files";
            case this._STATUS_CHECK:
                return "Verifying local files";
            case this._STATUS_DOWNLOAD_WAIT:
                return "Queued for download";
            case this._STATUS_DOWNLOAD:
                return "Downloading";
            case this._STATUS_SEED_WAIT:
                return "Queued for seeding";
            case this._STATUS_SEED:
                return "Seeding";
            default:
                return "Unknown status";
        }
    }.property('status'),

    // Filter functions
    isStopped: function () {
        return this.get('status') === this._STATUS_STOPPED;
    }.property('status'),

    isDownloading: function () {
        return this.get('status') === this._STATUS_DOWNLOAD;
    }.property('status'),

    isSeeding: function () {
        return this.get('status') === this._STATUS_SEED;
    }.property('status'),

    isError: function () {
        return this.get('error') !== this._ERROR_NONE;
    }.property('status'),

    isActive: function () {
        return (this.get('rateDownload') + this.get('rateUpload')) > 0;
    }.property('rateUpload', 'rateDownload'),

    isInactive: function () {
        return !this.get('isActive');
    }.property(),

    isCompleted: function () {
        return (this.get('leftUntilDone') <= 0);
    }.property('leftUntilDone'),

    // Values to be displayed
    rateDownloadConverted: function () {
        var dlRate = this.get('rateDownload');
        if (dlRate > 0) {
            return bytesToSize(dlRate) + '/s';
        } else {
            return '';
        }
    }.property('rateDownload'),

    rateUploadConverted: function () {
        var ulRate = this.get('rateUpload');
        if (ulRate > 0) {
            return bytesToSize(ulRate) + '/s';
        } else {
            return '';
        }
    }.property('rateUpload'),

    sizeConverted: function () {
        return bytesToSize(this.get('sizeWhenDone'));
    }.property('sizeWhenDone'),

    downloadedConverted: function () {
        var downloaded = this.get('downloadedEver');
        if (downloaded > 0) {
            return bytesToSize(downloaded);
        } else {
            return '';
        }
    }.property('downloadedEver'),

    uploadedConverted: function () {
        var uploaded = this.get('uploadedEver');
        if (uploaded > 0) {
            return bytesToSize(uploaded);
        } else {
            return '';
        }
    }.property('uploadedEver'),

    addedDateConverted: function () {
        var then = moment.unix(this.get('addedDate'));
        var now = moment();

        if (now.diff(then, 'days') < 10) {
            return then.fromNow();
        } else {
            return then.format('YYYY-MM-DD HH:mm');
        }
    }.property('addedDate'),

    percentDoneConverted: function () {
        return (this.get('percentDone') * 100).toFixed(0) + ' %';
    }.property('percentDone'),

    etaConverted: function () {
        var eta = this.get('eta');
        if (eta > 0) {
            then = moment().add('seconds', eta);
            return then.fromNow();
        } else {
            return '';
        }
    }.property('eta'),

    ratioConverted: function () {
        var ratio = this.get('uploadRatio');

        if (ratio >= 0) {
            return ratio.toFixed(2);
        } else {
            return '';
        }
    }.property('uploadRatio')

});

App.TorrentColumnsController = Ember.ArrayController.extend({
    columns: settings.getTorrentColumnsArray()
});


DS.RESTAdapter.reopen({
    namespace: 'transmission'
});

App.TorrentsController = Ember.ArrayController.extend({
    _UPDATE_INTERVAL: 10000,

    _torrents: Ember.A(),
    _timer: null,

    filterBy: 'none',
    sortProperties: ['addedDate'],
    sortAscending: false,

    start: function () {
        var t = this;
        t.execute();

        /*this.timer = setInterval(function () {
            t.execute();
        }, t._UPDATE_INTERVAL);*/
    },

    stop: function () {
        clearTimeout(this.timer);
    },

    execute: function () {
        var that = this;

        $.getJSON('transmission/torrents', null, function (data) {
            var torrents = Ember.A();

            $.each(data.torrents, function (index, t) {
                var torrent = App.Torrent.create(t);
                torrents.pushObject(torrent);
            });

            that.set('_torrents', torrents);


        });
    },

    torrents: function () {
        var torrents = this.get('arrangedContent');
        return torrents;
    }.property('content'),

    content: function () {
        var filter = this.get('filterBy');
        var torrents = this.get('_torrents');

        if (filter === 'none') {
            return torrents;
        } else {
            return torrents.filterProperty(filter);
        }
    }.property('_torrents', 'filterBy')

});

App.TorrentView = Ember.View.extend({
    tagName: 'tr',
    defaultTemplate: Ember.TEMPLATES['torrent'],
    classNameBindings: ['selected'],

    click: function (e) {
        var selectedTorrentsController = this.get('controller.controllers.selectedTorrents');
        if (e.metaKey) {
            selectedTorrentsController.addSelected(this.get('content.id'));
        } else {
            selectedTorrentsController.setSelected(this.get('content.id'));
        }
    },

    selected: function () {
        var selectedTorrentsController = this.get('controller.controllers.selectedTorrents');
        return (selectedTorrentsController.get('content').indexOf(this.get('content.id')) !== -1);
    }.property('controller.controllers.selectedTorrents.@each').cacheable()
});

App.TorrentsView = Ember.View.extend({
    tagName: 'table',
    classNames: 'table table-condensed table-bordered table-hover',
    torrentView: App.TorrentView,
    defaultTemplate: Ember.TEMPLATES['torrents']
});

App.DetailsTabsController = Ember.ArrayController.extend({
    tabs: settings.getDetailsTabsArray(),
    renderView: null
});

App.DetailsTabsView = Ember.View.extend({
    defaultTemplate: Ember.TEMPLATES.detailsTabs
});

App.DetailsTabView = Ember.View.extend({
    tagName: 'li',
    defaultTemplate: Ember.TEMPLATES.detailsTab,
    classNameBindings: ['selected:active'],

    tab: null,

    selected: function () {
        var selectedTab = this.get('controller.controllers.detailsTabs.selectedTab');

        return (selectedTab === this.tab.name);
    }.property('controller.controllers.detailsTabs.selectedTab'),

    click: function (e) {
        var detailsTabsController = this.get('controller.controllers.detailsTabs');
        detailsTabsController.set('renderView', this.tab.view);
        detailsTabsController.set('selectedTab', this.tab.name);
    }
});

App.SelectedTorrentsController = Ember.ArrayController.extend({
    content: Ember.A(),
    selectedTorrent: null,

    addSelected: function (id) {
        this.get('content').pushObject(id);
    },

    setSelected: function (id) {
        var selected = Ember.A();
        selected.pushObject(id);
        this.set('content', selected);
    },

    firstSelected: function () {
        return this.get('content.firstObject');
    }.property('content.firstObject')
});

App.ApplicationController = Ember.Controller.extend({
    needs: settings.getNeedsArray(),

    leftColumnViews: settings.getLeftColumnViewsArray()
});

App.ApplicationRoute = Ember.Route.extend({
    activate: function () {
        this.controllerFor('torrents').start();
    }
});

Ember.Handlebars.registerBoundHelper('torrentField', function (field, torrent, options) {
    return options.contexts.objectAt(1).get(field);
});


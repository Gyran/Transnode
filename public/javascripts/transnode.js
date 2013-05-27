function bytesToSize(bytes) {
    var sizes = [ 'n/a', 'bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    if (bytes === 0) {
        return "0 " + sizes[1];
    }
    var i = +Math.floor(Math.log(bytes) / Math.log(1024));
    return  (bytes / Math.pow(1024, i)).toFixed( i ? 1 : 0 ) + ' ' + sizes[ isNaN( bytes ) ? 0 : i+1 ];
}

/*************/

settings.plugins.forEach(function(plugin, index, e) {
    if  (typeof plugin.preModels === 'function') {
        plugin.preModels();
    }
});

/** models **/

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

    name:           '',
    status:         0,
    rateDownload:   0,
    rateUpload:     0,
    addedDate:      0,
    eta:            0,
    percentDone:    0,
    sizeWhenDone:   0,
    downloadedEver: 0,
    uploadedEver:   0,
    uploadRatio:    0,
    error:          0,
    leftUntilDone:  0,

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

    isSeeding: function () {
        return this.get('status') === this._STATUS_SEED;
    }.property('status'),

    isError: function () {
        return this.get('error') !== this._ERROR_NONE;
    }.property('error'),

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

App.TransmissionSession = Ember.Object.extend({

});

/** /models **/

settings.plugins.forEach(function(plugin, index, e) {
    if  (typeof plugin.postModels === 'function') {
        plugin.postModels();
    }
});

settings.plugins.forEach(function(plugin, index, e) {
    if  (typeof plugin.preViews === 'function') {
        plugin.preViews();
    }
});

/** views **/

App.TorrentView = Ember.View.extend({
    tagName: 'tr',
    defaultTemplate: Ember.TEMPLATES['torrent'],
    classNameBindings: ['selected'],

    click: function (e) {
        var selectedTorrentsController = this.get('controller.controllers.selectedTorrents');
        var torrent = this.get('content');

        var numSelected = selectedTorrentsController.get('numSelected');

        if (this.get('selected')) {
            if (numSelected === 1) {
                selectedTorrentsController.popSelected(torrent);
            } else { // numSelected > 1
                if (e.metaKey) {
                    selectedTorrentsController.popSelected(torrent);
                } else {
                    selectedTorrentsController.setSelected(torrent);
                }
            }
        } else if (e.metaKey) {
            selectedTorrentsController.addSelected(torrent);
        } else {
            selectedTorrentsController.setSelected(torrent);
        }
    },

    selected: function () {
        var selectedTorrentsController = this.get('controller.controllers.selectedTorrents');
        return selectedTorrentsController.get('content').contains(this.get('content.id'));
        }.property('controller.controllers.selectedTorrents.@each')
});

App.TorrentsView = Ember.View.extend({
    tagName: 'table',
    classNames: 'table table-condensed table-bordered table-hover',
    torrentView: App.TorrentView,
    defaultTemplate: Ember.TEMPLATES['torrents']
});

App.TabsView = Ember.View.extend({
    defaultTemplate: Ember.TEMPLATES.tabs
});

App.ToolbarView = Ember.View.extend({
    defaultTemplate: Ember.TEMPLATES.toolbar
});

App.TabView = Ember.View.extend({
    tagName: 'li',
    defaultTemplate: Ember.TEMPLATES.tab,
    classNameBindings: ['selected:active'],

    tab: null,

    selected: function () {
        var selectedTab = this.get('controller.controllers.tabs.selectedTab');

        return (selectedTab === this.tab.name);
    }.property('controller.controllers.tabs.selectedTab'),

    click: function (e) {
        var tabsController = this.get('controller.controllers.tabs');
        tabsController.setActiveTab(this.tab);
    }
});

App.ToolbarButtonView = Ember.View.extend({
    defaultTemplate: Ember.TEMPLATES.toolbarButton,
    tagName: 'a',
    classNames: 'btn btn-primary',

    icon: 'icon-question icon-large',
    text: ''
});

App.SelectFolder = Ember.View.extend({
    defaultTemplate: Ember.TEMPLATES.selectFolder,
    classNames: 'selectFolder',

    folder: '/',
    folders: Ember.A(),

    isBrowsing: false,

    browse: function (e) {
        if (this.isBrowsing) {
            this.set('isBrowsing', false);
        } else {
            this.set('isBrowsing', true);
            this.getFolders();
        }
    },

    getFolders: function () {
        if (this.isBrowsing) {
            var that = this;
            var path = this.get('folder');
            $.getJSON('getFolders', {path: path}, function (data) {
                that.set('folders', data);
            });
        }
    }.observes('folder'),

    setFolder: function (name) {
        var path = this.get('folder').replace(/\/$/, '');

        switch (name) {
            case '.':
                this.set('isBrowsing', false);
                return;
            case '..':
                path = path.replace(/(.+?)\/[^\/]+?$/, "$1");
                break;
            default:
                path = path + '/' + name;
                break;
        }

        this.set('folder', path);
    }
});

/** /views **/

settings.plugins.forEach(function(plugin, index, e) {
    if  (typeof plugin.postViews === 'function') {
        plugin.postViews();
    }
});

settings.plugins.forEach(function(plugin, index, e) {
    if  (typeof plugin.preControllers === 'function') {
        plugin.preControllers();
    }
});


/** controllers **/

App.TorrentColumnsController = Ember.ArrayController.extend({
    columns: settings.getTorrentColumnsArray()
});

App.TorrentsController = Ember.ArrayController.extend({
    _torrents: Ember.A(),

    filterBy: 'none',
    sortProperties: ['addedDate'],
    sortAscending: false,

    update: function () {
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

App.TabsController = Ember.ArrayController.extend({
    tabs: settings.getTabsArray(),
    renderView: settings.getDefaultTab().view,
    selectedTab: settings.getDefaultTab().name,

    setActiveTab: function (tab) {
        this.set('renderView', tab.view);
        this.set('selectedTab', tab.name);
    }
});

App.ToolbarController = Ember.ArrayController.extend({
    buttons: settings.getToolbarButtonsArray()
});

App.LeftColumnController = Ember.ArrayController.extend({
    views: settings.getLeftColumnViewsArray()
});

App.SelectedTorrentsController = Ember.ArrayController.extend({
    content: Ember.A(),
    needs: ['torrents'],
    selectedTorrent: null,

    addSelected: function (torrent) {
        this.get('content').pushObject(torrent.get('id'));
    },

    setSelected: function (torrent) {
        var selected = Ember.A();
        selected.pushObject(torrent.get('id'));
        this.set('selectedTorrent', torrent);
        this.set('content', selected);
    },

    popSelected: function (torrent) {
        var selected = this.get('content');
        selected.removeObject(torrent.get('id'));
        this.set('content', selected);
        this.update();
    },

    numSelected: function () {
        return this.get('content.length');
    }.property('content.length'),

    update: function () {
        var torrents = this.get('controllers.torrents._torrents');
        var torrent = torrents.findProperty('id', this.get('content.firstObject'));

        this.set('selectedTorrent', torrent);
    }.observes('controllers.torrents._torrents')

});

App.ApplicationController = Ember.Controller.extend({
    updateQueue: settings.getUpdateQueueArray(),
    needs: settings.getNeedsArray(),
    updateInterval: settings.getUpdateInterval(),

    timer: null,

    start: function () {
        var t = this;

        this.timer = setInterval(function () {
            t.update();
        }, t.get('updateInterval'));

        t.update();
    },

    stop: function () {
        clearTimeout(this.timer);
    },

    update: function () {
        var t = this;
        this.get('updateQueue').forEach(function(controller, index, e) {
            t.get(controller).update();
        });
    }
});

App.TransmissionSessionController = Ember.ObjectController.extend({
     session: null,

     update: function () {
        var that = this;

        $.getJSON('transmission/session', null, function (data) {
            var session = App.TransmissionSession.create(data);

            that.set('session', session);
        });
    }
});

/** /controllers **/

settings.plugins.forEach(function(plugin, index, e) {
    if  (typeof plugin.postControllers === 'function') {
        plugin.postControllers();
    }
});

/** routes **/

App.ApplicationRoute = Ember.Route.extend({
    setupController: function (controller) {
        controller.start();
    }
});

/** /routes **/

/** helpers **/

Ember.Handlebars.registerBoundHelper('torrentField', function (field, torrent, options) {
    return torrent.get(field);
});

/** /helpers **/
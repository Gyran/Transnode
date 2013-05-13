/** filter methods
* preInit
* postInit
* preModels
* postModels
* preViews
* postViews
* preControllers
* postControllers
**********/
/*** Filterplugin ***/

var filtersPlugin = {
    name: 'filters',

    preControllers: function () {
        App.Filter = Ember.Object.extend({
            name:       'filter',
            filter:     'none'
        });
        var filters = Ember.A();
        filters.pushObject(App.Filter.create({
            name:       'All',
            filter:     'none'
        }));
        filters.pushObject(App.Filter.create({
            name:       'Downloading',
            filter:     'isDownloading'
        }));
        filters.pushObject(App.Filter.create({
            name:       'Seeding',
            filter:     'isSeeding'
        }));
        filters.pushObject(App.Filter.create({
            name:       'Completed',
            filter:     'isCompleted'
        }));
        filters.pushObject(App.Filter.create({
            name:       'Active',
            filter:     'isActive'
        }));
        filters.pushObject(App.Filter.create({
            name:       'Inactive',
            filter:     'isInactive'
        }));
        filters.pushObject(App.Filter.create({
            name:       'Stopped',
            filter:     'isStopped'
        }));
        filters.pushObject(App.Filter.create({
            name:       'Error',
            filter:     'isError'
        }));

        App.FilterView = Ember.View.extend({
            classNameBindings: ['selected:active'],
            tagName: 'li',
            defaultTemplate: Ember.TEMPLATES.filter,

            click: function (e) {
                var torrentsController = this.get('controller.controllers.torrents');
                torrentsController.set('filterBy', this.content.get('filter'));
            },

            selected: function () {
                var filter = this.get('controller.controllers.torrents.filterBy');

                return (filter === this.content.get('filter'));
            }.property('controller.controllers.torrents.filterBy').cacheable(),

            numTorrents: function () {
                var torrents = this.get('controller.controllers.torrents').get('_torrents');
                var filter = this.content.get('filter');
                if (filter === 'none') {
                    return torrents.get('length');
                } else {
                    return torrents.filterProperty(filter).get('length');
                }
            }.property('controller.controllers.torrents._torrents').cacheable()
        });

        App.FiltersView = Ember.View.extend({
            defaultTemplate: Ember.TEMPLATES.filters,
            filters: filters,
            filterView: App.FilterView
        });

        settings.addLeftColumnView(App.FiltersView);
    }
};
settings.addPlugin(filtersPlugin);
/**********************/

/****** torrentdetails plugin ***/
var torrentDetailsPlugin = {
    name: 'Torrent Details',
    tab: null,
    preControllers: function () {
        App.TorrentDetailsView = Ember.View.extend({
            defaultTemplate: Ember.TEMPLATES.torrentDetails,

            torrent: function () {
                var selectedTorrent = this.get('controller.controllers.selectedTorrents.selectedTorrent');
                return selectedTorrent;
            }.property('controller.controllers.selectedTorrents.selectedTorrent'),

            progressBarStyle: function () {
                var percentDone = (this.get('torrent.percentDone') * 100).toFixed(0);
                return 'width: ' + percentDone + '%;';
            }.property('torrent.percentDone')
        });

        this.tab = {
            name: 'Details',
            view: App.TorrentDetailsView
        },

        settings.setDefaultTab(this.tab);
        settings.addTab(this.tab);
    }
};
settings.addPlugin(torrentDetailsPlugin);
/**********************/

/******** control torrent plugin *****/
var controlTorrentPlugin = {
    name: 'Control torrent',

    startTorrents: function (ids, cb) {
        var successFun = function (data) {
            cb();
        };

        var failFun = function () {
            cb(true);
        };

        if (ids.get('length') <= 0) {
            cb(true);
        }

        $.post('transmission/torrents/start',
            { 'ids': ids.toArray() },
            successFun).fail(failFun);
    },

    stopTorrents: function (ids, cb) {
        var successFun = function (data) {
            cb();
        };

        var failFun = function () {
            cb(true);
        };

        if (ids.get('length') <= 0) {
            cb(true);
        }

        $.post('transmission/torrents/stop',
            { 'ids': ids.toArray() },
            successFun).fail(failFun);
    },

    postViews: function () {
        var that = this;

        App.ToolbarStarTorrentButtonView = App.ToolbarButtonView.create({
            icon: 'icon-play icon-large',
            text: 'Start',

            click: function (e) {
                var selectedTorrents = this.get('controller.controllers.selectedTorrents.content');

                if (selectedTorrents.get('length') <= 0) {
                    alert('Du måste välja en torrent först');
                } else {
                    that.startTorrents(selectedTorrents, function (err) {
                        if (!err) {
                            console.log('done!');
                        } else {
                            console.log('error!');
                        }
                    });
                }
            }

        });

        App.ToolbarStopTorrentButtonView = App.ToolbarButtonView.create({
            icon: 'icon-stop icon-large',
            text: 'Stop',

            click: function (e) {
                var selectedTorrents = this.get('controller.controllers.selectedTorrents.content');

                if (selectedTorrents.get('length') <= 0) {
                    alert('Du måste välja en torrent först');
                } else {
                    that.stopTorrents(selectedTorrents, function (err) {
                        if (!err) {
                            console.log('done!');
                        } else {
                            console.log('error!');
                        }
                    });
                }
            }

        });


        settings.addToolbarButton(App.ToolbarStarTorrentButtonView);
        settings.addToolbarButton(App.ToolbarStopTorrentButtonView);
    }
};
settings.addPlugin(controlTorrentPlugin);
/**********************/


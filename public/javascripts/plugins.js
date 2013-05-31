function transnodeFrontendPlugin (name) {
    this.name = name;

    this.addPlugin(this);
}

// hooks
transnodeFrontendPlugin.prototype.preInit = function() {};
transnodeFrontendPlugin.prototype.postInit = function() {};
transnodeFrontendPlugin.prototype.preModels = function() {};
transnodeFrontendPlugin.prototype.postModels = function() {};
transnodeFrontendPlugin.prototype.preViews = function() {};
transnodeFrontendPlugin.prototype.postViews = function() {};
transnodeFrontendPlugin.prototype.preControllers = function() {};
transnodeFrontendPlugin.prototype.postControllers = function() {};

// methods
transnodeFrontendPlugin.prototype.addPlugin = function(plugin) {
    settings.addPlugin(plugin);
};

transnodeFrontendPlugin.prototype.addNeed = function(need) {
    settings.addNeed(need);
};

transnodeFrontendPlugin.prototype.addTorrentColumn = function(column) {
    settings.addTorrentColumn(column);
};

transnodeFrontendPlugin.prototype.addLeftColumnView = function(view) {
    settings.addLeftColumnView(view);
};

transnodeFrontendPlugin.prototype.addTab = function(tab) {
    settings.addTab(tab);
};

transnodeFrontendPlugin.prototype.addToolbarButton = function(button) {
    settings.addToolbarButton(button);
};

transnodeFrontendPlugin.prototype.setDefaultTab = function(tab) {
    settings.setDefaultTab(tab);
};/******** control torrent plugin *****/
var controlTorrentPlugin = new transnodeFrontendPlugin('Control Torrent');
controlTorrentPlugin.startTorrents = function (ids, cb) {
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
};

controlTorrentPlugin.stopTorrents = function (ids, cb) {
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
};

controlTorrentPlugin.postViews = function () {
    var that = this;

    App.ToolbarStarTorrentButtonView = App.ToolbarButtonView.create({
        icon: 'icon-play icon-large',
        text: 'Start',

        click: function (e) {
            var controller = this.get('controller');
            var selectedTorrents = this.get('controller.controllers.selectedTorrents.content');

            if (selectedTorrents.get('length') <= 0) {
                alert('Du måste välja en torrent först');
            } else {
                that.startTorrents(selectedTorrents, function (err) {
                    if (!err) {
                        console.log('done!');
                        controller.update();
                    } else {
                        console.log('error!');
                    }
                });

                this.get('controller').update();
            }
        }

    });

    App.ToolbarStopTorrentButtonView = App.ToolbarButtonView.create({
        icon: 'icon-stop icon-large',
        text: 'Stop',

        click: function (e) {
            var controller = this.get('controller');
            var selectedTorrents = this.get('controller.controllers.selectedTorrents.content');

            if (selectedTorrents.get('length') <= 0) {
                alert('Du måste välja en torrent först');
            } else {
                that.stopTorrents(selectedTorrents, function (err) {
                    if (!err) {
                        console.log('done!');
                        setTimeout(function () { // it takes some time before the torrent is stopped
                            controller.update();
                        }, 500);
                    } else {
                        console.log('error!');
                    }
                });
            }
        }

    });


    this.addToolbarButton(App.ToolbarStarTorrentButtonView);
    this.addToolbarButton(App.ToolbarStopTorrentButtonView);
};
/**********************//****** torrentdetails plugin ***/
var torrentDetailsPlugin = new transnodeFrontendPlugin('Torrent Details');
torrentDetailsPlugin.tab = null;

torrentDetailsPlugin.preControllers = function () {
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

        this.setDefaultTab(this.tab);
        this.addTab(this.tab);
};
/**********************/
/*** Filterplugin ***/

var filtersPlugin = new transnodeFrontendPlugin('Filters');
filtersPlugin.preControllers = function () {
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
            this.get('controller').update();
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
};
/**********************//******** add torrent plugin *****/
var addTorrentPlugin = new transnodeFrontendPlugin('Add Torrent');

addTorrentPlugin.postViews = function () {
    var that = this;

    App.ToolbarAddTorrentButtonView = App.ToolbarButtonView.create({
        icon: 'icon-plus-sign icon-large',
        text: 'Add',
        elementId: 'addTorrentButton',

        click: function (e) {
            that.popover.toggle();
        }
    });

    this.addToolbarButton(App.ToolbarAddTorrentButtonView);
};

addTorrentPlugin.postControllers = function () {
    App.AddTorrentView = Ember.View.extend({
         defaultTemplate: Ember.TEMPLATES.AddTorrent,
         elementId: 'addTorrent',
         classNames: 'popover bottom',

         folder: '',
         url: '',
         startWhenAdded: true,

         showing: false,

         toggle: function () {
            if (this.showing) {
                this.$().fadeOut();
                this.set('showing', false);
            } else {
                this.$().fadeIn();
                this.set('showing', true);
            }
         },

         addTorrent: function () {
            var that = this;

            var data = {
                'folder':       this.get('folder'),
                'url':          this.get('url'),
                startWhenAdded: this.get('startWhenAdded')
            };

            var successFun = function(data) {
                //console.log('en torrent blev tillagd', data);
                that.set('url', '');
                that.toggle();
            };

            var failFun = function () {
                console.log('add torrent fail');
            };

            $.post('transmission/add',
                data,
                successFun).fail(failFun);
         },
    });

    this.popover = App.AddTorrentView.create({
        folder: settings.getDownloadDir()
    });
    this.popover.append();

    Ember.run.scheduleOnce('afterRender', this, function () {
        var button = $('#addTorrentButton');
        var buttonPos = button.offset();
        var popover = this.popover.$();

        popover.css('left', buttonPos.left - popover.outerWidth() / 2 + button.outerWidth() / 2);
        popover.css('top', buttonPos.top + button.outerHeight());
    });
};

/**********************//******** remove torrent plugin *****/
var removeTorrentPlugin = new transnodeFrontendPlugin('Remove Torrent');

removeTorrentPlugin.removeTorrents = function (ids, cb) {
    var successFun = function (data) {
        cb();
    };

    var failFun = function () {
        cb(true);
    };

    if (ids.get('length') <= 0) {
        cb(true);
    }

    $.post('transmission/torrents/removeTorrents',
        { 'ids': ids.toArray() },
        successFun).fail(failFun);
};

removeTorrentPlugin.removeData = function (ids, cb) {
    var successFun = function (data) {
        cb();
    };

    var failFun = function () {
        cb(true);
    };

    if (ids.get('length') <= 0) {
        cb(true);
    }

    $.post('transmission/torrents/RemoveData',
        { 'ids': ids.toArray() },
        successFun).fail(failFun);
};

removeTorrentPlugin.postViews = function () {
    var that = this;

    App.ToolbarRemoveTorrentButtonView = App.ToolbarButtonView.create({
        icon: 'icon-remove icon-large',
        text: 'Remove Torrent',

        click: function (e) {
            var controller = this.get('controller');
            var selectedTorrents = this.get('controller.controllers.selectedTorrents.content');

            if (selectedTorrents.get('length') <= 0) {
                alert('You have to pick a torrent first');
            } else {
                that.removeTorrents(selectedTorrents, function (err) {
                    if (!err) {
                        console.log('done!');
                        setTimeout(function () { // it takes some time before the torrent is deleted
                            controller.update();
                        }, 500);
                    } else {
                        console.log('error!');
                    }
                });

                this.get('controller').update();
            }
        }

    });

    App.ToolbarRemoveDataButtonView = App.ToolbarButtonView.create({
        icon: 'icon-remove icon-large',
        text: 'Remove Torrent and Data',

        click: function (e) {
            var controller = this.get('controller');
            var selectedTorrents = this.get('controller.controllers.selectedTorrents.content');

            if (selectedTorrents.get('length') <= 0) {
                alert('You have to pick a torrent first');
            } else {
                that.removeData(selectedTorrents, function (err) {

                    if (!err) {
                        console.log('done!');
                        setTimeout(function () { // it takes some time before the torrent is deleted
                            controller.update();
                        }, 500);
                    } else {
                        console.log('error!');
                    }
                });
            }
        }

    });


    this.addToolbarButton(App.ToolbarRemoveTorrentButtonView);
    this.addToolbarButton(App.ToolbarRemoveDataButtonView);
};
/**********************/
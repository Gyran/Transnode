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
/**********************/
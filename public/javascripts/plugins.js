
var settings = {
    applicationNeeds: Ember.A(),
    plugins: Ember.A(),

    leftColumnViews: Ember.A(),
    detailsViews: Ember.A(),
    toolbarViews: Ember.A(),

    addPlugin: function (plugin) {
        this.plugins.pushObject(plugin);
    },

    addNeed: function (controller) {
        this.applicationNeeds.pushObject(controller);
    },

    getPlugins: function () {
        return this.plugins;
    },

    getNeedsArray: function () {
        console.log('return needs', this.applicationNeeds.toArray());
        return this.applicationNeeds.toArray();
    }
};

/* init */
settings.addNeed('torrents');
settings.addNeed('selectedTorrents');

/*** plugins hopefully ***/
var filtersPlugin = {
    name: 'filters',

    init: function () {
        console.log('init filers!');
    }
};
settings.plugins.pushObject(filtersPlugin);

settings.plugins.forEach(function(plugin, index, e) {
    console.log('init', plugin.name);
    plugin.init();
});

var App = Ember.Application.create({
    LOG_TRANSITIONS: true
});
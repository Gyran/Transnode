/*** plugins hopefully ***/
var filtersPlugin = {
    name: 'filters',

    init: function () {
        App.filtersView = Ember.View.extend({

        });
    }
};
settings.plugins.pushObject(filtersPlugin);

settings.plugins.forEach(function(plugin, index, e) {
    console.log('init', plugin.name);
    plugin.init();
});


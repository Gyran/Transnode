var settings = {
    applicationNeeds: Ember.A(),
    plugins: Ember.A(),
    torrentColumns: Ember.A(),

    // fields where stuff can be displayed
    leftColumnViews: Ember.A(),
    tabs: Ember.A(),
    toolbarButtons: Ember.A(),

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

    addToolbarButton: function (button) {
        this.toolbarButtons.pushObject(button);
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

    getToolbarButtonsArray: function () {
        return this.toolbarButtons.toArray();
    },

    setDefaultTab: function (tab) {
        this.defaultTab = tab;
    },

    getDefaultTab: function () {
        return this.defaultTab;
    }
};

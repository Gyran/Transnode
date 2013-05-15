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
};
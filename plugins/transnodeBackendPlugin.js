function transnodeBackendPlugin (name) {
    this.name = name;
}

transnodeBackendPlugin.prototype.addEntrance = function (entrance) {
    settings.addEntrance(entrance);
};

transnodeBackendPlugin.entrance = require('../entrance.js');

module.exports = transnodeBackendPlugin;
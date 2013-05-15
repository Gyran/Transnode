function transnodeBackendPlugin (name) {
    this.name = name;
}

transnodeBackendPlugin.prototype.addEntrance = function (entrance) {
    settings.addEntrance(entrance);
};

transnodeBackendPlugin.Entrance = function (verb, path, callback) {
    this.verb = verb;
    this.path = path;
    this.cb = callback;
};

module.exports = transnodeBackendPlugin;
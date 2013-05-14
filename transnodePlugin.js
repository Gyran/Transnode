function transnodePlugin (name) {
    this.name = name;
}

transnodePlugin.prototype.addEntrance = function (entrance) {
    settings.addEntrance(entrance);
};

transnodePlugin.Entrance = function (verb, path, callback) {
    this.verb = verb;
    this.path = path;
    this.cb = callback;
};

module.exports = transnodePlugin;
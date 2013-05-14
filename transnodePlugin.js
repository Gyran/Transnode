function transnodePlugin (name) {
    this.name = name;
}

transnodePlugin.prototype.addEntrance = function (entrance) {
    if (!entrance.verb) {
        throw new Error('Entrance needs a verb');
    }
    if (!entrance.cb) {
        throw new Error('Entrance needs a callback function');
    }
    if (!entrance.path) {
        throw new Error('Entrance needs a path');
    }

    settings.addEntrance(entrance);
};

module.exports = transnodePlugin;
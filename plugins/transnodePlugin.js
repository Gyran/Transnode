function transnodePlugin (name, hasFrontend, backend) {
    this.name = name;

    this.hasFrontend = hasFrontend;
    this.backend = backend;
}

module.exports = transnodePlugin;
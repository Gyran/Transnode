config = {
    transmission: {
        host: 'http://localhost:9091',
        auth: null
    },

    plugins: [
        'controlTorrent',
        'filters',
        'torrentDetails'
    ],

    port: 3000
};

module.exports = config;
config = {
    transmission: {
        host: 'http://localhost:9091',
        auth: null
    },
    
    plugins: [
        'controlTorrent',
        'torrentDetails',
        'filters',
        'addTorrent',
        'removeTorrent'
    ],

    port: 3000
};

module.exports = config;
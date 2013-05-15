/******** control torrent plugin *****/
var controlTorrentPlugin = new transnodeFrontendPlugin('Control Torrent');
controlTorrentPlugin.startTorrents = function (ids, cb) {
    var successFun = function (data) {
        cb();
    };

    var failFun = function () {
        cb(true);
    };

    if (ids.get('length') <= 0) {
        cb(true);
    }

    $.post('transmission/torrents/start',
        { 'ids': ids.toArray() },
        successFun).fail(failFun);
};

controlTorrentPlugin.stopTorrents = function (ids, cb) {
    var successFun = function (data) {
        cb();
    };

    var failFun = function () {
        cb(true);
    };

    if (ids.get('length') <= 0) {
        cb(true);
    }

    $.post('transmission/torrents/stop',
        { 'ids': ids.toArray() },
        successFun).fail(failFun);
};

controlTorrentPlugin.postViews = function () {
    var that = this;

    App.ToolbarStarTorrentButtonView = App.ToolbarButtonView.create({
        icon: 'icon-play icon-large',
        text: 'Start',

        click: function (e) {
            var selectedTorrents = this.get('controller.controllers.selectedTorrents.content');

            if (selectedTorrents.get('length') <= 0) {
                alert('Du måste välja en torrent först');
            } else {
                that.startTorrents(selectedTorrents, function (err) {
                    if (!err) {
                        console.log('done!');
                    } else {
                        console.log('error!');
                    }
                });
            }
        }

    });

    App.ToolbarStopTorrentButtonView = App.ToolbarButtonView.create({
        icon: 'icon-stop icon-large',
        text: 'Stop',

        click: function (e) {
            var selectedTorrents = this.get('controller.controllers.selectedTorrents.content');

            if (selectedTorrents.get('length') <= 0) {
                alert('Du måste välja en torrent först');
            } else {
                that.stopTorrents(selectedTorrents, function (err) {
                    if (!err) {
                        console.log('done!');
                    } else {
                        console.log('error!');
                    }
                });
            }
        }

    });


    this.addToolbarButton(App.ToolbarStarTorrentButtonView);
    this.addToolbarButton(App.ToolbarStopTorrentButtonView);
};
/**********************/
/******** remove torrent plugin *****/
var removeTorrentPlugin = new transnodeFrontendPlugin('Remove Torrent');

removeTorrentPlugin.removeTorrents = function (ids, cb) {
    var successFun = function (data) {
        cb();
    };

    var failFun = function () {
        cb(true);
    };

    if (ids.get('length') <= 0) {
        cb(true);
    }

    $.post('transmission/torrents/removeTorrents',
        { 'ids': ids.toArray() },
        successFun).fail(failFun);
};

removeTorrentPlugin.removeData = function (ids, cb) {
    var successFun = function (data) {
        cb();
    };

    var failFun = function () {
        cb(true);
    };

    if (ids.get('length') <= 0) {
        cb(true);
    }

    $.post('transmission/torrents/RemoveData',
        { 'ids': ids.toArray() },
        successFun).fail(failFun);
};

removeTorrentPlugin.postViews = function () {
    var that = this;

    App.ToolbarRemoveTorrentButtonView = App.ToolbarButtonView.create({
        icon: 'icon-remove icon-large',
        text: 'Remove Torrent',

        click: function (e) {
            var controller = this.get('controller');
            var selectedTorrents = this.get('controller.controllers.selectedTorrents.content');

            if (selectedTorrents.get('length') <= 0) {
                alert('You have to pick a torrent first');
            } else {
                that.removeTorrents(selectedTorrents, function (err) {
                    if (!err) {
                        console.log('done!');
                        setTimeout(function () { // it takes some time before the torrent is deleted
                            controller.update();
                        }, 500);
                    } else {
                        console.log('error!');
                    }
                });

                this.get('controller').update();
            }
        }

    });

    App.ToolbarRemoveDataButtonView = App.ToolbarButtonView.create({
        icon: 'icon-remove icon-large',
        text: 'Remove Torrent and Data',

        click: function (e) {
            var controller = this.get('controller');
            var selectedTorrents = this.get('controller.controllers.selectedTorrents.content');

            if (selectedTorrents.get('length') <= 0) {
                alert('You have to pick a torrent first');
            } else {
                that.removeData(selectedTorrents, function (err) {

                    if (!err) {
                        console.log('done!');
                        setTimeout(function () { // it takes some time before the torrent is deleted
                            controller.update();
                        }, 500);
                    } else {
                        console.log('error!');
                    }
                });
            }
        }

    });


    this.addToolbarButton(App.ToolbarRemoveTorrentButtonView);
    this.addToolbarButton(App.ToolbarRemoveDataButtonView);
};
/**********************/
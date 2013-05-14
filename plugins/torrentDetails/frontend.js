/****** torrentdetails plugin ***/
var torrentDetailsPlugin = {
    name: 'Torrent Details',
    tab: null,
    preControllers: function () {
        App.TorrentDetailsView = Ember.View.extend({
            defaultTemplate: Ember.TEMPLATES.torrentDetails,

            torrent: function () {
                var selectedTorrent = this.get('controller.controllers.selectedTorrents.selectedTorrent');
                return selectedTorrent;
            }.property('controller.controllers.selectedTorrents.selectedTorrent'),

            progressBarStyle: function () {
                var percentDone = (this.get('torrent.percentDone') * 100).toFixed(0);
                return 'width: ' + percentDone + '%;';
            }.property('torrent.percentDone')
        });

        this.tab = {
            name: 'Details',
            view: App.TorrentDetailsView
        },

        settings.setDefaultTab(this.tab);
        settings.addTab(this.tab);
        settings.addTab(this.tab = {
            name: 'Details2',
            view: App.TorrentDetailsView
        });
    }
};
settings.addPlugin(torrentDetailsPlugin);
/**********************/
/****** torrentdetails plugin ***/
var torrentDetailsPlugin = new transnodeFrontendPlugin('Torrent Details');
torrentDetailsPlugin.tab = null;

torrentDetailsPlugin.preControllers = function () {
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

        this.setDefaultTab(this.tab);
        this.addTab(this.tab);
};
/**********************/

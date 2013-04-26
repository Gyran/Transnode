App.Torrent = DS.Model.extend({
    _TR_STATUS_STOPPED:         0,
    _TR_STATUS_CHECK_WAIT:      1,
    _TR_STATUS_CHECK:           2,
    _TR_STATUS_DOWNLOAD_WAIT:   3,
    _TR_STATUS_DOWNLOAD:        4,
    _TR_STATUS_SEED_WAIT:       5,
    _TR_STATUS_SEED:            6,

    name:           DS.attr('string'),
    status:         DS.attr('number'),
    rateDownload:   DS.attr('number'),
    rateUpload:     DS.attr('number'),

    statusString: function () {
        switch (this.get('status')) {
            case this._TR_STATUS_STOPPED:
                return "Stopped";
            case this._TR_STATUS_CHECK_WAIT:
                return "Waiting to verify local files";
            case this._TR_STATUS_CHECK:
                return "Verifying local files";
            case this._TR_STATUS_DOWNLOAD_WAIT:
                return "Queued for download";
            case this._TR_STATUS_DOWNLOAD:
                return "Downloading";
            case this._TR_STATUS_SEED_WAIT:
                return "Queued for seeding";
            case this._TR_STATUS_SEED:
                return "Seeding";
            default:
                return "Unknown status";
        }
    }.property('status')

});

DS.RESTAdapter.reopen({
    namespace: 'transmission'
});

DS.RESTSerializer.reopen({
   keyForAttributeName: function(type, name) {
        return name;
    }
});

App.Store = DS.Store.extend({
    revision: 12
});

App.ApplicationController = Ember.Controller.extend({
    torrents: [],

    updateTorrents: function () {
        this.set('torrents', App.Torrent.find());
    }
});

App.ApplicationRoute = Ember.Route.extend({
    activate: function () {
        t = this;

        console.log(this);
        //this.controller.updateTorrents();

        this.intervalUpdateTorrents = setInterval(function() {
            t.controller.updateTorrents();
        }, 5000);
    }
});
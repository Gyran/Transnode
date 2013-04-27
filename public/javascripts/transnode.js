App.Torrent = DS.Model.extend({
    _STATUS_STOPPED:         0,
    _STATUS_CHECK_WAIT:      1,
    _STATUS_CHECK:           2,
    _STATUS_DOWNLOAD_WAIT:   3,
    _STATUS_DOWNLOAD:        4,
    _STATUS_SEED_WAIT:       5,
    _STATUS_SEED:            6,

    name:           DS.attr('string'),
    status:         DS.attr('number'),
    rateDownload:   DS.attr('number'),
    rateUpload:     DS.attr('number'),

    statusString: function () {
        switch (this.get('status')) {
            case this._STATUS_STOPPED:
                return "Stopped";
            case this._STATUS_CHECK_WAIT:
                return "Waiting to verify local files";
            case this._STATUS_CHECK:
                return "Verifying local files";
            case this._STATUS_DOWNLOAD_WAIT:
                return "Queued for download";
            case this._STATUS_DOWNLOAD:
                return "Downloading";
            case this._STATUS_SEED_WAIT:
                return "Queued for seeding";
            case this._STATUS_SEED:
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

App.TorrentsController = Ember.Controller.extend({
    _UPDATE_INTERVAL: 5000,

    torrents: [{id: 1, name: 'wiisss1'}],
    timer: null,

    start: function () {
        var t = this;
        t.execute();

        this.timer = setInterval(function () {
            t.execute();
        }, t._UPDATE_INTERVAL);
    },

    stop: function () {
        clearTimeout(this.timer);
    },

    execute: function () {
        this.set('torrents', App.Torrent.find());
    }

});

App.ApplicationController = Ember.Controller.extend({
    needs: ['torrents']
});

App.ApplicationRoute = Ember.Route.extend({
    activate: function () {
        this.controllerFor('torrents').start();
    }
});
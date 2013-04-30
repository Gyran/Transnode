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

App.TorrentsController = Ember.ArrayController.extend({
    needs: ['torrentColumns'],

    _UPDATE_INTERVAL: 100000,

    torrents: null,
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
    },

    columns: function () {
        console.log('hej!');
        console.log(this.get('controller').get('controllers.torrentColumns'));
        return this.get('controller.controllers.torrentcolumns.columns');
    }.property()

});

App.TorrentColumn = Ember.Object.extend({
    name: '',
    dataField: ''
});

App.TorrentColumnsController = Ember.ArrayController.extend({
    columns: [
      App.TorrentColumn.create({
          name: 'Status',
          dataField: 'statusString'
      }),
      App.TorrentColumn.create({
          name: 'Name',
          dataField: 'name'
      }),
      App.TorrentColumn.create({
          name: 'DL Rate',
          dataField: 'rateDownload'
      }),
      App.TorrentColumn.create({
          name: 'UL Rate',
          dataField: 'rateUpload'
      })
    ]
});

App.TorrentController = Ember.ObjectController.extend({
    needs: ['torrentColumns']
});

App.TorrentView = Ember.View.extend({
    tagName: 'tr',
    defaultTemplate: Ember.TEMPLATES['torrent'],

    columns: function () {
        return this.controllers.torrentcolumns.columns;
    }
});

App.TorrentsView = Ember.View.extend({
    tagName: 'table',
    classNames: 'table table-condensed table-bordered table-hover',
    torrentView: App.TorrentView,
    defaultTemplate: Ember.TEMPLATES['torrents']
});

App.ApplicationController = Ember.Controller.extend({
    needs: ['torrents', 'torrentColumns']
});

App.ApplicationRoute = Ember.Route.extend({
    activate: function () {
        this.controllerFor('torrents').start();
    }
});

Ember.Handlebars.registerBoundHelper('torrentField', function (field, torrent, options) {
    return options.contexts.objectAt(1).get(field);
});
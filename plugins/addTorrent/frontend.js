/******** add torrent plugin *****/
var addTorrentPlugin = new transnodeFrontendPlugin('Add Torrent');

addTorrentPlugin.postViews = function () {
    var that = this;

    App.ToolbarAddTorrentButtonView = App.ToolbarButtonView.create({
        icon: 'icon-plus-sign icon-large',
        text: 'Add',
        elementId: 'addTorrentButton',

        click: function (e) {
            that.popover.toggle();
        }
    });

    this.addToolbarButton(App.ToolbarAddTorrentButtonView);
};

addTorrentPlugin.postControllers = function () {
    App.AddTorrentView = Ember.View.extend({
         defaultTemplate: Ember.TEMPLATES.AddTorrent,
         elementId: 'addTorrent',
         classNames: 'popover bottom',

         folder: '',
         url: '',
         startWhenAdded: true,

         showing: false,

         toggle: function () {
            if (this.showing) {
                this.$().fadeOut();
                this.set('showing', false);
            } else {
                this.$().fadeIn();
                this.set('showing', true);
            }
         },

         addTorrent: function () {
            var that = this;

            var data = {
                'folder':       this.get('folder'),
                'url':          this.get('url'),
                startWhenAdded: this.get('startWhenAdded')
            };

            var successFun = function(data) {
                //console.log('en torrent blev tillagd', data);
                that.set('url', '');
                that.toggle();
            };

            var failFun = function () {
                console.log('add torrent fail');
            };

            $.post('transmission/add',
                data,
                successFun).fail(failFun);
         },
    });

    this.popover = App.AddTorrentView.create({
        folder: settings.getDownloadDir()
    });
    this.popover.append();

    Ember.run.scheduleOnce('afterRender', this, function () {
        var button = $('#addTorrentButton');
        var buttonPos = button.offset();
        var popover = this.popover.$();

        popover.css('left', buttonPos.left - popover.outerWidth() / 2 + button.outerWidth() / 2);
        popover.css('top', buttonPos.top + button.outerHeight());
    });
};

/**********************/
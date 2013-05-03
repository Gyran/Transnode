Ember.TEMPLATES["_details"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("details");
  
});
Ember.TEMPLATES["_leftColumn"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("left");
  
});
Ember.TEMPLATES["_rightColumn"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"row-fluid\">\n	");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "toolbar", options) : helperMissing.call(depth0, "partial", "toolbar", options))));
  data.buffer.push("\n</div>\n\n<div id='torrentListContainer' class=\"row-fluid\">\n    ");
  hashTypes = {'contentBinding': "STRING",'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TorrentsView", {hash:{
    'contentBinding': ("controllers.torrents.torrents"),
    'id': ("torrentTable")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n	");
  data.buffer.push("\n</div>\n\n<div class=\"row-fluid\">\n	");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "details", options) : helperMissing.call(depth0, "partial", "details", options))));
  data.buffer.push("\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["_toolbar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("toolbar");
  
});
Ember.TEMPLATES["_torrentList"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<table id='torrentTable' class='table table-condensed table-bordered table-hover'>\n	<thead>\n		<tr>\n			<th>\n				Status\n			</th>\n			<th>\n				Name\n			</th>\n            <th>\n                DL Rate\n            </th>\n            <th>\n                UL Rate\n            </th>\n		</tr>\n	</thead>\n	<tbody>\n        ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.log.call(depth0, "controllers", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        ");
  hashTypes = {'contentBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TorrentView", {hash:{
    'contentBinding': ("controllers.torrents")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		");
  data.buffer.push("\n		");
  data.buffer.push("\n		");
  data.buffer.push("\n	</tbody>\n</table>");
  return buffer;
  
});
Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class='container-fluid'>\n	<div class='row-fluid'>\n		<div class='span2'>\n			");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "leftColumn", options) : helperMissing.call(depth0, "partial", "leftColumn", options))));
  data.buffer.push("\n		</div>\n		<div class='span10'>\n			");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "rightColumn", options) : helperMissing.call(depth0, "partial", "rightColumn", options))));
  data.buffer.push("\n		</div>\n	</div>\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["torrent"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<td class='status'>\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "statusString", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n<td class='name'>\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n<td class='size'>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sizeConverted", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n<td class='done'>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "percentDoneConverted", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n<td class='downloaded'>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "downloadedConverted", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n<td class='uploaded'>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "uploadedConverted", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n<td class='ratio'>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "ratioConverted", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n<td class='addedDate'>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "addedDateConverted", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n<td class='rateDownload'>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "rateDownloadConverted", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n<td class='rateUpload'>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "rateUploadConverted", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n<td class='eta'>\n    ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "etaConverted", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</td>\n");
  return buffer;
  
});
Ember.TEMPLATES["torrents"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n        ");
  hashTypes = {'contentBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.torrentView", {hash:{
    'contentBinding': ("this")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    ");
  return buffer;
  }

  data.buffer.push("<thead>\n    <tr>\n        <th>\n            Status\n        </th>\n        <th>\n            Name\n        </th>\n        <th>\n            Size\n        </th>\n        <th>\n            Done\n        </th>\n        <th>\n            DL\n        </th>\n        <th>\n            UL\n        </th>\n        <th>\n            Ratio\n        </th>\n        <th>\n            Date added\n        </th>\n        <th>\n            DL rate\n        </th>\n        <th>\n            UL rate\n        </th>\n        <th>\n            ETA\n        </th>\n    </tr>\n</thead>\n<tbody>\n    ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "view.content", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</tbody>\n");
  return buffer;
  
});

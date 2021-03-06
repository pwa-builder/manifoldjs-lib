'use strict';

var cheerio = require('cheerio');
var xRegExp = require('xregexp');

var util = require('../utils');

var getName = function(obj, callback) {

  var $ = cheerio.load(obj.html);
  var appName = $('meta[name="application-name"]').attr('content');
  var appLinkName = $('meta[property="al:ios:app_name"], meta[property="al:android:app_name"]').attr('content');
  var ogSiteName = $('meta[property="og:site_name"]').attr('content');
  var schemaName = $('meta[itemprop="name"]').attr('content');
  var title = $('title').text();

  var name = appName || appLinkName || schemaName || ogSiteName || title;

  // Remove whitespace before or after - avoiding win10 incompatibility errors
  name = name.trim();
  
  if (util.realLength(name) > 45) {
    // name has a max length of 45 characters. if we are greater than that, strip
    // down to 44 chars, and add a unicode ellipsis
    name = name.match(xRegExp('(\\pS|\\p{L}\\p{M}|[A-Za-z0-9\\s]|[\\!\\"\\#\\$\\%\\&\'\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\_\\{\\|\\}\\~]){0,44}', 'xA'))[0] + '…';
  }

  if (callback) {
    callback(null, name);
  }

  return name;
};

module.exports = getName;

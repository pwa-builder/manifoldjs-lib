'use strict';

var Cheerio = require('cheerio');

var orientation = function(obj, callback) {

  var $ = Cheerio.load(obj.html);

  //fullscreen
  var qqFullScreen = $('[name=x5-orientation]').attr('content');
  var ucFullScreen = $('[name=screen-orientation]').attr('content');

  var _orientation = qqFullScreen || ucFullScreen || 'any';

  if (callback) {
    callback(null, _orientation);
  }

  return _orientation;
};

module.exports = orientation;

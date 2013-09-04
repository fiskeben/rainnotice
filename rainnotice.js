#!/usr/bin/env node

var request = require('request'),
	_ = require('underscore'),
  parseString = require('xml2js').parseString,
  pushover = require('./pushover.js'),
  settings = require('./settings.js').rainNoticeSettings;

var parseWeatherReport = function(xml) {
  parseString(xml, function(err, result) {
 		var source = getSource(result),
  		precipitations = getPrecipitations(result),
  		morning = precipitations[0].$;
  		afternoon = precipitations[1].$;

  	if (isRainy(morning) || isRainy(afternoon)) {
  		generateRainWarning([morning, afternoon], source);
  	}

  });
};

var getSource = function(data) {
	var links = data.weatherdata.links[0],
		link = links.link[2],
		sourceUrl = link.$.url;
	
	return sourceUrl;
};

var getPrecipitations = function(data) {
	var forecasts = data.weatherdata.forecast[0].tabular[0].time;

	return _.map(forecasts, function(item) {
		return item.precipitation[0];
	});
};

var isRainy = function(precipitation) {
	return precipitation.value > settings.rain_limit;
};

var generateRainWarning = function(precipitations, sourceUrl) {
	var message = buildMessageFromData(precipitations),
		data = buildAdditionalPushoverData(sourceUrl);
	pushover.sendToPushover(settings.pushover.user, message, data);
};

var buildMessageFromData = function(precipitations) {
	var text = [];
	text.push('Det skal regne ');
	text.push(precipitations[0].value);
	text.push('mm i formiddag og ');
	text.push(precipitations[1].value);
	text.push(' i eftermiddag, så tag paraply med.');
	return text.join('');
};

var buildAdditionalPushoverData = function(url) {
	return {'url': url, 'url_title': 'Vejrudsigt', 'device': settings.pushover.device}
}

request.get(settings.weatherreport_url, function(err, response, body) {
  if (response.statusCode === 200) {
    parseWeatherReport(body);
  }
});

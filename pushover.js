var request = require('request'),
	token = require('./pushovertoken.js').pushoverAPIToken,
	endpoint = 'https://api.pushover.net/1/messages.json';

var sendToPushover = function(user, message, opts) {
	var payload = {
		'token': token,
		'user': user,
		'message': message
	};
	
	if (opts.url) {
		payload.url = opts.url;
		if (opts.url_title) {
			payload.url_title = opts.url_title;
		}
	}

	if (opts.device) {
		payload.device = opts.device;
	}

	request.post(endpoint, {form : payload}, function(err, response, body) {
		if (err || response.statusCode !== 200) {
			console.error(err, response);
		}
	});
};

exports.sendToPushover = sendToPushover;
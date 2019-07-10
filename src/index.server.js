const https = require('https');

const config = {
	apiKey: "AIzaSyCti20Ws0BJfld1ebMJZ6RMaZolQnOFCVY",
	projectId: "audioalerts-production",
	appId: "1:586581071667:web:b3e42a0febb87bcb"
};

let installed = false;
let accountId = '';
let siteId = '';

const fn = function(key = '', val = 1) {
	if (!installed) {
		console.error('You must run the install function first'); // eslint-disable-line
		return;
	}

	const postData = JSON.stringify({
		fields: {
			accountId: { stringValue: accountId },
			siteId: { stringValue: siteId },
			key: { stringValue: key },
			val: { integerValue: val },
			timestamp: { timestampValue: new Date() },
		}
	})

	var options = {
		hostname: 'firestore.googleapis.com',
		path: `/v1beta1/projects/${config.projectId}/databases/(default)/documents/dings/${accountId}/ding?key=${config.apiKey}`,
		method: 'POST',
		headers: {
		 'Content-Type': 'application/json',
		 'Content-Length': postData.length
	 }
	};

	return new Promise((resolve, reject) => {
		var req = https.request(options, (res) => {
			console.log('statusCode:', res.statusCode);
			console.log('headers:', res.headers);

			res.on('data', (d) => {
				resolve({
					data: d,
					statusCode: res.statusCode,
					statusMessage: res.statusMessage,
					headers: res.headers,
				});
			});
		});

		req.on('error', (e) => {
			reject(e);
		});

		req.write(postData);
		req.end();
	});

};

function AudioAlerts({ accountId: _accountId, siteId: _siteId }) {
	if (installed) {
		console.error('You can only install AudioAlerts once'); // eslint-disable-line
		return;
	}

	accountId = _accountId;
	siteId = _siteId;

	installed = true;
}

module.exports.AudioAlerts = {
	install: AudioAlerts,
	alert: fn,
};

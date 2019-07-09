const tiny_ajax = function(
	m, // method - get, post, whatever
	u, // url
	c, // [callback] if passed -> asych call
	d, // [post_data]
	x
){
	x = new XMLHttpRequest();
	x.open(m,u,c), // open connection with Method and Url and asyCh flag
	x.send(d), // send Data

	x.onreadystatechange=function(){ // filter only readyState=4 events
		x.readyState^4||c(this); // if callback passed and readyState == 4 than trigger Callback with xhr object
	};
	return x;
};

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

	return new Promise((resolve, reject) => {
		tiny_ajax(
			'post',
			`https://firestore.googleapis.com/v1beta1/projects/${config.projectId}/databases/(default)/documents/dings/${window.AudioAlerts._accountId}/ding?key=${config.apiKey}`,
			(xhr) => {
				xhr.addEventListener('load', () => resolve('LOAD'));
				xhr.addEventListener('error', () => reject('ERROR'));
				xhr.addEventListener('abort', () => reject('ABORT'));
				xhr.addEventListener('timeout', () => reject('TIMEOUT'));
			},
			JSON.stringify({
				fields: {
					accountId: { stringValue: accountId },
					siteId: { stringValue: siteId },
					key: { stringValue: key },
					val: { integerValue: val },
					timestamp: { timestampValue: new Date() },
				}
			})
		);
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

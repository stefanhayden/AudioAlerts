import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
	apiKey: "AIzaSyCti20Ws0BJfld1ebMJZ6RMaZolQnOFCVY",
	projectId: "audioalerts-production",
	appId: "1:586581071667:web:b3e42a0febb87bcb"
};

firebase.initializeApp(config);

const db = firebase.firestore();
let installed = false;
let accountId = '';
let siteId = '';

const fn = function(key = '', val = 1) {
	if (!installed) {
		console.error('You must run the install function first'); // eslint-disable-line
		return;
	}
	return db.collection(`dings/${accountId}/ding`).add({
		accountId,
		siteId,
		key,
		val,
		timestamp: new Date(),
	}).then(() => { return;  });
};

function AudioAlerts({ accountId: _accountId, siteId: _siteId }) {
	accountId = _accountId;
	siteId = _siteId;
	if (installed) {
		console.error('You can only install AudioAlerts once'); // eslint-disable-line
		return;
	}

	installed = true;
}

module.exports.AudioAlerts = {
	install: AudioAlerts,
	alert: fn,
};

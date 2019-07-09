"use strict";

var request = require('request');

var config = {
  apiKey: "AIzaSyCti20Ws0BJfld1ebMJZ6RMaZolQnOFCVY",
  projectId: "audioalerts-production",
  appId: "1:586581071667:web:b3e42a0febb87bcb"
};
var installed = false;
var accountId = '';
var siteId = '';

var fn = function fn() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (!installed) {
    console.error('You must run the install function first'); // eslint-disable-line

    return;
  }

  return new Promise(function (resolve, reject) {
    var options = {
      uri: "https://firestore.googleapis.com/v1beta1/projects/".concat(config.projectId, "/databases/(default)/documents/dings/").concat(accountId, "/ding?key=").concat(config.apiKey),
      method: 'POST',
      json: {
        fields: {
          accountId: {
            stringValue: accountId
          },
          siteId: {
            stringValue: siteId
          },
          key: {
            stringValue: key
          },
          val: {
            integerValue: val
          },
          timestamp: {
            timestampValue: new Date()
          }
        }
      }
    };
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve('LOAD');
      } else {
        reject('ERROR');
      }
    });
    /*
    		tiny_ajax(
    			'post',
    			`https://firestore.googleapis.com/v1beta1/projects/${config.projectId}/databases/(default)/documents/dings/${accountId}/ding?key=${config.apiKey}`,
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
    */
  });
};

function AudioAlerts(_ref) {
  var _accountId = _ref.accountId,
      _siteId = _ref.siteId;

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
  alert: fn
};
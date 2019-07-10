"use strict";

var https = require('https');

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

  var postData = JSON.stringify({
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
  });
  var options = {
    hostname: 'firestore.googleapis.com',
    path: "/v1beta1/projects/".concat(config.projectId, "/databases/(default)/documents/dings/").concat(accountId, "/ding?key=").concat(config.apiKey),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };
  return new Promise(function (resolve, reject) {
    var req = https.request(options, function (res) {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);
      res.on('data', function (d) {
        resolve({
          data: d,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers
        });
      });
    });
    req.on('error', function (e) {
      reject(e);
    });
    req.write(postData);
    req.end();
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
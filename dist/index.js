"use strict";

var tiny_ajax = function tiny_ajax(m, // method - get, post, whatever
u, // url
c, // [callback] if passed -> asych call
d, // [post_data]
x) {
  x = new XMLHttpRequest();
  x.open(m, u, c), // open connection with Method and Url and asyCh flag
  x.send(d), // send Data
  x.onreadystatechange = function () {
    // filter only readyState=4 events
    x.readyState ^ 4 || c(this); // if callback passed and readyState == 4 than trigger Callback with xhr object
  };
  return x;
};

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
    tiny_ajax('post', "https://firestore.googleapis.com/v1beta1/projects/".concat(config.projectId, "/databases/(default)/documents/dings/").concat(accountId, "/ding?key=").concat(config.apiKey), function (xhr) {
      xhr.addEventListener('load', function () {
        return resolve('LOAD');
      });
      xhr.addEventListener('error', function () {
        return reject('ERROR');
      });
      xhr.addEventListener('abort', function () {
        return reject('ABORT');
      });
      xhr.addEventListener('timeout', function () {
        return reject('TIMEOUT');
      });
    }, JSON.stringify({
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
    }));
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
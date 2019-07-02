"use strict";

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/firestore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  apiKey: "AIzaSyCti20Ws0BJfld1ebMJZ6RMaZolQnOFCVY",
  authDomain: "audioalerts-production.firebaseapp.com",
  databaseURL: "https://audioalerts-production.firebaseio.com",
  projectId: "audioalerts-production",
  storageBucket: "audioalerts-production.appspot.com",
  messagingSenderId: "586581071667",
  appId: "1:586581071667:web:b3e42a0febb87bcb"
};

_app["default"].initializeApp(config);

var db = _app["default"].firestore();

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

  return db.collection("dings/".concat(accountId, "/ding")).add({
    accountId: accountId,
    siteId: siteId,
    key: key,
    val: val,
    timestamp: new Date()
  }).then(function () {
    return;
  });
};

function AudioAlerts(_ref) {
  var _accountId = _ref.accountId,
      _siteId = _ref.siteId;
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
  alert: fn
};
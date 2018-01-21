"use strict";
/*
 * DOCS: https://razorpay.com/docs/private/account-apis-beta/
 */

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('razorpay/dist/utils/razorpay-utils'),
  normalizeDate = _require.normalizeDate,
  normalizeBoolean = _require.normalizeBoolean,
  normalizeNotes = _require.normalizeNotes;

module.exports = function accountsApi(api) {

  var BASE_URL = "/beta/accounts",
    MISSING_ID_ERROR = "Account ID is mandatory";
  return {
  create: function create(params, callback) {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];
    /*
     * Creates an Account
     *
     * @param {Object} params
     * @param {Function} callback
     *
     * @return {Promise}
     */
    var notes = params.notes,
      rest = _objectWithoutProperties(params, ['notes']);

    var data = Object.assign(rest, normalizeNotes(notes));
    if (data.tnc_accepted) {
      data.tnc_accepted = normalizeBoolean(data.tnc_accepted);
    }

    return api.post({
      url: BASE_URL,
      data: data
    }, callback);
  },
  fetch: function fetch(accountId,callback) {
    /*
         * Fetch an Account given Account ID
         *
         * @param {String} accountId
         * @param {Function} callback
         *
         * @return {Promise}
         */
    if (!accountId) {
      throw new Error(MISSING_ID_ERROR);
    }

    var url = BASE_URL + "/" + accountId;
    return api.get({ url: url }, callback);

  },
    all: function all() {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];
      var url = BASE_URL;
      return api.get({
        url: url
      }, callback);
    },
    edit: function edit(accountId, params, callback) {
      //TODO: coming soon
      return null
    },

  };
};

import { __, both, gte, lt } from 'ramda';

const self = {};

/**
 * @param {Number} statusCode
 * @returns {Boolean} true if the status code is ok
 */
self.successfulStatus = both(gte(__, 200), lt(__, 300));

/**
 * @param {String} url
 * @param {Obj} data Stringify-able body
 * @return {Promise}
 */
self.post = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

self.checkHTTPStatus = (res) => {
  if (self.successfulStatus(res.status)) {
    return res.json();
  }
  else {
    const error = new Error(res.statusText);
    error.res = res;
    throw error;
  }
};

self.checkSocketStatus = (res) => {
  return new Promise((resolve, reject) => {
    if (self.successfulStatus(res.code)) {
      resolve(res);
    }
    else {
      reject(new Error(res.message));
    }
  });
};

module.exports = self;

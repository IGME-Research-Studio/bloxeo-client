import { __, both, gte, lt } from 'ramda';

const self = {}

self.successfulStatus = (statusCode) => both(gte(__, 200), lt(__, 300));

self.post = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
};

self.toJson = (res) => res.json();

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
      resolve(data);
    }
    else {
      reject(new Error(res.message));
    }
  });
};

module.exports = self;

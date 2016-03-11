import {
  is, isNil, isEmpty,
  ifElse, cond, either, anyPass, always,
  T, F, not, equals, complement,
  compose, map, pipe,
  head, toLower,
  assocPath } from 'ramda';

const self = {};

self.firstChar = (str) => {
  return ifElse(is(String), head, always('?'))(str);
  // return ifElse(compose(not, isEmpty), head, () => def)(str)
};

self.pOrMsg = (predicate, msg, str) => (
  ifElse(predicate, () => msg, () => '')(str)
);

self.isntEmptyValidator = (msg, val) => (
  self.pOrMsg(self.isNilorEmpty, msg, val)
);

self.isntPosIntValidator = (msg, val) => (
  self.pOrMsg(anyPass([isNil, isEmpty, self.isntInteger, self.isntPos]),
    msg, Number(val))
);

self.updateValuesWithError = (prop, value, error, state) => (
  pipe(
    assocPath(['values', prop], value),
    assocPath(['errors', prop], error)
  )(state)
);

self.updateValues = (prop, value, state) => (
  assocPath(['values', prop], value, state)
);

/**
 * Coffeescript style boolean conversion 'on' -> T, etc.
 * @param {String} val
 * @returns {Boolean|Type} defaults to original value
 */
self.toBool = (val) => (
  cond([
    [anyPass(map(equals, ['on', 'yes'])), T],
    [anyPass(map(equals, ['off', 'no'])), F],
    [T, always(val)],
  ])(toLower(val))
);

/**
 * Polyfill for Number.isInteger from MDN:
 * mzl.la/1M5znPY
 * @param {Type} value
 * @param {Boolean}
 */
self.isInteger = (value) => {
  return is(Number) &&
    isFinite(value) &&
    Math.floor(value) === value;
};

self.isntInteger = complement(self.isInteger);

self.isPos = (value) => value > 0 ? true : false;

self.isntPos = (value) => value <= 0 ? true : false;

self.isNeg = (value) => value < 0 ? true : false;

self.isntNeg = (value) => value >= 0 ? true : false;

self.isntEmpty = compose(not, isEmpty);

self.isNilorEmpty = either(isNil, isEmpty);

self.isntNilorEmpty = compose(not, either(isNil, isEmpty));

module.exports = self;

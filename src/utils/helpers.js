import {
  is, isNil, isEmpty,
  ifElse, cond, either, anyPass, always,
  T, F, not, equals, propEq, complement,
  compose, map, pipe, curry, addIndex,
  head, flatten, transpose, splitEvery, sortBy,
  assocPath, toLower, toUpper } from 'ramda';

const self = {};

self.firstChar = (str) => {
  return ifElse(is(String), compose(toUpper, head), always('?'))(str);
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

self.updateValuesWithError = curry((prop, value, error, state) => (
  pipe(
    assocPath(['values', prop], value),
    assocPath(['errors', prop], error)
  )(state)
));

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

/**
 * Curried
 * @param {Type} x
 * @param {Type} y
 * @return Boolean
 */
self.isntEqual = curry(compose(not, equals));

/**
 * @param {String} prop
 * @param {Object} x
 * @param {Object} y
 */
self.propIsntEqual = (prop, value) => compose(not, propEq(prop, value));

self.moveToHead = (value, list) => (
  sortBy(self.isntEqual(value), list)
);

/**
 * @param {String} prop
 * @param {Array<Object>} list
 */
self.moveToHeadByProp = (prop, value, list) => (
  sortBy(self.propIsntEqual(prop, value), list)
);

self.sqrtInt = (integer) => Math.ceil(Math.sqrt(integer));

/**
 * Takes a gradient of values, and distributes them 'evenly'
 * Create a 'squarish' matrix
 * Transpose the matrix
 * Flatten it
 * [1, 2, 3, 4, 5, 6, 7, 8, 9] ->
 * [[1,2,3], [4,5,6], [7,8,9]] ->
 * [[1,4,7], [2,5,8], [3,6,9]] ->
 * [1, 4, 7, 2, 5, 8, 3, 6, 9]
 * @param {Array} list sorted range [0,1,2,..,n]
 * @param {Array} list 'evenly' distributed range
 */
self.gradientToDiscrete = (list) => {
  return flatten(transpose(splitEvery(self.sqrtInt(list.length), list)));
};

self.mapWithIndex = addIndex(map);

module.exports = self;

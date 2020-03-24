const _ = require("lodash");

/**
 * Recursively converts the keys of an object
 * to camelCase. Also works on nested arrays
 * of objects
 *
 * @param {Object} object
 */
const objectKeysToCamelCase = object => {
  if (!_.isArray(object) && !_.isPlainObject(object)) return object;

  const camelCaseObject = {};
  _.forEach(object, (value, key) => {
    if (_.isArray(value)) {
      value = value.map(item => objectKeysToCamelCase(item));
    }
    if (_.isPlainObject(value)) {
      value = objectKeysToCamelCase(value);
    }
    camelCaseObject[_.camelCase(key)] = value;
  });
  return camelCaseObject;
};

/**
 * Recursively converts the keys of an object
 * to snake_case. Also works on nested arrays
 * of objects
 *
 * @param {Object} object
 */
const objectKeysToSnakeCase = object => {
  if (!_.isArray(object) && !_.isPlainObject(object)) return object;

  const snakeCaseObject = {};
  _.forEach(object, (value, key) => {
    if (_.isArray(value)) {
      value = value.map(item => objectKeysToSnakeCase(item));
    }
    if (_.isPlainObject(value)) {
      value = objectKeysToSnakeCase(value);
    }
    snakeCaseObject[_.snakeCase(key)] = value;
  });
  return snakeCaseObject;
};

/**
 * Builds response object to be used
 * as a standard API response format.
 *
 * @param {any} data
 * @param {boolean} success
 * @param {string} message
 */
const buildResponse = (data, success, message) => {
  const response = {};

  if (_.isNil(data)) response.message = message;
  else response.data = objectKeysToSnakeCase(data);

  response.success = success;

  return response;
};

/**
 * Converts object keys into snake_case
 * (recursively) and removes keys with
 * undefined values (top-level only)
 *
 * @param {Object} data
 */
const createFirestoreObject = data => {
  const result = objectKeysToSnakeCase(data);

  Object.keys(result).forEach(key => {
    if (_.isUndefined(result[key])) {
      delete result[key];
    }
  });

  return result;
};

/**
 * Checks the values of the input object
 * and reports an array of keys whose values
 * are null or undefined.
 * 
 * @param {Object} parameters items that need to be analysed. 
 * Keys of the object will be used to report missing parameters
 */
const getMissingParameters = parameters => {
  const missingParameters = [];

  Object.keys(parameters).forEach(key => {
    if (_.isNil(parameters[key])) missingParameters.push(key);
  });

  return missingParameters;
};

module.exports = {
  buildResponse,
  objectKeysToCamelCase,
  objectKeysToSnakeCase,
  createFirestoreObject,
  getMissingParameters
};

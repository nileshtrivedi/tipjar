const errorStatusCodes = {
  BAD_REQUEST: 400
};
class MissingParametersError extends Error {
  /**
   * @param {string | Array<string>} missingParameterNames
   * @param {string} additionalMessage
   */
  constructor(missingParameterNames, additionalMessage) {
    let message = "Missing parameters: " + missingParameterNames;
    if (additionalMessage) message += "\n" + additionalMessage;

    super(message);

    this.name = this.constructor.name;
    this.statusCode = errorStatusCodes.BAD_REQUEST;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadParameterError extends Error {
  constructor(badParameterName, additionalMessage) {
    let message = "Bad parameter: " + badParameterName;
    if (additionalMessage) message += "\n" + additionalMessage;

    super(message);

    this.name = this.constructor.name;
    this.statusCode = errorStatusCodes.BAD_REQUEST;
    Error.captureStackTrace(this, this.constructor);
  }
}

class GenericError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;

    if(statusCode) this.statusCode = statusCode
  }
}

const appErrors = {
  MissingParametersError,
  BadParameterError,
  GenericError
};

const isAppError = inputError =>
  Object.keys(appErrors).findIndex(
    key => appErrors[key].name === inputError.name
  ) > -1;

const propogateError = (error, altMessage) => {
  if (isAppError(error)) return error;
  else return new GenericError(altMessage);
};

module.exports = {
  errorStatusCodes,
  ...appErrors,
  isAppError,
  propogateError,
};

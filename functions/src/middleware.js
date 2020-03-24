const { isAppError } = require("src/errors");
const utils = require("src/utils");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let response = {
    success: false,
    message: "Request Failed."
  }

  if(isAppError(err)) {
    statusCode = err.statusCode || 500;
    response = utils.buildResponse(null, false, err.message);
  }

  console.error(err)

  res.status(statusCode).send(response);
}

module.exports = {
  errorHandler,
}
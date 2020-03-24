const functions = require("firebase-functions");
const fetch = require("node-fetch");
const moment = require("moment");
const promiseRetry = require("promise-retry");
const errors = require("src/errors");

const RZP_BASE_URL = "https://api.razorpay.com";

const getRazorpayHeaders = () => {
  const keyId = functions.config()["razorpay"]["key_id"];
  const keySecret = functions.config()["razorpay"]["key_secret"];
  let creds = keyId + ":" + keySecret;

  let buffer = new Buffer(creds);
  const credsBase64 = buffer.toString("base64");

  return {
    Authorization: "Basic " + credsBase64,
    "Content-Type": "application/json"
  };
};

const createPlan = async ({ name, period, interval, amount, currency }) => {
  let result = {id: null};

  try {
    const body = {
      period: period,
      interval: interval,
      item: {
        name,
        amount,
        currency
      }
    };

    const response = await fetch(RZP_BASE_URL + "/v1/plans", {
      body: JSON.stringify(body),
      method: "POST",
      headers: getRazorpayHeaders()
    });

    result = await response.json();

    if (!result.id) {
      console.error(result);
      throw new errors.GenericError(JSON.stringify(result));
    }
  } catch (error) {
    console.error(error);
    throw new errors.GenericError(`Failed to create plan.`);
  }

  return result;
};

const createPlans = async ({ plans }) => {
  let result = null;

  try {
    const createPlanPromises = plans.map(plan =>
      promiseRetry(retry => createPlan(plan).catch(retry), {
        retries: 3
      })
    );

    result = await Promise.all(createPlanPromises);
  } catch (error) {
    console.error(error);
    throw new errors.GenericError(`Failed to create one or more plans.`);
  }

  return result;
};

const createSubscription = async ({ planId }) => {
  let result = null;

  try {
    const body = {
      plan_id: planId,
      total_count: 2,
      quantity: 1,
      expire_by: moment().add(30, "minutes").unix()
    };

    const response = await fetch(RZP_BASE_URL + "/v1/subscriptions", {
      body: JSON.stringify(body),
      method: "POST",
      headers: getRazorpayHeaders()
    });

    result = await response.json();
  } catch (error) {
    console.error(error);
    throw new errors.GenericError(
      `Failed to create subscription for plan id ${planId}`
    );
  }

  return result;
};

module.exports = {
  createPlan,
  createPlans,
  createSubscription
};

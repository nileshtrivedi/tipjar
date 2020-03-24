import fetch from "services/fetch";
import { objectKeysToSnakeCase, objectKeysToCamelCase } from "utils";

const getPledge = async ({ pledge }) => {
  let result = null;

  try {
    const response = await fetch.get(`/pledges/${pledge}`);
    result = response.data;
  } catch (error) {
    console.error(error);
  }

  return result;
};

const createSubscription = async ({ planId }) => {
  let result = null;

  const response = await fetch.post("/pledges/razorpay_subscription", {
    body: JSON.stringify(objectKeysToSnakeCase({ planId }))
  });

  result = response.data;

  return result;
};

const createPledge = async ({ razorpaySubscriptionId, membership }) => {
  let result = null;

  const body = {
    razorpaySubscriptionId,
    membership
  };

  const response = await fetch.post("/pledges", {
    body: JSON.stringify(objectKeysToSnakeCase(body))
  });

  result = objectKeysToCamelCase(response.data);

  return result;
};

export { getPledge, createSubscription, createPledge };

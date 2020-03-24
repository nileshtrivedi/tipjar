const express = require("express");

const pledgeService = require("src/services/pledge");
const razorpayService = require("src/services/razorpay");
const utils = require("src/utils");

const router = express.Router();

router.get("/:pledge", async(req, res, next) => {
  try {
    let result = null;
    const { pledge } = req.params;

    result = await pledgeService.getPledge({ pledge });

    if(result) {
      return res.status(200).send(utils.buildResponse(result, true));
    } else {
      return res.status(404).send();
    }
  } catch (error) {
    return next(error);
  }
})

router.post("/", async (req, res, next) => {
  try {
    const { membership, razorpaySubscriptionId } = utils.objectKeysToCamelCase(
      req.body
    );

    const pledgeId = await pledgeService.createPledge({
      membership,
      razorpaySubscriptionId
    });

    return res.status(201).send(utils.buildResponse({ pledgeId }, true));
  } catch (error) {
    return next(error);
  }
});

router.post("/razorpay_subscription", async (req, res, next) => {
  try {
    const { planId } = utils.objectKeysToCamelCase(req.body);

    const response = await razorpayService.createSubscription({ planId });

    return res.status(201).send(utils.buildResponse(response, true));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

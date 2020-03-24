const express = require("express");
const _ = require("lodash");

const membershipService = require("src/services/membership");
const utils = require("src/utils");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { creator } = req.query;

    let result = null;

    if (creator) {
      const memberships = await membershipService.getMembershipsForCreator({
        creator
      });
      result = { memberships };
    }

    if (_.get(result, "memberships.length")) {
      return res.status(200).send(utils.buildResponse(result, true));
    } else {
      return res
        .status(404)
        .send(
          utils.buildResponse(
            null,
            false,
            `No memberships found for creator ${creator}`
          )
        );
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/:membership", async (req, res, next) => {
  try {
    const { membership } = req.params;

    const result = await membershipService.getMembership({ membership });

    if (!result) {
      return res
        .status(404)
        .send(
          utils.buildResponse(
            null,
            false,
            `No entry found for membership ${membership}`
          )
        );
    } else {
      return res.status(200).send(utils.buildResponse(result, true));
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { creator } = req.query;
    const { memberships } = req.body;

    const membershipIds = await membershipService.createMemberships(
      utils.objectKeysToCamelCase({ memberships, creator })
    );

    return res.status(201).send(utils.buildResponse(membershipIds, true));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

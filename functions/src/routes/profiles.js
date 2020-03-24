const express = require("express");
const admin = require("firebase-admin");

const profileService = require("src/services/profile");
const authService = require("src/services/auth");
const utils = require("src/utils");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let result = null;

    const { firebaseUid, vanityName } = utils.objectKeysToCamelCase(req.query);

    if (vanityName) {
      result = await profileService.getProfileByVanityName({
        vanityName
      });
    } else if (firebaseUid) {
      result = await profileService.getProfileByFirebaseUid({
        firebaseUid
      });
    } else {
      return res
        .status(400)
        .send(
          utils.buildResponse(
            null,
            false,
            "One of the following query parameters are required: vanityName, firebaseUid"
          )
        );
    }

    if (result) {
      return res.status(200).send(utils.buildResponse(result, true));
    } else {
      return res
        .status(404)
        .send(utils.buildResponse(null, false, "Profile not found."));
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let result = null;
    const { id } = req.params;

    result = await profileService.getProfile({ profile: id });

    if (!result) {
      return res
        .status(404)
        .send(utils.buildResponse(null, false, "Profile not found."));
    } else {
      return res.status(200).send(utils.buildResponse(result, true));
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  let result = null;
  try {
    const profileData = utils.objectKeysToCamelCase(req.body);
    const { firebaseUid, vanityName } = profileData;

    await authService.verifyFirebaseUid(firebaseUid);

    const profileAlreadyExists = await profileService.getProfileByFirebaseUid({
      firebaseUid
    });

    if (profileAlreadyExists) {
      return res
        .status(409)
        .send(
          utils.buildResponse(
            null,
            false,
            `Profile already exists for firebase uid: ${firebaseUid}`
          )
        );
    }

    if (vanityName) {
      const invalidVanityNames = await profileService.getInvalidVanityNames();

      if (invalidVanityNames.indexOf(vanityName) > -1) {
        return res
          .status(400)
          .send(
            utils.buildResponse(
              null,
              false,
              `Invalid vanity name ${vanityName}`
            )
          );
      }

      const profileExistsForVanityName = await profileService.getProfileByVanityName(
        {
          vanityName
        }
      );

      if (profileExistsForVanityName)
        return res
          .status(409)
          .send(
            utils.buildResponse(
              null,
              false,
              `Profile already exists for vanity name ${vanityName}`
            )
          );
    }

    result = await profileService.createProfile({ profileData });

    return res.status(201).send(utils.buildResponse(result, true));
  } catch (error) {
    return next(error);
  }
});

router.put("/:profile", async (req, res, next) => {
  try {
    const { profile } = req.params;
    const profileData = req.body;
    await profileService.updateProfile({ profile, profileData });
    res.status(200).send(utils.buildResponse(null, true));
  } catch (error) {
    return next(error);
  }

  return null;
});

router.get("/:profile/refresh_stats", async (req, res, next) => {
  try {
    const { profile } = req.params;
    const result = await profileService.refreshStatsForProfile({ profile });
    res.status(200).send(utils.buildResponse(result, true));
  } catch (error) {
    return next(error);
  }

  return null;
});

router.get("/validate_vanity_name/:vanityName", async (req, res, next) => {
  try {
    const { vanityName } = req.params;

    const invalidVanityNames = await profileService.getInvalidVanityNames();

    if (invalidVanityNames.indexOf(vanityName) > -1) {
      return res
        .status(400)
        .send(
          utils.buildResponse(null, false, `Invalid vanity name ${vanityName}`)
        );
    }

    const profileExistsForVanityName = await profileService.getProfileByVanityName(
      { vanityName }
    );

    if (profileExistsForVanityName) {
      return res
        .status(400)
        .send(
          utils.buildResponse(
            null,
            false,
            `Profile exists for vanity name ${vanityName}`
          )
        );
    }

    return res
      .status(200)
      .send(utils.buildResponse(null, true, `Valid vanity name.`));
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;

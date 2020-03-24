const admin = require("firebase-admin");

const membershipService = require("src/services/membership");
const profileService = require("src/services/profile");
const collections = require("src/collections");
const utils = require("src/utils");
const errors = require("src/errors");

const db = admin.firestore();

const getPledge = async ({ pledge }) => {
  let result = null;

  if (!pledge) throw new errors.MissingParametersError(["pledge"]);

  try {
    result = db
      .collection(collections.PLEDGES)
      .doc(pledge)
      .get()
      .then(snapshot => {
        if (!snapshot.exists) {
          return null;
        }

        return utils.objectKeysToCamelCase(snapshot.data());
      });
  } catch (error) {
    console.error(error);
    throw new errors.GenericError(`Failed to fetch pledge ${pledge}`);
  }

  return result;
};

const createPledge = async ({ membership, razorpaySubscriptionId }) => {
  let result = null;

  const missingParameters = utils.getMissingParameters({
    membership,
    razorpaySubscriptionId
  });
  if (missingParameters.length)
    throw new errors.MissingParametersError(missingParameters);

  try {
    const pledge = {
      membership,
      razorpaySubscriptionId,
      created_at: admin.firestore.Timestamp.now()
    };

    const pledgeDocRef = db.collection(collections.PLEDGES).doc();

    await pledgeDocRef.set(pledge);

    result = pledgeDocRef.id;

    const { creator } = await membershipService.getMembership({ membership });
    await profileService.refreshStatsForProfile({ profile: creator });
  } catch (error) {
    console.error(error);
    throw new errors.GenericError(
      `Failed to create pledge for membership ${membership}.`
    );
  }

  return result;
};

const getPledgesForSupporter = ({ supporter }) => {};

const getPledgesForCreator = async ({ creator }) => {
  let result = null;

  if (!creator) throw new errors.MissingParametersError(["creator"]);

  try {
    const memberships = await membershipService.getMembershipsForCreator({
      creator
    });
    const pledgesSnapshot = await db
      .collection(collections.PLEDGES)
      .where(
        "membership",
        "in",
        memberships.map(membership => membership.id)
      )
      .get();

    result = pledgesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(error);
    throw new errors.GenericError(
      `Failed to fetch pledges for creator ${creator}`
    );
  }

  return result;
};

module.exports = {
  getPledge,
  createPledge,
  getPledgesForSupporter,
  getPledgesForCreator
};

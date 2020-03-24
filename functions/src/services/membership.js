const admin = require("firebase-admin");

const razorpayService = require("src/services/razorpay");
const profileService = require("src/services/profile");
const collections = require("src/collections");
const utils = require("src/utils");
const errors = require("src/errors");

const db = admin.firestore();

const getMembershipsForCreator = async ({ creator }) => {
  let result = null;

  if (!creator) throw new errors.MissingParametersError(["creator"]);

  try {
    const membershipsSnapshot = await db
      .collection(collections.MEMBERSHIPS)
      .where("creator", "==", creator)
      .get();

    result = membershipsSnapshot.docs.map(doc =>
      utils.objectKeysToCamelCase({
        id: doc.id,
        ...doc.data()
      })
    );
  } catch (error) {
    console.error(error);
    throw errors.propogateError(
      error,
      `Failed to fetch memberships for creator: ${creator}`
    );
  }

  return result;
};

const getMemberships = async ({ ids }) => {
  let result = null;

  if (!ids) throw new errors.MissingParametersError(["ids"]);

  try {
    const documents = ids.map(id =>
      db.collection(collections.MEMBERSHIPS).doc(id)
    );

    const docs = await db.getAll(...documents);

    result = docs.map(doc =>
      utils.objectKeysToCamelCase({ id: doc.id, ...doc.data() })
    );
  } catch (error) {
    console.error(error);
    throw new errors.GenericError(
      `Failed to fetch data for membership ids: ${JSON.stringify(ids)}`
    );
  }

  return result;
};

const createMemberships = async ({ memberships, creator }) => {
  let result = null;

  try {
    const { vanityName } = await profileService.getProfile({
      profile: creator
    });

    const plans = await razorpayService.createPlans({
      plans: memberships.reduce(
        (acc, membershipData) => [
          ...acc,
          {
            name: `${vanityName.toUpperCase()}_${membershipData.amountPaise /
              100}_${membershipData.paymentCycle.toUpperCase()}`,
            period: membershipData.paymentCycle.toLowerCase(),
            interval: 1,
            amount: membershipData.amountPaise,
            currency: "INR"
          }
        ],
        []
      )
    });

    const writeBatch = db.batch();

    result = {
      memberships: memberships.reduce((acc, membershipData, index) => {
        const docRef = db.collection(collections.MEMBERSHIPS).doc();

        writeBatch.set(
          docRef,
          utils.objectKeysToSnakeCase({
            creator,
            ...membershipData,
            razorpayPlanId: plans[index]["id"]
          })
        );

        return [...acc, docRef.id];
      }, [])
    };

    await writeBatch.commit();
  } catch (error) {
    console.error(error);
    throw new errors.GenericError(
      `Failed to create memberships for creator: ${creator}`
    );
  }

  return result;
};

const getMembership = async ({ membership }) => {
  let result = null;

  if (!membership) throw new errors.MissingParametersError(["membership"]);

  const membershipSnapshot = await db
    .collection(collections.MEMBERSHIPS)
    .doc(membership)
    .get();

  if (!membershipSnapshot.exists);
  else result = membershipSnapshot.data();

  return result;
};

module.exports = {
  getMembershipsForCreator,
  getMemberships,
  createMemberships,
  getMembership
};

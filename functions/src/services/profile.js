const admin = require("firebase-admin");

const collections = require("src/collections");
const utils = require("src/utils");
const errors = require("src/errors");

const db = admin.firestore();

const getProfile = async ({ profile }) => {
  let result = null;

  try {
    if (!profile) throw new errors.MissingParametersError(["profile"]);

    result = await db
      .collection(collections.PROFILES)
      .doc(profile)
      .get()
      .then(snapshot => {
        if (!snapshot.exists) {
          return null;
        }

        return utils.objectKeysToCamelCase(snapshot.data());
      });
  } catch (error) {
    console.error(error);
    throw errors.propogateError(error, `Failed to fetch profile ${profile}`);
  }

  return result;
};

const getProfileByVanityName = async ({ vanityName }) => {
  let result = null;

  try {
    if (!vanityName) throw new errors.MissingParametersError(["vanityName"]);

    result = await db
      .collection(collections.PROFILES)
      .where("vanity_name", "==", vanityName)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return null;
        }

        return utils.objectKeysToCamelCase({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data()
        });
      });
  } catch (error) {
    console.error(error);
    throw errors.propogateError(
      error,
      `Failed to fetch profile for vanity name ${vanityName}`
    );
  }

  return result;
};

const getProfileByFirebaseUid = async ({ firebaseUid }) => {
  let result = null;

  try {
    if (!firebaseUid) throw new errors.MissingParametersError(["firebaseUid"]);

    result = await db
      .collection(collections.PROFILES)
      .where("firebase_uid", "==", firebaseUid)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return null;
        }

        return utils.objectKeysToCamelCase(snapshot.docs[0].data());
      });
  } catch (error) {
    console.error(error);
    throw errors.propogateError(
      error,
      `Failed to fetch profile for firebaseUid ${firebaseUid}`
    );
  }

  return result;
};

const pickProfileProperties = data => {
  let result = null;
  const validProperties = [
    "about",
    "bannerImageUrl",
    "externalLinks",
    "featuredVideoUrl",
    "firebaseUid",
    "name",
    "profileImageUrl",
    "short",
    "vanityName"
  ];

  result = validProperties.reduce(
    (acc, property) => ({
      ...acc,
      [property]: data[property]
    }),
    {}
  );

  return result;
};

const createProfile = async ({ profileData }) => {
  try {
    let result = null;
    if (!profileData) throw new errors.MissingParametersError(["profileData"]);

    const vanityName = _.get(profileData, "vanityName");

    if (vanityName) {
      const profileExistsForVanityName = await getProfileByVanityName({
        vanityName
      });

      if (profileExistsForVanityName)
        throw new errors.GenericError(
          `Profile already exists for vanity name ${vanityName}`,
          409
        );
    }

    const profileDocRef = db.collection(collections.PROFILES).doc();
    await profileDocRef.set(
      utils.createFirestoreObject(pickProfileProperties(profileData)),
      {
        merge: true
      }
    );

    result = { id: profileDocRef.id };

    return result;
  } catch (error) {
    console.error(error);
    throw errors.propogateError(error, `Failed to create profile.`);
  }
};

const updateProfile = async ({ profile, profileData }) => {
  let result = null;

  try {
    const missingParameters = utils.getMissingParameters({
      profile,
      profileData
    });
    if (missingParameters.length)
      throw new errors.MissingParametersError(missingParameters);

    const profileDocRef = db.collection(collections.PROFILES).doc(profile);

    const profileExists = await profileDocRef
      .get()
      .then(snapshot => snapshot.exists);

    if (!profileExists)
      throw new errors.GenericError(`Entry not found for profile: ${profile}`);

    await profileDocRef.set(utils.createFirestoreObject(profileData), {
      merge: true
    });
  } catch (error) {
    console.error(error);
    throw errors.propogateError(error, `Failed to update profile ${profile}`);
  }

  return result;
};

const refreshStatsForProfile = async ({ profile }) => {
  let result = null;

  try {
    if (!profile) throw new errors.MissingParametersError(["profile"]);

    const membershipsSnapshot = await db
      .collection(collections.MEMBERSHIPS)
      .where("creator", "==", profile)
      .get();
    const memberships = membershipsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...utils.objectKeysToCamelCase(doc.data())
    }));

    if (!memberships.length)
      throw new errors.GenericError(
        `No memberships found for profile ${profile}`
      );

    const pledgesSnapshot = await db
      .collection(collections.PLEDGES)
      .where(
        "membership",
        "in",
        memberships.map(membership => membership.id)
      )
      .get();

    const pledgeCount = pledgesSnapshot.docs.length;
    const earningsPaise = pledgesSnapshot.docs.reduce((acc, doc) => {
      const membership = doc.data().membership;
      const amountPaise = memberships.find(m => m.id === membership)
        .amountPaise;

      return acc + amountPaise;
    }, 0);

    await updateProfile({
      profile,
      profileData: { pledgeCount, earningsPaise }
    });
  } catch (error) {
    console.error(error);
    throw errors.propogateError(
      error,
      `Failed to refresh stats for profile ${profile}`
    );
  }

  return result;
};

const getInvalidVanityNames = async () => {
  try {
    let result = null;
    const miscData = await db
      .collection(collections.MISC)
      .doc("misc")
      .get()
      .then(snapshot => snapshot.data());

    result = utils.objectKeysToCamelCase(miscData).invalidVanityNames;
    return result;
  } catch (error) {
    throw new errors.propogateError(
      error,
      `Failed to fetch invalid vanity names.`
    );
  }
};

module.exports = {
  getProfile,
  getProfileByFirebaseUid,
  getProfileByVanityName,
  createProfile,
  updateProfile,
  refreshStatsForProfile,
  getInvalidVanityNames
};

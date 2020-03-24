const admin = require("firebase-admin");

const errors = require("src/errors");

const verifyFirebaseUid = async uid => {
  let isValidUid = false;

  if (!uid) {
    throw new errors.MissingParametersError(["uid"]);
  }

  try {
    const userRecord = await admin.auth().getUser(uid);

    if (userRecord.toJSON().uid === uid) {
      isValidUid = true;
    }
  } catch (error) {
    console.error(error);
    throw new errors.GenericError(`Failed to verify firebase uid ${uid}`);
  }

  return isValidUid;
};

module.exports = {
  verifyFirebaseUid
};

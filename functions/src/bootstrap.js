require('module-alias/register')
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.init = () => {
  admin.initializeApp({
    credential: admin.credential.cert(functions.config()["service_account"]),
    databaseURL: "https://patreon-a7285.firebaseio.com"
  });
}
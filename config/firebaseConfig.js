const admin = require('firebase-admin');
const serviceAccount = require('../hotelmanagement-15e83-firebase-adminsdk-ghjmn-9eea7bc405.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "hotelmanagement-15e83.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = bucket;

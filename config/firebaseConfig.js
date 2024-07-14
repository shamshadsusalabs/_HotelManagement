const admin = require('firebase-admin');
const serviceAccount = require('../firebase/hotelmanagement-15e83-firebase-adminsdk-ghjmn-e7c0d32faa.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "hotelmanagement-15e83.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = bucket;

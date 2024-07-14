const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyDGiuc7CrLVI0fTKTBIzqmfH2e54-iYLJ4",
  authDomain: "hotelmanagement-15e83.firebaseapp.com",
  projectId: "hotelmanagement-15e83",
  storageBucket: "hotelmanagement-15e83.appspot.com",
  messagingSenderId: "264427076608",
  appId: "1:264427076608:web:852b64059d4574dc3dece5",
  measurementId: "G-BYFN1VPRNP"
};
  

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };

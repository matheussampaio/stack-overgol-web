const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.VUE_APP_FIREBASE_APP_NAME}.firebaseapp.com`,
  databaseURL: `https://${
    process.env.VUE_APP_FIREBASE_APP_NAME
  }.firebaseio.com`,
  projectId: `${process.env.VUE_APP_FIREBASE_APP_NAME}`,
  storageBucket: `${process.env.VUE_APP_FIREBASE_APP_NAME}.appspot.com`,
  messagingSenderId: "564241331900"
};

export default config;

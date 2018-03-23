const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_APP_NAME}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_APP_NAME}.firebaseio.com`,
  projectId: `${process.env.FIREBASE_APP_NAME}`,
  storageBucket: `${process.env.FIREBASE_APP_NAME}.appspot.com`,
  messagingSenderId: '564241331900'
}

export default config

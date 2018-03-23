import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCN44MXJmFQW42p8VIn7UXn7PxCf2rnVFM',
  authDomain: 'stack-overgol-bot.firebaseapp.com',
  databaseURL: 'https://stack-overgol-bot.firebaseio.com',
  projectId: 'stack-overgol-bot',
  storageBucket: 'stack-overgol-bot.appspot.com',
  messagingSenderId: '564241331900'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.database()

function sortUsers(u1, u2) {
  if (u1.first_name < u2.first_name) {
    return -1
  }

  if (u1.first_name > u2.first_name) {
    return 1
  }

  if (u1.last_name < u2.last_name) {
    return -1
  }

  if (u1.last_name > u2.last_name) {
    return 1
  }

  return 0
}

class Firebase {
  static onUserChanges(callback) {
    db.ref()
      .child('/users')
      .once('value')
      .then(snapshot => Object.values(snapshot.val()))
      .then(users => users.sort(sortUsers))
      .then(callback)
  }

  static queueUserUpdate(update) {
    db.ref()
      .child('/updates')
      .push(update)
  }
}

export default Firebase

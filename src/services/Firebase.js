import firebase from 'firebase'

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
    firebase.database()
      .ref()
      .child('/users')
      .on('value', (snapshot) => {
        const users = Object.values(snapshot.val())
        const sorted = users.sort(sortUsers)

        callback(sorted)
      })
  }

  static queueUserUpdate(update) {
    firebase.database()
      .ref()
      .child('/updates')
      .push(update)
  }
}

export default Firebase

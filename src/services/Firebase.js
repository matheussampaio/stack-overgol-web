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
    return firebase.database()
      .ref()
      .child('/users')
      .on('value', (snapshot) => {
        const users = Object.values(snapshot.val())
        const sorted = users.sort(sortUsers)

        callback(sorted)
      })
  }

  static queueUserUpdate(update) {
    console.log('queueUserUpdate', update)

    return firebase.database()
      .ref()
      .child('/updates')
      .push(update)
  }

  static updateWebUser(user) {
    const data = {
      display_name: user.displayName,
      email: user.email,
      uid: user.uid
    }

    console.log('updateWebUser', data)

    return firebase.database()
      .ref()
      .child('/web-users')
      .child(user.uid)
      .update(data)
  }

  static async isAdmin(user) {
    const snapshot = await firebase.database()
      .ref()
      .child('/web-users')
      .child(user.uid)
      .child('is_admin')
      .once('value')

    return snapshot.val()
  }
}

export default Firebase

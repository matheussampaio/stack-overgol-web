import React from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'

import TableRow from '../TableRow'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: `${process.env.FIREBASE_APP_NAME}.firebaseapp.com`,
      databaseURL: `https://${process.env.FIREBASE_APP_NAME}.firebaseio.com`,
      projectId: `${process.env.FIREBASE_APP_NAME}`,
      storageBucket: `${process.env.FIREBASE_APP_NAME}.appspot.com`,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }

    const db = firebase.database()

    db.ref().child('/users').once('value').then(s => {
      const users = Object.values(s.val()).sort((a, b) => {
        if (a.first_name < b.first_name) {
          return -1
        }

        if (a.first_name > b.first_name) {
          return 1
        }

        if (a.last_name < b.last_name) {
          return -1
        }

        if (a.last_name > b.last_name) {
          return 1
        }

        return 0
      })
      this.setState({ users })
    })
  }

  render() {
    return (
      <div>
        <h1>Soccer Web</h1>
        <table>
          <thead>
            <tr>
              <th>First Name</th><th>Last Name</th><th>Rating</th><th>Subcriber</th><th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users && this.state.users.map(user => <TableRow key={user.uid} user={user} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App

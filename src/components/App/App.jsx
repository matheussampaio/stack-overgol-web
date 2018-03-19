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
      apiKey: "AIzaSyCN44MXJmFQW42p8VIn7UXn7PxCf2rnVFM",
      authDomain: "stack-overgol-bot.firebaseapp.com",
      databaseURL: "https://stack-overgol-bot.firebaseio.com",
      projectId: "stack-overgol-bot",
      storageBucket: "stack-overgol-bot.appspot.com",
      messagingSenderId: "564241331900"
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }

    const db = firebase.database()

    db.ref().child('/users').once('value').then(s => {
      this.setState({ users: Object.values(s.val()) })
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

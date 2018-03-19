import _ from 'lodash'
import React from 'react'
import firebase from 'firebase'

import styles from './styles.css'

class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }

    const onValue = (snapshot) => {
        const users = snapshot.val()

        this.setState({
          users: _.values(users)
        })
    }

    firebase.database().ref('users/').on('value', onValue)
  }

  render() {
    return (
      <div>
        <h1>Table</h1>
        <ul>
          { this.state.users.map(user => <li key={user.uid}>{ user.first_name }</li>) }
        </ul>
      </div>
    )
  }
}

export default Table

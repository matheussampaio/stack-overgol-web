import React from 'react'
import firebase from 'firebase'
import { FirebaseAuth } from 'react-firebaseui'

import Table from '../Table'

const config = {
  apiKey: 'AIzaSyCN44MXJmFQW42p8VIn7UXn7PxCf2rnVFM',
  authDomain: 'stack-overgol-bot.firebaseapp.com',
  databaseURL: 'https://stack-overgol-bot.firebaseio.com',
  projectId: 'stack-overgol-bot',
  storageBucket: 'stack-overgol-bot.appspot.com',
  messagingSenderId: '564241331900'
}

// Avoids initializing the App again (Hot reloading)
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
}

class Firebase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }

    const onChange = (user) => {
      this.setState({ user })
    }

    const onError = (error) => {
      this.setState({ user: null })
    }

    firebase.auth()
      .onAuthStateChanged(onChange, onError)
  }

  render() {
    return (
      <div>
        { this.state.user ? <Table /> : <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> }
      </div>
    )
  }
}

export default Firebase

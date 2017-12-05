import React from 'react'
import * as ReactDOM from 'react-dom'

import Firebase from './components/Firebase'

const App = () => (
    <div>
        <h1>Hello World</h1>
        <Firebase />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))

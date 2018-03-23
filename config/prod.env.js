'use strict'

const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  FIREBASE_API_KEY: `"${process.env.FIREBASE_API_KEY}"`,
  FIREBASE_APP_NAME: `"${process.env.FIREBASE_APP_NAME}"`,
  NODE_ENV: '"production"'
}

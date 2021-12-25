const path = require('path')

require('dotenv').config()


module.exports = {
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}

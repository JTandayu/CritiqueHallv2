const path = require('path')

require('dotenv').config()


module.exports = {
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          }
        ]
      }
    ]
  }
}

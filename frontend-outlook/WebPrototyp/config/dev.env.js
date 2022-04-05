'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
require('dotenv').config();

/*module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})*/

module.exports = {
  NODE_ENV: '"development"',
  APP_ID: JSON.stringify(process.env.APP_ID),
  APP_PASSWORD: JSON.stringify(process.env.APP_PASSWORD),
  APP_SCOPES: JSON.stringify(process.env.APP_SCOPES),
  REDIRECT_URI: JSON.stringify(process.env.REDIRECT_URI)
}

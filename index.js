const express = require('express')

const { Nuxt } = require('nuxt')

const config = require('./nuxt.config.js')
const envVars = require('./envVars.js')
const port = process.env.PORT || 3000

const app = express()

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt({
    ...config,
    publicRuntimeConfig: {
      ...config.publicRuntimeConfig,
      ...(envVars || {})
    }
  })

  await nuxt.ready()

  // Add healthcheck endpoint
  app.get('/healthcheck-api-sit/*', (req, res) => {
    res.send('OK')
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port)
  console.log(`Server listening on ${port}`)
}

start()

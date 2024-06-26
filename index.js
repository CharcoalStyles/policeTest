const express = require('express')
const { Nuxt, Builder } = require('nuxt')

// Import and set Nuxt.js options
const config = require('./nuxt.config.js')
config.dev = false // Set to true if doing development wih the server
const port = process.env.PORT || 3000

const app = express()

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

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

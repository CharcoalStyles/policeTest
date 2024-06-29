const path = require('path')
const express = require('express')

const { Nuxt } = require('nuxt')

const config = require('./nuxt.config.js')
const port = process.env.PORT || 3000

const app = express()

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt({
    ...config,
    publicRuntimeConfig: {
      ...config.publicRuntimeConfig,
      SMB_SHARE_NAME: process.env.SMB_SHARE_NAME,
      FILE_SERVICE_SAS_URL: process.env.FILE_SERVICE_SAS_URL
    }
  })

app.use(express.static(path.join(__dirname, 'dist')))

// Catch-all route to serve index.html for any request that doesn't match a static file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Listen the server
app.listen(port)
console.log(`Server listening on ${port}`)

const path = require('path')
const express = require('express')

const port = process.env.PORT || 3000

const app = express()
// Add healthcheck endpoint
app.get('/healthcheck-api-sit/*', (req, res) => {
  res.send('OK')
})

app.use(express.static(path.join(__dirname, 'dist')))

// Catch-all route to serve index.html for any request that doesn't match a static file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Listen the server
app.listen(port)
console.log(`Server listening on ${port}`)

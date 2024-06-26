const express = require('express')
const app = express()
app.use(express.static('dist'))
const port = process.env.PORT || 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/healthcheck-api-sit/*', (req, res) => {
  res.send('OK')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

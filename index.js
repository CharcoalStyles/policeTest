const express = require('express')
const app = express()
app.use(express.static('dist'))
const port = 3002

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
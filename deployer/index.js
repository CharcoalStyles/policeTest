const path = require('path')
const express = require('express')
const axios = require('axios')

const port = process.env.PORT || 3000

const smbShareName = process.env.SMB_SHARE_NAME
const fileServiceSasUrl = process.env.FILE_SERVICE_SAS_URL

const app = express()
// Add healthcheck endpoint
app.get('/healthcheck-api-sit/*', (req, res) => {
  res.send('OK')
})

app.get('/api/:file/:action?', (req, res) => {
  if (smbShareName === undefined || fileServiceSasUrl === undefined) {
    res.status(500).send('Azure File Service environment variables not set')
    return
  }

  const file = req.params.file
  const metadata = req.params.action === 'metadata'

  const smbPath = smbShareName.split('\\')
  const share = smbPath[3]
  const dir = smbPath[4]
  const [url, sas] = fileServiceSasUrl.split('?')
  const finalUrl = `${url}${share}/${dir}/${file}.csv?${sas}`

  if (metadata) {
    const response = axios.head(`${finalUrl}&comp=metadata`)
    if (response.status === 200) {
      res.send(
        JSON.stringify({
          lastModified: response.headers['last-modified']
        })
      )
    }
    return
  }

  const response = axios.head(`${finalUrl}&comp=metadata`)
  if (response.status === 200) {
    res.set('Content-Type', 'application/json')

    res.send({
      file: response.data,
      lastUpdated: response.headers['last-modified']
    })
  } else {
    res.status(404).send(response.statusText)
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

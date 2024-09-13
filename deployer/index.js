const path = require('path')
const express = require('express')
const axios = require('axios')
const rateLimit = require('express-rate-limit')

const port = process.env.PORT || 3000

const smbShareName = process.env.SMB_SHARE_NAME
const fileServiceSasUrl = process.env.FILE_SERVICE_SAS_URL

const rateLimitWindowMs = process.env.RATE_LIMIT_WINDOW_MS || 60 * 1000
const rateLimitMax = process.env.RATE_LIMIT_MAX || 10000

const app = express()

// Add healthcheck endpoint
app.get('/healthcheck-api-sit/*', (req, res) => {
  res.send('OK')
})

const limiter = rateLimit({
  max: rateLimitMax, 
  windowMs: rateLimitWindowMs
})

app.use(limiter)

app.get('/api/:file/:action?', (req, res) => {
  req.
  if (smbShareName === undefined || fileServiceSasUrl === undefined) {
    res.status(500).send('Azure File Service environment variables not set')
    return
  }

  const file = req.params.file
  const metadata = req.params.action === 'metadata'

  if (file === undefined) {
    res.status(500).send('File not specified')
    return
  }

  const smbPath = smbShareName.split('\\')
  const share = smbPath[3]
  const dir = smbPath[4]
  const [url, sas] = fileServiceSasUrl.split('?')

  let finalUrl = `${url}${share}/${dir}/`
  switch (file.toLowerCase()) {
    case 'skills':
      finalUrl += `skills.csv?${sas}`
      break
    case 'capabilities':
      finalUrl += `capabilities.csv?${sas}`
      break
    case 'roles':
      finalUrl += `roles.csv?${sas}`
      break
    default:
      res.status(500).send('Incorrect file specified')
      return
  }

  if (metadata) {
    axios.head(`${finalUrl}&comp=metadata`)
      .then(response => {
        if (response.status === 200) {
          res.send(
            JSON.stringify({
              lastModified: response.headers['last-modified']
            })
          )
        }
      })
      .catch(error => {
        logErrors(error)
        res.status(500).send(error.message)
      })
    return
  }

  axios.get(`${finalUrl}`)
    .then(response => {
      if (response.status === 200) {
        res.set('Content-Type', 'application/json')

        res.send({
          file: response.data,
          lastUpdated: response.headers['last-modified']
        })
      }
    }).catch(error => {
      logErrors(error)
      res.status(500).send(error.message)
    })
})

app.use(express.static(path.join(__dirname, 'dist')))

// Catch-all route to serve index.html for any request that doesn't match a static file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Listen the server
app.listen(port)
console.log(`Server listening on ${port}`)

const logErrors = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('data', error.response.data)
    console.log('status', error.response.status)
    console.log('headers', error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // and an instance of http.ClientRequest in node.js
    console.log('request', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
}

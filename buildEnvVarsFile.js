const fs = require('fs')

const fileName = 'envVars.js'

fs.writeFile(fileName, '', (err) => {
  if (err) {
    console.error(err)
  }
})

// Add Env Vars to file
fs.appendFile(fileName, `module.exports = {
  SMB_SHARE_NAME: process.env.SMB_SHARE_NAME || '${process.env.SMB_SHARE_NAME}',
  FILE_SERVICE_SAS_URL: process.env.FILE_SERVICE_SAS_URL || '${process.env.FILE_SERVICE_SAS_URL}'
}`, (err) => {
  if (err) {
    console.error(err)
  }
})

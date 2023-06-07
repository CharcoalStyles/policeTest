const fs = require('fs')
const papa = require('papaparse')

/**
 * Import using the "yarn run import filename.csv" command
 * Note: Import defaults to roles.csv if argument not supplied
 */

// Establish csv filename
const filename = process.argv.slice(2).length ? process.argv.slice(2)[0] : 'resources.csv'

// Import roles csv and rename headers
const rolesCsvData = papa.parse(fs.readFileSync(filename, 'utf8'), {
  header: true,
  skipEmptyLines: true,
  transformHeader: h => {
    return h.replace(/\s/g, '_').toLowerCase()
  }
})

// Init empty roles
const resources = []

const parseRoleFunctions = roleFunctions => {
  return roleFunctions.replace(/(\r\n|\n|\r)/gm, '').split(',')
}

const parseFormat = format => {
  return format.replace('-', '').toLowerCase()
}

const uppercaseWords = sentence => {
  return sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

// Transform role data with parsers
rolesCsvData.data.forEach(row => {
  resources.push({
    id: parseInt(row.id),
    title: row.title,
    url: row.url,
    roleFunctions: parseRoleFunctions(row.role_function),
    author: row.author,
    level: uppercaseWords(row.role_level),
    format: parseFormat(row.format),
    default: Boolean(row.default)
  })
})

// Write to json file on disk
fs.writeFileSync('resources.json', JSON.stringify(resources))

console.log(`Imported ${resources.length} upskilling resources successfully`)
console.log('Saved to: resources.json')

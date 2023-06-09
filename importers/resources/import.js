const fs = require('fs')
const papa = require('papaparse')

/**
 * Import using the "yarn run import filename.csv" command
 * Note: Import defaults to resources.csv if argument not supplied
 */

// Establish csv filename
const filename = process.argv.slice(2).length
  ? process.argv.slice(2)[0]
  : 'resources.csv'

// Import resources csv and rename headers
const resourcesCsvData = papa.parse(fs.readFileSync(filename, 'utf8'), {
  header: true,
  skipEmptyLines: true,
  transformHeader: (h) => {
    return h.replace(/\s/g, '_').toLowerCase()
  }
})

// Init empty resources
const resources = []

resourcesCsvData.data.forEach((row, index) => {
  resources.push({
    id: index + 1,
    title: row.title,
    description: row.description, // NEW
    url: row.learning_resource_url,
    skills: row.skills.split(','), // NEW
    roleFunctions: [], // Not included in the CSV
    author: row.author,
    level: '', // Not indluded in the CSV
    format: row.format,
    default: undefined, // Not included in the CSV
    cost: row.cost, // NEW
    duration: row.duration // NEW
  })
})

// Write to json file on disk
fs.writeFileSync('resources.json', JSON.stringify(resources))

console.log(`Imported ${resources.length} roles successfully`)
console.log('Saved to: resources.json')

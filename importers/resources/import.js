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

/**
 * Parse the combinaed core & specific and level
 * @param {string} item
 */
const codeLevelParser = (item) => {
  const array = []
  if (!item) {
    return array
  }
  const cleanedItem = item.replace(/\s/g, '').split(',')

  cleanedItem.forEach((item) => {
    array.push({
      code: item.replace(/[^a-zA-Z]+/g, ''),
      level: item.replace(/\D/g, '')
    })
  })

  return array
}

const parseFormat = format => {
  return format.replace('-', '').split(';')
}

const parseDefault = recommended => {
  return recommended === '1'
}

// Init empty resources
const resources = []

resourcesCsvData.data.forEach((row, index) => {
  resources.push({
    id: index + 1,
    title: row.title,
    description: row.description, // NEW
    url: row.learning_resource_url,
    // skills: row.skills.split(','), // NEW
    coreCapabilities: row.nsw_public_sector_capability_framework.split(','),
    specificCapabilities: row.procurement_professionals_capability_set.split(','),
    roleFunctions: [], // Not included in the CSV
    author: row.author,
    level: '', // Not indluded in the CSV
    // format: row.format,
    format: parseFormat(row.format),
    default: parseDefault(row.recommended), // Not included in the CSV
    cost: row.cost, // NEW
    duration: row.duration, // NEW
    skills: codeLevelParser(row.procurement_professionals_capability_set), // parse as array
    capabilities: codeLevelParser(row.nsw_public_sector_capability_framework)
  })
})

// Write to json file on disk
fs.writeFileSync('resources.json', JSON.stringify(resources))

console.log(`Imported ${resources.length} roles successfully`)
console.log('Saved to: resources.json')

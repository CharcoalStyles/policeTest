const fs = require('fs')
const papa = require('papaparse')

/**
 * Import using the "yarn run import filename.csv" command
 * Note: Import defaults to capabilities.csv if argument not supplied
 */

// Establish csv filename
const filename = process.argv.slice(2).length
  ? process.argv.slice(2)[0]
  : 'capabilities.csv'

// Import capabilities csv and rename headers
const capabilitiesCsvData = papa.parse(fs.readFileSync(filename, 'utf8'), {
  header: true,
  skipEmptyLines: true,
  transformHeader: (h) => {
    return h.replace(/\s/g, '_').toLowerCase()
  }
})

// Init empty capabilities
const capabilities = []

// Init empty levels
const levels = {}

capabilitiesCsvData.data.forEach((row) => {
  if (!levels?.[row.subcategory_code]) {
    levels[row.subcategory_code] = []
  }
  const attributes = Array.apply(null, Array(7))
    .map((_, i) => {
      return row[`attribute_${i + 1}`] || undefined
    })
    .filter((v) => v)
  levels[row.subcategory_code].push({
    level: parseInt(row.level),
    name: row.level_name,
    easyDescription: row.leveldescription,
    attributes
  })
})

capabilitiesCsvData.data.forEach((row) => {
  if (capabilities.find((item) => item.subcode === row.subcategory_code)) {
    return false
  }
  capabilities.push({
    code: row.code,
    category: row.category,
    subcode: row.subcategory_code,
    subcategory: row.subcategory,
    description: row.subcategory_description,
    levels: levels[row.subcategory_code]
  })
})

// Write to json file on disk
fs.writeFileSync('capabilities.json', JSON.stringify(capabilities))

console.log(`Imported ${capabilities.length} roles successfully`)
console.log('Saved to: capabilities.json')

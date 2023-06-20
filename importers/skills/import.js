const fs = require('fs')
const papa = require('papaparse')

/**
 * Import using the "yarn run import filename.csv" command
 * Note: Import defaults to skills.csv if argument not supplied
 */

// Establish csv filename
const filename = process.argv.slice(2).length
  ? process.argv.slice(2)[0]
  : 'skills.csv'

// Import skills csv and rename headers
const skillsCsvData = papa.parse(fs.readFileSync(filename, 'utf8'), {
  header: true,
  skipEmptyLines: true,
  transformHeader: (h) => {
    return h.replace(/\s/g, '_').toLowerCase()
  }
})

// Init empty skills
const skills = []

// Init empty levels
const levels = {}

skillsCsvData.data.forEach((row) => {
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

skillsCsvData.data.forEach((row) => {
  if (skills.find((item) => item.code === row.subcategory_code)) {
    return false
  }
  skills.push({
    name: row.subcategory,
    code: row.subcategory_code,
    category: row.subcategory,
    description: row.subcategory_description,
    levels: levels[row.subcategory_code]
  })
})

// Write to json file on disk
fs.writeFileSync('skills.json', JSON.stringify(skills))

console.log(`Imported ${skills.length} roles successfully`)
console.log('Saved to: skills.json')

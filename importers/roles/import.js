const fs = require('fs')
const papa = require('papaparse')

/**
 * Import using the "yarn run import filename.csv" command
 * Note: Import defaults to roles.csv if argument not supplied
 */

// const ROLE_GRADES = [
//   '3-4',
//   '5-6',
//   '7-8',
//   '9-10',
//   '11-12',
//   'PSSE Band 1',
//   'PSSE Band 2',
// ]
const ROLE_GRADES = [
  'Clerk Grade 3/4',
  'Clerk Grade 5/6',
  'Clerk Grade 7/8',
  'Clerk Grade 9/10',
  'Clerk Grade 11/12',
  'PSSE Band 1',
  'PSSE Band 2'
]

// Establish csv filename
const filename = process.argv.slice(2).length
  ? process.argv.slice(2)[0]
  : 'roles.csv'

// Import roles csv and rename headers
const rolesCsvData = papa.parse(fs.readFileSync(filename, 'utf8'), {
  header: true,
  skipEmptyLines: true,
  transformHeader: (h) => {
    return h.replace(/\s/g, '_').toLowerCase()
  }
})

// Init empty roles
const roles = []

/**
 * Parse grade id to int via lookup table
 * @param {string} grade
 */
const gradeIdParser = (grade) => {
  return ROLE_GRADES.findIndex((g) => g === grade)
}

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

/**
 * Remove breaks and double spaces
 */
const parseDescription = (description) => {
  return description.replace(/(\r\n|\n|\r)/gm, '').replace('  ', ' ')
}

/**
 * Parse a manager to bool
 * @param {string} manager
 */
const parseManager = (manager) => {
  return manager === '1'
}

/**
 * Parse a salary string to int
 * @param {string} salary
 */
const parseSalary = (salary) => {
  return parseInt(salary.replace(',', '').replace('$', ''))
}

const parseAlias = (row) => {
  if (row) {
    return row.split(', ')
  }
  return []
}


rolesCsvData.data.slice(0,5).forEach((testRole) => {
console.log({
  name: testRole.role,
  familyFunction: testRole.job_family,
  familyRole: testRole.job_role,
  roleFunction: testRole.job_function
});
});


// Transform role data with parsers
rolesCsvData.data.forEach((row, i) => {
  roles.push({
    id: i, //parseInt(row.id),
    name: row.role,
    grade: row.grade,
    gradeId: gradeIdParser(row.grade), // parse via lookup table
    familyFunction: row.job_family,
    familyRole: row.job_role,
    roleFunction: row.job_function,
    description: parseDescription(row.purpose),
    manager: parseManager(row.manager), // parse as bool
    salary: {
      min: parseSalary(row.salary_min),
      max: parseSalary(row.salary_max)
    },
    skills: {
      focus: codeLevelParser(row.occupation_specific_focus) // parse as array
    },
    capabilities: {
      focus: codeLevelParser(row.nswg_capabilities_focus) // parse as array
    },
    alias: parseAlias(row.alias),
    genericRole: !!row.generic_role
  })
})

// Write to json file on disk
fs.writeFileSync('roles.json', JSON.stringify(roles))

console.log(`Imported ${roles.length} roles successfully`)
console.log('Saved to: roles.json')

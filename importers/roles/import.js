const fs = require('fs')
const papa = require('papaparse')

/**
 * Import using the 'yarn run import filename.csv' command
 * Note: Import defaults to roles.csv if argument not supplied
 */

const allCapabilities = {
  display_resilience_and_courage_: {
    category: 'PAAT',
    subcategory: 'DIRE'
  },
  act_with_integrity_: {
    category: 'PAAT',
    subcategory: 'ACWI'
  },
  manage_self_: {
    category: 'PAAT',
    subcategory: 'MASE'
  },
  value_diversity_: {
    category: 'PAAT',
    subcategory: 'VADI'
  },
  communicate_effectively: {
    category: 'RELA',
    subcategory: 'COEF'
  },
  commit_to_customer_service: {
    category: 'RELA',
    subcategory: 'COTO'
  },
  work_collaboratively: {
    category: 'RELA',
    subcategory: 'WOCO'
  },
  influence_and_negotiate_: {
    category: 'RELA',
    subcategory: 'INAN'
  },
  deliver_results_: {
    category: 'RESU',
    subcategory: 'DERE'
  },
  plan_and_prioritise: {
    category: 'RESU',
    subcategory: 'PLAN'
  },
  think_and_solve_problems: {
    category: 'RESU',
    subcategory: 'THAN'
  },
  demonstrate_accountability: {
    category: 'RESU',
    subcategory: 'DEAC'
  },
  finance_: {
    category: 'BUEN',
    subcategory: 'FINA'
  },
  technology_: {
    category: 'BUEN',
    subcategory: 'TECH'
  },
  procurement_and_contract_management_: {
    category: 'BUEN',
    subcategory: 'PRAN'
  },
  project_management_: {
    category: 'BUEN',
    subcategory: 'PRMA'
  },
  manage_and_develop_people: {
    category: 'PEMA',
    subcategory: 'MAAN'
  },
  inspire_direction_and_purpose: {
    category: 'PEMA',
    subcategory: 'INDI'
  },
  optimise_business_outcomes: {
    category: 'PEMA',
    subcategory: 'OPBU'
  },
  manage_reform_and_change: {
    category: 'PEMA',
    subcategory: 'MARE'
  }
}

const capabilityLevels = [
  'Foundational',
  'Intermediate',
  'Adept',
  'Advanced',
  'Highly Advanced'
]

// Establish csv filename
const filename = process.argv.slice(2).length
  ? process.argv.slice(2)[0]
  : 'roles.csv'

const file = fs.readFileSync(filename, 'utf-8')

// Import roles csv and rename headers
const rolesCsvData = papa.parse(file, {
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
 * @param {string} gradeData
 */
const gradeIdParser = (gradeData, family) => {
  let type = ''
  let grade = -1
  switch (family) {
    case 'Policing':
      type = 'policing'

      switch (gradeData.split('/').map(x => x.replace('Detective ', '')).map(x => x.trim()).join(' / ')) {
        case 'Probationary Constable':
          grade = 1
          break
        case 'Constable':
        case 'Constable / Senior Constable':
          grade = 2
          break
        case 'Senior Constable':
          grade = 3
          break
        case 'Sergeant':
        case 'Senior Sergeant':
          grade = 4
          break
        case 'Inspector':
          grade = 5
          break
        case 'Superintendent':
          grade = 6
          break
      }

      if (gradeData === 'Detective') {
        grade = 3
      }

      return {
        type,
        grade
      }
    default:
      type = 'clerk'

      switch (gradeData.replace('Clerk', '')[1]) {
        case '1/2':
          grade = 1
          break
        case '3/4':
        case '3':
          grade = 2
          break
        case '5/6':
        case '5':
          grade = 3
          break
        case '7/8':
          grade = 4
          break
        case '9/10':
          grade = 5
          break
        case '11/12':
          grade = 6
          break
      }
      return {
        type,
        grade
      }
  }
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

const parseAlias = (row) => {
  if (row) {
    return row.split(', ')
  }
  return []
}

const keys = Object.keys(rolesCsvData.data[0])
fs.writeFileSync('keys.json', JSON.stringify(keys))

const ids = []
// Transform role data with parsers
rolesCsvData.data.forEach((row, i) => {
  if (row.job_family === '' || row.job_role === '' || row.job_function === '' || row.command_BusUnit === '') {
    return
  }
  roles.push({
    id: row.nswpf_role_number,
    roleNumber: row.nswpf_role_number,
    fullDescription: row.link_to_full_role_description,
    numPositions: row.number_of_positions.trim(),
    command_BusUnit: row['new_-__command/business_unit'].trim(),
    name: row.role,
    grade: row['new_-_grade'],
    gradeId: gradeIdParser(row['new_-_grade'], row.job_family),
    jobFamily: row.job_family === 'Development program' ? 'Policing' : row.job_family,
    jobRole: row.job_role,
    jobFunction: row.job_function,
    description: parseDescription(row.purpose),
    essentialRequirements: row.essential_requirements,
    essential: {
      detective: row['new_-_grade'].includes('Detective'),
      aboriginality: row.aboriginality_y === 'Y'
    },
    location: row['new_-_location'],
    manager: parseManager(row.manager), // parse as bool
    salary: {
      min: parseInt(row.salary_min),
      max: parseInt(row.salary_max)
    },
    skills: {
      focus: codeLevelParser(row.occupation_specific_focus) // parse as array
    },
    capabilities: {
      focus: codeLevelParser(row.nswg_capabilities_focus), // parse as array
      all: Object.keys(allCapabilities).map((key) => {
        if (row[key] === 0) {
          return {
            code: 'NULL',
            level: -1
          }
        }

        const cap = allCapabilities[key].subcategory
        const level = capabilityLevels.indexOf(row[key]) + 1
        return {
          code: cap,
          level
        }
      })
    },
    alias: parseAlias(row.alias),
    genericRole: !!row.generic_role
  })

  ids.push({ i, nswpf_id: row.nswpf_role_number })
})

// Write to json file on disk
fs.writeFileSync('roles.json', JSON.stringify(roles))

console.log(`Imported ${roles.length} roles successfully`)
console.log('Saved to: roles.json')

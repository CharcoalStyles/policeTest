/* eslint-disable space-before-function-paren */
import axios from 'axios'
import { process as processRoles } from '../utils/importers/role'
import { process as processSkills } from '../utils/importers/skills'
import { process as processCapabilities } from '../utils/importers/capabilities'

export default ({ $config }, inject) => {
  if ($config.DEVELOPMENT_MODE) {
    console.warn('azure loader disabled, using old static data')
    console.warn('This should only be used for development')

    inject('azureLoader', {
      getRoleUpdateDate: () => Promise.resolve('local'),
      getSkillUpdateDate: () => Promise.resolve('local'),
      getCapabilityUpdateDate: () => Promise.resolve('local'),
      loadRoles: async () => {
        const response = await axios.get('/test-data/roles.csv')
        return parseRoles({
          file: response.data,
          lastUpdated: 'local'
        })
      },
      loadSkills: async () => {
        const response = await axios.get('/test-data/skills.csv')
        return parseSkills({
          file: response.data,
          lastUpdated: 'local'
        })
      },
      loadCapabilities: async () => {
        const response = await axios.get('/test-data/capabilities.csv')
        return parseCapabilities({
          file: response.data,
          lastUpdated: 'local'
        })
      }
    })
    return
  }

  inject('azureLoader', {
    getRoleUpdateDate: async () => {
      return await getLastModifiedDate('roles')
    },
    getSkillUpdateDate: async () => {
      return await getLastModifiedDate('skills')
    },
    getCapabilityUpdateDate: async () => {
      return await getLastModifiedDate('capabilities')
    },
    loadRoles: async () => {
      const response = await getFile('roles')
      return parseRoles(response)
    },
    loadSkills: async () => {
      const response = await getFile('skills')
      return parseSkills(response)
    },
    loadCapabilities: async () => {
      const response = await getFile('capabilities')
      return parseCapabilities(response)
    }
  })
}

async function getLastModifiedDate(fileName) {
  try {
    const response = await axios.get(`/api/${fileName}/metadata`)
    if (response.status === 500) {
      throw new Error('Azure loader not configured in API')
    }
    if (response.status === 200) {
      return response['last-modified']
    }
  } catch (e) {
    if (e.response.data) {
      console.error(e.response.data)
    } else {
      console.error(e)
    }
    return 'error'
  }
}

async function getFile(fileName) {
  try {
    const response = await axios.get(`/api/${fileName}`)
    if (response.status === 500) {
      throw new Error('Azure loader not configured in API')
    }
    if (response.status === 200) {
      return {
        file: response.data,
        lastUpdated: response.headers['last-modified']
      }
    }
  } catch (e) {
    if (e.response.data) {
      console.error(e.response.data)
    } else {
      console.error(e)
    }
    return {
      file: '',
      lastUpdated: 'error'
    }
  }
}

export function parseRoles({ file, lastUpdated }) {
  const processed = processRoles(file)
  return {
    data: processed,
    lastUpdated
  }
}

export function parseSkills({ file, lastUpdated }) {
  const processed = processSkills(file)
  return {
    data: processed,
    lastUpdated
  }
}

export function parseCapabilities({ file, lastUpdated }) {
  const processed = processCapabilities(file)
  return {
    data: processed,
    lastUpdated
  }
}

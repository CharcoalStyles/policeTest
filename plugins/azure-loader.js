/* eslint-disable space-before-function-paren */
import axios from 'axios'
import { process as processRoles } from '../utils/importers/role'
import { process as processSkills } from '../utils/importers/skills'
import { process as processCapabilities } from '../utils/importers/capabilities'

export default ({ $config }, inject) => {
  if ($config.SMB_SHARE_NAME === undefined || $config.FILE_SERVICE_SAS_URL === undefined) {
    console.warn('azure loader disabled, using old static data')
    console.warn('This should only be used for development')

    inject('azureLoader', {
      getRoleUpdateDate: axGetRoleUpdateDate,
      getSkillUpdateDate: axGetSkillUpdateDate,
      getCapabilityUpdateDate: axGetCapabilityUpdateDate,
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

  const smbPath = $config.SMB_SHARE_NAME.split('\\')
  const share = smbPath[3]
  const dir = smbPath[4]

  const sasUrl = $config.FILE_SERVICE_SAS_URL

  inject('azureLoader', {
    getRoleUpdateDate: async () => {
      return await getLastModifiedDate('roles.csv', sasUrl, share, dir)
    },
    getSkillUpdateDate: async () => {
      return await getLastModifiedDate('skills.csv', sasUrl, share, dir)
    },
    getCapabilityUpdateDate: async () => {
      return await getLastModifiedDate('capabilities.csv', sasUrl, share, dir)
    },
    loadRoles: async () => {
      const response = await getFile('roles.csv', sasUrl, share, dir)
      return parseRoles(response)
    },
    loadSkills: async () => {
      const response = await getFile('skills.csv', sasUrl, share, dir)
      return parseSkills(response)
    },
    loadCapabilities: async () => {
      const response = await getFile('capabilities.csv', sasUrl, share, dir)
      return parseCapabilities(response)
    }
  })
}

async function getLastModifiedDate(fileName, sasUrl, shareName, dir) {
  const [url, sas] = sasUrl.split('?')
  const finalUrl = `${url}${shareName}/${dir}/${fileName}?${sas}&comp=metadata`
  const response = await axios.head(finalUrl)
  if (response.status === 200) {
    return response.headers['last-modified']
  }
  return '2023-01-01'
}

async function getFile(fileName, sasUrl, shareName, dir) {
  const [url, sas] = sasUrl.split('?')
  const finalUrl = `${url}${shareName}/${dir}/${fileName}?${sas}`
  const response = await axios.get(finalUrl)
  if (response.status === 200) {
    return {
      file: response.data,
      lastUpdated: response.headers['last-modified']
    }
  }
  return {
    file: '',
    lastUpdated: '2023-01-01'
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

export async function axGetRoleUpdateDate() {
  return await Promise.resolve('2024-01-01')
}
export async function axGetSkillUpdateDate() {
  return await Promise.resolve('2024-01-01')
}

export async function axGetCapabilityUpdateDate() {
  return await Promise.resolve('2024-01-01')
}

import axios from 'axios'
import { process as processRoles } from './importers/role'
import { process as processSkills } from './importers/skills'
import { process as processCapabilities } from './importers/capabilities'

export async function getRoleUpdateDate() {
  return await Promise.resolve('2023-01-01')
}

export async function getSkillUpdateDate() {
  return await Promise.resolve('2023-01-01')
}

export async function getCapabilityUpdateDate() {
  return await Promise.resolve('2023-01-01')
}

export async function loadRoles() {
  try {
    const response = await axios.get('/test-data/roles.csv')
    const processed = processRoles(response.data)
    return {
      data: processed,
      lastUpdated: await getRoleUpdateDate()
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

export async function loadSkills() {
  try {
    const response = await axios.get('/test-data/skills.csv')
    const processed = processSkills(response.data)
    return {
      data: processed,
      lastUpdated: await getRoleUpdateDate()
    }
  } catch (error) {
    console.error('Failed to load skills:', error)
  }
}

export async function loadCapabilities() {
  try {
    const response = await axios.get('/test-data/capabilities.csv')
    const processed = processCapabilities(response.data)
    return {
      data: processed,
      lastUpdated: await getRoleUpdateDate()
    }
  } catch (error) {
    console.error('Failed to load capabilities:', error)
  }
}

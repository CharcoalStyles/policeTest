import axios from 'axios'

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
    const response = await axios.get('/test-data/roles.json')
    return {
      data: response.data,
      lastUpdated: await getRoleUpdateDate()
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

export async function loadSkills() {
  try {
    const response = await axios.get('/test-data/skills.json')
    return {
      data: response.data,
      lastUpdated: await getRoleUpdateDate()
    }
  } catch (error) {
    console.error('Failed to load skills:', error)
  }
}

export async function loadCapabilities() {
  try {
    const response = await axios.get('/test-data/capabilities.json')
    return {
      data: response.data,
      lastUpdated: await getRoleUpdateDate()
    }
  } catch (error) {
    console.error('Failed to load capabilities:', error)
  }
}

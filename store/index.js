import Vue from 'vue'
import collect from 'collect.js'
import steps from '@/data/steps.json'
import checkConditions from '@/utils/conditions'
import isAssessible from '@/utils/assessible'

const state = () => ({
  roles: [],
  skills: [],
  capabilities: [],
  dataUpdated: {
    roles: null,
    skills: null,
    capabilities: null
  },
  pathway: {
    completed: false,
    steps,
    answers: {
      skills: {},
      capabilities: {}
    },
    history: []
  }
})

const getters = {
  // Filter steps based on conditions and answers
  filteredSteps: (state) => {
    return state.pathway.steps.filter((step) => {
      return checkConditions(step, state.pathway.answers)
    })
  },
  flattenedSteps: (state, getters) => {
    const stepKeys = []
    // Combine steps and child steps into simple aray
    getters.filteredSteps.forEach((parentStep) => {
      stepKeys.push(parentStep.id)
      if (parentStep.steps) {
        parentStep.steps.forEach((childStep) => {
          stepKeys.push(`${parentStep.id}-${childStep.id}`)
        })
      }
    })
    return stepKeys
  },
  totalSteps: (state, getters) => {
    return getters.flattenedSteps.length
  },
  getStepById: (state, getters) => (stepId) => {
    return getters.filteredSteps.find((step) => step.id === stepId)
  },
  getStepIndex: (state, getters) => (stepId) => {
    return getters.filteredSteps.findIndex((step) => step.id === stepId)
  },
  getNextStepByCurrentIndex: (state, getters) => (index) => {
    return getters.filteredSteps[index + 1]
  },
  getPreviousStepByCurrentIndex: (state, getters) => (index) => {
    return getters.filteredSteps[index - 1]
  },
  getChildStepById: (state, getters) => (stepId, childStepId) => {
    return getters
      .getStepById(stepId)
      .steps.find((step) => step.id === childStepId)
  },
  getChildStepIndex: (state, getters) => (stepId, childStepId) => {
    return getters
      .getStepById(stepId)
      .steps.findIndex((step) => step.id === childStepId)
  },
  getNextChildStepByCurrentIndex: (state, getters) => (stepId, index) => {
    return getters.getStepById(stepId).steps[index + 1]
  },
  getPreviousChildStepByCurrentIndex: (state, getters) => (stepId, index) => {
    return getters.getStepById(stepId).steps[index - 1]
  },
  getRoleByCode: (state, getters) => (roleCode) => {
    return state.roles.find((role) => role.id === roleCode)
  },
  answers: (state) => {
    return state.pathway.answers
  },
  getHumanReadableAnswerValue: (state, getters) => (stepId) => {
    const answer = state.pathway.answers?.[stepId]

    // Check if the answer exists
    if (!answer) {
      return false
    }

    // Find the field type using the schema to reconcile the human readable values
    const step = getters.getStepById(stepId)

    // Return human readable values based on field type
    switch (step.schema.field.type) {
      case 'checkbox':
        return collect(step.schema.field.options)
          .whereIn('value', answer.value)
          .pluck('title')
          .all()
          .join(', ')
        break

      case 'radio':
        return collect(step.schema.field.options)
          .where('value', answer.value)
          .first().title
        break

      default:
        return answer.value
        break
    }
  }
}

const mutations = {
  SET_ROLES(state, data) {
    state.roles = data.data
    state.dataUpdated.roles = data.lastUpdated
  },

  SET_SKILLS(state, data) {
    state.skills = data.data
    state.dataUpdated.skills = data.lastUpdated
  },

  SET_CAPABILITIES(state, data) {
    state.capabilities = data.data
    state.dataUpdated.capabilities = data.lastUpdated
  },

  SET_SALARY_STATS(state, data) {
    state.salaryStats = data
  },

  SET_ANSWER(state, payload) {
    Vue.set(state.pathway.answers, payload.id, {
      ...state.pathway.answers[payload.id],
      ...payload
    })
  },

  SET_SKILL_ANSWER(state, payload) {
    Vue.set(state.pathway.answers.skills, payload.id, {
      ...state.pathway.answers.skills[payload.id],
      ...payload
    })
  },

  SET_CAPABILITY_ANSWER(state, payload) {
    Vue.set(state.pathway.answers.capabilities, payload.id, {
      ...state.pathway.answers.capabilities[payload.id],
      ...payload
    })
  },

  ADD_SKILL_AND_CAPABILITY_ASSESSMENT(state, payload) {
    const skillAndCapabilityStepIndex = state.pathway.steps.findIndex(
      (step) => step.id === 'skills-and-capabilities'
    )

    // Reset in case any have already been set
    state.pathway.steps[skillAndCapabilityStepIndex].steps = []

    // Add new
    const steps = []

    // Generate dynamic skill child steps
    payload.value.skills.focus
      .reduce((acc, skill) => {
        if (!acc.find((s) => s.code === skill.code)) {
          acc.push(skill)
        }
        return acc
      }, [])
      .forEach((skill) => {
        const currentSkill = state.skills.find((s) => s.code === skill.code)

        if (currentSkill) {
          const childStep = {
            id: currentSkill.code,
            title: currentSkill.name,
            type: 'question',
            schema: {
              section: 'Self Assessment - Skills',
              help: currentSkill.description,
              field: {
                type: 'skill',
                required: true,
                options: currentSkill.levels
              },
              value: null
            }
          }
          steps.push(childStep)
        } else {
          console.warn(`No Skill found for: ${skill.code}`)
        }
      })

    payload.value.capabilities.focus
      .reduce((acc, capability) => {
        if (!acc.find((c) => c.code === capability.code)) {
          acc.push(capability)
        }
        return acc
      }, [])
      .forEach((capability) => {
        const currentCapability = state.capabilities.find(
          (c) => c.subcode === capability.code
        )

        const childStep = {
          id: currentCapability.subcode,
          title: currentCapability.subcategory,
          type: 'question',
          schema: {
            section: 'Self Assessment - Capability',
            help: currentCapability.description,
            field: {
              type: 'capability',
              required: true,
              options: currentCapability.levels
            },
            value: null
          }
        }

        steps.push(childStep)
      })

    // Add generated skill and capability child steps
    state.pathway.steps[skillAndCapabilityStepIndex].steps = steps
  },

  CLEAR_SKILL_AND_CAPABILITY_ASSESSMENT(state, payload) {
    const skillStepIndex = state.pathway.steps.findIndex(
      (step) => step.id === 'skills-and-capabilities'
    )
    state.pathway.steps[skillStepIndex].steps = []
  },

  CLEAR_SKILL_ANSWERS(state) {
    state.pathway.answers.skills = {}
  },

  CLEAR_CAPABILITY_ANSWERS(state) {
    state.pathway.answers.capabilities = {}
  },

  SET_QUESTIONS_COMPLETE(state) {
    state.pathway.completed = true
  },

  REMOVE_ANSWER(state, payload) {
    Vue.delete(state.pathway.answers, payload.id)
  }
}

const actions = {
  async loadRoles({ commit, state }) {
    const lastUpdated = await this.$azureLoader.getRoleUpdateDate()
    if (state.dataUpdated.roles && state.dataUpdated.roles === lastUpdated) {
      return
    }
    const roles = await this.$azureLoader.loadRoles()
    commit('SET_ROLES', roles)
    const salaryMinRange = roles.data.reduce(
      (acc, role) => {
        if (role.salary.min) {
          acc.minRange.min = Math.min(acc.minRange.min, role.salary.min)
          acc.minRange.max = Math.max(acc.minRange.max, role.salary.min)
        }
        if (role.salary.max) {
          acc.maxRange.min = Math.min(acc.maxRange.min, role.salary.max)
          acc.maxRange.max = Math.max(acc.maxRange.max, role.salary.max)
        }
        return acc
      },
      {
        minRange: {
          min: 1000000,
          max: 0
        },
        maxRange: {
          min: 1000000,
          max: 0
        }
      }
    )

    commit('SET_SALARY_STATS', salaryMinRange)
  },
  async loadSkills({ commit, state }) {
    const lastUpdated = await this.$azureLoader.getSkillUpdateDate()
    if (state.dataUpdated.skills && state.dataUpdated.skills === lastUpdated) {
      return
    }
    const skills = await this.$azureLoader.loadSkills()
    commit('SET_SKILLS', skills)
  },
  async loadCapabilities({ commit, state }) {
    const lastUpdated = await this.$azureLoader.getCapabilityUpdateDate()
    if (
      state.dataUpdated.capabilities &&
      state.dataUpdated.capabilities === lastUpdated
    ) {
      return
    }
    const capabilities = await this.$azureLoader.loadCapabilities()
    commit('SET_CAPABILITIES', capabilities)
  },
  saveQuestionAnswer({ commit, state }, payload) {
    // Save answer to store
    commit('SET_ANSWER', payload)

    // Add skills and capability steps
    if (isAssessible(state.pathway.steps, payload.id)) {
      if (payload.value) {
        commit('ADD_SKILL_AND_CAPABILITY_ASSESSMENT', payload)
      } else {
        commit('CLEAR_SKILL_AND_CAPABILITY_ASSESSMENT', payload)
        commit('CLEAR_SKILL_ANSWERS')
        commit('CLEAR_CAPABILITY_ANSWERS')
      }
    }

    if (payload.id === 'goal' && payload.value === 'no') {
      commit('REMOVE_ANSWER', {
        id: 'goal-role'
      })
    }
  },
  removeAnswer({ commit }, payload) {
    commit('REMOVE_ANSWER', payload)
  },
  saveSkillAnswer({ commit }, payload) {
    commit('SET_SKILL_ANSWER', payload)
  },
  saveCapabilityAnswer({ commit }, payload) {
    commit('SET_CAPABILITY_ANSWER', payload)
  },
  markQuestionsComplete({ commit }, payload) {
    commit('SET_QUESTIONS_COMPLETE')
  }
}

export { state, getters, mutations, actions }

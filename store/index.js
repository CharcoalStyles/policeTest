import Vue from 'vue'
import collect from 'collect.js'
import roles from '@/data/roles.json'
import skills from '@/data/skills.json'
import capabilities from '@/data/capabilities.json'
import steps from '@/data/steps.json'
import checkConditions from '@/utils/conditions'
import isAssessible from '@/utils/assessible'

// eslint-disable-next-line no-control-regex
const re = /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g

const state = () => ({
  roles: roles.map((role) => {
    return {
      ...role,
      name: role.name.replace(re, ''),
      fullDescription: role.fullDescription.replace(re, '')
    }
  }),
  skills,
  capabilities,
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

  ADD_SKILL_ASSESSMENT(state, payload) {
    console.log('Adding skill assessment')
    console.log(payload, state.pathway)
    const skillStepIndex = state.pathway.steps.findIndex(
      (step) => step.id === 'skills'
    )

    // Reset in case any have already been set
    state.pathway.steps[skillStepIndex].steps = []

    // Add new
    const role = state.roles.find((role) => role.id === payload.value)
    const skillSteps = []

    // Generate dynamic skill child steps
    role.skills.focus.forEach((skill) => {
      const currentSkill = state.skills.find((s) => s.code === skill.code)

      if (currentSkill) {
        const childStep = {
          id: currentSkill.code,
          title: currentSkill.name,
          type: 'question',
          schema: {
            section: 'Select your current skill level',
            help: currentSkill.description,
            field: {
              type: 'skill',
              required: true,
              options: currentSkill.levels
            },
            value: null
          }
        }
        skillSteps.push(childStep)
      } else {
        console.warn(`No Skill found for: ${skill.code}`)
      }
    })

    // Add generated skill steps as child questions
    state.pathway.steps[skillStepIndex].steps = skillSteps
  },

  ADD_CAPABILITY_ASSESSMENT(state, payload) {
    const capabilitiesStepIndex = state.pathway.steps.findIndex(
      (step) => step.id === 'capabilities'
    )

    // Reset in case any have already been set
    state.pathway.steps[capabilitiesStepIndex].steps = []

    // Add new
    const role = state.roles.find((role) => role.id === payload.value)
    const capabilitySteps = []

    // Generate dynamic capability steps
    role.capabilities.focus.forEach((capability) => {
      const currentCapability = state.capabilities.find(
        (c) => c.subcode === capability.code
      )

      const childStep = {
        id: currentCapability.subcode,
        title: currentCapability.subcategory,
        type: 'question',
        schema: {
          section: 'Select your current level of capability',
          help: currentCapability.description,
          field: {
            type: 'capability',
            required: true,
            options: currentCapability.levels
          },
          value: null
        }
      }

      capabilitySteps.push(childStep)
    })

    // Add generated capability child steps
    state.pathway.steps[capabilitiesStepIndex].steps = capabilitySteps
  },

  CLEAR_SKILL_ASSESSMENT(state, payload) {
    const skillStepIndex = state.pathway.steps.findIndex(
      (step) => step.id === 'skills'
    )
    state.pathway.steps[skillStepIndex].steps = []
  },

  CLEAR_CAPABILITY_ASSESSMENT(state, payload) {
    const capabilitiesStepIndex = state.pathway.steps.findIndex(
      (step) => step.id === 'capabilities'
    )
    state.pathway.steps[capabilitiesStepIndex].steps = []
  },

  CLEAR_SKILL_ANSWERS(state) {
    state.pathway.answers.skills = {}
  },

  CLEAR_CAPABILITY_ANSWERS(state) {
    state.pathway.answers.capabilities = {}
  },

  SET_QUESTIONS_COMPLETE(state) {
    state.pathway.completed = true
  }
}

const actions = {
  saveQuestionAnswer({ commit, state }, payload) {
    // Save answer to store
    commit('SET_ANSWER', payload)

    console.log(state.pathway.steps, payload.id)
    // Add skills and capability steps
    if (isAssessible(state.pathway.steps, payload.id)) {
      if (payload.value) {
        commit('ADD_SKILL_ASSESSMENT', payload)
        commit('ADD_CAPABILITY_ASSESSMENT', payload)
      } else {
        commit('CLEAR_SKILL_ASSESSMENT', payload)
        commit('CLEAR_CAPABILITY_ASSESSMENT', payload)
        commit('CLEAR_SKILL_ANSWERS')
        commit('CLEAR_CAPABILITY_ANSWERS')
      }
    }
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

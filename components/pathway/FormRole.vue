<template>
  <div class="nsw-forms mb-80">
    <div v-if="step.id === 'current-role'" class="mb-12">
      <div class="text-2xl font-bold mb-4">
        <p>Is your current role in Policing or Administration?</p>
      </div>
      <div class="mb-1">
        <div class="text-base font-bold">Select one</div>
      </div>
      <div>
        <input
          id="sworn"
          v-model="filter.sworn"
          value="yes"
          class="nsw-form-radio__input"
          type="radio"
        />
        <label class="nsw-form-radio__label" for="sworn">
          <p>Policing</p>
          <p class="text-xs text-nsw-brand-grey-primary">
            (including student police officers)
          </p>
        </label>

        <input
          id="unsworn"
          v-model="filter.sworn"
          value="no"
          class="nsw-form-radio__input"
          type="radio"
        />
        <label class="nsw-form-radio__label" for="unsworn">
          <p>Administrative</p>
          <p class="text-xs text-nsw-brand-grey-primary">
            (including Special Constables)
          </p>
        </label>
      </div>
    </div>

    <div v-if="showWorkArea" class="mb-12">
      <div class="text-2xl font-bold mb-4">
        <p>Select the relevant work area</p>
      </div>
      <div class="mb-1">
        <div class="text-base font-bold">Select from the list below</div>
      </div>
      <div>
        <select
          id="sort"
          v-model="filter.jobFamily"
          class="nsw-form-select"
          placeholder="Select"
        >
          <option value="" disabled selected>Select</option>
          <option v-for="jobFamily in jobFamilies" :key="jobFamily">
            {{ jobFamily }}
          </option>
        </select>
      </div>
    </div>

    <div class="text-2xl font-bold mb-4">
      <p>Search and select your role</p>
    </div>
    <div class="mb-1">
      <div class="text-base font-bold">
        Start typing your job title, then select from the list
      </div>
    </div>
    <div class="mb-1">
      <div v-if="step.id === 'current-role'" class="text-base">Search by keyword, e.g. General Duties Supervisor</div>
      <div v-else class="text-base">Search by keyword, e.g. Highway Patrol Operative</div>
    </div>
    <autocomplete
      ref="autocomplete"
      :search="search"
      :get-result-value="getResultValue"
      :default-value="defaultValue"
      :placeholder="searchPlaceholder"
      aria-label="Search by keyword, e.g. Case Officer, Intelligence, Coordinator"
      @submit="selectRole"
    >
      <template
        #default="{
          rootProps,
          inputProps,
          inputListeners,
          resultListProps,
          resultListListeners,
          results,
          resultProps
        }"
      >
        <div v-bind="rootProps">
          <div class="relative">
            <input
              ref="role"
              class="nsw-form-input roles-autosuggest placeholder-gray-700 disabled:text-black"
              v-bind="inputProps"
              :disabled="isDisabled"
              v-on="inputListeners"
              @focus="toggleFocus"
              @blur="toggleFocus"
            />
            <div
              v-if="currentValue"
              class="absolute top-0 bottom-0 right-0 flex justify-center pointer-events-none"
            >
              <button
                class="px-4 pointer-events-auto border-2 border-nsw-brand-primary-blue my-1 mr-1 font-semibold rounded"
                aria-label="Clear selected role"
                @click="clearRole"
              >
                Reset
              </button>
            </div>
          </div>
          <ul
            v-if="results.length"
            v-bind="resultListProps"
            class="bg-white mt-2 rounded shadow-md overflow-y-scroll max-h-autosuggest"
            v-on="resultListListeners"
          >
            <li
              v-for="(role, index) in results"
              :key="resultProps[index].id"
              v-bind="resultProps[index]"
              class="py-3 px-4 border-b border-nsw-grey-200 cursor-pointer hover:bg-nsw-grey-100"
              :class="{ 'bg-nsw-grey-100': isRoleSelected(role) }"
            >
              <div class="sm:flex justify-between">
                <div class="flex flex-col mb-3">
                  <div class="font-bold sm:whitespace-no-wrap">
                    {{ role.name }}
                  </div>
                  <div
                    class="text-sm text-nsw-brand-primary-blue sm:whitespace-no-wrap"
                  >
                    {{ role.jobFunction }}
                  </div>
                  <EssentialRequirementsIcon :role="role" />
                </div>
                <div class="flex flex-col items-end mb-2 sm:mb-1">
                  <information-badge
                    v-if="role.grade"
                    size="xs"
                    colour="nsw-brand-primary-blue-light"
                    class="mb-2"
                  >
                    {{ role.grade }}
                  </information-badge>
                  <information-badge
                    v-if="role.salary.min && role.salary.max"
                    size="xs"
                    colour="nsw-brand-primary-blue-light"
                    class="mb-2"
                  >
                    Salary: {{ $currency(role.salary.min) }} -
                    {{ $currency(role.salary.max) }}
                  </information-badge>
                </div>
              </div>
              <p class="text-sm">
                {{ role.description }}
              </p>
              <div v-if="role.alias && role.alias.length > 0" class="mt-3">
                <p class="text-sm">
                  This role can also be known as:
                  <span class="font-bold">{{ aliasList(role.alias) }}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </autocomplete>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import FuzzySearch from 'fuzzy-search'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import InformationBadge from '@/components/InformationBadge'
import { keywordSearch } from '@/utils/search'
import EssentialRequirementsIcon from '../EssentialRequirementsIcon.vue'

export default {
  components: {
    Autocomplete,
    InformationBadge,
    EssentialRequirementsIcon
  },
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: '',
      focussed: false,
      filter: {
        sworn: '',
        jobFamily: '',
        jobFunction: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getRoleByCode', 'answers']),
    currentValue() {
      return this.$store.state.pathway.answers[this.step.id]?.value
    },
    defaultNoRole() {
      return this.getRoleByCode(99)
    },
    defaultValue() {
      return this.currentValue ? this.getRoleByCode(this.currentValue).name : ''
    },
    isDisabled() {
      return (
        Boolean(this.currentValue) ||
        (this.step.id === 'current-role' && this.filter.sworn === '')
      )
    },
    searchPlaceholder() {
      return this.step.id === 'current-role' && this.filter.sworn === ''
        ? ''
        : 'Start typing'
    },
    currentRole() {
      if (this.answers.hasOwnProperty('current-role')) {
        return this.getRoleByCode(this.answers['current-role'].value)
      }
      return false
    },
    jobFamilies() {
      const allFamilies = this.$store.state.roles.reduce((acc, role) => {
        if (role.jobFamily === 'Policing') {
          return acc
        }
        if (!acc.includes(role.jobFamily)) {
          acc.push(role.jobFamily)
        }
        return acc
      }, [])
      if (this.step.id === 'role') {
        return allFamilies
      }

      if (this.$store.state.pathway.answers.sworn.value !== 'no') {
        return ['Policing', ...allFamilies.sort()]
      }
      return allFamilies.sort()
    },
    jobFunctions() {
      return this.$store.state.roles
        .filter((role) => {
          if (!this.filter.jobFamily) {
            return true
          }
          return role.jobFamily === this.filter.jobFamily
        })
        .reduce((acc, role) => {
          if (!acc.includes(role.jobFunction)) {
            acc.push(role.jobFunction)
          }
          return acc
        }, [])
    },
    filteredRoles() {
      const filteredRoles = this.$store.state.roles
        .filter((role) => {
          if (this.currentRole && role.id === this.currentRole.id) {
            return false
          }
          return true
        })
        .filter((role) => {
          if (this.step.id === 'current-role' && this.filter.sworn !== '') {
            switch (this.filter.sworn) {
              case 'yes':
                return role.jobFamily === 'Policing'
              case 'no':
                return role.jobFamily !== 'Policing'
            }
          }
          return true
        })
        .filter((role) => {
          if (this.step.id === 'goal-role') {
            switch (this.$store.state.pathway.answers.sworn.value) {
              case 'yes':
                return role.jobFamily === 'Policing'
              case 'no':
                return role.jobFamily !== 'Policing'
            }
          }
          return true
        })
        .filter((role) => {
          if (this.step.id === 'goal-role' && this.filter.jobFamily !== '') {
            return role.jobFamily === this.filter.jobFamily
          }

          return true
        })
        .sort((a, b) => {
          const roleA = a.name.toUpperCase()
          const roleB = b.name.toUpperCase()
          return roleA < roleB ? -1 : roleA > roleB ? 1 : 0
        })

      return filteredRoles
    },
    showWorkArea() {
      return (
        this.step.id === 'goal-role' &&
        this.$store.state.pathway.answers.sworn.value !== 'yes'
      )
    }
  },
  methods: {
    search(input) {
      this.value = input

      console.log(this.filter.jobFamily)
      const keyword = keywordSearch(this.filteredRoles, [
        { key: 'name', weight: 2 },
        { key: 'alias' },
        { key: 'command_BusUnit' },
        { key: 'jobFunction' },
        { key: 'grade', weight: 1.5 }
      ])
      const result = keyword(input).map((r) => r.item)
      if (result.length === 0) {
        return []
      }
      return result
    },
    getResultValue(result) {
      return result.name
    },
    onSelectFunction() {
      if (this.filter.jobFamily === '') {
        this.filter.jobFamily = this.filteredRoles[0].jobFamily
      }
    },
    selectRole(role) {
      if (role && role.id) {
        this.$store.dispatch('saveQuestionAnswer', {
          id: this.step.id,
          value: role.id
        })

        if (this.step.id === 'current-role') {
          this.$store.dispatch('saveQuestionAnswer', {
            id: 'isDetective',
            value: role.grade.split(' ')[0] === 'Detective' ? 'yes' : 'no'
          })

          this.$store.dispatch('saveQuestionAnswer', {
            id: 'isPolice',
            value: role.jobFamily === 'Policing' ? 'yes' : 'no'
          })
        }
      }
    },
    clearRole() {
      this.$refs.autocomplete.value = ''
      this.$store.dispatch('saveQuestionAnswer', {
        id: this.step.id,
        value: ''
      })

      if (this.step.id === 'current-role') {
        this.$store.dispatch('saveQuestionAnswer', {
          id: 'isDetective',
          value: ''
        })

        this.$store.dispatch('saveQuestionAnswer', {
          id: 'isPolice',
          value: ''
        })

        this.$store.dispatch('saveQuestionAnswer', {
          id: 'detective-roles',
          value: ''
        })
      }
    },
    isRoleSelected(role) {
      return this.currentValue === role.id
    },
    toggleFocus() {
      this.focussed = !this.focussed
    },
    aliasList(list) {
      if (list) {
        return list.join(', ')
      }
      return false
    }
  }
}
</script>

<style scoped>
.nsw-form-input.roles-autosuggest:disabled {
  background-color: white !important;
  color: black !important;
}
ul {
  z-index: 50 !important;
}
</style>

<template>
  <div class="nsw-forms mb-80">
    <div class="mb-12">
      <div class="text-2xl font-bold mb-4">
        <p>Select your work area</p>
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
          @change="
            () => {
              if (filter.jobFunction !== '') {
                filter.jobFunction = ''
              }
            }
          "
        >
          <option value="" disabled selected>Select</option>
          <option v-for="jobFamily in jobFamilies" :key="jobFamily">
            {{ jobFamily }}
          </option>
        </select>
      </div>
    </div>

    <div class="mb-12">
      <div class="text-2xl font-bold mb-4">
        <p>Select your section or unit</p>
      </div>
      <div class="mb-1">
        <div class="text-base font-bold">Select from the list below</div>
      </div>
      <div class="mb-1">
        <div class="text-base">Optional</div>
      </div>
      <div>
        <select
          id="sort"
          v-model="filter.jobFunction"
          class="nsw-form-select"
          @change="() => (filter.jobFamily = '')"
        >
          <option value="" disabled selected>Select</option>
          <option v-for="jobFuncion in jobFunctions" :key="jobFuncion">
            {{ jobFuncion }}
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
      <div class="text-base">Search by keyword, e.g. Case Officer</div>
    </div>
    <autocomplete
      ref="autocomplete"
      :search="search"
      :get-result-value="getResultValue"
      :default-value="defaultValue"
      placeholder="Start typing"
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
                <div class="mb-3 font-bold sm:whitespace-no-wrap">
                  {{ role.name }}
                </div>
                <div class="flex flex-wrap mb-2 sm:mb-1 sm:justify-end">
                  <information-badge
                    v-if="role.grade"
                    size="xs"
                    colour="grey"
                    class="mr-2 mb-2"
                  >
                    {{ role.grade }}
                  </information-badge>
                  <information-badge
                    v-if="role.salary.min && role.salary.max"
                    size="xs"
                    colour="grey"
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
import FuzzySearch from 'fuzzy-search'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import InformationBadge from '@/components/InformationBadge'

export default {
  components: {
    Autocomplete,
    InformationBadge
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
      return Boolean(this.currentValue)
    },
    currentRole() {
      if (this.answers.hasOwnProperty('current-role')) {
        return this.getRoleByCode(this.answers['current-role'].value)
      }
      return false
    },
    jobFamilies() {
      return this.$store.state.roles.reduce((acc, role) => {
        if (!acc.includes(role.jobFamily)) {
          acc.push(role.jobFamily)
        }
        return acc
      }, [])
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
    /**
     * Ensure the same role cannot be selected for current and goal
     **/
    filteredRoles() {
      return this.$collect(this.$store.state.roles)
        .filter((role) => {
          if (this.currentRole) {
            return role.id !== this.currentRole.id
          }

          if (this.filter.jobFunction) {
            return role.jobFunction === this.filter.jobFunction
          }

          if (this.filter.jobFamily) {
            return role.jobFamily === this.filter.jobFamily
          }

          return true
        })
        .sort((a, b) => {
          const roleA = a.name.toUpperCase()
          const roleB = b.name.toUpperCase()
          return roleA < roleB ? -1 : roleA > roleB ? 1 : 0
        })
        .all()
    }
  },
  methods: {
    updateValue(e) {
      this.value = e.target.value
    },
    search(input) {
      this.value = input
      const fuzzy = new FuzzySearch(this.filteredRoles, ['name', 'alias'], {
        sort: true
      })
      const result = fuzzy.search(input)
      if (result.length === 0) {
        return [this.defaultNoRole]
      }
      // if (this.step.id === 'goal-role') {
      //   return result // .filter(i => i.id !== 99).filter(i => !i.genericRole)
      // }
      return result // .filter(i => i.id !== 99)
    },
    getResultValue(result) {
      return result.name
    },
    selectRole(role) {
      if (role && role.id) {
        this.$store.dispatch('saveQuestionAnswer', {
          id: this.step.id,
          value: role.id
        })

        this.$store.dispatch('saveQuestionAnswer', {
          id: 'isDetective',
          value: role.grade.split(' ')[0] === 'Detective'
        })

        this.$store.dispatch('saveQuestionAnswer', {
          id: 'isPolice',
          value: role.jobFamily === 'Policing'
        })
      }
    },
    clearRole() {
      this.$refs.autocomplete.value = ''
      this.$store.dispatch('saveQuestionAnswer', {
        id: this.step.id,
        value: ''
      })
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

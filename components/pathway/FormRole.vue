<template>
  <div class="nsw-forms">
    <div class="nsw-form-group">
      <autocomplete
        ref="autocomplete"
        :search="search"
        :get-result-value="getResultValue"
        :default-value="defaultValue"
        placeholder="Search by keyword, EG: Design, Strategy, Analyst, Manager"
        aria-label="Search by keyword, EG: Design, Strategy, Analyst, Manager"
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
              <input ref="role" class="nsw-form-input roles-autosuggest placeholder-gray-700 disabled:text-black" v-bind="inputProps" :disabled="isDisabled" v-on="inputListeners" @focus="toggleFocus" @blur="toggleFocus">
              <div v-if="currentValue" class="absolute top-0 bottom-0 right-0 flex justify-center pointer-events-none">
                <button class="px-3 pointer-events-auto" aria-label="Clear selected role" @click="clearRole">
                  <img src="/icons/close.svg" class="h-4">
                </button>
              </div>
            </div>
            <ul v-if="value && !results.length && focussed" class="bg-white mt-2 rounded shadow-md overflow-y-scroll max-h-autosuggest">
              <li class="py-3 px-4 leading-loose">
                <div class="font-bold">
                  Can't see your role here?
                </div>
                <div class="text-sm">
                  Try expanding your search and select a role that closely matches.
                </div>
              </li>
            </ul>
            <ul v-else v-bind="resultListProps" class="bg-white mt-2 rounded shadow-md overflow-y-scroll max-h-autosuggest" v-on="resultListListeners">
              <li v-for="(role, index) in results" :key="resultProps[index].id" v-bind="resultProps[index]" class="py-3 px-4 border-b border-nsw-grey-200 cursor-pointer hover:bg-nsw-grey-100" :class="{ 'bg-nsw-grey-100' : isRoleSelected(role) }">
                <div class="mb-3 font-bold">
                  {{ role.name }}
                </div>
                <p class="text-sm">
                  {{ role.description }}
                </p>
              </li>
            </ul>
          </div>
        </template>
      </autocomplete>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FuzzySearch from 'fuzzy-search'
import Autocomplete from '@trevoreyre/autocomplete-vue'

export default {
  components: {
    Autocomplete
  },
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      value: '',
      focussed: false
    }
  },
  computed: {
    ...mapGetters([
      'getRoleByCode',
      'answers'
    ]),
    currentValue () {
      return this.$store.state.pathway.answers[this.step.id]?.value
    },
    defaultValue () {
      return this.currentValue ? this.getRoleByCode(this.currentValue).name : ''
    },
    isDisabled () {
      return Boolean(this.currentValue)
    },
    currentRole () {
      if (this.answers.hasOwnProperty('current-gov-role')) {
        return this.getRoleByCode(this.answers['current-gov-role'].value)
      }
      if (this.answers.hasOwnProperty('current-outside-role')) {
        return this.getRoleByCode(this.answers['current-outside-role'].value)
      }
      return false
    },
    /**
     * Ensure the same role cannot be selected for current and goal
    **/
    filteredRoles () {
      return this.$collect(this.$store.state.roles)
        .filter(role => {
          if (this.currentRole) {
            return role.id !== this.currentRole.id
          }
          return true
        })
        .sort((a, b) => {
          const roleA = a.name.toUpperCase()
          const roleB = b.name.toUpperCase()
          return (roleA < roleB) ? -1 : (roleA > roleB) ? 1 : 0
        })
        .all()
    }
  },
  methods: {
    updateValue (e) {
      this.value = e.target.value
    },
    search (input) {
      this.value = input
      const fuzzy = new FuzzySearch(this.filteredRoles, ['name'], {
        sort: true
      })
      return fuzzy.search(input)
    },
    getResultValue (result) {
      return result.name
    },
    selectRole (role) {
      this.$store.dispatch('saveQuestionAnswer', {
        id: this.step.id,
        value: role.id
      })
    },
    clearRole () {
      this.$refs.autocomplete.value = ''
      this.$store.dispatch('saveQuestionAnswer', {
        id: this.step.id,
        value: ''
      })
    },
    isRoleSelected (role) {
      return this.currentValue === role.id
    },
    toggleFocus () {
      this.focussed = !this.focussed
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

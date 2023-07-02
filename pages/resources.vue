<template>
  <div class="relative flex-grow z-10">
    <div class="xl:container">
      <div class="relative px-4 md:px-6">
        <div class="flex flex-col">
          <div class="mb-8 md:mb-12 pt-8 md:pt-16">
            <h1 class="text-3xl md:text-4xl font-bold leading-snug tracking-tight lg:text-5xl mb-4">
              Procurement upskilling resources
            </h1>
            <p>
              Search all resources. Search by keyword or filter the results to find what’s relevant to you.
            </p>
          </div>
          <div class="w-full md:w-8/12 mb-20">
            <form class="relative rounded overflow-hidden" @submit="onSearch">
              <input id="resource-search" v-model="searchValue" class="nsw-form__input" type="text" value="">
              <button class="absolute top-0 right-0 bottom-0 bg-nsw-brand-primary-blue text-white px-8 flex items-center justify-center" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div class="flex flex-row">
          <div class="w-4/12 pr-10">
            <h3 class="text-2xl font-bold mb-2">
              Filter results
            </h3>
            <div class="w-full border-b border-nsw-grey-200 pb-4">
              <button class="flex items-center justify-between py-5 w-full focus:outline-none focus:border-nsw-brand-primary-blue -mb-4" @click="filter.format.open = !filter.format.open">
                <p class="font-bold">Type of content</p>
                <img src="/icons/chevron.svg" alt="Toggle Panel icon" class="transform mr-4" :class="filter.format.open ? 'rotate-0' : 'rotate-180'">
              </button>
              <ul v-if="filter.format.open">
                <li v-for="option in filterFormatOptions" :key="option" :value="option">
                  <input-checkbox v-model="filter.format.value" :input-value="option" :label="option" :name="option" @change="onFilterFormat" />
                </li>
              </ul>
            </div>
            <div class="w-full border-b border-nsw-grey-200 pb-4">
              <button class="flex items-center justify-between py-5 w-full focus:outline-none focus:border-nsw-brand-primary-blue -mb-4" @click="filter.capability.open = !filter.capability.open">
                <p class="font-bold">Skills</p>
                <img src="/icons/chevron.svg" alt="Toggle Panel icon" class="transform mr-4" :class="filter.capability.open ? 'rotate-0' : 'rotate-180'">
              </button>
              <ul v-if="filter.capability.open">
                <li v-for="option in filterCapabilityOptions" :key="option" :value="option">
                  <input-checkbox v-model="filter.capability.value" :input-value="option" :label="getCapabilityOptionLabel(option)" :name="option" @change="onFilterCapability" />
                </li>
              </ul>
            </div>
            <div class="w-full border-b border-nsw-grey-200 pb-4">
              <button class="flex items-center justify-between py-5 w-full focus:outline-none focus:border-nsw-brand-primary-blue -mb-4" @click="filter.level.open = !filter.level.open">
                <p class="flex items-center whitespace-no-wrap font-bold">
                  Level <help-bubble tooltip="Foundational upskilling resources typically align with Level 1 capabilities. Intermediate aligns with levels 2-3, and advanced aligns to levels 4-5." />
                </p>
                <img src="/icons/chevron.svg" alt="Toggle Panel icon" class="transform mr-4" :class="filter.level.open ? 'rotate-0' : 'rotate-180'">
              </button>
              <ul v-if="filter.level.open">
                <li v-for="option in filterLevelOptions" :key="option" :value="option">
                  <input-checkbox v-model="filter.level.value" :input-value="option" :label="option" :name="option" />
                </li>
              </ul>
            </div>
            <div class="flex flex-col space-y-4 w-full pt-6 pb-2">
              <div class="relative space-x-4">
                <div class="nsw-form-checkbox cursor-pointer">
                  <input
                    id="form-free-checkbox"
                    v-model="filter.free.value"
                    type="checkbox"
                    :value="false"
                    class="nsw-form-checkbox__input"
                  >
                  <label class="nsw-form-checkbox__label mt-0" for="form-free-checkbox">Free</label>
                </div>
              </div>
              <div class="relative">
                <div class="nsw-form-checkbox cursor-pointer">
                  <input
                    id="form-recommended-checkbox"
                    v-model="filter.recommended.value"
                    type="checkbox"
                    :value="false"
                    class="nsw-form-checkbox__input"
                  >
                  <label class="nsw-form-checkbox__label mt-0" for="form-recommended-checkbox">Recommended</label>
                </div>
              </div>
            </div>
            <div class="w-full py-6 mb-6">
              <button class="text-nsw-brand-primary-blue font-semibold hover:underline focus:outline-none focus:underline" style="text-underline-offset: 2px;" @click="clearFilters">
                Clear all filters
              </button>
            </div>
            <div class="mb-16">
              <div class="block px-6 py-8 bg-nsw-grey-100 rounded-lg">
                <h3 class="font-bold text-xl mb-5 md:pr-24">
                  Create a personalised career plan.
                </h3>
                <p class="mb-6">
                  Get a personalised action plan with career opportunities that you can discuss with your manager. Access resources to take your career to the next level.
                </p>
                <nsw-button action="psc" @click.native="$router.push('/pathway')">
                  Plan my career growth
                </nsw-button>
              </div>
            </div>
          </div>
          <div class="w-8/12">
            <div v-if="filteredResources.count < 1">
              <div class="">
                <disclaimer-panel heading="No resources found">
                  Update your search and filters to find resources
                </disclaimer-panel>
              </div>
            </div>
            <div v-for="(group, groupIndex) in filteredResources.groups" :key="groupIndex" class="mb-12">
              <h3 class="mb-6 text-xl font-bold first:mt-0">
                {{ group.label }}
              </h3>
              <div class="mb-10 grid gap-6">
                <upskilling-resource v-for="(resource, index) in group.items" :key="index" :resource="resource" :show-all-skills="true" @click.native="openUpskillResource(resource)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FuzzySearch from 'fuzzy-search'
import resources from '@/data/resources.json'
import UpskillingResource from '@/components/pathway/results/UpskillingResource'
import capabilityNamesMap from '@/data/capabilityNamesMap.json'

export default {
  layout: 'default',
  components: {
    UpskillingResource
  },
  data() {
    return {
      searchValue: '',
      results: resources,
      resources,
      filter: {
        format: {
          open: true,
          options: [],
          value: ['All'],
          order: [
            'Online courses',
            'Instructor-led training',
            'Qualifications',
            'Video and audio',
            'Articles',
            'Events',
            'Learning through others',
            'On the job'
          ]
        },
        capability: {
          open: true,
          options: [],
          value: ['All']
        },
        level: {
          open: true,
          order: [
            'Foundational',
            'Intermediate',
            'Advanced'
          ],
          value: []
        },
        free: {
          value: false
        },
        recommended: {
          value: false
        },
        query: {
          value: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'answers',
      'getHumanReadableAnswerValue'
    ]),
    filterFormatOptions() {
      if (resources.length > 0) {
        const formats = this.$collect(
          resources.map(resource => resource.format)
        ).unique().all()
        const orderedFormats = formats.sort((a, b) => this.filter.format.order.indexOf(a) - this.filter.format.order.indexOf(b))
        orderedFormats.unshift('All')
        return orderedFormats
      }
      return ['All']
    },
    filterCapabilityOptions() {
      if (resources.length > 0) {
        const tmp = []
        resources.map((resource) => {
          resource.skills.forEach(({ code }) => tmp.push(code))
        })

        const filteredCodes = this.$collect(tmp).unique().all()
        filteredCodes.unshift('All')
        return filteredCodes || ['']
      }
      return ['All']
    },
    filterLevelOptions() {
      if (resources.length > 0) {
        const tmp = []
        resources.map((resource) => {
          resource.targetLevel.forEach((level) => tmp.push(level))
        })
        const levels = this.$collect(tmp).unique().all()
        return levels.sort((a, b) => this.filter.level.order.indexOf(a) - this.filter.level.order.indexOf(b))
      }
      return ['All']
    },
    filteredResources() {
      const groupedResources = {}
      let allResources = resources
      if (this.filter.query.value && this.filter.query.value !== '') {
        const fuzzy = new FuzzySearch(resources, ['title'], {
          sort: true
        })
        allResources = fuzzy.search(this.filter.query.value)
      }
      const filteredResources = allResources.filter(resource => {
        const match = {
          format: false,
          capability: false,
          level: false
        }
        if (this.filter.format.value.includes('All') || this.filter.format.value.includes(resource.format)) {
          match.format = true
        }
        if (this.filter.capability.value.includes('All')) {
          match.capability = true
        }

        if (this.filter.level.value.length === 0) {
          match.level = true
        }

        if (this.filter.free.value && resource.cost !== '0') {
          return false
        }

        if (this.filter.recommended.value && resource.default !== true) {
          return false
        }

        const matchedSkills = this.$collect(resource.skills)
          .unique('code')
          .map((item) => item.code)
          .contains((value) => this.filter.capability.value.includes(value))

        const matchedCapabilities = this.$collect(resource.capabilities)
          .unique('code')
          .map((item) => item.code)
          .contains((value, key) => this.filter.capability.value.includes(value))

        const matchedLevels = this.$collect(resource.targetLevel)
          .map((item) => item)
          .contains((value, key) => this.filter.level.value.includes(value))

        if (matchedLevels) {
          match.level = true
        }

        if (matchedSkills || matchedCapabilities) {
          match.capability = true
        }

        return match.format && match.capability && match.level
      })

      filteredResources.forEach((resource) => {
        if (!groupedResources.hasOwnProperty(resource.format)) {
          groupedResources[resource.format] = []
        }
        if (resource.default) {
          groupedResources[resource.format].unshift(resource)
        } else {
          groupedResources[resource.format].push(resource)
        }
      })

      const orderedGroups = Object.keys(groupedResources)
        .map(key => ({ items: groupedResources[key], label: key }))
        .sort((a, b) => this.filter.format.order.indexOf(a.label) - this.filter.format.order.indexOf(b.label))

      return {
        groups: orderedGroups,
        count: filteredResources.length || 0
      }
    },
    groupedResources() {
      const groupedResources = {}
      this.results.forEach((resource) => {
        if (!groupedResources.hasOwnProperty(resource.format)) {
          groupedResources[resource.format] = []
        }
        if (resource.default) {
          groupedResources[resource.format].unshift(resource)
        } else {
          groupedResources[resource.format].push(resource)
        }
      })
      return Object.keys(groupedResources)
        .map(key => ({ items: groupedResources[key], label: key }))
        .sort((a, b) => this.filter.format.order.indexOf(a.label) - this.filter.format.order.indexOf(b.label))
    }
  },
  methods: {
    onSearch(e) {
      e.preventDefault()
      this.filter.query.value = this.searchValue
    },
    clearFilters(e) {
      e.preventDefault()
      this.filter.query.value = ''
      this.filter.free.value = false
      this.filter.recommended.value = false
      this.filter.format.value = ['All']
      this.filter.capability.value = ['All']
      this.filter.level.value = []
    },
    onFilterCapability(value) {
      this.onFilterCheckbox(value, 'capability')
    },
    onFilterFormat(value) {
      this.onFilterCheckbox(value, 'format')
    },
    onFilterCheckbox(value, field) {
      if (!this.filter[field].value || this.filter[field].value.length === 0) {
        this.filter[field].value = ['All']
      }
      if (value === 'All' && this.filter[field].value.includes('All')) {
        this.filter[field].value = ['All']
      }
      if (value !== 'All' && this.filter[field].value.includes(value)) {
        this.filter[field].value = this.filter[field].value.filter(item => item !== 'All')
      }
    },
    getCapabilityOptionLabel(key) {
      return capabilityNamesMap[key] || key
    },

    openUpskillResource(resource) {
      // Track in GA
      this.$ga.event({
        eventCategory: 'All Resources',
        eventAction: 'Upskill Resource',
        eventLabel: resource.title,
        eventValue: resource.id
      })

      // Open browser window
      const win = window.open(resource.url, '_blank')
      win.focus()
    }
  }
}
</script>

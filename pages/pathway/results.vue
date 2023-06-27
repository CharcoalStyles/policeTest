<template>
  <div class="relative flex-grow z-10">
    <div class="bg-nsw-grey-50 inset-border">
      <div class="xl:container">
        <div class="relative px-4 md:px-6 pt-6">
          <div class="relative">
            <div class="flex flex-col md:flex-row">
              <print-page class="top-0 right-0 mb-6 md:absolute" @click.native="printPage" />
              <div class="mb-8 md:mb-16 md:w-2/3 lg:w-1/2 pt-8 md:pt-16">
                <h2 class="pb-3 font-bold btn-blue text-nsw-brand-primary-blue">
                  Personal Career Pathway
                </h2>
                <h1 class="text-3xl md:text-4xl font-bold leading-snug tracking-tight lg:text-5xl">
                  We’ve generated a plan to get you to your new career.
                </h1>
              </div>
            </div>
            <div class="p-6 bg-white border rounded border-nsw-grey-200 lg:p-8 print-break">
              <div class="flex flex-row items-center justify-between mb-8 print:flex-row">
                <h2 class="flex text-2xl font-bold">
                  Your answers
                </h2>
                <nsw-button action="secondary-outline" @click.native="modals.update = true">
                  Update answers
                </nsw-button>
              </div>
              <div class="w-full">
                <div v-if="currentRole.name && currentRole.id !== 99" class="flex flex-col mb-6 md:flex-row">
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    Your current role
                  </div>
                  <div>I am currently a <span class="font-bold text-nsw-brand-secondary-blue">{{ currentRole.name }}</span> or similar</div>
                </div>
                <div v-if="targetRole.name" class="flex flex-col mb-6 md:flex-row">
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    Your target role
                  </div>
                  <div>I would like to be a <span class="font-bold text-nsw-brand-secondary-blue">{{ targetRole.name }}</span> or similar</div>
                </div>
                <div v-if="readableSkillsList" class="flex flex-col mb-6 md:flex-row">
                  <div class="flex items-center flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    Your procurement skills <help-bubble tooltip="These are the general skills/capabilities for the role type you selected" />
                  </div>
                  <div>I assessed myself in <span class="font-bold text-nsw-brand-secondary-blue">{{ readableSkillsList }}</span></div>
                </div>
                <div v-if="readableCapabilitiesList" class="flex flex-col mb-6 md:flex-row">
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    Your core capabilities
                  </div>
                  <div>I assessed myself in <span class="font-bold text-nsw-brand-secondary-blue">{{ readableCapabilitiesList }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="xl:container">
      <div class="relative px-4 md:px-6">
        <div>
          <div id="target" class="py-6 border-b lg:py-16 border-nsw-grey-200 print-break">
            <div class="mb-10">
              <h3 class="flex items-center mb-3 text-xl font-bold md:text-3xl">
                <step-badge>1</step-badge> Select your target role
              </h3>
              <p class="md:w-2/3">
                A target role compares your current role, identify skills gaps, surfaces learning resources.
              </p>
            </div>
            <div class="lg:w-10/12">
              <div v-if="goalRole" class="grid grid-cols-1 gap-16 mb-10 lg:grid-cols-2">
                <div>
                  <h4 class="flex items-center mb-6 text-lg font-bold">
                    Your target role <help-bubble tooltip="This is the role you told us you wanted to move into." />
                  </h4>
                  <role-selector :role="goalRole" :target-role="targetRole" @click.native="selectTargetRole(goalRole)" @keyup.space="selectTargetRole(goalRole)" />
                </div>
              </div>
              <div class="grid grid-cols-1 col-gap-16 lg:grid-cols-2">
                <div v-if="familyRoles(currentRole).length">
                  <h4 class="mb-6 text-lg font-bold">
                    Roles in the same area as your current role
                  </h4>
                  <role-selector v-for="role in familyRoles(currentRole)" :key="role.id" :role="role" :target-role="targetRole" @click.native="selectTargetRole(role)" @keyup.space="selectTargetRole(role)" />
                </div>
                <div v-if="skillRoles(currentRole).length">
                  <h4 class="mb-6 text-lg font-bold">
                    Roles with skills you already have
                  </h4>
                  <role-selector v-for="role in skillRoles(currentRole)" :key="role.id" :role="role" :target-role="targetRole" @click.native="selectTargetRole(role)" @keyup.space="selectTargetRole(role)" />
                </div>
              </div>
            </div>
          </div>
          <div id="comparison" class="w-full py-6 border-b lg:py-16 border-nsw-grey-200 print-break">
            <div class="mb-10">
              <h3 class="flex items-center mb-3 text-xl font-bold md:text-3xl">
                <step-badge>2</step-badge> Your role comparison
              </h3>
              <p>Select any <strong>skill</strong> or <strong>capability</strong> to understand gaps and upskilling resources.</p>
            </div>
            <table class="block w-full overflow-x-scroll border border-gray-600 rounded-lg table-auto lg:overflow-x-auto">
              <thead class="border-b border-gray-600">
                <tr>
                  <td class="align-top lg:w-1/2 print:w-1/2">
                    <role-selected :roles="roles" :role="currentRole" type="current" />
                  </td>
                  <td class="align-top lg:w-1/2 print:w-1/2">
                    <role-selected v-if="targetRole" :roles="roles" :role="targetRole" type="target" />
                    <div v-else class="flex items-center justify-center p-4 lg:p-8">
                      <div class="flex flex-col items-center m-4 lg:m-8">
                        <img src="/icons/empty.svg" alt="No target role selected" class="mb-6">
                        <div class="text-center lg:w-2/3">
                          Select a <a v-scroll-to="'#target'" href="#" class="underline text-nsw-brand-primary-blue">target role</a> to start comparing roles.
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </thead>
              <results-comparison :current-role="currentRole" :target-role="targetRole" />
            </table>
          </div>
          <div class="pt-16 print-break">
            <div class="mb-6">
              <h3 class="mb-3 text-3xl font-bold">
                {{ filteredResources.count || 0 }} upskilling resources
              </h3>
              <p class="md:w-2/3">
                These resources have been curated as a starting point to assist your career progression.
              </p>
            </div>
            <div class="flex">
              <div class="relative mr-4">
                <label class="font-bold" for="filterFormats">Type of content</label>
                <div class="mt-1" style="min-width:340px;">
                  <button class="nsw-form-select text-left" aria-expanded="true" aria-controls="filter-format" @click="toggleFormatFilter">
                    {{ filterFormatLabel }}
                  </button>
                </div>
                <div v-if="filter.format.open" class="nsw-custom-select-format bg-white rounded shadow-lg absolute top-12 left-0 w-full px-4 py-2 z-10" aria-describedby="filter-format">
                  <ul>
                    <li v-for="option in filterFormatOptions" :key="option" :value="option">
                      <input-checkbox v-model="filter.format.value" :input-value="option" :label="option" :name="option" @change="onFilterFormatChange" />
                    </li>
                  </ul>
                </div>
              </div>
              <div class="relative">
                <label class="font-bold" for="filterCapabilities">Skill</label>
                <div class="mt-1" style="min-width:340px;">
                  <button class="nsw-form-select text-left" aria-expanded="true" aria-controls="filter-capability" @click="toggleCapabilityFilter">
                    {{ filterCapabilityLabel }}
                  </button>
                </div>
                <div v-if="filter.capability.open" class="nsw-custom-select-capability bg-white rounded shadow-lg absolute top-12 left-0 w-full px-4 py-2 z-10" aria-describedby="filter-capability">
                  <ul>
                    <li v-for="option in filterCapabilityOptions" :key="option" :value="option">
                      <input-checkbox v-model="filter.capability.value" :input-value="option" :label="getCapabilityOptionLabel(option)" :name="option" @change="onFilterCapabilityChange" />
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex space-x-8 items-center mt-6 pl-12">
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
            </div>
            <div class="md:w-8/12">
              <div v-if="filteredResources.count < 1">
                <div class="py-6 lg:py-16">
                  <disclaimer-panel heading="No resources available">
                    Select another role or remove filters to view resources.
                  </disclaimer-panel>
                </div>
              </div>
            </div>
            <div class="md:w-12/12">
              <div v-for="(group, groupIndex) in filteredResources.groups" :key="groupIndex">
                <h3 class="mb-6 mt-12 text-xl font-bold">
                  {{ group.label }}
                </h3>
                <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
                  <upskilling-resource v-for="(resource, index) in group.items" :key="index" :resource="resource" :target-role-capabilities="targetRoleCapabilities" @click.native="openUpskillResource(resource)" />
                </div>
              </div>
            </div>
          </div>
          <div class="py-6 border-b lg:py-16 border-nsw-grey-200">
            <h2 class="mb-12 text-3xl font-bold">
              What you could do next
            </h2>
            <div class="grid grid-cols-6 gap-6">
              <next-step-panel
                class="col-span-6"
                title="Have a one-on-one with your manager"
                text="Print a copy and use it in your next meeting with your manager to align on growth opportunities to focus on."
              >
                <print-page @click.native="printPage" />
              </next-step-panel>

              <next-step-panel
                class="col-span-6 lg:col-span-2"
                title="Use the Role Explorer"
                text="If you haven’t found the role you are looking you can search over 165 digital roles with our Role Explorer."
              >
                <nuxt-link to="/explorer" class="flex items-center font-semibold text-nsw-brand-primary-blue" target="_blank" @click.native="outboundLinkClick('/explorer')">
                  Search for more digital roles <img src="/icons/link.svg" alt="Link" class="ml-3">
                </nuxt-link>
              </next-step-panel>

              <next-step-panel
                class="col-span-6 lg:col-span-2"
                title="See if your target role is available "
                text="Browse available job opportunities with NSW Government."
              >
                <h4 class="mb-3 text-sm font-bold">
                  Relevant resources
                </h4>
                <a href="https://iworkfor.nsw.gov.au/jobs/all-keywords/all-agencies/all-organisations--entities/information-and-communications-technology-jobs/all-locations/all-worktypes?jobcategoryid=10352" class="flex items-center font-semibold text-nsw-brand-primary-blue" target="_blank" @click="outboundLinkClick('https://iworkfor.nsw.gov.au/jobs/all-keywords/all-agencies/all-organisations--entities/information-and-communications-technology-jobs/all-locations/all-worktypes?jobcategoryid=10352')">I work for NSW <img src="/icons/link.svg" alt="Link icon" class="ml-3"></a>
              </next-step-panel>

              <next-step-panel
                class="col-span-6 lg:col-span-2"
                title="Start learning now"
                text="Think about how you can create opportunities for learning on the job"
              >
                <a href="https://www.psc.nsw.gov.au/sites/default/files/2020-11/user_guide_employee_learning_and_developing.pdf" class="flex items-center font-semibold text-nsw-brand-primary-blue" target="_blank" @click="outboundLinkClick('https://www.psc.nsw.gov.au/sites/default/files/2020-11/user_guide_employee_learning_and_developing.pdf')">Learning and development guide <img src="/icons/link.svg" alt="Link" class="ml-3"></a>
              </next-step-panel>
            </div>
          </div>
          <div class="md:w-8/12">
            <div class="py-6 lg:py-16">
              <print-page class="mb-6" @click.native="printPage" />
              <disclaimer-panel>Salaries are indicative only. Check the job ad when applying for a role.</disclaimer-panel>
              <disclaimer-panel>Completing upskilling resources does not guarantee successful transition to any role.</disclaimer-panel>
              <disclaimer-panel>This tool includes common types of procurement roles that can be found in the NSW public sector. However, role titles may be different for each NSW public sector organisation.</disclaimer-panel>
              <disclaimer-panel>This list of upskilling resources includes those offered by external training providers. These offerings have not been endorsed by NSW Government. Before registering, please review the offering to ensure it is relevant to you.</disclaimer-panel>
            </div>
          </div>
        </div>
        <modal-update :show="modals.update" max-width="xl" :scrollable="false" @close="modals.update = false" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import resources from '@/data/resources.json'
import RoleSelector from '@/components/pathway/results/RoleSelector'
import RoleSelected from '@/components/pathway/results/RoleSelected'
import ResultsComparison from '@/components/pathway/results/ResultsComparison'
import UpskillingResource from '@/components/pathway/results/UpskillingResource'
import ModalUpdate from '@/components/pathway/results/ModalUpdate'
import StepBadge from '@/components/pathway/results/StepBadge'
import PrintPage from '@/components/PrintPage'
import DisclaimerPanel from '@/components/pathway/results/DisclaimerPanel'
import NextStepPanel from '@/components/pathway/results/NextStepPanel'
import HelpBubble from '@/components/HelpBubble'
import capabilityNamesMap from '@/data/capabilityNamesMap.json'
import InputCheckbox from '@/components/forms/InputCheckbox'

export default {
  layout: 'results',
  middleware: ['completed'],
  components: {
    RoleSelector,
    RoleSelected,
    ResultsComparison,
    UpskillingResource,
    ModalUpdate,
    StepBadge,
    PrintPage,
    DisclaimerPanel,
    NextStepPanel,
    HelpBubble,
    InputCheckbox
  },
  data() {
    return {
      resources,
      targetRole: false,
      modals: {
        update: false,
        beta: true
      },
      filter: {
        format: {
          open: false,
          options: [],
          value: ['All'],
          order: [
            'Online courses',
            'Instructorled training',
            'Qualifications',
            'Video and audio',
            'Articles',
            'Events',
            'Learning through others',
            'On the job'
          ]
        },
        capability: {
          open: false,
          options: [],
          value: ['All']
        },
        free: {
          value: false
        },
        recommended: {
          value: false
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'answers',
      'getHumanReadableAnswerValue'
    ]),
    filterFormatLabel() {
      if (this.filter.format.value && this.filter.format.value.includes('All')) {
        return 'All formats'
      }
      const filtered = this.filter.format.value.filter(item => item !== 'All')
      if (filtered.length > 1) {
        return `${filtered.length} formats`
      }
      return this.filter.format.value[0]
    },
    filterCapabilityLabel() {
      if (this.filter.capability.value && this.filter.capability.value.includes('All')) {
        return 'All skills'
      }
      const filtered = this.filter.capability.value.filter(item => item !== 'All')
      if (filtered.length > 1) {
        return `${filtered.length} skills`
      }
      return capabilityNamesMap[this.filter.capability.value[0]]
    },
    filterFormatOptions() {
      if (this.allResources.length > 0) {
        const formats = this.$collect(
          this.allResources.map(resource => resource.format)
        ).unique().all()
        const orderedFormats = formats.sort((a, b) => this.filter.format.order.indexOf(a) - this.filter.format.order.indexOf(b))
        orderedFormats.unshift('All')
        return orderedFormats
      }
      return ['All']
    },
    filterCapabilityOptions() {
      if (this.allResources.length > 0) {
        const tmp = []
        this.allResources.map((resource) => {
          resource.skills.forEach(({ code }) => tmp.push(code))
          resource.capabilities.forEach(({ code }) => tmp.push(code))
        })

        const filteredCodes = this.$collect(tmp).unique().all().filter(code => this.targetRoleCapabilities.includes(code))
        filteredCodes.unshift('All')
        return filteredCodes || ['']
      }
      return ['All']
    },
    allResources() {
      // TODO: Include core capabilities
      if (!this.targetRole) {
        return []
      }
      const defaultResources = this.$collect(this.resources).where('default', true).all()

      const targetRoleSkills = this.targetRole.skills.focus
      const currentRoleSkills = this.currentRole.skills.focus

      const matchingResources = this.$collect(this.resources)
        .filter(resource => {
          let keep = false
          targetRoleSkills.forEach(skill => {
            const resourceSkills = this.$collect(resource.skills).where('code', skill.code).all()
            resourceSkills.forEach(resourceSkill => {
              const currentRoleSkill = this.$collect(currentRoleSkills).where('code', skill.code).first()
              // They don't have that skill, return the resource
              if (!currentRoleSkill) {
                keep = true
              // They have that skill, does it reach the required level
              } else if (currentRoleSkill && resourceSkill.level > currentRoleSkill.level) {
                keep = true
              }
            })
          })
          return keep
        })
        .filter(resource => {
          return !defaultResources.includes(resource)
        })
        .all()

      return [...matchingResources, ...defaultResources]
    },
    filteredResources() {
      const groupedResources = {}
      const filteredResources = this.allResources.filter(resource => {
        const match = {
          format: false,
          capability: false
        }
        if (this.filter.format.value.includes('All') || this.filter.format.value.includes(resource.format)) {
          match.format = true
        }
        if (this.filter.capability.value.includes('All')) {
          match.capability = true
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

        if (matchedSkills || matchedCapabilities) {
          match.capability = true
        }

        return match.format && match.capability
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
    targetRoleCapabilities() {
      if (!this.targetRole) {
        return []
      }
      const targetRoleCapabilities = this.$collect(
        this.targetRole.capabilities.focus
      )
        .unique('code')
        .map((item) => item.code)
        .all()
      const targetRoleSkills = this.$collect(this.targetRole.skills.focus)
        .unique('code')
        .map((item) => item.code)
        .all()
      return [
        ...targetRoleCapabilities,
        ...targetRoleSkills
      ]
    },
    roles() {
      return this.$store.state.roles
    },
    currentRole() {
      if (this.answers.hasOwnProperty('current-gov-role')) {
        return this.$store.getters.getRoleByCode(this.answers['current-gov-role'].value)
      }
      return this.$store.getters.getRoleByCode(this.answers['current-outside-role'].value)
    },
    goalRole() {
      if (this.answers.hasOwnProperty('goal-role')) {
        return this.$collect(this.roles).where('id', this.answers['goal-role'].value).first()
      }
      return false
    },
    readableSkillsList() {
      const list = Object.keys(this.answers.skills).map((key) => capabilityNamesMap[key])
      if (list.length > 0) {
        return list.join(', ')
      }
      return false
    },
    readableCapabilitiesList() {
      const list = Object.keys(this.answers.capabilities).map((key) => capabilityNamesMap[key])
      if (list.length > 0) {
        return list.join(', ')
      }
      return false
    }
  },
  mounted() {
    this.logAnswersToGoogleAnalytics()
    if (this.goalRole) {
      this.targetRole = this.goalRole
    }
    window.addEventListener('click', (e) => {
      this.checkCustomSelect(e.target)
    })
  },
  beforeDestroy() {
    window.removeEventListener('click', (e) => {
      this.checkCustomSelect(e.target)
    })
  },
  methods: {
    checkCustomSelect(target) {
      if (!target.closest('.nsw-custom-select-format')) {
        this.filter.format.open = false
      }
      if (!target.closest('.nsw-custom-select-capability')) {
        this.filter.capability.open = false
      }
    },
    toggleFormatFilter(e) {
      e.stopPropagation()
      this.filter.format.open = !this.filter.format.open
      this.filter.capability.open = false
    },
    toggleCapabilityFilter(e) {
      e.stopPropagation()
      this.filter.capability.open = !this.filter.capability.open
      this.filter.format.open = false
    },
    onFilterFormatChange(value) {
      if (!this.filter.format.value || this.filter.format.value.length === 0) {
        this.filter.format.value = ['All']
      }
      if (value === 'All' && this.filter.format.value.includes('All')) {
        this.filter.format.value = ['All']
      }
      if (value !== 'All' && this.filter.format.value.includes(value)) {
        this.filter.format.value = this.filter.format.value.filter(item => item !== 'All')
      }
    },
    onFilterCapabilityChange(value) {
      if (!this.filter.capability.value || this.filter.capability.value.length === 0) {
        this.filter.capability.value = ['All']
      }
      if (value === 'All' && this.filter.capability.value.includes('All')) {
        this.filter.capability.value = ['All']
      }
      if (value !== 'All' && this.filter.capability.value.includes(value)) {
        this.filter.capability.value = this.filter.capability.value.filter(item => item !== 'All')
      }
    },
    getCapabilityOptionLabel(key) {
      return capabilityNamesMap[key] || key
    },
    printPage() {
      // Track in GA
      this.$ga.event({
        eventCategory: 'Pathway Results',
        eventAction: 'Print Page'
      })
      // Trigger print in browser
      window.print()
    },

    openUpskillResource(resource) {
      // Track in GA
      this.$ga.event({
        eventCategory: 'Pathway Results',
        eventAction: 'Upskill Resource',
        eventLabel: resource.title,
        eventValue: resource.id
      })

      // Open browser window
      const win = window.open(resource.url, '_blank')
      win.focus()
    },

    getQuestionAnswer(stepId) {
      return this.$store.getters.getHumanReadableAnswerValue(stepId)
    },

    resetFilters() {
      this.filter.format.value = ['All']
    },

    selectTargetRole(role) {
      this.targetRole = role
      this.resetFilters()
      this.$scrollTo('#comparison')
    },

    familyRoles(currentRole) {
      if (currentRole.id === 99) {
        return []
      }
      return this.$collect(this.roles)
        .filter(role => {
          return (
            role.familyFunction === currentRole.familyFunction &&
            role.familyRole === currentRole.familyRole &&
            role.id !== currentRole.id &&
            role.gradeId >= currentRole.gradeId &&
            role.gradeId - currentRole.gradeId <= 3 &&
            role.id !== this.goalRole?.id
          )
        })
        .sortBy('gradeId')
        .all()
    },

    isRoleSharingSkills(firstRole, secondRole) {
      // Pluck out the skill codes for comparison
      const currentSkills = this.$collect(firstRole.skills.focus).pluck('code').all()
      const comparisonSkills = this.$collect(secondRole.skills.focus).pluck('code').all()

      // Only match when roles share at least 2 skills
      return this.$collect(currentSkills)
        .intersect(comparisonSkills)
        .count() > 1
    },

    skillRoles(currentRole) {
      return this.$collect(this.roles)
        // Filter roles and only return those that share at least 2 skills
        .filter(role => this.isRoleSharingSkills(role, currentRole))
        // Filter out my current role and goal role if chosen
        .filter(role => role.id !== currentRole.id && role.id !== this.goalRole?.id)
        // Only return roles with equal or higher grade, but no higher than 3 grades
        .filter(role => role.gradeId >= currentRole.gradeId && role.gradeId - currentRole.gradeId <= 3)
        // Filter out any roles already listed in family and next
        .filter(role => {
          return !this.familyRoles(currentRole).includes(role)
        })
        .sortBy('gradeId')
        .all()
    },

    outboundLinkClick(url) {
      this.$ga.event({
        eventCategory: 'Outbound Link',
        eventAction: 'Click',
        eventLabel: url
      })
    },

    logAnswersToGoogleAnalytics() {
      // Question flow: Current NSW govt employee or not
      this.$ga.event({
        eventCategory: 'Pathway Answers',
        eventAction: 'Government Employee',
        eventLabel: this.getHumanReadableAnswerValue('work-gov')
      })
    }
  }
}
</script>

<style>
@page {
  size: A4;
  margin: 1cm;
  -webkit-print-color-adjust: exact !important;
}

#comparison table tr td:first-child {
  border-right-width: 1px;
  border-right-color: #728096;
}

.print-break {
  page-break-after: always;
}
.inset-border {
  position: relative;
}
.inset-border > div {
  position: relative;
  z-index: 1;
}
.inset-border::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75px;
  background-color: white;
  z-index: 0;
}
</style>

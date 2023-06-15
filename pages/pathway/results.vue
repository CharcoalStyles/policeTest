<template>
  <div class="relative">
    <div class="flex flex-col md:flex-row">
      <print-page class="top-0 right-0 mb-6 md:absolute" @click.native="printPage" />
      <div class="mb-16 md:w-2/3">
        <h2 class="pb-3 font-bold btn-blue text-nsw-brand-primary-blue">
          Personal Career Pathway
        </h2>
        <h1 class="text-3xl font-bold leading-snug tracking-tight lg:text-5xl">
          We've generated a plan to get you to your new role.
        </h1>
      </div>
    </div>
    <div class="p-6 bg-white border rounded border-nsw-grey-200 lg:p-8 print-break">
      <div class="flex flex-col items-center justify-between mb-8 md:flex-row print:flex-row">
        <h2 class="flex text-xl font-bold">
          <img src="/icons/clipboard.svg" alt="Clipboard Icon" class="mr-4"> Your answers
        </h2>
        <button class="p-2 underline print:hidden" @click="modals.update = true">
          Update answers
        </button>
      </div>
      <div class="w-full">
        <div v-if="getQuestionAnswer('goal-timeframe')" class="flex flex-col mb-8 md:flex-row">
          <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
            Target timeframe
          </div>
          <div>I would like to get there in <span class="font-bold text-nsw-brand-secondary-blue">{{ getQuestionAnswer('goal-timeframe') }}</span></div>
        </div>
        <div v-if="getQuestionAnswer('disciplines')" class="flex flex-col mb-8 md:flex-row">
          <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
            Interest areas
          </div>
          <div>I’m interested in <span class="font-bold text-nsw-brand-secondary-blue">{{ getQuestionAnswer('disciplines') }}</span></div>
        </div>
        <div v-if="getQuestionAnswer('learning')" class="flex flex-col mb-8 md:flex-row">
          <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
            How you like to learn
          </div>
          <div>I prefer to learn using <span class="font-bold text-nsw-brand-secondary-blue">{{ getQuestionAnswer('learning') }}</span></div>
        </div>
        <div v-if="getQuestionAnswer('management')" class="flex flex-col mb-8 md:flex-row">
          <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
            How you like to work
          </div>
          <div><span class="font-bold text-nsw-brand-secondary-blue">{{ getQuestionAnswer('management') }}</span></div>
        </div>
        <div v-if="getQuestionAnswer('priorities')" class="flex flex-col mb-8 md:flex-row">
          <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
            When choosing a role
          </div>
          <div>I consider <span class="font-bold text-nsw-brand-secondary-blue">{{ getQuestionAnswer('priorities') }}</span></div>
        </div>
        <div v-if="getQuestionAnswer('additional-skills')" class="flex flex-col mb-8 md:flex-row">
          <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
            Other skills
          </div>
          <div>My other skills are <span class="font-bold text-nsw-brand-secondary-blue">{{ getQuestionAnswer('additional-skills') }}</span></div>
        </div>
        <div v-if="getQuestionAnswer('qualifications')" class="flex flex-col md:flex-row">
          <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
            Qualifications
          </div>
          <div>My qualifications are <span class="font-bold text-nsw-brand-secondary-blue">{{ getQuestionAnswer('qualifications') }}</span></div>
        </div>
      </div>
    </div>
    <div>
      <div id="target" class="py-6 border-b lg:py-16 border-nsw-grey-200 print-break">
        <div class="mb-10">
          <h3 class="flex items-center mb-3 text-xl font-bold md:text-3xl">
            <step-badge>1</step-badge> Select your target role
          </h3>
          <p class="md:w-2/3">
            Compare your current role to a target role by skill, capability, salary and grade. You'll also be shown upskilling resources to help you get to your target role.
          </p>
        </div>
        <div class="lg:w-10/12">
          <div v-if="goalRole" class="grid grid-cols-1 gap-16 mb-10 lg:grid-cols-2">
            <div>
              <h4 class="flex items-center mb-6 text-lg font-bold">
                Your goal role <help-bubble tooltip="This is the role you told us you wanted to move into." />
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
        <div class="">
          <label class="font-bold" for="filterSkills">Type of content</label>
          <div class="table mt-1">
            <select id="filterSkills" v-model="filterFormatValue" class="nsw-form-select">
              <option v-for="option in filterFormatOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
        </div>
        <div class="md:w-12/12">
          <div v-for="(group, propertyName, groupIndex) in filteredResources.groups" :key="groupIndex">
            <h3 class="mb-6 mt-16 text-xl font-bold">
              {{ propertyName }}
            </h3>
            <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
              <upskilling-resource v-for="(resource, index) in group" :key="index" :resource="resource" :target-role-capabilities="targetRoleCapabilities" @click.native="openUpskillResource(resource)" />
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
      <div class="py-6 lg:py-16">
        <print-page class="mb-6" @click.native="printPage" />
        <disclaimer-panel>Salaries are indicative only. Check the position description when applying</disclaimer-panel>
        <disclaimer-panel>Completing resources does not guarantee successful transition to any role</disclaimer-panel>
      </div>
    </div>
    <modal-update :show="modals.update" max-width="xl" :scrollable="false" @close="modals.update = false" />
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
    HelpBubble
  },
  data() {
    return {
      resources,
      targetRole: false,
      modals: {
        update: false,
        beta: true
      },
      filterFormatValue: 'All'
    }
  },
  computed: {
    ...mapGetters([
      'answers',
      'getHumanReadableAnswerValue'
    ]),
    filterFormatOptions() {
      if (this.allResources.length > 0) {
        const formats = this.$collect(
          this.allResources.map(resource => resource.format[0])
        ).unique().all()
        formats.unshift('All')
        return formats
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
        if (!this.filterFormatValue || this.filterFormatValue === 'All' || resource.format[0] === this.filterFormatValue) {
          return true
        }
        return false
      })

      filteredResources.forEach((resource) => {
        const format = resource.format[0]
        if (!groupedResources.hasOwnProperty(format)) {
          groupedResources[format] = []
        }
        groupedResources[format].push(resource)
      })
      return {
        groups: groupedResources,
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
    }
  },
  mounted() {
    this.logAnswersToGoogleAnalytics()
  },
  methods: {
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

    selectTargetRole(role) {
      this.targetRole = role
      this.$scrollTo('#comparison')
    },

    familyRoles(currentRole) {
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
        .sort((a, b) => {
          const roleA = a.name.toUpperCase()
          const roleB = b.name.toUpperCase()
          return (roleA < roleB) ? -1 : (roleA > roleB) ? 1 : 0
        })
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

      // Question flow: Are you more interested in being an individual contributor or a manager?
      this.$ga.event({
        eventCategory: 'Pathway Answers',
        eventAction: 'Manager or Contributor',
        eventLabel: this.getHumanReadableAnswerValue('management')
      })

      // Question flow, Q21 - How many & which areas of interest are selected. "What discipline areas of digital are you interested in?"
      this.$ga.event({
        eventCategory: 'Pathway Answers',
        eventAction: 'Discipline Areas Selected',
        eventLabel: this.$store.state.pathway.answers.disciplines.value.length.toString()
      })

      // Question flow, Q23 - How many and which items items are selected for choosing a new role. "What matters to you when choosing a new role?"
      this.$ga.event({
        eventCategory: 'Pathway Answers',
        eventAction: 'Role Priorities Selected',
        eventLabel: this.$store.state.pathway.answers.priorities.value.length.toString()
      })

      // Question flow, Q23 - How many and which items items are selected for choosing a new role. "What matters to you when choosing a new role?"
      this.$ga.event({
        eventCategory: 'Pathway Answers',
        eventAction: 'Learning Preferences Selected',
        eventLabel: this.$store.state.pathway.answers.learning.value.length.toString()
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
</style>

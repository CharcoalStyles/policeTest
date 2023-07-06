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
                  Your personal career pathway
                </h2>
                <h1 class="text-3xl md:text-4xl font-bold leading-snug tracking-tight lg:text-5xl">
                  We’ve generated a plan to get you to your next role
                </h1>
              </div>
            </div>
            <div class="p-6 bg-white border rounded border-nsw-grey-200 lg:p-8 print-break">
              <div class="flex flex-row items-center justify-between mb-8 print:flex-row">
                <h2 class="flex text-lg sm:text-2xl font-bold">
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
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    <div class="flex items-center whitespace-no-wrap">
                      Your procurement skills<help-bubble tooltip="These are the typical procurement skills required for the role type you selected." />
                    </div>
                  </div>
                  <div>I assessed myself in <span class="font-bold text-nsw-brand-secondary-blue">{{ readableSkillsList }}</span></div>
                </div>
                <div v-if="readableCapabilitiesList" class="flex flex-col mb-6 md:flex-row">
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    <div class="flex items-center whitespace-no-wrap">
                      Your core capabilities<help-bubble tooltip="These are the typical core capabilities required for the role type you selected." />
                    </div>
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
                Compare your current role to a target role by skill, capability, salary and grade. You’ll also be shown upskilling resources to help you get to your target role.
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
                <div v-if="!targetRole && familyRoles(currentRole).length === 0 && skillRoles(currentRole).length === 0">
                  <disclaimer-panel heading="No roles available">
                    <nuxt-link to="/pathway/goal" class="underline text-nsw-brand-primary-blue">
                      Update your answers
                    </nuxt-link> to select a target role.
                  </disclaimer-panel>
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
                          Select a <a v-scroll-to="'#target'" href="/pathway/goal" class="underline text-nsw-brand-primary-blue">target role</a> to start comparing roles.
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
            <div class="flex flex-wrap">
              <div class="relative mr-4 mb-4 w-full sm:w-auto">
                <label class="font-bold" for="filterFormats">Type of content</label>
                <div class="mt-1" style="min-width:260px;">
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
              <div class="relative mr-4 mb-4 w-full sm:w-auto">
                <label class="font-bold" for="filterCapabilities">Skill</label>
                <div class="mt-1" style="min-width:260px;">
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
              <div class="relative mr-4 sm:mr-8 mb-4 w-full sm:w-auto">
                <label class="flex items-center whitespace-no-wrap font-bold" for="filterCapabilities">
                  Level <help-bubble tooltip="Foundational upskilling resources typically align with Level 1 capabilities. Intermediate aligns with levels 2-3, and advanced aligns to levels 4-5." />
                </label>
                <div class="mt-1" style="min-width:260px;">
                  <button class="nsw-form-select text-left" aria-expanded="true" aria-controls="filter-level" @click="toggleLevelFilter">
                    {{ filterLevelLabel }}
                  </button>
                </div>
                <div v-if="filter.level.open" class="nsw-custom-select-level bg-white rounded shadow-lg absolute top-12 left-0 w-full px-4 py-2 z-10" aria-describedby="filter-level">
                  <ul>
                    <li v-for="option in filterLevelOptions" :key="option" :value="option">
                      <input-checkbox v-model="filter.level.value" :input-value="option" :label="option" :name="option" @change="onFilterLevelChange" />
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex space-x-8 items-end mt-0 mb-4 mt-2 sm:mt-0">
                <div class="relative mb-1">
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
                <div class="relative mb-1">
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
                <h3 class="mb-6 mt-6 sm:mt-12 text-xl font-bold">
                  {{ group.label }}
                </h3>
                <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
                  <upskilling-resource v-for="(resource, index) in group.items" :key="index" :resource="resource" :target-role-capabilities="targetRoleCapabilities" @click.native="openUpskillResource(resource)" />
                </div>
              </div>
            </div>
          </div>
          <div class="py-6 border-b lg:py-16 border-nsw-grey-200">
            <h2 class="mb-6 text-3xl md:text-4xl font-bold">
              Next steps
            </h2>
            <div class="grid grid-cols-6 gap-6">
              <next-step-panel
                class="col-span-6"
                title="Take steps to advance your career"
                text="Get tips to help with your capability and career development."
              >
                <a
                  href="/next-steps.pdf"
                  class="inline-flex items-center justify-center font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons whitespace-no-wrap bg-white hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"
                >
                  Career and capability development guide
                </a>
              </next-step-panel>

              <next-step-panel
                class="col-span-6 lg:col-span-2"
                title="Use the Role Explorer"
                text="If you haven’t found the role you are looking for, use the Role Explorer to browse different procurement role types, levels and how they’re connected across the NSW public sector."
              >
                <nuxt-link to="/explorer" class="inline-flex items-center justify-center font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons whitespace-no-wrap bg-white hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue h-10 md:h-12 px-6 md:px-8 text-sm md:text-base">
                  Browse typical roles
                </nuxt-link>
              </next-step-panel>

              <next-step-panel
                class="col-span-6 lg:col-span-2"
                title="See if your target role is available"
                text="Browse procurement job opportunities in the NSW public sector."
              >
                <a
                  href="https://iworkfor.nsw.gov.au/jobs/all-keywords/all-agencies/all-organisations--entities/all-locations/all-worktypes?jobcategoryid=16631,16632,10370,10591,10588,10590,10592,10589,10761,10681,10554"
                  class="inline-flex items-center justify-center font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons whitespace-no-wrap bg-white hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"
                  @click="outboundLinkClick('https://iworkfor.nsw.gov.au/jobs/all-keywords/all-agencies/all-organisations--entities/all-locations/all-worktypes?jobcategoryid=16631,16632,10370,10591,10588,10590,10592,10589,10761,10681,10554')"
                >
                  I work for NSW
                </a>
              </next-step-panel>

              <next-step-panel
                class="col-span-6 lg:col-span-2"
                title="View all upskilling resources"
                text="View procurement upskilling resources for all skills and capabilities in one place."
              >
                <nuxt-link to="/resources" class="inline-flex items-center justify-center font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons whitespace-no-wrap bg-white hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue h-10 md:h-12 px-6 md:px-8 text-sm md:text-base">
                  View all resources
                </nuxt-link>
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
              <disclaimer-panel>For queries relating to the Procurement Career Pathway tool, please contact the NSW Procurement Capability team at: <a href="mailto:NSWP_Capability@treasury.nsw.gov.au" class="font-semibold text-nsw-brand-primary-blue">NSWP_Capability@treasury.nsw.gov.au</a></disclaimer-panel>
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
          open: false,
          options: [],
          value: ['All']
        },
        level: {
          open: false,
          options: [],
          value: ['All'],
          order: [
            'Foundational',
            'Intermediate',
            'Advanced'
          ]
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
    skillsAndCapabilitiesLevelMap() {
      const target = {}
      const current = {}
      this.targetRole.skills.focus.forEach(({ code, level }) => {
        target[code] = parseInt(level)
      })
      this.targetRole.capabilities.focus.forEach(({ code, level }) => {
        target[code] = parseInt(level)
      })
      this.currentRole.skills.focus.forEach(({ code, level }) => {
        current[code] = parseInt(level)
      })
      this.currentRole.capabilities.focus.forEach(({ code, level }) => {
        current[code] = parseInt(level)
      })
      return { target, current }
    },
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
    filterLevelLabel() {
      if (this.filter.level.value && this.filter.level.value.includes('All')) {
        return 'All levels'
      }
      const filtered = this.filter.level.value.filter(item => item !== 'All')
      if (filtered.length > 1) {
        return `${filtered.length} levels`
      }
      return this.filter.level.value[0]
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

        this.allResources.forEach((resource) => {
          const matchedSkills = this.$collect([...resource.skills, ...resource.capabilities])
            .unique('code')
            .filter(({ code, level }) => this.isNewSkill({ code }) || this.isUpskill({ code, level }))
            .all()
          tmp.push(...matchedSkills)
        })

        const codes = this.$collect(tmp)
          .unique('code')
          .map(({ code }) => code)
          .all()

        codes.unshift('All')
        return codes || ['']
      }
      return ['All']
    },
    filterLevelOptions() {
      if (this.allResources.length > 0) {
        const tmp = []
        this.allResources.map((resource) => {
          resource.targetLevel.forEach((level) => tmp.push(level))
        })
        const levels = this.$collect(tmp).unique().all()
        const orderedLevels = levels.sort((a, b) => this.filter.level.order.indexOf(a) - this.filter.level.order.indexOf(b))
        orderedLevels.unshift('All')
        return orderedLevels
      }
      return ['All']
    },
    allResources() {
      if (!this.targetRole) {
        return []
      }
      const defaultResources = this.$collect(this.resources).where('default', true).all()
      const targetRoleSkills = this.targetRole.skills.focus
      const targetRoleCapabilities = this.targetRole.capabilities.focus

      const matchingResources = this.$collect(this.resources)
        .filter(resource => {
          let keep = false

          targetRoleSkills.forEach((targetRoleSkill) => {
            // Get all resource skills that match targte role skills
            const matchedResourceSkills = this.$collect(resource.skills).where('code', targetRoleSkill.code).all()
            const selfAssessmentSkillLevel = this.answers.skills[targetRoleSkill.code]?.value

            // Iterrate through matched skills
            matchedResourceSkills.forEach((resourceSkill) => {
              const resourceSkillLevel = parseInt(resourceSkill?.level)

              // This is a new skill AND the resource skill level is higher than or equal to the target skill level
              if (selfAssessmentSkillLevel === undefined && resourceSkillLevel >= targetRoleSkill.level) {
                keep = true
              }

              // resource skill level is higher than the users self-assessment level AND is higher than or equal to the target role level
              if (resourceSkillLevel > selfAssessmentSkillLevel && resourceSkillLevel >= targetRoleSkill.level) {
                keep = true
              }
            })
          })

          targetRoleCapabilities.forEach((targetRoleCapbility) => {
            // Get all resource capabilities that match targte role capabilities
            const matchedResourceCapabilities = this.$collect(resource.capabilities).where('code', targetRoleCapbility.code).all()
            const selfAssessmentCapabilityLevel = this.answers.capabilities[targetRoleCapbility.code]?.value

            // Iterrate through matched capabilities
            matchedResourceCapabilities.forEach((resourceCapability) => {
              const resourceCapabilityLevel = parseInt(resourceCapability?.level)

              // This is a new capability AND the resource capability level is higher than or equal to the target capability level
              if (selfAssessmentCapabilityLevel === undefined && resourceCapabilityLevel >= targetRoleCapbility.level) {
                keep = true
              }

              // resource capability level is higher than the users self-assessment level AND is higher than or equal to the target role level
              if (resourceCapabilityLevel > selfAssessmentCapabilityLevel && resourceCapabilityLevel >= targetRoleCapbility.level) {
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
          capability: false,
          level: false
        }
        if (this.filter.format.value.includes('All') || this.filter.format.value.includes(resource.format)) {
          match.format = true
        }
        if (this.filter.capability.value.includes('All')) {
          match.capability = true
        }

        if (this.filter.level.value.includes('All')) {
          match.level = true
        }

        if (this.filter.free.value && resource.cost !== '0') {
          return false
        }

        if (this.filter.recommended.value && resource.default !== true) {
          return false
        }

        const matchedSkills = this.$collect([...resource.skills, ...resource.capabilities])
          .unique('code')
          .filter(({ code, level }) => {
            if (this.filter.capability.value.includes(code)) {
              // Is a new skill OR Matching resources has an equal or better level than the target role
              if (this.isNewSkill({ code }) || this.isUpskill({ code, level })) {
                return true
              }
              return false
            }
          })

        if (matchedSkills?.items && matchedSkills.items.length > 0) {
          match.capability = true
        }

        const matchedLevels = this.$collect(resource.targetLevel)
          .map((item) => item)
          .contains((value, key) => this.filter.level.value.includes(value))

        if (matchedLevels) {
          match.level = true
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
      if (!target.closest('.nsw-custom-select-level')) {
        this.filter.level.open = false
      }
    },
    toggleFormatFilter(e) {
      e.stopPropagation()
      this.filter.format.open = !this.filter.format.open
      this.filter.capability.open = false
      this.filter.level.open = false
    },
    toggleCapabilityFilter(e) {
      e.stopPropagation()
      this.filter.capability.open = !this.filter.capability.open
      this.filter.format.open = false
      this.filter.level.open = false
    },
    toggleLevelFilter(e) {
      e.stopPropagation()
      this.filter.level.open = !this.filter.level.open
      this.filter.format.open = false
      this.filter.capability.open = false
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
    onFilterLevelChange(value) {
      if (!this.filter.level.value || this.filter.level.value.length === 0) {
        this.filter.level.value = ['All']
      }
      if (value === 'All' && this.filter.level.value.includes('All')) {
        this.filter.level.value = ['All']
      }
      if (value !== 'All' && this.filter.level.value.includes(value)) {
        this.filter.level.value = this.filter.level.value.filter(item => item !== 'All')
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
            role.id !== this.goalRole?.id &&
            !role.genericRole
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

    isNewSkill({ code }) {
      return this.skillsAndCapabilitiesLevelMap?.current?.[code] === undefined && typeof this.skillsAndCapabilitiesLevelMap?.target?.[code] === 'number'
    },

    isUpskill({ code, level }) {
      return parseInt(level) >= this.skillsAndCapabilitiesLevelMap?.target?.[code]
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

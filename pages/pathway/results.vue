<template>
  <div class="relative flex-grow z-10">
    <div class="bg-nsw-grey-100 inset-border">
      <div class="xl:container">
        <div class="px-4 md:px-6 pt-6">
          <div class="">
            <div class="flex flex-col md:flex-row justify-between items-center">
              <div class="mb-8 md:mb-16 md:w-2/3 lg:w-1/2">
                <h2 class="pb-3 font-bold btn-blue text-nsw-brand-primary-blue">
                  Your personal career pathway
                </h2>
                <h1
                  class="text-3xl md:text-4xl font-bold leading-snug tracking-tight lg:text-5xl"
                >
                  We’ve generated a plan to get you to your next role
                </h1>
              </div>
              <div>
                <print-page class="mb-6" @click.native="printPage" />
              </div>
            </div>
            <div
              class="p-6 bg-white border rounded border-nsw-grey-200 lg:p-8 print-break"
            >
              <div
                class="flex flex-row items-center justify-between mb-8 print:flex-row print:hidden"
              >
                <h2 class="flex text-lg sm:text-2xl font-bold">Your answers</h2>
                <nsw-button
                  action="secondary-outline"
                  @click.native="modals.update = true"
                >
                  Update answers
                </nsw-button>
              </div>
              <div class="w-full">
                <div
                  v-if="currentRole.name"
                  class="flex flex-col mb-6 md:flex-row"
                >
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    My current role
                  </div>
                  <div>
                    <span class="font-bold text-nsw-brand-secondary-blue">
                      {{ currentRole.name }} - {{ currentRole.grade }}
                    </span>
                  </div>
                </div>
                <div
                  v-if="targetRole.name"
                  class="flex flex-col mb-6 md:flex-row"
                >
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    Your target role
                  </div>
                  <div>
                    I would like to be a
                    <span class="font-bold text-nsw-brand-secondary-blue">{{
                      targetRole.name
                    }}</span>
                    or similar
                  </div>
                </div>
                <div
                  v-if="readableInterestsList"
                  class="flex flex-col mb-6 md:flex-row"
                >
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    Interest Areas
                  </div>
                  <div>
                    I'm interested in
                    <span class="font-bold text-nsw-brand-secondary-blue">{{
                      readableInterestsList
                    }}</span>
                  </div>
                </div>
                <div
                  v-if="managementPreference"
                  class="flex flex-col mb-6 md:flex-row"
                >
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    How you like to work
                  </div>
                  <div v-if="managementPreference === 'individual'">
                    I would prefer to be an
                    <span class="font-bold text-nsw-brand-secondary-blue">
                      Individual contributor</span
                    >
                  </div>
                  <div v-else-if="managementPreference === 'manager'">
                    I would prefer to be a
                    <span class="font-bold text-nsw-brand-secondary-blue">
                      Supervisor/Manager</span
                    >
                  </div>
                  <div v-else>
                    I don't have a preference over being an
                    <span class="font-bold text-nsw-brand-secondary-blue">
                      Individual contributor</span
                    >
                    or
                    <span class="font-bold text-nsw-brand-secondary-blue">
                      Supervisor/Manager</span
                    >
                  </div>
                </div>
                <div
                  v-if="newRolePreference"
                  class="flex flex-col mb-6 md:flex-row"
                >
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    When Choosing A Role
                  </div>
                  <div>
                    I consider
                    <span class="font-bold text-nsw-brand-secondary-blue">
                      {{ newRolePreference }}</span
                    >
                  </div>
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
          <div
            id="target"
            class="py-6 border-b lg:py-16 border-nsw-grey-200 print:hidden"
          >
            <div class="mb-10">
              <h3 class="flex items-center mb-3 text-3xl font-bold md:text-3xl">
                <step-badge>1</step-badge> Select your target role
              </h3>
              <p class="md:w-2/3">
                Selecting a target role allows you to compare your current role,
                identify skills gaps and find out about essential requirements.
              </p>
            </div>
            <div class="w-full">
              <div v-if="goalRole" class="w-full md:w-1/2 pb-4">
                <div>
                  <div class="mb-6">
                    <h4 class="text-2xl font-bold">Your desired role</h4>
                    <p>The role you identified in the career questionnaire</p>
                  </div>
                  <role-selector
                    :role="goalRole"
                    :target-role="targetRole"
                    @click.native="selectTargetRole(goalRole)"
                    @keyup.space="selectTargetRole(goalRole)"
                  />
                </div>
              </div>
              <hr class="mb-6" />
              <div class="mb-7">
                <h4 v-if="goalRole" class="text-2xl font-bold">
                  Other options based on your answers
                </h4>
                <h4 v-else class="text-2xl font-bold">
                  Options based on your answers
                </h4>
              </div>
              <div class="md:flex flex-row flex-wrap hidden">
                <div
                  v-if="columns.progRoles.length"
                  class="flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"
                >
                  <div class="mb-6">
                    <h4 class="text-xl font-bold">Progression roles</h4>
                    <p>Progression roles based on your answers and interests</p>
                  </div>
                </div>
                <div
                  v-if="columns.adjRoles.length"
                  class="flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"
                >
                  <div class="mb-6">
                    <h4 class="text-xl font-bold">Adjacent roles</h4>
                    <p>Adjacent roles based on your answers and interests</p>
                    <div class="flex flex-row gap-2 flex-wrap mb-2"></div>
                  </div>
                </div>
                <div
                  v-if="columns.skillRoles.length"
                  class="flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"
                >
                  <div class="mb-6">
                    <h4 class="text-xl font-bold">Roles with similar skills</h4>
                    <p>
                      Roles from other parts of the organisation that share your
                      current skills and capabilities
                    </p>
                    <div class="flex flex-row gap-2 flex-wrap mb-2"></div>
                  </div>
                </div>
              </div>

              <!-- Lists -->

              <div class="flex flex-row flex-wrap print:hidden">
                <div
                  v-if="columns.progRoles.length"
                  class="flex-none md:flex-grow w-full md:w-1/3 md:max-w-[50%] px-4 pb-4"
                >
                  <div class="mb-6 md:hidden">
                    <h4 class="text-xl font-bold">Progression roles</h4>
                    <p>Roles that your current role can progress to</p>
                  </div>
                  <role-selector
                    v-for="role in columns.progRoles"
                    :key="role.id"
                    :role="role"
                    :target-role="targetRole"
                    @click.native="selectTargetRole(role)"
                    @keyup.space="selectTargetRole(role)"
                  />
                </div>
                <div
                  v-if="columns.adjRoles.length"
                  class="flex-none md:flex-grow w-full md:w-1/3 md:max-w-[50%] px-4 pb-4"
                >
                  <div class="mb-6 md:hidden">
                    <h4 class="text-xl font-bold">Adjacent roles</h4>
                    <p>
                      Roles from your current work area that share your current
                      capabilities
                    </p>
                    <div class="flex flex-row gap-2 flex-wrap mb-2"></div>
                  </div>
                  <role-selector
                    v-for="role in columns.adjRoles"
                    :key="role.id"
                    :role="role"
                    :target-role="targetRole"
                    @click.native="selectTargetRole(role)"
                    @keyup.space="selectTargetRole(role)"
                  />
                </div>
                <div
                  v-if="columns.skillRoles.length"
                  class="flex-none md:flex-grow w-full md:w-1/3 md:max-w-[50%] px-4 pb-4"
                >
                  <div class="mb-6 md:hidden">
                    <h4 class="text-xl font-bold">Roles with similar skills</h4>
                    <p>
                      Roles from other parts of the organisation that share your
                      current skills and capabilities
                    </p>
                    <div class="flex flex-row gap-2 flex-wrap mb-2"></div>
                  </div>
                  <role-selector
                    v-for="role in columns.skillRoles"
                    :key="role.id"
                    :role="role"
                    :target-role="targetRole"
                    @click.native="selectTargetRole(role)"
                    @keyup.space="selectTargetRole(role)"
                  />
                </div>

                <div
                  v-if="
                    !targetRole &&
                    columns.progRoles.length === 0 &&
                    columns.adjRoles.length === 0 &&
                    columns.skillRoles.length === 0
                  "
                >
                  <disclaimer-panel heading="No roles available">
                    <nuxt-link
                      to="/pathway/goal"
                      class="underline text-nsw-brand-primary-blue"
                    >
                      Update your answers
                    </nuxt-link>
                    to select a target role.
                  </disclaimer-panel>
                </div>
              </div>
            </div>
          </div>
          <div id="comparison" class="w-full py-6 lg:py-16 overflow-hidden">
            <div class="mb-24">
              <h3 class="flex items-center mb-3 text-xl font-bold md:text-3xl">
                <step-badge class="print:hidden">2</step-badge> Your skills and
                capability comparison
              </h3>
              <p class="print:hidden">
                Select any <strong>skill</strong> or
                <strong>capability</strong> to understand gaps and upskilling
                opportunities.
              </p>
            </div>

            <div
              class="flex flex-col border border-gray-300 rounded-lg overflow-y-scroll"
            >
              <div class="flex flex-row min-w-[550px]">
                <div class="border-r border-gray-300 w-1/2 px-4 py-4 flex-grow">
                  <div>
                    <role-selected
                      :roles="roles"
                      :role="currentRole"
                      type="current"
                    />
                  </div>
                </div>
                <div class="w-1/2 px-4 py-4 flex-grow">
                  <div>
                    <role-selected
                      v-if="targetRole"
                      :roles="roles"
                      :role="targetRole"
                      type="target"
                    />
                    <div
                      v-else
                      class="flex items-center justify-center p-4 lg:p-8"
                    >
                      <div class="flex flex-col items-center m-4 lg:m-8">
                        <img
                          src="/icons/empty.svg"
                          alt="No target role selected"
                          class="mb-6"
                        />
                        <div class="text-center lg:w-2/3">
                          Select a
                          <a
                            v-scroll-to="'#target'"
                            href="/pathway/goal"
                            class="underline text-nsw-brand-primary-blue"
                            >target role</a
                          >
                          to start comparing roles.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-300 min-w-[550px]">
                <results-comparison
                  :current-role="currentRole"
                  :target-role="targetRole"
                />
              </div>
            </div>
          </div>
          <div class="print:hidden">
            <h2 class="text-3xl font-bold mb-8">Next steps</h2>
            <div class="flex flex-col gap-8">
              <div class="flex flex-row flex-wrap gap-8">
                <div
                  class="w-full md:w-1/3 px-6 py-8 flex-grow flex flex-col gap-5 bg-nsw-brand-primary-blue-light"
                >
                  <p class="text-2xl font-bold">Start a career conversation</p>
                  <p>
                    Share this plan with your Supervisor / Manager or support
                    network by saving a copy and using it in your next
                    conversation.
                  </p>
                  <print-page class="mb-6" @click.native="printPage" />
                </div>
                <div
                  class="w-full md:w-1/3 px-6 py-8 flex-grow flex flex-col gap-5 bg-nsw-grey-100"
                >
                  <p class="text-2xl font-bold">Career Advisory</p>
                  <p>
                    Our Career Advisory Team is here to help. Reach out to get
                    help in planning your career with NSWPF.
                  </p>
                  <div>
                    <a
                      href="https://intranet.police.nsw.gov.au/organisational_units/corporate_services/human_resource_services/careers_and_deployment/career_planning_and_development_framework/career_skills_workshop"
                      target="_blank"
                      class="underline text-nsw-brand-primary-blue font-bold"
                    >
                      Career Advisory Team</a
                    >
                    <p class="text-nsw-brand-primary-blue font-bold">
                      #PCC-Careers
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex flex-row flex-wrap gap-8">
                <div
                  class="w-full md:w-1/4 px-6 py-8 flex-grow flex flex-col gap-5 bg-nsw-grey-100"
                >
                  <p class="text-2xl font-bold">
                    Search for more roles on the Role Explorer
                  </p>
                  <p>
                    If you haven’t found the role you are looking for you can
                    search over 1300 NSWPF roles with our Role Explorer.
                  </p>
                  <nuxt-link
                    to="/explorer"
                    class="underline text-nsw-brand-primary-blue font-bold"
                  >
                    Role Explorer
                  </nuxt-link>
                </div>
                <div
                  class="w-full md:w-1/4 px-6 py-8 flex-grow flex flex-col gap-5 bg-nsw-grey-100"
                >
                  <p class="text-2xl font-bold">
                    Browse available roles or EOIs
                  </p>
                  <p>
                    Search for your target role or related role opportunities -
                    including available NSWPF administrative job opportunities
                    with NSW Government.
                  </p>
                  <div class="flex flex-col gap-6">
                    <div>
                      <a
                        href="https://iworkfor.nsw.gov.au/"
                        target="_blank"
                        class="underline text-nsw-brand-primary-blue font-bold flex flex-row gap-4"
                      >
                        iWorkforNSW
                        <img src="/icons/link.svg" alt="External link icon"
                      /></a>
                    </div>

                    <div>
                      <a
                        href="https://jobsnsw.taleo.net/careersection/nswpoliceforceeoi/jobsearch.ftl"
                        target="_blank"
                        class="underline text-nsw-brand-primary-blue font-bold"
                      >
                        NSWPF internal EOI board</a
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="w-full md:w-1/4 px-6 py-8 flex-grow flex flex-col gap-5 bg-nsw-grey-100"
                >
                  <p class="text-2xl font-bold">Relevant resources</p>
                  <div class="flex flex-col gap-2">
                    <div>
                      <a
                        href="https://intranet.police.nsw.gov.au/organisational_units/corporate_services/human_resource_services/careers_and_deployment/career_planning_and_development_framework"
                        target="_blank"
                        class="underline text-nsw-brand-primary-blue font-bold"
                      >
                        NSWPF Careers intranet site</a
                      >
                    </div>
                    <div>
                      <a
                        href="https://intranet.police.nsw.gov.au/organisational_units/corporate_services/human_resource_services/vacancies_transfers_and_mobility/role_description_library"
                        target="_blank"
                        class="underline text-nsw-brand-primary-blue font-bold"
                      >
                        NSWPF Role Description Library</a
                      >
                    </div>
                    <div>
                      <a
                        href="https://intranet.police.nsw.gov.au/systems_availability_site/all_systems/pete#"
                        target="_blank"
                        class="underline text-nsw-brand-primary-blue font-bold"
                      >
                        PETE: Police Education Training Environment</a
                      >
                    </div>
                    <div>
                      <a
                        href="https://intranet.police.nsw.gov.au/organisational_units/corporate_services/human_resource_services/careers_and_deployment/career_management_system"
                        target="_blank"
                        class="underline text-nsw-brand-primary-blue font-bold"
                      >
                        My Performance and Capability Framework</a
                      >
                    </div>
                    <div>
                      <a
                        href="https://sfia-online.org/en"
                        target="_blank"
                        class="underline flex-shrink text-nsw-brand-primary-blue font-bold flex flex-row gap-2"
                      >
                        SFIA Skill framework
                        <img src="/icons/link.svg" alt="External link icon"
                      /></a>
                    </div>
                    <div>
                      <a
                        href="https://www.psc.nsw.gov.au/workforce-management/capability-framework/capability-framework-resources-index/capability-discovery-tool"
                        target="_blank"
                        class="underline flex-shrink text-nsw-brand-primary-blue font-bold flex flex-row gap-2"
                      >
                        NSW Government, Public Service Commission - Capability
                        discovery tool
                        <img src="/icons/link.svg" alt="External link icon"
                      /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-row gap-8"></div>
            </div>
          </div>
        </div>
        <div>
          <div class="md:w-8/12">
            <div class="py-6 lg:py-16">
              <disclaimer-panel>
                Salaries are indicative only. Check the job ad when applying for
                a role.
              </disclaimer-panel>
              <disclaimer-panel>
                Completing pre-requisites does not guarantee successful
                transition to any role
              </disclaimer-panel>
            </div>
          </div>
        </div>
        <modal-update
          :show="modals.update"
          max-width="xl"
          :scrollable="false"
          @close="modals.update = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RoleSelector from '@/components/pathway/results/RoleSelector'
import RoleSelected from '@/components/pathway/results/RoleSelected'
import ResultsComparison from '@/components/pathway/results/ResultsComparison'
import ModalUpdate from '@/components/pathway/results/ModalUpdate'
import StepBadge from '@/components/pathway/results/StepBadge'
import PrintPage from '@/components/PrintPage'
import DisclaimerPanel from '@/components/pathway/results/DisclaimerPanel'
import {
  adjacentRoles,
  progressionRoles,
  skillRoles,
  rankAndSortRoles
} from '@/utils/roleComp'
// import { shuffle } from '~/utils/array'
import NswpfBeta from '~/components/nswpfBeta.vue'

export default {
  layout: 'results',
  middleware: ['completed'],
  components: {
    RoleSelector,
    RoleSelected,
    ResultsComparison,
    ModalUpdate,
    StepBadge,
    PrintPage,
    DisclaimerPanel,
    NswpfBeta
  },
  data() {
    return {
      targetRole: false,
      modals: {
        update: false,
        beta: true
      }
    }
  },
  computed: {
    ...mapGetters(['answers', 'getHumanReadableAnswerValue']),
    roles() {
      return this.$store.state.roles
    },
    currentRole() {
      if (this.answers.hasOwnProperty('current-role')) {
        return this.answers['current-role'].value
      }
      return null
    },
    goalRole() {
      if (this.answers.hasOwnProperty('goal-role')) {
        return this.answers['goal-role'].value
      }
      return false
    },
    readableInterestsList() {
      if (!this.answers.hasOwnProperty('interests')) {
        return false
      }
      return this.answers.interests.value.join(', ')
    },
    managementPreference() {
      if (this.answers.hasOwnProperty('management')) {
        return this.answers.management.value
      }
      return null
    },
    newRolePreference() {
      if (this.answers.hasOwnProperty('new-role')) {
        return this.answers['new-role'].value.join(', ')
      }
      return ''
    },
    userInterests() {
      if (this.answers.hasOwnProperty('interests')) {
        return this.answers.interests.value
      }
      return []
    },
    columns() {
      const progRoles = this.progRoles(this.currentRole).slice(0, 6)
      const adjRoles = this.adjRoles(this.currentRole)
        .filter((r) => progRoles.find((a) => a.id === r.id) === undefined)
        .slice(0, 6)
      const skillRoles = this.skillRoles(this.currentRole)
        .filter(
          (r) =>
            adjRoles.find((a) => a.id === r.id) === undefined &&
            progRoles.find((a) => a.id === r.id) === undefined
        )
        .slice(0, 6)
      return { progRoles, adjRoles, skillRoles }
    }
  },
  mounted() {
    if (this.goalRole) {
      this.targetRole = this.goalRole
    }
  },
  methods: {
    printPage() {
      window.print()
    },

    getQuestionAnswer(stepId) {
      return this.$store.getters.getHumanReadableAnswerValue(stepId)
    },

    selectTargetRole(role) {
      this.targetRole = role
      this.$scrollTo('#comparison')
    },

    progRoles(currentRole) {
      const filteredRoles = progressionRoles(
        this.roles,
        currentRole,
        this.goalRole,
        this.userInterests,
        this.answers
      )

      const ranked = rankAndSortRoles(
        currentRole,
        filteredRoles,
        'progression',
        this.userInterests,
        this.answers
      )

      return ranked.map(({ role }) => role)
    },

    adjRoles(currentRole) {
      const filteredRoles = adjacentRoles(this.roles, currentRole)

      const ranked = rankAndSortRoles(
        currentRole,
        filteredRoles,
        'adjacent',
        this.userInterests,
        this.answers
      )

      return ranked.map(({ role }) => role)
    },

    skillRoles(currentRole) {
      const hasSwornAnswer = this.answers.hasOwnProperty('sworn')
      let matches = null

      // If the user's current role is a police role and they have opted
      // to only see other police roles
      if (
        currentRole.jobFamily === 'Policing' &&
        hasSwornAnswer &&
        this.answers.hasOwnProperty('sworn') === 'yes'
      ) {
        matches = skillRoles(
          this.roles,
          this.currentRole,
          this.goalRole,
          this.userInterests,
          this.answers
        )
          .filter((role) => {
            if (role.jobFamily !== 'Policing') {
              return false
            }
            return true
          })
          .filter((role) => {
            if (role.jobFunction === currentRole.jobFunction) {
              return false
            }
            return true
          })
      } else {
        matches = skillRoles(
          this.roles,
          this.currentRole,
          this.goalRole,
          this.userInterests,
          this.answers
        ).filter((role) => {
          if (this.currentRole.jobFamily === 'Policing') {
            return true
          }
          return role.jobFamily !== currentRole.jobFamily
        })
      }

      return rankAndSortRoles(
        currentRole,
        matches,
        'skill',
        this.userInterests,
        this.answers
      ).map(({ role }) => role)
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

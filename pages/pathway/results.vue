<template>
  <div class="relative flex-grow z-10">
    <div class="bg-nsw-grey-100 inset-border">
      <div class="xl:container">
        <div class="flex flex-row md:pb-10 md:pt-8">
          <div
            class="bg-nsw-brand-primary-blue font-bold text-center text-white px-2 py-1"
          >
            Beta
          </div>
          <div class="text-nsw-brand-primary-blue px-2 py-1">
            This is a <span class="underline">new service</span> - your
            <span class="underline">feedback</span> will help us improve it.
          </div>
        </div>
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
                class="flex flex-row items-center justify-between mb-8 print:flex-row"
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
                  v-if="currentRole.name && currentRole.id !== 99"
                  class="flex flex-col mb-6 md:flex-row"
                >
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    Your current role
                  </div>
                  <div>
                    I am currently a
                    <span class="font-bold text-nsw-brand-secondary-blue">{{
                      currentRole.name
                    }}</span>
                    or similar
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
                  v-if="readableSkillsList"
                  class="flex flex-col mb-6 md:flex-row"
                >
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    <div class="flex items-center whitespace-no-wrap">
                      Your procurement skills<help-bubble
                        tooltip="These are the typical procurement skills required for the role type you selected."
                      />
                    </div>
                  </div>
                  <div>
                    I assessed myself in
                    <span class="font-bold text-nsw-brand-secondary-blue">{{
                      readableSkillsList
                    }}</span>
                  </div>
                </div>
                <div
                  v-if="readableCapabilitiesList"
                  class="flex flex-col mb-6 md:flex-row"
                >
                  <div class="flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6">
                    <div class="flex items-center whitespace-no-wrap">
                      Your core capabilities<help-bubble
                        tooltip="These are the typical core capabilities required for the role type you selected."
                      />
                    </div>
                  </div>
                  <div>
                    I assessed myself in
                    <span class="font-bold text-nsw-brand-secondary-blue">{{
                      readableCapabilitiesList
                    }}</span>
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
            class="py-6 border-b lg:py-16 border-nsw-grey-200 print-break"
          >
            <div class="mb-10">
              <h3 class="flex items-center mb-3 text-xl font-bold md:text-3xl">
                <step-badge>1</step-badge> Select your target role
              </h3>
              <p class="md:w-2/3">
                Compare your current role to a target role by skill, capability,
                salary and grade.
              </p>
            </div>
            <div class="w-full">
              <div v-if="goalRole" class="w-full md:w-1/2 pb-4">
                <div>
                  <h4 class="flex items-center mb-6 text-lg font-bold">
                    Your target role
                    <help-bubble
                      tooltip="This is the role you told us you wanted to move into."
                    />
                  </h4>
                  <role-selector
                    :role="goalRole"
                    :target-role="targetRole"
                    @click.native="selectTargetRole(goalRole)"
                    @keyup.space="selectTargetRole(goalRole)"
                  />
                </div>
              </div>
              <div class="flex flex-row gap-8 flex-wrap">
                <div
                  v-if="familyRoles(currentRole).merged.length"
                  class="flex-none flex-grow md:w-1/3 md:max-w-[50%] pb-4"
                >
                  <h4 class="mb-6 text-lg font-bold">
                    Progression roles from your current role
                  </h4>
                  <div class="flex flex-row gap-2 flex-wrap mb-2">
                    <div class="nsw-form-checkbox cursor-pointer">
                      <input
                        id="progressionEC"
                        v-model="testingOptions.withExtendedCapabilities.progression"
                        type="checkbox"
                        class="nsw-form-checkbox__input"
                      >
                      <label class="nsw-form-checkbox__label" for="progressionEC">With extended capabilities</label>
                    </div>
                  </div>
                  <role-selector
                    v-for="role in familyRoles(currentRole).merged"
                    :key="role.role.id"
                    :role="role.role"
                    :rank="role.rank"
                    :target-role="targetRole"
                    @click.native="selectTargetRole(role.role)"
                    @keyup.space="selectTargetRole(role.role)"
                  />
                </div>
                <div
                  v-if="skillRoles(currentRole).length"
                  class="flex-none flex-grow md:w-1/3 md:max-w-[50%] pb-4"
                >
                  <h4 class="mb-6 text-lg font-bold">
                    Adjacent roles that share your current capabilities
                  </h4>
                  <div class="flex flex-row gap-2 flex-wrap mb-2">
                    <div class="nsw-form-checkbox cursor-pointer">
                      <input
                        id="adjacentEC"
                        v-model="testingOptions.withExtendedCapabilities.adjacent"
                        type="checkbox"
                        class="nsw-form-checkbox__input"
                      >
                      <label class="nsw-form-checkbox__label" for="adjacentEC">With extended capabilities</label>
                    </div>
                    <div class="nsw-form-checkbox cursor-pointer">
                      <input
                        id="gradeLogic"
                        v-model="testingOptions.withGradeLogic"
                        type="checkbox"
                        class="nsw-form-checkbox__input"
                      >
                      <label class="nsw-form-checkbox__label" for="gradeLogic">With grade logic</label>
                    </div>
                  </div>
                  <role-selector
                    v-for="role in skillRoles(currentRole).slice(0, 7)"
                    :key="role.role.id"
                    :role="role.role"
                    :rank="role.rank"
                    :target-role="targetRole"
                    @click.native="selectTargetRole(role.role)"
                    @keyup.space="selectTargetRole(role.role)"
                  />
                </div>
                <div
                  v-if="
                    !targetRole &&
                    familyRoles(currentRole).totalCount === 0 &&
                    skillRoles(currentRole).length === 0
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
          <div
            id="comparison"
            class="w-full py-6 border-b lg:py-16 border-nsw-grey-200 print-break"
          >
            <div class="mb-10">
              <h3 class="flex items-center mb-3 text-xl font-bold md:text-3xl">
                <step-badge>2</step-badge> Your role comparison
              </h3>
              <p>
                Select any <strong>skill</strong> or
                <strong>capability</strong> to understand gaps and where you my
                need to upskill for both your current and target role.
              </p>
            </div>
            <table
              class="block w-full overflow-x-scroll border border-gray-600 rounded-lg table-auto lg:overflow-x-auto"
            >
              <thead class="border-b border-gray-600">
                <tr>
                  <td class="align-top lg:w-1/2 print:w-1/2">
                    <role-selected
                      :roles="roles"
                      :role="currentRole"
                      type="current"
                    />
                  </td>
                  <td class="align-top lg:w-1/2 print:w-1/2">
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
                  </td>
                </tr>
              </thead>
              <results-comparison
                :current-role="currentRole"
                :target-role="targetRole"
              />
            </table>
          </div>
          <div class="py-6 border-b lg:py-16 border-nsw-grey-200">
            <h2 class="mb-6 text-3xl md:text-4xl font-bold">Next steps</h2>
            <div class="grid grid-cols-6 gap-6">
              <next-step-panel
                class="col-span-6"
                title="Take steps to advance your career"
                text="Get tips to help with your capability and career development."
              >
                <a
                  href="/next-steps.pdf"
                  target="_blank"
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
                <nuxt-link
                  to="/explorer"
                  target="_blank"
                  class="inline-flex items-center justify-center font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons whitespace-no-wrap bg-white hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"
                >
                  Browse typical roles
                </nuxt-link>
              </next-step-panel>

              <next-step-panel
                class="col-span-6 lg:col-span-2"
                title="See if your target role is available"
                text="Browse procurement job opportunities in the NSW public sector."
              >
                <a
                  target="_blank"
                  href="https://iworkfor.nsw.gov.au/jobs/all-keywords/all-agencies/all-organisations--entities/all-locations/all-worktypes?jobcategoryid=16631,16632,10370,10591,10588,10590,10592,10589,10761,10681,10554"
                  class="inline-flex items-center justify-center font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons whitespace-no-wrap bg-white hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"
                  @click="
                    outboundLinkClick(
                      'https://iworkfor.nsw.gov.au/jobs/all-keywords/all-agencies/all-organisations--entities/all-locations/all-worktypes?jobcategoryid=16631,16632,10370,10591,10588,10590,10592,10589,10761,10681,10554'
                    )
                  "
                >
                  I work for NSW
                </a>
              </next-step-panel>
            </div>
          </div>
          <div class="md:w-8/12">
            <div class="py-6 lg:py-16">
              <print-page class="mb-6" @click.native="printPage" />
              <disclaimer-panel>
                Salaries are indicative only. Check the job ad when applying for
                a role.
              </disclaimer-panel>
              <disclaimer-panel>
                For queries relating to the Procurement Career Pathway tool,
                please contact the NSW Procurement Capability team at:
                <a
                  href="mailto:NSWP_Capability@treasury.nsw.gov.au"
                  class="font-semibold text-nsw-brand-primary-blue"
                  >NSWP_Capability@treasury.nsw.gov.au</a
                >
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
import NextStepPanel from '@/components/pathway/results/NextStepPanel'
import HelpBubble from '@/components/HelpBubble'
import capabilityNamesMap from '@/data/capabilityNamesMap.json'

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
    NextStepPanel,
    HelpBubble
  },
  data() {
    return {
      targetRole: false,
      modals: {
        update: false,
        beta: true
      },
      testingOptions: {
        withExtendedCapabilities: {
          progression: true,
          adjacent: true
        },
        withGradeLogic: true
      }
    }
  },
  computed: {
    ...mapGetters(['answers', 'getHumanReadableAnswerValue']),
    roles() {
      return this.$store.state.roles
    },
    currentRole() {
      if (this.answers.hasOwnProperty('current-gov-role')) {
        return this.$store.getters.getRoleByCode(
          this.answers['current-gov-role'].value
        )
      }
      return this.$store.getters.getRoleByCode(
        this.answers['current-outside-role'].value
      )
    },
    goalRole() {
      if (this.answers.hasOwnProperty('goal-role')) {
        return this.$collect(this.roles)
          .where('id', this.answers['goal-role'].value)
          .first()
      }
      return false
    },
    readableSkillsList() {
      const list = Object.keys(this.answers.skills).map(
        (key) => capabilityNamesMap[key]
      )
      if (list.length > 0) {
        return list.join(', ')
      }
      return false
    },
    readableCapabilitiesList() {
      const list = Object.keys(this.answers.capabilities).map(
        (key) => capabilityNamesMap[key]
      )
      if (list.length > 0) {
        return list.join(', ')
      }
      return false
    }
  },
  mounted() {
    // this.logAnswersToGoogleAnalytics()
    if (this.goalRole) {
      this.targetRole = this.goalRole
    }
    // window.addEventListener('click', (e) => {
    //   this.checkCustomSelect(e.target)
    // })
  },
  beforeDestroy() {
    // window.removeEventListener('click', (e) => {
    //   this.checkCustomSelect(e.target)
    // })
  },
  methods: {
    printPage() {
      // Track in GA
      window.dataLayer.push({
        event: 'print_page',
        category: 'pathway_results'
      })
      // Trigger print in browser
      window.print()
    },

    getQuestionAnswer(stepId) {
      return this.$store.getters.getHumanReadableAnswerValue(stepId)
    },

    // resetFilters() {
    //   this.filter.format.value = ['All']
    // },

    selectTargetRole(role) {
      this.targetRole = role
      // this.resetFilters()
      this.$scrollTo('#comparison')
    },

    familyRoles(currentRole) {
      const isPolicing = currentRole.jobFamily === 'Policing'

      const familyFiltered = this.roles.filter(
        (role) => role.jobFamily === currentRole.jobFamily
      )

      const functionFiltered = familyFiltered.filter(
        (role) => role.jobFunction === currentRole.jobFunction
      )

      const nextRoles = functionFiltered.filter((role) => {
        let nextRoleJump = 1
        if (
          currentRole.gradeId.type === 'policing' &&
          currentRole.gradeId.grade === 2
        ) {
          nextRoleJump = 2
        }
        return role.gradeId.grade === currentRole.gradeId.grade + nextRoleJump
      })
      console.log(nextRoles)

      const sameGradeFamily = familyFiltered.filter((role) => {
        if (isPolicing) {
          return role.gradeId.grade === currentRole.gradeId.grade
        }

        return (
          role.gradeId.grade === currentRole.gradeId.grade ||
          role.gradeId.grade + 1 === currentRole.gradeId.grade
        )
      })

      const rankedNextRoles = this.rankAndSortRoles(currentRole, nextRoles, this.testingOptions.withExtendedCapabilities.progression)
      const rankedSameGradeFamily = this.rankAndSortRoles(
        currentRole,
        sameGradeFamily,
        this.testingOptions.withExtendedCapabilities.progression
      )

      return {
        totalCount: rankedNextRoles.length + rankedSameGradeFamily.length,
        nextRoles: rankedNextRoles,
        sameFamily: rankedSameGradeFamily,
        merged: [...rankedNextRoles.slice(0, 3), ...rankedSameGradeFamily.slice(0, 4)]
      }
    },

    isRoleSharingSkills(firstRole, secondRole) {
      const results = firstRole.capabilities.focus.reduce((acc, item) => {
        // console.log({ item })
        const sameCode = secondRole.capabilities.focus.find(
          (otherItem) => item.code === otherItem.code
        )
        // console.log({ sameCode })
        if (sameCode) {
          const sameLevel = secondRole.capabilities.focus.find(
            (otherItem) => item.level >= otherItem.level
          )

          if (sameLevel) {
            acc.push(item)
          }
        }
        return acc
      }, [])

      return results
    },

    roleShareCapabilitiesRank(firstRole, secondRole, withExtendedCapabilities = false) {
      const result = {
        focusFocus: 0,
        allFocus: 0,
        focusAll: 0,
        allAll: 0
      }

      firstRole.capabilities.all.forEach((firstCap) => {
        secondRole.capabilities.all.forEach((secondCap) => {
          if (firstCap.code === secondCap.code) {
            const firstFocus = firstRole.capabilities.focus
              .map(({ code }) => code)
              .includes(firstCap.code)
            const secondFocus = secondRole.capabilities.focus
              .map(({ code }) => code)
              .includes(secondCap.code)

            let resultKey = 'focusFocus'

            if (!firstFocus && secondFocus) {
              resultKey = 'allFocus'
            } else if (firstFocus && !secondFocus) {
              resultKey = 'focusAll'
            } else if (!firstFocus && !secondFocus) {
              resultKey = 'allAll'
            }

            const levelDelta = firstCap.level - secondCap.level

            if (levelDelta === 0) {
              // equal
              result[resultKey] += 1
            }
            if (withExtendedCapabilities) {
              if (levelDelta >= 1) {
                // FirstCap higher
                result[resultKey] += 1.2
                return
              }

              if (levelDelta === -1) {
                // FirstCap off by one
                result[resultKey] += 0.3
              }
            }
          }
        })
      })

      return result
    },

    rankAndSortRoles(currentRole, compareRoles, withExtendedCapabilities = false, withGradeLogic = false) {
      return compareRoles
        .map((role) => {
          const sharingSkills = this.roleShareCapabilitiesRank(
            currentRole,
            role,
            withExtendedCapabilities
          )

          if (withGradeLogic && currentRole.gradeId.grade !== -1 && role.gradeId.grade !== -1) {
            const gradeDelta = currentRole.gradeId.grade - role.gradeId.grade

            if (gradeDelta === 0) {
              sharingSkills.focusFocus += 1
            }

            if (gradeDelta === -1) {
              // next grade
              sharingSkills.focusFocus += 0.5
            }

            if (gradeDelta > 0) {
              // next grade
              sharingSkills.focusFocus -= 0.5
            }
          }

          return {
            role,
            rank: sharingSkills
          }
        }, [])
        .sort((a, b) => {
          return b.rank.focusFocus - a.rank.focusFocus
        })
        .reduce((acc, rankedRole) => {
          const totalFocus = rankedRole.rank.focusFocus

          if (acc.length === 0) {
            acc.push([rankedRole])
          } else {
            const lastRank = acc[acc.length - 1]
            if (lastRank[0].rank.focusFocus === totalFocus) {
              acc[acc.length - 1].push(rankedRole)
            } else {
              acc.push([rankedRole])
            }
          }
          return acc
        }, [])
        .reduce((acc, rankedRoleGroup) => {
          const reRanked = rankedRoleGroup.sort((a, b) => {
            const aRank =
              a.rank.focusAll + a.rank.allFocus * 0.6 + a.rank.allAll * 0.1
            const bRank =
              b.rank.focusAll + b.rank.allFocus * 0.6 + b.rank.allAll * 0.1
            return bRank - aRank
          })
          reRanked.forEach((rankedRole) => {
            acc.push(rankedRole)
          })
          return acc
        }, [])
    },

    skillRoles(currentRole) {
      const familyFiltered = this.roles.filter(
        (role) => role.jobFamily !== currentRole.jobFamily
      )

      const matches = this.rankAndSortRoles(currentRole, familyFiltered, this.testingOptions.withExtendedCapabilities.adjacent, this.testingOptions.withGradeLogic)
      console.log('x', matches[0])

      const filteredMatchedRoles = matches
        // Filter out my current role and goal role if chosen
        .filter(
          ({ role }) =>
            role.id !== currentRole.id && role.id !== this.goalRole?.id
        )
      return filteredMatchedRoles
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

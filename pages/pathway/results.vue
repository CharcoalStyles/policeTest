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
                    I'm instested in
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
                  <div>
                    {{ managementPreference }}
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
            class="py-6 border-b lg:py-16 border-nsw-grey-200 print-break print:hidden"
          >
            <div class="mb-10">
              <h3 class="flex items-center mb-3 text-3xl font-bold md:text-3xl">
                <step-badge>1</step-badge> Select your target role
              </h3>
              <p class="md:w-2/3">
                A target role compares your current role, identify skills gaps,
                surfaces learning resources.
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
                  v-if="progRoles(currentRole).length"
                  class="flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"
                >
                  <div class="mb-6">
                    <h4 class="text-xl font-bold">Progression roles</h4>
                    <p>Roles that your current role can progress to</p>
                  </div>
                </div>
                <div
                  v-if="adjRoles(currentRole).length"
                  class="flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"
                >
                  <div class="mb-6">
                    <h4 class="text-xl font-bold">Adjacent roles</h4>
                    <p>
                      Roles from your current work area that share your current
                      capabilities
                    </p>
                    <div class="flex flex-row gap-2 flex-wrap mb-2"></div>
                  </div>
                </div>
                <div
                  v-if="skillRoles(currentRole).length"
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
                  v-if="progRoles(currentRole).length"
                  class="flex-none md:flex-grow w-full md:w-1/3 md:max-w-[50%] px-4 pb-4"
                >
                  <div class="mb-6 md:hidden">
                    <h4 class="text-xl font-bold">Progression roles</h4>
                    <p>Roles that your current role can progress to</p>
                  </div>
                  <role-selector
                    v-for="role in progRoles(currentRole).slice(0, 6)"
                    :key="role.id"
                    :role="role"
                    :target-role="targetRole"
                    @click.native="selectTargetRole(role)"
                    @keyup.space="selectTargetRole(role)"
                  />
                </div>
                <div
                  v-if="adjRoles(currentRole).length"
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
                    v-for="role in adjRoles(currentRole).slice(0, 6)"
                    :key="role.id"
                    :role="role"
                    :target-role="targetRole"
                    @click.native="selectTargetRole(role)"
                    @keyup.space="selectTargetRole(role)"
                  />
                </div>
                <div
                  v-if="skillRoles(currentRole).length"
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
                    v-for="role in skillRoles(currentRole).slice(0, 6)"
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
                    progRoles(currentRole).length === 0 &&
                    adjRoles(currentRole).length === 0 &&
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

            <div class="flex flex-col border border-gray-300 rounded-lg">
              <div class="flex flex-row">
                <div class="border-r border-gray-300 w-1/2 px-4 py-4">
                  <div>
                    <role-selected
                      :roles="roles"
                      :role="currentRole"
                      type="current"
                    />
                  </div>
                </div>
                <div class="w-1/2 px-4 py-4">
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

              <div class="border-t border-gray-300">
                <results-comparison
                  :current-role="currentRole"
                  :target-role="targetRole"
                />
              </div>
            </div>
          </div>
          <div class="py-6 border-b lg:py-16 border-nsw-grey-200">
            <h2 class="mb-6 text-3xl md:text-4xl font-bold">Next steps</h2>
            <div class="flex gap-6 w-full bg-nsw-grey-100 mb-12">
              <div class="flex flex-col px-12 py-8">
                <h3 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                  Start a career conversation
                </h3>
                <p class="mb-4 sm:mb-8">
                  Share this plan with your Supervisor / Manager or support
                  network by printing this page or sending it to them via email.
                </p>
                <div class="flex flex-col">
                  <p class="mb-2">Relevant resources</p>
                  <nuxt-link
                    to="/explorer"
                    target="_blank"
                    class="flex items-center underline text-nsw-brand-primary-blue"
                  >
                    NSWPF Careers intranet site
                    <img src="/icons/link.svg" alt="Link icon" class="ml-2" />
                  </nuxt-link>
                  <nuxt-link
                    to="/explorer"
                    target="_blank"
                    class="flex items-center underline text-nsw-brand-primary-blue"
                  >
                    NSWPF Role Description Library
                    <img src="/icons/link.svg" alt="Link icon" class="ml-2" />
                  </nuxt-link>
                  <nuxt-link
                    to="/explorer"
                    target="_blank"
                    class="flex items-center underline text-nsw-brand-primary-blue"
                  >
                    SFIA Skill framework
                    <img src="/icons/link.svg" alt="Link icon" class="ml-2" />
                  </nuxt-link>
                </div>
              </div>
              <div class="w-52 pr-12 pt-8">
                <print-page class="mb-6" @click.native="printPage" />
              </div>
            </div>
            <div class="flex flex-row gap-10">
              <div class="bg-nsw-grey-100 px-12 py-8">
                <h3 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                  Search for more roles
                </h3>
                <p class="mb-4 sm:mb-8">
                  If you haven’t found the role you are looking for you can
                  search over 1300 NSWPF roles with our role explorer.
                </p>

                <nuxt-link
                  to="/explorer"
                  target="_blank"
                  class="underline text-nsw-brand-primary-blue"
                >
                  Role explorer
                </nuxt-link>
              </div>

              <div class="bg-nsw-grey-100 px-12 py-8">
                <h3 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                  Search for your target role and related roles
                </h3>
                <p class="mb-4 sm:mb-8">
                  Browse available NSWPF administrative job opportunities with
                  NSW Government.
                </p>

                <nuxt-link
                  to="/explorer"
                  target="_blank"
                  class="flex items-center underline text-nsw-brand-primary-blue"
                >
                  I work for NSW
                  <img src="/icons/link.svg" alt="Link icon" class="ml-2" />
                </nuxt-link>
              </div>
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
import capabilityNamesMap from '@/data/capabilityNamesMap.json'
import {
  adjacentRoles,
  progressionRoles,
  roleShareCapabilitiesRank
} from '@/utils/roleComp'
import { shuffle } from '~/utils/array'

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
    DisclaimerPanel
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
        return this.$store.getters.getRoleByCode(
          this.answers['current-role'].value
        )
      }
      return null
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
    },
    readableInterestsList() {
      if (!this.answers.hasOwnProperty('interests')) {
        return false
      }
      return this.answers.interests.value.join(', ')
    },
    managementPreference() {
      if (this.answers.hasOwnProperty('management')) {
        switch (this.answers.management.value) {
          case 'individual':
            return 'I would prefer to be an Individual contributor'
          case 'manager':
            return 'I would prefer to be a manager'
          case 'either':
            return "I don't have a preference over being an Individual contributor or Manager"
          default:
            return null
        }
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
      let showDetective = true
      if (this.answers.hasOwnProperty('detective-roles')) {
        switch (this.answers['detective-roles'].value) {
          case 'no':
            showDetective = false
            break
          case 'yes':
          default:
            showDetective = true
        }
      }

      const filteredRoles = progressionRoles(
        this.roles,
        currentRole,
        this.userInterests
      )
        .filter((role) => {
          // filter out sworn roles
          if (this.answers.hasOwnProperty('sworn')) {
            switch (this.answers.sworn.value) {
              case 'yes':
                return role.jobFamily === 'Policing'
              case 'no':
                return role.jobFamily !== 'Policing'
              default:
                return true
            }
          }
          return true
        })
        .filter((role) => {
          // Filter out detective roles if not wanted; super edge case for this set, but gotta do it!
          if (role.grade.split(' ')[0] === 'Detective' && !showDetective) {
            return false
          }
          return true
        })

      const ranked = this.rankAndSortRoles(
        currentRole,
        filteredRoles,
        'progression'
      )
      console.log(
        'progression',
        ranked
          .map(
            (r) =>
              `${r.role.name} (${r.role.jobFunction}: ${r.role.grade}) (${r.rank.focusFocus})`
          )
          .slice(0, 15)
      )

      return ranked.map(({ role }) => role)
    },

    adjRoles(currentRole) {
      const showDetective = this.answers.hasOwnProperty('detective-roles')
        ? this.answers['detective-roles'].value.includes('yes')
        : false

      const filteredRoles = adjacentRoles(this.roles, currentRole)
        .filter((role) => {
          // filter out sworn roles
          if (this.answers.hasOwnProperty('sworn')) {
            switch (this.answers.sworn.value) {
              case 'yes':
                return role.jobFamily === 'Policing'
              case 'no':
                return role.jobFamily !== 'Policing'
              default:
                return true
            }
          }
          return true
        })
        .filter((role) => {
          // Filter out detective roles if not wanted
          if (role.grade.split(' ')[0] === 'Detective' && !showDetective) {
            return false
          }
          return true
        })

      const ranked = this.rankAndSortRoles(
        currentRole,
        filteredRoles,
        'adjacent'
      )
      console.log(
        'adjacent',
        ranked
          .map(
            (r) =>
              `${r.role.name} (${r.role.jobFunction}: ${r.role.grade}) (${r.rank.focusFocus})`
          )
          .slice(0, 15)
      )

      return ranked.map(({ role }) => role)
    },

    isRoleSharingSkills(firstRole, secondRole) {
      const results = firstRole.capabilities.focus.reduce((acc, item) => {
        const sameCode = secondRole.capabilities.focus.find(
          (otherItem) => item.code === otherItem.code
        )

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

    rankAndSortRoles(currentRole, compareRoles, type) {
      // type is type of reccomendation
      // 'progression', 'adjacent' or 'skill'
      return compareRoles
        .map((role) => {
          // Capability comparison
          const sharingSkills = roleShareCapabilitiesRank(currentRole, role)

          // Grade logic
          if (currentRole.gradeId.grade !== -1 && role.gradeId.grade !== -1) {
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

          // Interests comparison
          if (this.userInterests.length > 0) {
            if (this.userInterests.includes(role.jobFunction.trim())) {
              sharingSkills.focusFocus += 3
            }
          }

          // Management preference
          if (this.answers.hasOwnProperty('management')) {
            if (this.answers.management.value !== 'either') {
              const wantManager = this.answers.management.value === 'manager'
              const isManager = role.manager
              if (wantManager === isManager) {
                sharingSkills.focusFocus += 1
              }
            }
          }
          // role volume (number of positions)
          if (role.numPositions) {
            const minVolume = role.numPositions.split(' ')[1]
            sharingSkills.focusFocus += 1 + minVolume.length * 0.1
          }
          return {
            role,
            rank: sharingSkills
          }
        }, [])
        .sort((a, b) => {
          return b.rank.focusFocus - a.rank.focusFocus
        })
        .reduce(
          (acc, rankedRole, idx) => {
            if (currentRole.jobFamily !== 'Policing') {
              acc.roles.push(rankedRole)
              return acc
            }
            if (currentRole.gradeId.grade === 4) {
              if (rankedRole.role.gradeId.grade === 5) {
                acc.counted += 1

                if (idx > 5 && acc.counted <= 2) {
                  acc.roles = [rankedRole, ...acc.roles]
                  return acc
                }
              }
            }
            acc.roles.push(rankedRole)
            return acc
          },
          { counted: 0, roles: [] }
        )
        .roles.reduce((acc, rankedRole) => {
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
        .reduce((acc, rankedRole) => {
          if (
            acc.find((x) => x[0].rank.focusFocus === rankedRole.rank.focusFocus)
          ) {
            acc[
              acc.findIndex(
                (x) => x[0].rank.focusFocus === rankedRole.rank.focusFocus
              )
            ].push(rankedRole)
          } else {
            acc.push([rankedRole])
          }
          return acc
        }, [])
        .map((rankedRoleGroup) => {
          shuffle(rankedRoleGroup)
          return rankedRoleGroup
        })
        .flat()
    },

    skillRoles(currentRole) {
      const matches = this.roles
        .filter((role) => role.jobFamily !== currentRole.jobFamily)
        .filter((role) => {
          // filter out sworn roles
          if (this.answers.hasOwnProperty('sworn')) {
            switch (this.answers.sworn.value) {
              case 'sworn':
                return role.jobFamily === 'Policing'
              case 'unsworn':
                return role.jobFamily !== 'Policing'
              default:
                return true
            }
          }
          return true
        })
        .filter((role) => {
          if (role.id === currentRole.id) {
            return false
          }
          if (this.answers.hasOwnProperty('goal-role')) {
            return role.id !== this.answers['goal-role'].value
          }
          return true
        })

      return this.rankAndSortRoles(currentRole, matches, 'skill').map(
        ({ role }) => role
      )
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

<template>
  <div class="font-sans flex-grow flex h-screen">
    <aside
      class="relative z-0 bg-nsw-grey-100 flex flex-col flex-shrink-0 nsw-forms max-h-screen w-screen lg:w-aside lg:border-r lg:border-nsw-grey-200"
    >
      <div
        class="bg-nsw-brand-primary-blue px-6 py-3 w-full flex-shrink-0 flex items-center"
      >
        <nuxt-link to="/" class="no-print-link flex flex-row gap-2">
          <img src="/icons/careerPathfinder.svg" />
          <h1 class="text-white">CAREER PATHFINDER</h1>
        </nuxt-link>
      </div>
      <div class="relative flex-grow flex flex-col overflow-hidden">
        <div class="flex-grow flex flex-col overflow-hidden">
          <div class="flex-shrink">
            <div class="bg-white shadow-lg">
              <div class="px-6 pt-2">
                <div class="flex items-center justify-between leading-none">
                  <h2 class="font-bold text-xl">Role Explorer</h2>
                  <button
                    class="text-sm underline font-semibold text-nsw-blue-800"
                    style="text-underline-offset: 2px"
                    @click="resetAllFilters"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div class="px-6 pt-4 pb-6 flex flex-col gap-3">
                <div>
                  <label class="mb-1">
                    <p class="pb-2 font-bold text-sm">Search by keyword</p>
                  </label>
                  <input
                    id="keywords"
                    v-debounce:300ms.fireonempty="updateKeyword"
                    name="keywords"
                    class="nsw-form-input h-role-input"
                    placeholder="Search"
                    :value="debouncedFilters.keyword"
                  />
                </div>

                <div>
                  <p class="pb-2 font-bold text-sm">Role Type</p>
                  <div
                    class="flex flex-row w-full rounded-md text-sm"
                    role="group"
                  >
                    <button
                      type="button"
                      class="py-4 w-1/3 py-2 rounded-s-md border border-nsw-brand-primary-blue"
                      :class="swornButtonSelected('other')"
                      @click="filter.sworn = 'other'"
                    >
                      All
                    </button>
                    <button
                      type="button"
                      class="py-4 w-1/3 py-2 border-t border-b border-nsw-brand-primary-blue"
                      :class="swornButtonSelected('police')"
                      @click="filter.sworn = 'police'"
                    >
                      Policing
                    </button>
                    <button
                      type="button"
                      class="py-4 w-1/3 py-2 rounded-e-md border border-nsw-brand-primary-blue"
                      :class="swornButtonSelected('administrative')"
                      @click="filter.sworn = 'administrative'"
                    >
                      Administrative
                    </button>
                  </div>
                </div>

                <div class="flex gap-4 flex-row">
                  <div class="w-1/2">
                    <div class="flex flex-col">
                      <label class="text-sm font-bold mb-2">Rank/Grade</label>
                      <div
                        class="flex items-center rounded nsw-form-select cursor-pointer h-role-input"
                        @click="showSelectorPopup('grade')"
                      >
                        {{
                          debouncedFilters.grade.length === 0
                            ? 'All'
                            : `${debouncedFilters.grade.length} selected`
                        }}
                      </div>
                    </div>
                  </div>

                  <div class="w-1/2">
                    <div class="flex justify-between">
                      <label class="text-sm font-bold mb-2">Salary</label>
                      <div class="text-sm text-gray-700">
                        ${{ debouncedFilters.salary[0] / 1000 }}k - ${{
                          debouncedFilters.salary[1] / 1000
                        }}k
                      </div>
                    </div>
                    <div
                      class="flex items-center justify-center px-3 bg-nsw-grey-50 rounded h-role-input"
                    >
                      <div class="w-full flex justify-center">
                        <div class="w-11/12">
                          <input-range
                            v-model="debouncedFilters.salary"
                            :min="options.salary.min"
                            :max="options.salary.max"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex gap-4 flex-row">
                  <div class="w-1/2">
                    <div class="flex flex-col">
                      <label class="text-sm font-bold mb-2">Location</label>
                      <div
                        class="flex items-center rounded nsw-form-select cursor-pointer h-role-input"
                        @click="showSelectorPopup('location')"
                      >
                        {{ locationLabel }}
                      </div>
                    </div>
                  </div>
                  <div class="w-1/2">
                    <div class="flex flex-col">
                      <label class="text-sm font-bold mb-2">Skills</label>
                      <div
                        class="flex items-center rounded nsw-form-select cursor-pointer h-role-input"
                        @click="showSelectorPopup('skills')"
                      >
                        {{
                          debouncedFilters.skills.length === 0
                            ? 'All'
                            : `${debouncedFilters.skills.length} selected`
                        }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="flex flex-col">
                    <label class="text-sm font-bold mb-2">
                      Work Area / Job Function
                    </label>
                    <div
                      class="flex items-center rounded nsw-form-select cursor-pointer h-role-input"
                      @click="showSelectorPopup('jobFunction')"
                    >
                      {{
                        debouncedFilters.jobFunction.length === 0
                          ? 'All'
                          : `${debouncedFilters.jobFunction.length} selected`
                      }}
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="flex flex-col">
                    <label class="text-sm font-bold mb-2">
                      Command / Unit
                    </label>
                    <div
                      class="flex items-center rounded nsw-form-select cursor-pointer h-role-input"
                      @click="showSelectorPopup('command_BusUnit')"
                    >
                      {{
                        debouncedFilters.command_BusUnit.length === 0
                          ? 'All'
                          : `${debouncedFilters.command_BusUnit.length} selected`
                      }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="px-6 py-4 flex items-center justify-between bg-nsw-grey-50 border-gray-300 border-b"
              >
                <div class="font-bold text-base">
                  {{ filteredRolesTotal }} results
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="filter.keyword.length === 0"
            class="p-4 flex-grow overflow-y-scroll"
          >
            <div
              v-for="(group, index) in filteredRolesByFunction.familyRoles"
              :key="index"
              class="mb-10"
            >
              <h3 class="font-bold text-lg mb-4">
                {{ group.name }}
              </h3>
              <transition-group name="list" tag="div">
                <job-role
                  v-for="role in group.roles.sort((a, b) =>
                    a.salary.max < b.salary.max ? -1 : 1
                  )"
                  :key="role.id"
                  :role="role"
                  @click.native="viewRole(role)"
                />
              </transition-group>
            </div>
          </div>
          <div v-else class="p-4 flex-grow overflow-y-scroll">
            <div class="mb-10">
              <transition-group name="list" tag="div">
                <job-role
                  v-for="role in filteredRoles"
                  :key="role.id"
                  :role="role"
                  @click.native="viewRole(role)"
                />
              </transition-group>
            </div>
          </div>
        </div>
        <transition name="role">
          <role-slideout
            v-if="slideout"
            :roles="roles"
            :role="selectedRole"
            @back="resetSlideout()"
            @selected="viewRole"
          />
        </transition>
      </div>
    </aside>

    <main class="hidden lg:flex flex-col flex-grow">
      <nswpf-beta />
      <div class="relative flex-grow">
        <div class="absolute inset-0 focus:outline-none overflow-y-auto">
          <div class="mt-4 mb-8">
            <!-- Bento level 1 -->
            <div class="px-8" :class="viewState === 1 ? '' : 'hidden'">
              <div
                v-for="f in bentoJobFamily.xl"
                :key="f.name"
                class="w-full flex-grow text-center h-32 mb-4 bg-nsw-brand-primary-blue-light"
                :class="boxStyle"
                @click="bentoL1Select(f.name)"
              >
                <div>
                  <p class="font-bold">{{ f.name }}</p>
                  <p class="text-sm">{{ f.roles.length }} roles</p>
                </div>
              </div>
              <div class="flex gap-4 flex-row mb-4">
                <div
                  v-for="f in bentoJobFamily.l"
                  :key="f.name"
                  class="w-1/4 bento-max-33 flex-grow text-center h-32 bg-nsw-brand-primary-blue-light"
                  :class="boxStyle"
                  @click="bentoL1Select(f.name)"
                >
                  <div class="px-4">
                    <p class="font-bold">{{ f.name }}</p>
                    <p class="text-sm">{{ f.roles.length }} roles</p>
                  </div>
                </div>
              </div>
              <div class="flex gap-4 flex-row flex-wrap mb-4">
                <div
                  v-for="f in bentoJobFamily.m"
                  :key="f.name"
                  class="w-1/5 bento-max-25 flex-grow text-center h-32 bg-nsw-brand-primary-blue-light"
                  :class="boxStyle"
                  @click="bentoL1Select(f.name)"
                >
                  <div class="px-4">
                    <p class="font-bold">{{ f.name }}</p>
                    <p class="text-sm">{{ f.roles.length }} roles</p>
                  </div>
                </div>
              </div>
              <div class="flex gap-4 flex-row flex-wrap">
                <div
                  v-for="f in bentoJobFamily.s"
                  :key="f.name"
                  class="w-1/3 bento-max-50 flex-grow text-center h-16 bg-nsw-brand-primary-blue-light"
                  :class="boxStyle"
                  @click="bentoL1Select(f.name)"
                >
                  <div class="px-4">
                    <p class="font-bold">{{ f.name }}</p>
                    <p class="text-sm">{{ f.roles.length }} roles</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bento level 2 -->
            <div class="px-8" :class="viewState === 2 ? '' : 'hidden'">
              <div
                v-if="viewState !== 1"
                class="sticky w-fit left-0 flex flex-row mb-2 cursor-pointer"
                @click="handleBack()"
              >
                <img
                  src="/icons/chevron-left-blue.svg"
                  alt="Clipboard icon"
                  class="h-6"
                />
                <p class="text-nsw-brand-primary-blue">Back</p>
              </div>
              <div class="bg-nsw-brand-primary-blue-light rounded-2xl p-4">
                <p class="font-bold text-3xl ml-4">{{ filter.jobFamily }}</p>
                <div class="m-4">
                  <div
                    v-for="f in bentoJobFunctions.xl"
                    :key="f.name"
                    class="w-full flex-grow text-center h-32 mb-2 bg-nsw-brand-primary-blue-light-2"
                    :class="boxStyle"
                    @click="bentoL2Select(f.name)"
                  >
                    <div>
                      <p class="font-bold">{{ f.name }}</p>
                      <p class="text-sm">{{ f.roles.length }} roles</p>
                    </div>
                  </div>
                  <div class="flex gap-2 flex-row mb-2">
                    <div
                      v-for="f in bentoJobFunctions.l"
                      :key="f.name"
                      class="w-1/4 bento-max-33 flex-grow text-center h-32 bg-nsw-brand-primary-blue-light-2"
                      :class="boxStyle"
                      @click="bentoL2Select(f.name)"
                    >
                      <div class="px-4">
                        <p class="font-bold">{{ f.name }}</p>
                        <p class="text-sm">{{ f.roles.length }} roles</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-2 flex-row flex-wrap mb-2">
                    <div
                      v-for="f in bentoJobFunctions.m"
                      :key="f.name"
                      class="w-1/5 bento-max-25 flex-grow text-center h-32 bg-nsw-brand-primary-blue-light-2"
                      :class="boxStyle"
                      @click="bentoL2Select(f.name)"
                    >
                      <div class="px-4">
                        <p class="font-bold">{{ f.name }}</p>
                        <p class="text-sm">{{ f.roles.length }} roles</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-2 flex-row flex-wrap">
                    <div
                      v-for="f in bentoJobFunctions.s"
                      :key="f.name"
                      class="w-1/3 bento-max-50 flex-grow text-center h-16 bg-nsw-brand-primary-blue-light-2"
                      :class="boxStyle"
                      @click="bentoL2Select(f.name)"
                    >
                      <div class="px-4">
                        <p class="font-bold">{{ f.name }}</p>
                        <p class="text-sm">{{ f.roles.length }} roles</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bento level 3 -->
            <div class="px-8" :class="viewState === 3 ? '' : 'hidden'">
              <div
                v-if="viewState !== 1"
                class="sticky w-fit left-0 flex flex-row mb-2 cursor-pointer"
                @click="handleBack()"
              >
                <img
                  src="/icons/chevron-left-blue.svg"
                  alt="Clipboard icon"
                  class="h-6"
                />
                <p class="text-nsw-brand-primary-blue">Back</p>
              </div>
              <div class="bg-nsw-brand-primary-blue-light rounded-2xl p-4">
                <p class="font-bold text-3xl ml-4 mb-4">
                  {{ filter.jobFamily }}
                </p>

                <div class="bg-nsw-brand-primary-blue-light-2 rounded-2xl p-4">
                  <p class="font-bold text-2xl ml-2">
                    {{ filter.jobFunction.join(' - ') }}
                  </p>
                  <div class="text-sm m-4">
                    <div
                      v-for="f in bentoJobCommand.xl"
                      :key="f.name"
                      class="w-full flex-grow text-center h-16 mb-1 bg-white"
                      :class="boxStyle"
                      @click="bentoL3Select(f.name)"
                    >
                      <div>
                        <p class="font-bold">{{ f.name }}</p>
                        <p class="text-sm">{{ f.roles.length }} roles</p>
                      </div>
                    </div>
                    <div class="flex gap-1 flex-row mb-1">
                      <div
                        v-for="f in bentoJobCommand.l"
                        :key="f.name"
                        class="w-1/4 bento-max-33 flex-grow text-center h-20 bg-white"
                        :class="boxStyle"
                        @click="bentoL3Select(f.name)"
                      >
                        <div class="px-4">
                          <p class="font-bold">{{ f.name }}</p>
                          <p class="text-sm">{{ f.roles.length }} roles</p>
                        </div>
                      </div>
                    </div>
                    <div class="flex gap-1 flex-row flex-wrap mb-1">
                      <div
                        v-for="f in bentoJobCommand.m"
                        :key="f.name"
                        class="w-1/5 bento-max-25 flex-grow text-center h-20 bg-white"
                        :class="boxStyle"
                        @click="bentoL3Select(f.name)"
                      >
                        <div class="px-4">
                          <p class="font-bold">{{ f.name }}</p>
                          <p class="text-sm">{{ f.roles.length }} roles</p>
                        </div>
                      </div>
                    </div>
                    <div class="flex gap-1 flex-row flex-wrap">
                      <div
                        v-for="f in bentoJobCommand.s"
                        :key="f.name"
                        class="w-1/3 bento-max-50 flex-grow text-center h-16 bg-white"
                        :class="boxStyle"
                        @click="bentoL3Select(f.name)"
                      >
                        <div class="px-4">
                          <p class="font-bold">{{ f.name }}</p>
                          <p class="text-sm">{{ f.roles.length }} roles</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Role Table (level 4) -->
            <div class="block" :class="viewState === 4 ? '' : 'hidden'">
              <div
                class="sticky w-fit left-0 flex flex-row mb-2 cursor-pointer"
                @click="handleBack()"
              >
                <img
                  src="/icons/chevron-left-blue.svg"
                  alt="Clipboard icon"
                  class="h-6"
                />
                <p class="text-xl text-nsw-brand-primary-blue">Back</p>
              </div>
              <div
                class="inline-flex flex-wrap p-2"
                :class="{ 'pointer-events-none': panning }"
              >
                <role-function
                  v-for="(group, index) in filteredRolesByFunction.familyRoles"
                  :key="group.name"
                  :role-function="group"
                  :roles="roles"
                  :selected-role="selectedRole === false ? null : selectedRole"
                  :index="index"
                  :zoom="zoom"
                  :family-name="filter.jobFamily"
                  :use-salary="filteredRolesByFunction.useSalary"
                  @selected="viewRole"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="p-4 bg-white border-t border-nsw-grey-200 flex justify-between"
      >
        <div
          class="cursor-pointer flex items-center"
          @click="$router.push('/pathway')"
        >
          <img
            src="/icons/pathway.svg"
            alt="Clipboard icon"
            class="h-8 ml-1 mr-3"
          />
          <div class="flex flex-col">
            <span class="font-bold">Get a personalised career plan</span>
          </div>
        </div>
        <nsw-button size="sm" @click.native="$router.push('/pathway')">
          Discover pathways
        </nsw-button>
      </div>
    </main>

    <generic-selector
      v-model="debouncedFilters[modalData.filterKey]"
      :data="modalData.data"
      :show="modals.selector.generic"
      max-width="xl"
      :title="modalData.title"
      :value="debouncedFilters[modalData.filterKey]"
      @close="modals.selector.generic = false"
      @reset="modalData.reset"
    >
      {{ modalData.instructions }}
    </generic-selector>

    <location-selector
      v-model="debouncedFilters[modalData.filterKey]"
      :data="modalData.data"
      :show="modals.selector.location"
      max-width="xl"
      :title="modalData.title"
      :value="debouncedFilters[modalData.filterKey]"
      @close="modals.selector.location = false"
      @reset="modalData.reset"
    >
      {{ modalData.instructions }}
    </location-selector>

    <modal-onboarding
      :show="modals.onboarding"
      max-width="xl"
      @close="demoExplorerAnimation"
    />

    <page-loading :loading="loading" />
  </div>
</template>

<script>
import collect from 'collect.js'
// import FuzzySearch from 'fuzzy-search'
import InputRange from '@/components/forms/InputRange'
import JobRole from '@/components/JobRole'
import RoleFunction from '@/components/RoleFunction'
import RoleSlideout from '@/components/RoleSlideout'
import PageLoading from '@/components/PageLoading'
import NswButton from '@/components/nsw/NswButton'
import ModalOnboarding from '@/components/ModalOnboarding'
import { keywordSearch } from '@/utils/search'
import GenericSelector from '~/components/GenericSelector.vue'
import NswpfBeta from '~/components/nswpfBeta.vue'
import LocationSelector from '~/components/LocationSelector.vue'

export default {
  layout: 'explore',
  components: {
    InputRange,
    JobRole,
    RoleFunction,
    RoleSlideout,
    PageLoading,
    NswButton,
    ModalOnboarding,
    GenericSelector,
    NswpfBeta,
    LocationSelector
  },
  data() {
    return {
      loading: false,
      slideout: false,
      selectedRole: false,
      previousRoleId: false,
      modals: {
        selector: {
          generic: false,
          location: false
        },
        onboarding: true
      },
      modalData: {
        data: [],
        filterKey: '',
        reset: () => {},
        title: '',
        instructions: ''
      },
      zoom: 0.4,
      panning: false,
      options: {
        salary: {
          min: 38000,
          max: 362000
        }
      },
      filter: {
        keyword: '',
        skills: [],
        interests: [],
        grade: [],
        location: [],
        jobFamily: '',
        jobFunction: [],
        command_BusUnit: [],
        salary: [38000, 362000],
        sworn: 'other'
      },
      filterTimeout: null,
      viewState: 1,
      lastViewState: 1,
      boxStyle:
        'cursor-pointer rounded-2xl flex flex-col justify-center items-center border-4 border-nsw-brand-primary-blue-light hover:border-nsw-brand-primary-blue-2 transition-color duration-500'
    }
  },
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    debouncedFilters: {
      get() {
        return this.filter
      },
      set(val) {
        if (this.filterTimeout) {
          clearTimeout(this.filterTimeout)
        }
        this.filterTimeout = setTimeout(() => {
          this.filter = val
        }, 300)
      }
    },

    /**
     * Filter roles based on filtering form values
     */
    filteredRoles() {
      const keyword = keywordSearch(this.roles, [
        { key: 'name', weight: 2 },
        { key: 'alias' },
        { key: 'command_BusUnit' },
        { key: 'jobFunction' },
        { key: 'grade', weight: 1.5 }
      ])

      const keywordResult = keyword(this.debouncedFilters.keyword)
      // Filter by salary and skills
      return collect(keywordResult.map((r) => r.item))
        .filter((role) => !role.genericRole)
        .filter((role) => {
          switch (this.debouncedFilters.sworn) {
            case 'other':
              return true
            case 'police':
              return role.jobFamily === 'Policing'
            case 'administrative':
              return role.jobFamily !== 'Policing'
            default:
              return false
          }
        })
        .filter((role) => {
          if (this.filter.jobFamily) {
            return role.jobFamily === this.filter.jobFamily
          }
          return true
        })
        .filter((role) => {
          if (this.filter.jobFunction.length > 0) {
            return this.filter.jobFunction.includes(role.jobFunction)
          }
          return true
        })
        .filter((role) => {
          if (this.filter.command_BusUnit.length > 0) {
            return this.filter.command_BusUnit.includes(role.command_BusUnit)
          }
          return true
        })
        .where('salary.min', '>=', this.debouncedFilters.salary[0])
        .where('salary.max', '<=', this.debouncedFilters.salary[1])
        .filter((role) => {
          if (this.filter.skills.length > 0 && role.skills.focus) {
            return collect(role.skills.focus)
              .whereIn('code', this.debouncedFilters.skills)
              .count()
          }
          return true
        })
        .filter((role) => {
          if (this.filter.location.length === 0) {
            return true
          }

          return this.filter.location.includes(role.location.trim())
        })
        .filter((role) => {
          if (this.filter.grade.length > 0 && role.grade) {
            return this.filter.grade.includes(role.grade)
          }
          return true
        })
    },

    /**
     * Count total number of filtered roles
     */
    filteredRolesTotal() {
      return this.filteredRoles.count()
    },

    /**
     * Filter roles by job function
     */
    filteredRolesByFunction() {
      const familyRoles = this.filteredRoles
        .groupBy('jobFunction')
        .keys()
        .map((key) => ({
          name: key,
          roles: this.filteredRoles.where('jobFunction', key).all()
        }))
        .sortByDesc((group) => group.roles.length)
        .all()

      const tableGradeSalary = familyRoles.reduce(
        (acc, roles) => {
          roles.roles.forEach((role) => {
            if (
              role.jobFamily === 'Policing' ||
              role.grade.startsWith('Clerk')
            ) {
              acc.grades += 1
            } else {
              acc.salary += 1
            }
          })

          return acc
        },
        { grades: 0, salary: 0 }
      )

      return { familyRoles, useSalary: tableGradeSalary.salary > 0 }
    },

    filteredRolesByCommand() {
      return this.filteredRoles
        .groupBy('command_BusUnit')
        .keys()
        .map((key) => ({
          name: key,
          roles: this.filteredRoles.where('command_BusUnit', key).all()
        }))
        .sortByDesc((group) => group.roles.length)
        .all()
    },

    /**
     * Filter roles by job family
     */
    filteredRolesByFamilyRole() {
      const results = this.filteredRoles
        .groupBy('jobFamily')
        .keys()
        .map((key) => ({
          name: key,
          roles: this.filteredRoles.where('jobFamily', key).all()
        }))
        .sortByDesc((group) => group.roles.length)
        .filter((group) => group.name !== '')
        .all()

      return results
    },
    bentoJobFamily() {
      return this.filteredRolesByFamilyRole.reduce(
        (acc, roles) => {
          if (roles.roles.length > 300) {
            acc.xl.push(roles)
          } else if (roles.roles.length >= 100) {
            acc.l.push(roles)
          } else if (roles.roles.length >= 10) {
            acc.m.push(roles)
          } else {
            acc.s.push(roles)
          }
          return acc
        },
        { xl: [], l: [], m: [], s: [] }
      )
    },
    bentoJobFunctions() {
      return this.filteredRolesByFunction.familyRoles.reduce(
        (acc, roles) => {
          if (roles.roles.length > 100) {
            acc.xl.push(roles)
          } else if (roles.roles.length >= 20) {
            acc.l.push(roles)
          } else if (roles.roles.length >= 10) {
            acc.m.push(roles)
          } else {
            acc.s.push(roles)
          }
          return acc
        },
        { xl: [], l: [], m: [], s: [] }
      )
    },
    bentoJobCommand() {
      return this.filteredRolesByCommand.reduce(
        (acc, roles) => {
          if (roles.roles.length > 20) {
            acc.xl.push(roles)
            // } else if (roles.roles.length >= 20) {
            //   acc.l.push(roles)
            // } else if (roles.roles.length >= 5) {
            //   acc.m.push(roles)
          } else {
            acc.s.push(roles)
          }
          return acc
        },
        { xl: [], l: [], m: [], s: [] }
      )
    },
    locationLabel() {
      const numLocations = this.debouncedFilters.location.length

      return `${numLocations} selected`
    }
  },
  mounted() {},
  methods: {
    resetSlideout() {
      this.slideout = false
      if (this.previousRoleId) {
        const previousRoleDom = document.getElementsByClassName(
          `role-${this.previousRoleId}`
        )[0]
        previousRoleDom.classList.add('border-nsw-grey-200')
        previousRoleDom.classList.add('border-white')
        previousRoleDom.classList.remove('border-black')
      }
      this.previousRoleId = false
    },
    resetAllFilters() {
      this.filter = {
        keyword: '',
        skills: [],
        interests: [],
        grade: [],
        location: [],
        jobFamily: '',
        jobFunction: [],
        command_BusUnit: [],
        salary: [38000, 362000],
        sworn: 'other'
      }
      this.viewState = 1
    },

    resetSkillsFilter() {
      this.debouncedFilters.skills = []
    },

    /**
     * Update keyword value on debounce
     */
    updateKeyword(value) {
      this.debouncedFilters.keyword = value
    },

    demoExplorerAnimation() {
      this.modals.onboarding = false
    },

    /**
     * Add/remove interest from filter
     */
    toggleInterest(interest) {
      this.debouncedFilters.interests =
        this.debouncedFilters.interests.includes(interest)
          ? this.debouncedFilters.interests.filter((i) => i !== interest)
          : [...this.debouncedFilters.interests, interest]
    },

    /**
     * Load role and open modal
     */
    viewRole(role) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.selectedRole = role
        this.slideout = true
      }, 1000)
    },
    swornButtonSelected(buttonType) {
      if (buttonType === this.filter.sworn) {
        return 'bg-nsw-brand-primary-blue text-white font-bold'
      }
      return 'bg-white text-nsw-brand-primary-blue'
    },
    showSelectorPopup(type) {
      switch (type) {
        case 'skills':
          this.modals.selector.generic = true
          this.modalData.title = 'Select Skills'
          this.modalData.instructions =
            'Select skills that relate to a role to see how they match to others.'
          this.modalData.data = this.$store.state.skills
            .map((s) => ({
              value: s.code,
              label: s.name
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
          this.modalData.filterKey = 'skills'
          this.modalData.reset = () => {
            this.debouncedFilters.skills = []
          }
          break
        case 'location':
          this.modals.selector.location = true
          this.modalData.title = 'Select Location'
          this.modalData.instructions =
            'Select the locations you’re interested in.'
          this.modalData.data = this.roles
            .reduce((acc, role) => {
              if (!role.location) {
                return acc
              }
              if (!acc.includes(role.location.trim())) {
                acc.push(role.location.trim())
              }
              return acc
            }, [])
            .sort((a, b) => a.localeCompare(b))
            .map((l) => ({
              value: l,
              label: l
            }))
          this.modalData.filterKey = 'location'
          this.modalData.reset = () => {
            this.debouncedFilters.location = []
          }
          break
        case 'grade': {
          this.modals.selector.generic = true
          this.modalData.title = 'Select Grade'
          this.modalData.instructions =
            'Select grade that relates to a role to see how they match to others.'

          const nonPoliceGrades = this.roles
            .reduce((acc, role) => {
              if (
                role.jobFamily === 'Policing' ||
                role.grade.startsWith('Clerk')
              ) {
                return acc
              }
              if (!acc.includes(role.grade)) {
                acc.push(role.grade)
              }
              return acc
            }, [])
            .reduce((acc, grade) => {
              if (acc.includes(grade)) {
                return acc
              }
              return [...acc, grade]
            }, [])
            .sort()

          const clerkGrades = this.roles
            .reduce((acc, role) => {
              if (role.grade.startsWith('Clerk') && !acc.includes(role.grade)) {
                acc.push(role.grade)
              }
              return acc
            }, [])
            .reduce((acc, grade) => {
              if (acc.includes(grade)) {
                return acc
              }
              return [...acc, grade]
            }, [])
            .sort((a, b) => {
              const aVal = a.split(' ')[1].split('/')[0]
              const bVal = b.split(' ')[1].split('/')[0]
              return bVal - aVal
            })

          this.modalData.data = [
            'Superintendent',
            'Inspector',
            'Senior Sergeant',
            'Sergeant',
            'Constable / Senior Constable',
            'Detective Superintendent',
            'Detective Inspector',
            'Detective Senior Sergeant',
            'Detective Sergeant',
            'Detective Constable / Detective Senior Constable',
            ...clerkGrades,
            ...nonPoliceGrades
          ].map((l) => ({
            value: l,
            label: l
          }))
          this.modalData.filterKey = 'grade'
          this.modalData.reset = () => {
            this.debouncedFilters.grade = []
          }
          break
        }
        case 'jobFunction':
          this.modals.selector.generic = true
          this.modalData.title = 'Select Job Function'
          this.modalData.instructions =
            'Select job function that relates to a role to see how they match to others.'

          this.modalData.data = this.roles
            .reduce((acc, role) => {
              if (!acc.includes(role.jobFunction)) {
                acc.push(role.jobFunction)
              }
              return acc
            }, [])
            .reduce((acc, jobFunction) => {
              if (acc.includes(jobFunction)) {
                return acc
              }
              return [...acc, jobFunction]
            }, [])
            .sort((a, b) => a.localeCompare(b))
            .map((l) => ({
              value: l,
              label: l
            }))
          this.modalData.filterKey = 'jobFunction'
          this.modalData.reset = () => {
            this.debouncedFilters.jobFunction = []
          }
          break
        case 'command_BusUnit':
          this.modals.selector.generic = true
          this.modalData.title = 'Select Command / Business Unit'
          this.modalData.instructions =
            'Select the Command or Business Unit that relates to a role to see how they match to others.'

          this.modalData.data = this.roles
            .reduce((acc, role) => {
              if (!acc.includes(role.command_BusUnit)) {
                acc.push(role.command_BusUnit)
              }
              return acc
            }, [])
            .sort((a, b) => a.localeCompare(b))
            .map((l) => ({
              value: l,
              label: l
            }))

          this.modalData.filterKey = 'command_BusUnit'
          this.modalData.reset = () => {
            this.debouncedFilters.command_BusUnit = []
          }
          break
        default:
          break
      }
    },
    handleBack() {
      switch (this.lastViewState) {
        case 1:
          this.viewState = this.lastViewState
          this.filter.jobFamily = ''
          this.filter.jobFunction = []
          this.filter.command_BusUnit = []
          break
        case 2:
          this.viewState = this.lastViewState
          this.lastViewState = 1
          this.filter.jobFunction = []
          this.filter.command_BusUnit = []
          break
        case 3:
          this.viewState = this.lastViewState
          this.lastViewState = 2
          this.filter.command_BusUnit = []
          break
        default:
          break
      }
    },
    bentoL1Select(jobFamily) {
      this.filter.jobFamily = jobFamily
      this.lastViewState = this.viewState

      if (this.filteredRoles.items.length < 30) {
        this.viewState = 4
      } else {
        this.viewState = 2
      }
    },
    bentoL2Select(jobFunction) {
      this.filter.jobFunction = [jobFunction]
      this.lastViewState = this.viewState

      if (this.filteredRoles.items.length < 30) {
        this.viewState = 4
      } else {
        this.viewState = 3
      }
      // this.viewState = 4
    },
    bentoL3Select(jobCommand) {
      this.filter.command_BusUnit = [jobCommand]
      this.lastViewState = this.viewState

      this.viewState = 4
    }
  }
}
</script>

<style>
.role-enter-active {
  transition: all 0.3s ease;
}

.role-leave-active {
  transition: all 0.3s ease-in-out;
}

.role-enter,
.role-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.h-role-input {
  height: 40px;
}
.bento-max-25 {
  max-width: calc(25% - 12px);
}
.bento-max-50 {
  max-width: calc(50% - 8px);
}
.bento-max-33 {
  max-width: calc(33.33% - 10px);
}
</style>

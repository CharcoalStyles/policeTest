<template>
  <div class="font-sans flex-grow flex h-screen">
    <aside
      class="relative z-0 bg-nsw-grey-100 flex flex-col flex-shrink-0 nsw-forms max-h-screen w-screen lg:w-aside lg:border-r lg:border-nsw-grey-200"
    >
      <div
        class="bg-nsw-brand-primary-blue px-6 py-3 w-full flex-shrink-0 flex items-center"
      >
        <h1 class="font-bold text-base text-white">Role Explorer</h1>
      </div>
      <div class="relative flex-grow flex flex-col overflow-hidden">
        <div class="flex-grow flex flex-col overflow-hidden">
          <div class="flex-shrink">
            <div class="bg-white shadow-lg">
              <div class="px-6 pt-6">
                <div class="flex items-center justify-between leading-none">
                  <h2 class="font-bold text-2xl">Discover roles</h2>
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
                      <label class="text-sm font-bold mb-2">Grade</label>
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
                        {{
                          debouncedFilters.location.length === 0
                            ? 'All'
                            : `${debouncedFilters.location.length} selected`
                        }}
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
              </div>
              <div
                class="px-6 py-4 flex items-center justify-between bg-nsw-grey-50 border-gray-300 border-b"
              >
                <div class="font-bold text-base">
                  {{ filteredRolesTotal }} results
                </div>
                <div class="flex items-center">
                  <label class="mr-3 text-sm" for="sort">Sort by:</label>
                  <div class="inline-block relative">
                    <select
                      id="sort"
                      v-model="debouncedFilters.sortBy"
                      class="nsw-form-select h-role-input py-0"
                    >
                      <option value="manager">Manager roles</option>
                      <option value="gradeId">Grade & Salary</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 flex-grow overflow-y-scroll">
            <div
              v-for="(group, index) in filteredRolesByFunction"
              :key="index"
              class="mb-10"
            >
              <h3 class="font-bold text-lg mb-4">
                {{ group.name }}
              </h3>
              <transition-group name="list" tag="div">
                <job-role
                  v-for="role in group.roles"
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
      <div class="relative flex-grow">
        <div class="flex flex-row gap-2 not-zoomable fixed top-0  z-10  bg-white pl-2 p-2">
          <div
            class="bg-nsw-brand-primary-blue font-bold text-white w-12 text-center"
          >
            Beta
          </div>
          <div class="text-nsw-brand-primary-blue">
            This is a <span class="underline">new service</span> - your
            <span class="underline">feedback</span> will help us improve it.
          </div>
        </div>
        <zoom-tool
          v-if="viewState === 4"
          class="not-zoomable fixed top-0 right-0 m-8 z-10"
          :zoom="zoom"
          @zoom="updateZoom"
        />

        <div class="absolute inset-0 overflow-hidden focus:outline-none">
          <div class="px-8 mt-10" :class="viewState === 1 ? '' : 'hidden'">
            <div
              v-for="f in bentoFamilyFunctions.xl"
              :key="f.name"
              class="w-full flex-grow text-center h-32 mb-4"
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
                v-for="f in bentoFamilyFunctions.l"
                :key="f.name"
                class="w-1/4 bento-max-33 flex-grow text-center h-32"
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
                v-for="f in bentoFamilyFunctions.m"
                :key="f.name"
                class="w-1/5 bento-max-25 flex-grow text-center h-32"
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
                v-for="f in bentoFamilyFunctions.s"
                :key="f.name"
                class="w-1/3 bento-max-50 flex-grow text-center h-16"
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
          <div class="block zoomable" :class="viewState === 4 ? '' : 'hidden'">
            <div
              class="families inline-flex flex-wrap p-2"
              :class="{ 'pointer-events-none': panning }"
            >
              <role-function
                v-for="(group, index) in filteredRolesByFunction"
                :key="group.name"
                :role-function="group"
                :roles="roles"
                :index="index"
                :zoom="zoom"
                @selected="viewRole"
              />
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
      :show="modals.selector"
      max-width="xl"
      :title="modalData.title"
      @close="modals.selector = false"
      @reset="modalData.reset"
    >
      {{ modalData.instructions }}
    </generic-selector>

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
import FuzzySearch from 'fuzzy-search'
import panzoom from 'panzoom'
import roles from '@/data/roles.json'
import skills from '@/data/skills.json'
import InputRange from '@/components/forms/InputRange'
import JobRole from '@/components/JobRole'
import RoleFunction from '@/components/RoleFunction'
import ZoomTool from '@/components/ZoomTool'
import RoleSlideout from '@/components/RoleSlideout'
import PageLoading from '@/components/PageLoading'
import NswButton from '@/components/nsw/NswButton'
import SkillsSelector from '@/components/SkillsSelector'
import ModalOnboarding from '@/components/ModalOnboarding'
import InputSkills from '@/components/forms/InputSkills'
import GenericSelector from '~/components/GenericSelector.vue'

export default {
  layout: 'blank',
  components: {
    InputRange,
    JobRole,
    RoleFunction,
    ZoomTool,
    RoleSlideout,
    PageLoading,
    NswButton,
    SkillsSelector,
    InputSkills,
    ModalOnboarding,
    GenericSelector
  },
  data() {
    return {
      roles,
      skills,
      loading: false,
      slideout: false,
      selectedRole: false,
      previousRoleId: false,
      modals: {
        selector: false,
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
        jobFunction: '',
        salary: [38000, 362000],
        sortBy: 'gradeId',
        sworn: 'other'
      },
      filterTimeout: null,
      viewState: 1,
      boxStyle:
        'bg-nsw-brand-primary-blue-light cursor-pointer rounded-2xl flex flex-col justify-center items-center border-4 border-nsw-brand-primary-blue-light hover:border-nsw-brand-primary-blue-2 transition-color duration-500'
    }
  },
  computed: {
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
      // Filter by keyword
      const fuzzy = new FuzzySearch(this.roles, ['name'])
      // Filter by salary and skills
      return collect(fuzzy.search(this.debouncedFilters.keyword))
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
          if (this.filter.jobFunction) {
            return role.jobFunction === this.filter.jobFunction
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
          if (this.filter.location.length > 0 && role.location) {
            return this.filter.location.includes(role.location)
          }
          return true
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
      return this.filteredRoles
        .groupBy('jobFunction')
        .keys()
        .map((key) => ({
          name: key,
          roles: this.filteredRoles
            .where('jobFunction', key)
            .sortByDesc(this.debouncedFilters.sortBy)
            .all()
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
          roles: this.filteredRoles
            .where('jobFamily', key)
            .sortByDesc(this.debouncedFilters.sortBy)
            .all()
        }))
        .sortByDesc((group) => group.roles.length)
        .all()

      return results
    },

    bentoFamilyFunctions() {
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
    }
  },
  mounted() {
    // Initialise pan zoom library
    const element = document.querySelector('.zoomable')

    // Init panzoom
    this.panZoom = panzoom(element, {
      transformOrigin: { x: 0, y: 0 }, // zoom center
      initialZoom: this.zoom,
      maxZoom: 1,
      minZoom: 0.1
    })

    this.panZoom.on('pan', () => {
      this.panning = true
    })

    this.panZoom.on('panend', () => {
      this.panning = false
    })

    this.panZoom.on('transform', (e) => {
      this.zoom = e.getTransform().scale
    })
  },
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
    resetExplorerMap() {
      this.panZoom.moveTo(0, 0)
      this.panZoom.zoomAbs(0, 0, 0.5)
    },
    resetAllFilters() {
      this.resetExplorerMap()
      this.filter = {
        keyword: '',
        skills: [],
        interests: [],
        grade: [],
        location: [],
        jobFamily: '',
        jobFunction: '',
        salary: [38000, 362000],
        sortBy: 'gradeId',
        sworn: 'other'
      }
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

    /**
     * Update zoom level
     */
    updateZoom(zoom) {
      this.panZoom.smoothZoom(20, 20, zoom)
    },

    demoExplorerAnimation() {
      this.modals.onboarding = false
      this.panZoom.smoothZoom(20, 20, 1)
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

        // Scroll to top of panel
        const roleScollPanel = document.querySelector('.slideout-scroll')
        if (roleScollPanel) {
          roleScollPanel.scroll({
            top: 0,
            left: 0
          })
        }
        // Focus role in zoomable panel
        const zoomDom = document.getElementsByClassName('zoomable')[0]
        const roleDom = document.getElementsByClassName(`role-${role.id}`)[0]
        if (roleDom) {
          // Update the styling of the new role
          roleDom.classList.remove('border-nsw-grey-200')
          roleDom.classList.remove('border-white')
          roleDom.classList.add('border-black')
          // Restore the styling of the previous role
          if (this.previousRoleId) {
            const previousRoleDom = document.getElementsByClassName(
              `role-${this.previousRoleId}`
            )[0]
            previousRoleDom.classList.add('border-nsw-grey-200')
            previousRoleDom.classList.add('border-white')
            previousRoleDom.classList.remove('border-black')
          }
          this.previousRoleId = role.id
          // Default settings
          const scale = 1
          const padding = 210
          // Dynamic settings
          const transform = this.panZoom.getTransform()
          const deltaX = transform.x
          const deltaY = transform.y
          const offsetX = scale + deltaX
          const offsetY = scale + deltaY
          // Reset the board
          this.panZoom.zoomAbs(offsetX, offsetY, scale)
          // Get the positions of the role relative to the board
          const zoomBoundingBox = zoomDom.getBoundingClientRect()
          const roleBoundingBox = roleDom.getBoundingClientRect()
          // Get the new position
          let xPos = roleBoundingBox.x - zoomBoundingBox.x
          let yPos = roleBoundingBox.y - zoomBoundingBox.y
          if (this.zoom !== 1) {
            xPos = xPos / this.zoom
            yPos = yPos / this.zoom
          }
          // Move the board to the role
          this.panZoom.smoothMoveTo(-(xPos - padding), -(yPos - padding))
        }
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
          this.modals.selector = true
          this.modalData.title = 'Select Skills'
          this.modalData.instructions =
            'Select skills that relate to a role to see how they match to others.'
          this.modalData.data = this.skills
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
          this.modals.selector = true
          this.modalData.title = 'Select Location'
          this.modalData.instructions =
            'Select location that relates to a role to see how they match to others.'
          this.modalData.data = this.roles
            .reduce((acc, role) => {
              if (!role.location) {
                return acc
              }
              if (!acc.includes(role.location)) {
                acc.push(role.location)
              }
              return acc
            }, [])
            .sort((a, b) => a.localeCompare(b.label))
            .map((l) => ({
              value: l,
              label: l
            }))
          this.modalData.filterKey = 'location'
          this.modalData.reset = () => {
            this.debouncedFilters.location = []
          }
          break
        case 'grade':
          this.modals.selector = true
          this.modalData.title = 'Select Grade'
          this.modalData.instructions =
            'Select grade that relates to a role to see how they match to others.'
          this.modalData.data = this.roles
            .reduce((acc, role) => {
              if (!role.grade) {
                return acc
              }
              if (!acc.includes(role.grade)) {
                acc.push(role.grade)
              }
              return acc
            }, [])
            .sort((a, b) => a.localeCompare(b.label))
            .map((l) => ({
              value: l,
              label: l
            }))
          this.modalData.filterKey = 'grade'
          this.modalData.reset = () => {
            this.debouncedFilters.grade = []
          }
          break
        default:
          break
      }
    },
    bentoL1Select(jobFamily) {
      console.log(jobFamily)
      this.filter.jobFamily = jobFamily
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

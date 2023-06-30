<template>
  <div class="font-sans flex-grow flex h-screen">
    <aside
      class="relative z-0 bg-nsw-grey-100 flex flex-col flex-shrink-0 nsw-forms max-h-screen w-screen lg:w-aside lg:border-r lg:border-nsw-grey-200"
    >
      <div
        class="bg-nsw-brand-purple-dark px-6 py-3 w-full flex-shrink-0 flex items-center"
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
                    style="text-underline-offset: 2px;"
                    @click="resetAllFilters"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div class="px-6 pt-4 pb-6">
                <div class="grid gap-x-6 gap-y-3 md:gap-y-6 grid-cols-2">
                  <div class="col-span-2 flex flex-col">
                    <label class="font-semibold mb-2 text-sm">Search by keyword</label>
                    <input
                      id="keywords"
                      v-debounce:300ms.fireonempty="updateKeyword"
                      name="keywords"
                      class="nsw-form-input h-role-input"
                      placeholder="Enter a keyword"
                      :value="filter.keyword"
                    />
                  </div>
                  <div class="flex flex-col">
                    <div class="flex justify-between">
                      <label class="text-sm font-bold mb-2">Salary</label>
                      <div class="text-sm text-gray-700">
                        ${{ filter.salary[0] / 1000 }}k - ${{
                          filter.salary[1] / 1000
                        }}k
                      </div>
                    </div>
                    <div class="flex items-center justify-center px-3 bg-nsw-grey-50 rounded h-role-input">
                      <div class="w-full flex justify-center">
                        <div class="w-11/12">
                          <input-range
                            v-model="filter.salary"
                            :min="options.salary.min"
                            :max="options.salary.max"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <label class="text-sm font-bold mb-2">Skills</label>
                    <div
                      class="flex items-center rounded nsw-form-select cursor-pointer h-role-input"
                      @click="modals.skills = true"
                    >
                      {{ filter.skills.length }} selected
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
                      v-model="filter.sortBy"
                      class="nsw-form-select h-role-input py-0"
                    >
                      <option value="manager">Manager roles</option>
                      <option value="gradeId">Salary</option>
                      <option value="gradeId">Grade</option>
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
        <zoom-tool
          class="not-zoomable fixed top-0 right-0 m-8 z-10"
          :zoom="zoom"
          @zoom="updateZoom"
        />
        <div class="absolute inset-0 overflow-hidden focus:outline-none">
          <div class="block zoomable">
            <div
              class="families inline-flex flex-wrap p-20"
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

    <skills-selector
      :show="modals.skills"
      max-width="xl"
      @close="modals.skills = false"
      @reset="resetSkillsFilter"
    >
      <input-skills v-model="filter.skills" :roles="roles" />
    </skills-selector>
    <modal-onboarding
      :show="modals.onboarding"
      max-width="xl"
      @close="demoExplorerAnimation"
    />

    <page-loading :loading="loading" />
  </div>
</template>

<script>
import roles from '@/data/roles.json'
import collect from 'collect.js'
import FuzzySearch from 'fuzzy-search'
import panzoom from 'panzoom'
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
    ModalOnboarding
  },
  data() {
    return {
      roles,
      loading: false,
      slideout: false,
      selectedRole: false,
      previousRoleId: false,
      modals: {
        skills: false,
        onboarding: true
      },
      zoom: 0.5,
      panning: false,
      options: {
        salary: {
          min: 70000,
          max: 346000
        }
      },
      filter: {
        keyword: '',
        skills: [],
        interests: [],
        salary: [70000, 346000],
        sortBy: 'gradeId'
      }
    }
  },
  computed: {
    /**
     * Filter roles based on filtering form values
     */
    filteredRoles() {
      // Filter by keyword
      const fuzzy = new FuzzySearch(this.roles, ['name'])
      // Filter by salary and skills
      return collect(fuzzy.search(this.filter.keyword))
        .filter((role) => !role.genericRole)
        .where('salary.min', '>=', this.filter.salary[0])
        .where('salary.max', '<=', this.filter.salary[1])
        .filter((role) => {
          return this.filter.skills.length && role.skills.focus
            ? collect(role.skills.focus)
              .whereIn('code', this.filter.skills)
              .count()
            : true
        })
    },

    /**
     * Count total number of filtered roles
     */
    filteredRolesTotal() {
      return this.filteredRoles.count()
    },

    /**
     * Filter roles by function group
     */
    filteredRolesByFunction() {
      return this.filteredRoles
        .groupBy('familyFunction')
        .keys()
        .map((key) => ({
          name: key,
          roles: this.filteredRoles
            .where('familyFunction', key)
            .sortByDesc(this.filter.sortBy)
            .all()
        }))
        .sortByDesc((group) => group.roles.length)
        .all()
    },

    /**
     * Filter roles by function group
     */
    filteredRolesByFamilyRole() {
      const results = this.filteredRoles
        .groupBy('familyRole')
        .keys()
        .map((key) => ({
          name: key,
          roles: this.filteredRoles
            .where('familyRole', key)
            .sortByDesc(this.filter.sortBy)
            .all()
        }))
        .sortByDesc((group) => group.roles.length)
        .all()
      console.log(results)
      return results
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
        salary: [70000, 346000],
        sortBy: 'gradeId'
      }
    },

    resetSkillsFilter() {
      this.filter.skills = []
    },

    /**
     * Update keyword value on debounce
     */
    updateKeyword(value) {
      this.filter.keyword = value
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
      this.filter.interests = this.filter.interests.includes(interest)
        ? this.filter.interests.filter((i) => i !== interest)
        : [...this.filter.interests, interest]
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
</style>

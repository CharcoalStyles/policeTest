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
              <div class="px-6 pt-2 pb-2 flex flex-col gap-3">
                <div class="relative">
                  <label class="mb-1">
                    <p class="pb-2 font-bold text-sm">Search by keyword</p>
                  </label>
                  <div class="flex items-center">
                    <input
                      id="keywords"
                      v-debounce:1s.fireonempty="updateKeyword"
                      name="keywords"
                      class="nsw-form-input h-role-input pr-10 w-full"
                      placeholder="Search"
                      :value="filter.keyword"
                    />
                    <loading-spinner
                      :show="searching"
                      class="absolute right-2 delay-1000"
                    />
                  </div>
                </div>
                <div class="flex flex-row justify-between h-full">
                  <div
                    class="flex flex-row gap-2 cursor-pointer"
                    @click="() => (filterSlideout = !filterSlideout)"
                  >
                    <img src="/icons/filter.svg" alt="Filter icon" />
                    <p class="font-bold underline">Filters</p>
                  </div>
                  <div
                    v-if="filterSlideout"
                    class="flex flex-row gap-2 cursor-pointer"
                    @click="() => (filterSlideout = !filterSlideout)"
                  >
                    <p class="font-bold underline">Close</p>
                  </div>
                </div>
                <div class="overflow-hidden" :class="filterClass">
                  <div :class="innerFilterClass">
                    <div>
                      <p class="mb-1 font-bold text-sm">Role Type</p>
                      <div
                        class="flex flex-row w-full rounded-md text-sm"
                        role="group"
                      >
                        <button
                          type="button"
                          class="py-4 w-1/3 py-2 rounded-s-md border border-nsw-brand-primary-blue"
                          :class="swornButtonSelected('other')"
                          @click="
                            () => updateFilter({ key: 'sworn', value: 'other' })
                          "
                        >
                          All
                        </button>
                        <button
                          type="button"
                          class="py-4 w-1/3 py-2 border-t border-b border-nsw-brand-primary-blue"
                          :class="swornButtonSelected('police')"
                          @click="
                            () =>
                              updateFilter({ key: 'sworn', value: 'police' })
                          "
                        >
                          Policing
                        </button>
                        <button
                          type="button"
                          class="py-4 w-1/3 py-2 rounded-e-md border border-nsw-brand-primary-blue"
                          :class="swornButtonSelected('administrative')"
                          @click="
                            () =>
                              updateFilter({
                                key: 'sworn',
                                value: 'administrative'
                              })
                          "
                        >
                          Administrative
                        </button>
                      </div>
                    </div>

                    <div class="flex mt-3 gap-4 flex-row">
                      <div class="w-1/2">
                        <div class="flex flex-col">
                          <label class="text-sm font-bold mb-1"
                            >Rank/Grade</label
                          >
                          <div
                            class="flex items-center rounded nsw-form-select cursor-pointer h-role-input"
                            @click="showSelectorPopup('grade')"
                          >
                            {{
                              filter.grade.length === 0
                                ? 'All'
                                : `${filter.grade.length} selected`
                            }}
                          </div>
                        </div>
                      </div>

                      <div class="w-1/2">
                        <div class="flex justify-between">
                          <label class="text-sm font-bold mb-1">Salary</label>
                          <div class="text-sm text-gray-700">
                            ${{ salaryLabelData[0] / 1000 }}k - ${{
                              salaryLabelData[1] / 1000
                            }}
                          </div>
                        </div>
                        <div
                          class="flex items-center justify-center px-3 bg-nsw-grey-50 rounded h-role-input"
                        >
                          <div class="w-full flex justify-center">
                            <div class="w-11/12">
                              <input-range
                                :value="filter.salary"
                                :min="options.salary.min"
                                :max="options.salary.max"
                                @change="
                                  (value) =>
                                    updateFilter({ key: 'salary', value })
                                "
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex mt-3 gap-4 flex-row">
                      <div class="w-1/2">
                        <div class="flex flex-col">
                          <label class="text-sm font-bold mb-1">Location</label>
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
                          <label class="text-sm font-bold mb-1">Skills</label>
                          <div
                            class="flex items-center rounded nsw-form-select cursor-pointer h-role-input"
                            @click="showSelectorPopup('skills')"
                          >
                            {{
                              filter.skills.length === 0
                                ? 'All'
                                : `${filter.skills.length} selected`
                            }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-3">
                      <div class="flex flex-col">
                        <label class="text-sm font-bold mb-1">
                          Work Area / Job Function
                        </label>
                        <div
                          class="flex items-center rounded nsw-form-select cursor-pointer h-role-input"
                          @click="showSelectorPopup('jobFunction')"
                        >
                          {{
                            filter.jobFunction.length === 0
                              ? 'All'
                              : `${filter.jobFunction.length} selected`
                          }}
                        </div>
                      </div>
                    </div>

                    <div class="mb-2 mt-3">
                      <div class="flex flex-col">
                        <label class="text-sm font-bold mb-1">
                          Command / Unit
                        </label>
                        <div
                          class="flex items-center rounded nsw-form-select cursor-pointer h-role-input"
                          @click="showSelectorPopup('command_BusUnit')"
                        >
                          {{
                            filter.command_BusUnit.length === 0
                              ? 'All'
                              : `${filter.command_BusUnit.length} selected`
                          }}
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="isLowHeight && filterSlideout"
                      class="absolute inset-x-0 bottom-0 mx-6 mb-4"
                    >
                      <button
                        type="button"
                        class="py-3 rounded-md bg-nsw-brand-primary-blue text-white w-full"
                        @click="() => (filterSlideout = !filterSlideout)"
                      >
                        Show {{ filteredRolesTotal }} roles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="px-6 py-4 flex gap-1 items-center justify-between bg-nsw-grey-50 border-gray-300 border-b"
              >
                <div class="font-bold text-base">
                  {{ filteredRolesTotal }} results
                </div>
                <div class="flex items-center">
                  <label class="mr-3 text-sm" for="sort">Sort by:</label>
                  <div class="inline-block relative">
                    <select
                      id="sort"
                      v-model="sortBy"
                      class="nsw-form-select h-role-input py-0"
                    >
                      <option
                        v-if="this.searchResults !== undefined"
                        value="search"
                      >
                        Search results
                      </option>
                      <option value="asc">Salary Ascending</option>
                      <option value="desc">Salary Descending</option>
                    </select>
                  </div>
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
                  v-for="role in group.roles.sort((a, b) => {
                    switch (sortBy) {
                      case 'search':
                        return 0
                      case 'asc':
                        return a.salary.max < b.salary.max ? -1 : 1
                      case 'desc':
                        return a.salary.max > b.salary.max ? -1 : 1
                    }
                  })"
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
                  v-for="role in filteredRoles.sort((a, b) => {
                    switch (sortBy) {
                      case 'asc':
                        return a.salary.max < b.salary.max ? -1 : 1
                      case 'desc':
                        return a.salary.max > b.salary.max ? -1 : 1
                    }
                  })"
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
                class="ml-8 flex flex-row mb-2 cursor-pointer"
                @click="handleBack()"
              >
                <img
                  src="/icons/chevron-left-blue.svg"
                  alt="Clipboard icon"
                  class="h-6"
                />
                <p class="text-nsw-brand-primary-blue">Back</p>
              </div>
              <div
                class="inline-flex flex-wrap pl-2"
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
      :data="modalData.data"
      :show-loader="searching"
      :show="modals.selector === 'generic'"
      max-width="xl"
      :title="modalData.title"
      :value="filter[modalData.filterKey]"
      @change="(value) => updateFilter({ key: modalData.filterKey, value })"
      @close="modals.selector = ''"
      @reset="modalData.reset"
      @userSelected="
        (isFiltered) => {
          filterByUser[modalData.filterKey] = isFiltered
        }
      "
    >
      {{ modalData.instructions }}
    </generic-selector>

    <selector-with-various
      :various-guide-text="modalData.variousGuideText || ''"
      :normal-guide-text="modalData.normalGuideText || ''"
      :data="modalData.data"
      :show-loader="searching"
      :show="modals.selector === 'various'"
      max-width="xl"
      :title="modalData.title"
      :value="filter[modalData.filterKey]"
      @change="(value) => updateFilter({ key: modalData.filterKey, value })"
      @close="modals.selector = ''"
      @reset="modalData.reset"
      @userSelected="
        (isFiltered) => {
          filterByUser[modalData.filterKey] = isFiltered
        }
      "
    >
      {{ modalData.instructions }}
    </selector-with-various>

    <selector-with-sections
      :groups="modalData.groups"
      :data="modalData.data"
      :show-loader="searching"
      :show="modals.selector === 'sections'"
      max-width="xl"
      :title="modalData.title"
      :value="filter[modalData.filterKey]"
      @change="(value) => updateFilter({ key: modalData.filterKey, value })"
      @close="modals.selector = ''"
      @reset="modalData.reset"
      @userSelected="
        (isFiltered) => {
          filterByUser[modalData.filterKey] = isFiltered
        }
      "
    >
      {{ modalData.instructions }}
    </selector-with-sections>

    <modal-onboarding
      :show="modals.onboarding"
      :show-loader="searching"
      max-width="xl"
      @close="demoExplorerAnimation"
    />

    <page-loading :loading="loading" />
  </div>
</template>

<script>
import collect from 'collect.js'
import VueScreenSize from 'vue-screen-size'
import InputRange from '@/components/forms/InputRange'
import JobRole from '@/components/JobRole'
import RoleFunction from '@/components/RoleFunction'
import RoleSlideout from '@/components/RoleSlideout'
import PageLoading from '@/components/PageLoading'
import NswButton from '@/components/nsw/NswButton'
import ModalOnboarding from '@/components/ModalOnboarding'
import { keywordSearch } from '@/utils/search'
import { debounce } from 'vue-debounce'
import GenericSelector from '~/components/GenericSelector.vue'
import NswpfBeta from '~/components/nswpfBeta.vue'
import SelectorWithVarious from '~/components/SelectorWithVarious.vue'
import SelectorWithSections from '~/components/SelectorWithSections.vue'
import LoadingSpinner from '~/components/LoadingSpinner.vue'

const filterDebounce = debounce(({ fn, val }) => {
  fn(val)
}, '400ms')

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
    SelectorWithVarious,
    SelectorWithSections,
    LoadingSpinner
  },
  mixins: [VueScreenSize.VueScreenSizeMixin],
  data() {
    return {
      loading: false,
      slideout: false,
      filterSlideout: true,
      selectedRole: false,
      previousRoleId: false,
      modals: {
        selector: '',
        onboarding: true
      },
      modalData: {
        data: [],
        filterKey: '',
        reset: () => {},
        title: '',
        instructions: '',
        groups: []
      },
      zoom: 0.4,
      panning: false,
      options: {
        salary: {
          min: 38000,
          max: 288000
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
        salary: [38000, 288000],
        sworn: 'other'
      },
      salaryLabelData: [38000, 288000],
      sortBy: 'asc',
      filterByUser: {
        skills: false,
        interests: false,
        grade: false,
        jobFunction: false,
        command_BusUnit: false
      },
      filterTimeout: null,
      searching: false,
      searchResults: undefined,
      viewState: 1,
      lastViewState: 1,
      filteredRoles: collect([]),
      boxStyle:
        'cursor-pointer rounded-2xl flex flex-col justify-center items-center border-4 border-nsw-brand-primary-blue-light hover:border-nsw-brand-primary-blue-2 transition-color duration-500'
    }
  },
  computed: {
    roles() {
      return this.$store.state.roles
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
          } else {
            acc.s.push(roles)
          }
          return acc
        },
        { xl: [], l: [], m: [], s: [] }
      )
    },
    locationLabel() {
      if (this.filter.location.length === 0) {
        return 'All'
      }

      const numLocations = this.filter.location.length
      return `${numLocations} selected`
    },
    isLowHeight() {
      return this.$vssHeight < 950
    },
    isVeryLowHeight() {
      return this.$vssHeight < 660
    },
    filterClass() {
      const open = this.isLowHeight ? 'min-h-[1000px]' : ''
      return this.filterSlideout ? open : 'h-0'
    },
    innerFilterClass() {
      const open = this.isVeryLowHeight ? 'h-[200px] overflow-y-scroll' : ''
      return this.filterSlideout ? open : 'h-0'
    }
  },
  mounted() {
    if (this.$vssHeight < 950) {
      this.filterSlideout = false
    }
    setTimeout(() => {
      this.filterRoles()
    }, 100)
  },
  methods: {
    filterRoles() {
      const filters = [
        // Filter out generic roles
        {
          name: 'Generic Roles',
          preFilter: () => true,
          filter: (role) => !role.genericRole
        },
        // Filter by the police/admin selection
        {
          name: 'Police / Administrative',
          preFilter: () => this.filter.sworn !== 'other',
          filter: (role) => {
            switch (this.filter.sworn) {
              case 'other':
                return true
              case 'police':
                return role.jobFamily === 'Policing'
              case 'administrative':
                return role.jobFamily !== 'Policing'
              default:
                return false
            }
          }
        },
        // Filter by job family selection
        {
          name: 'Job Family',
          preFilter: () => this.filter.jobFamily.length > 0,
          filter: (role) => {
            return this.filter.jobFamily.includes(role.jobFamily)
          }
        },
        // Filter by job function selection
        {
          name: 'Jub Function',
          preFilter: () => this.filter.jobFunction.length > 0,
          filter: (role) => {
            return this.filter.jobFunction.includes(role.jobFunction)
          }
        },
        // Filter by command / bus unit selection
        {
          name: 'Command / Business Unit',
          preFilter: () => this.filter.command_BusUnit.length > 0,
          filter: (role) => {
            return this.filter.command_BusUnit.includes(role.command_BusUnit)
          }
        },
        // Filter by salary selection
        {
          name: 'Salary',
          preFilter: () =>
            this.filter.salary[0] !== 38000 || this.filter.salary[1] !== 288000,
          filter: (role) => {
            return (
              role.salary.min >= this.filter.salary[0] &&
              role.salary.min <= this.filter.salary[1]
            )
          }
        },
        // Filter by skills selection
        {
          name: 'Skills',
          preFilter: () => this.filter.skills.length > 0,
          filter: (role) => {
            return role.skills.focus.reduce((acc, skill) => {
              if (this.filter.skills.includes(skill.code)) {
                return true
              }
              return acc
            }, false)
          }
        },
        // Filter by location selection
        {
          name: 'Location',
          preFilter: () => this.filter.location.length > 0,
          filter: (role) => {
            return this.filter.location.includes(role.location.trim())
          }
        },
        // Filter by grade selection
        {
          name: 'Grade',
          preFilter: () => this.filter.grade.length > 0,
          filter: (role) => {
            return this.filter.grade.includes(role.grade)
          }
        }
      ]

      this.startSearching()

      setTimeout(() => {
        let rolesToSearch = this.$store.state.roles
        if (this.searchResults !== undefined) {
          rolesToSearch = this.searchResults
        }

        const results = filters.reduce((acc, filter) => {
          const doThisFilter = filter.preFilter()
          if (doThisFilter) {
            return acc.filter(filter.filter)
          }
          return acc
        }, collect(rolesToSearch))

        this.stopSearching()
        this.filteredRoles = collect(results)
      }, 100)
    },

    resetSlideout() {
      this.slideout = false
      this.previousRoleId = false
    },
    resetAllFilters() {
      this.searchResults = undefined
      this.filter = {
        keyword: '',
        skills: [],
        interests: [],
        grade: [],
        location: [],
        jobFamily: '',
        jobFunction: [],
        command_BusUnit: [],
        salary: [this.options.salary.min, this.options.salary.max],
        sworn: 'other'
      }
      this.filterByUser = {
        skills: false,
        interests: false,
        grade: false,
        jobFunction: false,
        command_BusUnit: false
      }
      this.viewState = 1
      this.filterRoles()
    },

    resetSkillsFilter() {
      this.filter.skills = []
    },

    /**
     * Update keyword value on debounce
     */
    updateKeyword(value) {
      this.startSearching()
      if (value === this.filter.keyword) {
        return
      }
      // this.filter.keyword = value

      if (value.length === 0) {
        this.filter.keyword = value
        setTimeout(() => {
          this.filter.keyword = ''
          this.sortBy = 'asc'
          this.searchResults = undefined
          this.searching = false

          this.filterRoles()
        }, 100)
      } else {
        this.filter.keyword = value
        // add a delay to allow the user to see the loading spinner
        setTimeout(() => {
          this.filter.keyword = value
          const keyword = keywordSearch(this.roles, [
            { key: 'name', weight: 2 },
            { key: 'alias' },
            { key: 'command_BusUnit' },
            { key: 'jobFunction' },
            { key: 'grade', weight: 1.5 }
          ])

          this.searchResults = keyword(value).map((r) => r.item)
          this.sortBy = 'search'

          this.filterRoles()
        }, 300)
      }
    },

    updateFilter({ key, value }) {
      const fn = (val) => {
        this.filter[key] = val
        this.filterRoles()
      }
      filterDebounce({ fn, val: value })
    },

    startSearching() {
      this.searching = true
    },

    stopSearching() {
      this.searching = false
    },

    demoExplorerAnimation() {
      this.modals.onboarding = false
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
      this.selectedRole = role
      window.scrollTo(0, 0)
      this.slideout = true
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
          {
            this.modals.selector = 'sections'
            this.modalData.title = 'Select Skills'
            this.modalData.instructions =
              'Select skills that relate to a role to see how they match to others.'

            const groupedSkills = this.$store.state.skills.reduce(
              (acc, skill) => {
                if (
                  Object.keys(acc).find((a) => a === skill.superCategory) ===
                  undefined
                ) {
                  acc[skill.superCategory] = {
                    title: skill.superName,
                    roles: []
                  }
                }
                acc[skill.superCategory].roles.push(skill)
                return acc
              },
              {}
            )

            const arrangedKeys = [
              'PSCS',
              ...Object.keys(groupedSkills)
                .filter((k) => k !== 'PSCS')
                .sort((a, b) => {
                  return a.localeCompare(b)
                })
            ]

            const allRoles = arrangedKeys.reduce(
              (acc, key) => {
                const lastLength = acc.roles.length

                const roles = [
                  ...acc.roles,
                  ...groupedSkills[key].roles
                    .map((s) => ({
                      value: s.code,
                      label: s.name
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label))
                ]

                return {
                  roles,
                  groups: [
                    ...acc.groups,
                    {
                      title: groupedSkills[key].title,
                      start: lastLength,
                      end: roles.length
                    }
                  ]
                }
              },
              {
                roles: [],
                groups: []
              }
            )

            this.modalData.groups = allRoles.groups

            this.modalData.data = allRoles.roles
            this.modalData.filterKey = 'skills'

            this.modalData.reset = () => {
              this.filter.skills = []
            }
          }
          break
        case 'location':
          this.modals.selector = 'various'
          this.modalData.title = 'Select Location'
          this.modalData.variousGuideText =
            'Tick Various to include roles available at multiple locations'
          this.modalData.normalGuideText =
            'Select from the list below for a specific location'
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
            this.filter.location = []
          }
          break
        case 'grade': {
          this.modals.selector = 'generic'
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
            this.filter.grade = []
          }
          break
        }
        case 'jobFunction':
          {
            this.modals.selector = 'sections'
            this.modalData.title = 'Select Job Function'
            this.modalData.instructions =
              'Select job function that relates to a role to see how they match to others.'

            const dividedFunctions = this.roles.reduce(
              (acc, role) => {
                if (role.jobFamily === 'Policing') {
                  if (!acc.police.includes(role.jobFunction)) {
                    acc.police.push(role.jobFunction)
                  }
                } else if (!acc.other.includes(role.jobFunction)) {
                  acc.other.push(role.jobFunction)
                }
                return acc
              },
              { police: [], other: [] }
            )

            this.modalData.groups = [
              {
                title: 'Police',
                start: 0,
                end: dividedFunctions.police.length
              },
              {
                title: 'Other',
                start: dividedFunctions.police.length,
                end:
                  dividedFunctions.police.length + dividedFunctions.other.length
              }
            ]

            this.modalData.data = [
              ...dividedFunctions.police
                .map((s) => ({
                  value: s,
                  label: s
                }))
                .sort((a, b) => a.label.localeCompare(b.label)),
              ...dividedFunctions.other
                .map((s) => ({
                  value: s,
                  label: s
                }))
                .sort((a, b) => a.label.localeCompare(b.label))
            ]

            this.modalData.filterKey = 'jobFunction'
            this.modalData.reset = () => {
              this.filter.jobFunction = []
            }
          }
          break
        case 'command_BusUnit':
          this.modals.selector = 'various'
          this.modalData.title = 'Select Command / Business Unit'
          this.modalData.variousGuideText =
            'Tick Various to include roles available in multiple Commands / Business Units'
          this.modalData.normalGuideText =
            'Select from the list below for a specific Command / Business Unit'
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
            this.filter.command_BusUnit = []
          }
          break
        default:
          break
      }
    },
    handleBack() {
      let lastViewState = this.lastViewState
      switch (this.lastViewState) {
        case 1:
          this.filter.jobFamily = ''
          // if (!this.filterByUser.jobFunction) {
          //   this.filter.jobFunction = []
          // }
          break
        case 2:
          lastViewState = 1
          if (!this.filterByUser.jobFunction) {
            this.filter.jobFunction = []
          }
          break
        case 3:
          lastViewState = 2
          if (!this.filterByUser.command_BusUnit) {
            this.filter.command_BusUnit = []
          }
          break
        default:
          break
      }
      this.filterRoles()
      setTimeout(() => {
        this.viewState = this.lastViewState
        this.lastViewState = lastViewState
      }, 150)
    },
    bentoL1Select(jobFamily) {
      this.filter.jobFamily = jobFamily
      this.filterRoles()
      this.lastViewState = this.viewState

      setTimeout(() => {
        if (this.filteredRoles.items.length < 30) {
          this.viewState = 4
        } else {
          this.viewState = 2
        }
      }, 150)
    },
    bentoL2Select(jobFunction) {
      if (this.filterByUser.jobFunction) {
        setTimeout(() => {
          if (this.filteredRoles.items.length < 30) {
            this.viewState = 4
          } else {
            this.viewState = 3
          }
        }, 150)
        return
      }

      this.filter.jobFunction = [jobFunction]
      this.filterRoles()
      this.lastViewState = this.viewState

      setTimeout(() => {
        if (this.filteredRoles.items.length < 30) {
          this.viewState = 4
        } else {
          this.viewState = 3
        }
      }, 150)
      // this.viewState = 4
    },
    bentoL3Select(jobCommand) {
      this.filter.command_BusUnit = [jobCommand]
      this.lastViewState = this.viewState
      this.filterRoles()

      setTimeout(() => {
        this.viewState = 4
      }, 150)
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

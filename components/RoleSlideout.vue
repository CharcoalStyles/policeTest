<template>
  <div
    key="role"
    class="absolute top-0 left-0 h-slider w-full lg:w-aside flex flex-col bg-white z-10"
  >
    <div
      class="h-12 flex-shrink-0 bg-nsw-brand-primary-blue-light text-nsw-brand-grey-primary flex items-center px-6"
    >
      <button class="flex items-center" @click="$emit('back')">
        <img
          src="/icons/chevron-left-blue.svg"
          class="mr-2 fill-nsw-brand-primary-blue"
        />
        All roles
      </button>
    </div>
    <div
      id="role-slideout"
      class="slideout-scroll px-6 py-8 flex-grow overflow-y-scroll"
    >
      <div class="mb-4">
        <h2 class="font-bold text-[32px] pr-3 leading-tight">
          {{ role.name }}
        </h2>
      </div>
      <div class="mb-8 flex flex-row flex-wrap gap-3">
        <information-badge size="xs" colour="grey">
          {{ role.grade }}
        </information-badge>
        <information-badge size="xs" colour="grey">
          Salary: {{ $currency(role.salary.min) }} -
          {{ $currency(role.salary.max) }}
        </information-badge>
        <information-badge v-if="role.manager" size="sm" class="rounded-full">
          Supervisor Role
        </information-badge>
        <information-badge
          v-if="role.numPositions"
          size="sm"
          class="rounded-full"
        >
          {{ role.numPositions }} positions
        </information-badge>
        <information-badge
          v-if="role.location && role.location !== 'Various'"
          size="sm"
          class="rounded-full"
        >
          {{ role.location }}
        </information-badge>
      </div>
      <div class="mb-8">
        <h4 class="font-bold text-xl mb-3">Role purpose</h4>
        <p class="pr-3">
          {{ role.description }}
        </p>
      </div>
      <div v-if="role.fullDescription" class="w-fit">
        <a
          :href="role.fullDescription"
          target="_blank"
          class="flex flex-row gap-1 underline text-sm text-nsw-brand-primary-blue mb-6"
        >
          <img src="/icons/pages.svg" alt="Link icon" />
          <p>Role Description</p>
        </a>
      </div>
      <div class="mb-4">
        <EssentialRequirementsIcon :role="role" size="lg" />
      </div>
      <div v-if="essentialRequirements">
        <div class="flex flex-row gap-2 mb-2">
          <img src="/icons/essential.svg" alt="Link icon" />
          <p class="font-bold text-nsw-brand-primary-blue">
            Essential Requirements
          </p>
        </div>
        <ul class="list-disc ml-5">
          <li
            v-for="er in essentialRequirements"
            :key="er"
            class="text-sm mb-2"
          >
            {{ er }}
          </li>
        </ul>
      </div>

      <div v-if="role.skills.focus.length > 0" class="my-8">
        <h4 class="font-bold text-xl mb-3">Role Skills</h4>
        <div class="flex flex-col">
          <comparison-row
            v-for="skill in getSkills(role.skills.focus)"
            :key="skill.code"
            class="w-full"
            :current-role="role"
            :item="skill"
            type="skill"
            instructions="selfAssessed"
            role-type="current"
            :full-width="true"
            :no-journey="true"
            @skillClicked="showSkillModal"
          />
        </div>
      </div>

      <div v-if="role.capabilities.focus.length > 0" class="my-8">
        <h4 class="font-bold text-xl mb-3">Role Capabilities</h4>
        <div class="flex flex-col">
          <comparison-row
            v-for="capability in getCapabilities(role.capabilities.focus)"
            :key="capability.code"
            class="w-full"
            :current-role="role"
            :item="capability"
            type="capability"
            instructions="selfAssessed"
            role-type="current"
            :full-width="true"
            :no-journey="true"
            @skillClicked="showCapabilityModal"
          />
        </div>
      </div>
      <div class="mb-8">
        <div
          class="py-4 pl-4 pr-6 bg-nsw-brand-primary-blue-light border-l-8 border-nsw-brand-primary-blue"
        >
          <h5 class="font-bold text-lg mb-3 text-nsw-brand-primary-blue">
            Interested in this role?
          </h5>
          <p class="mb-3">
            Use the pathways tool and reference this role title when completing
            the questionnaire
          </p>
          <nuxt-link
            to="/pathway"
            class="font-semibold text-nsw-brand-primary-blue underline"
            style="text-underline-offset: 2px"
          >
            Career Pathways
          </nuxt-link>
        </div>
      </div>
      <div v-if="progressionRoles.length" class="mb-6">
        <h4 class="font-bold mb-4 flex items-center text-lg">
          Progression Roles
          <!-- <information-badge size="xs" colour="grey" class="font-normal ml-3">
            {{ getSimilarRolesBySkills.items.length }}
          </information-badge> -->
        </h4>
        <div class="flex flex-col">
          <job-role
            v-for="similarRoleBySkills in progressionRoles.slice(0, 6)"
            :key="similarRoleBySkills.id"
            :role="similarRoleBySkills"
            @click.native="$emit('selected', similarRoleBySkills)"
          />
        </div>
      </div>
      <div v-if="adjacentRoles.length" class="mb-6">
        <h4 class="font-bold mb-4 flex items-center text-lg">
          Adjacent Roles
          <!-- <information-badge size="xs" colour="grey" class="font-normal ml-3">
            {{ getSimilarRolesBySkills.items.length }}
          </information-badge> -->
        </h4>
        <div class="flex flex-col">
          <job-role
            v-for="similarRoleBySkills in adjacentRoles.slice(0, 5)"
            :key="similarRoleBySkills.id"
            :role="similarRoleBySkills"
            @click.native="$emit('selected', similarRoleBySkills)"
          />
        </div>
      </div>
    </div>
    <modal-skill
      :show="modals.skill"
      :selected-skill="selectedSkill ? selectedSkill : false"
      :current-role="role"
      :target-role="false"
      max-width="3xl"
      :journey="false"
      :no-role="true"
      @close="modals.skill = false"
    />
    <modal-capability
      :show="modals.capability"
      :selected-capability="selectedCapability ? selectedCapability : false"
      :current-role="role"
      :target-role="false"
      max-width="3xl"
      :journey="false"
      :no-role="true"
      :start-level="3"
      @close="modals.capability = false"
    />
  </div>
</template>

<script>
import InformationBadge from '@/components/InformationBadge'
import JobRole from '@/components/JobRole'
import ComparisonRow from '@/components/pathway/results/ComparisonRow'
import ModalCapability from '@/components/pathway/results/ModalCapability'
import ModalSkill from '@/components/pathway/results/ModalSkill'
import EssentialRequirementsIcon from '@/components/EssentialRequirementsIcon'
import {
  adjacentRoles,
  progressionRoles,
  rankAndSortRoles
} from '@/utils/roleComp'

export default {
  components: {
    InformationBadge,
    JobRole,
    ComparisonRow,
    EssentialRequirementsIcon,
    ModalCapability,
    ModalSkill
  },
  props: {
    roles: {
      type: Array,
      required: true
    },
    role: {
      type: [Object, Boolean],
      required: true
    }
  },
  data() {
    return {
      selectedSkill: false,
      selectedCapability: false,
      modals: {
        skill: false,
        capability: false
      }
    }
  },
  computed: {
    skills() {
      return this.$store.state.skills
    },
    capabilities() {
      return this.$store.state.capabilities
    },
    progressionRoles() {
      const progRoles = progressionRoles(this.roles, this.role)
      const p = rankAndSortRoles(this.role, progRoles, 'progression')
      const prog = p.map(
        ({ role }) => role
      )
      return prog
    },
    adjacentRoles() {
      const adjRoles = adjacentRoles(this.roles, this.role)
      const adj = rankAndSortRoles(this.role, adjRoles, 'adjacent').map(({ role }) => role)
      return adj
    },
    essentialRequirements() {
      if (this.role.essentialRequirements) {
        return this.role.essentialRequirements
          .split('•')
          .filter((er) => er !== '')
          .map((er) => er.trim())
      }
      return ''
    }
  },
  watch: {
    role() {
      const scrollable = document.getElementById('role-slideout')
      scrollable.scrollTop = 0
    }
  },
  methods: {
    showSkillModal(modal) {
      this.selectedSkill = this.getSkillByCode(modal.skill)
      this.modals.skill = true
    },

    showCapabilityModal(modal) {
      this.selectedCapability = this.getCapabilityByCode(modal.skill)
      this.modals.capability = true
    },

    getSkillsCodeArray(role) {
      if (role.skills.focus) {
        return role.skills.focus.map((skill) => {
          return skill.code
        })
      }
      return []
    },
    getSkillByCode(code) {
      return this.$collect(this.skills).where('code', code).first()
    },
    getCapabilityByCode(code) {
      return this.$collect(this.capabilities).where('subcode', code).first()
    },

    getSkillName(code) {
      const skill = this.$collect(this.skills).where('code', code).first()
      return skill.name
    },
    getSkills(skills) {
      return skills.map(({ code, level }) => {
        if (code === '') {
          console.log('empty skill')
          return {
            code,
            level,
            name: 'No Skill'
          }
        }
        const skill = this.skills.find((c) => c.code === code)

        return {
          code,
          level,
          name: skill.category
        }
      }).filter((skill) => skill.name !== 'No Skill')
    },
    getCapabilities(capabilities) {
      return capabilities.map(({ code, level }) => {
        const capability = this.$store.state.capabilities.find(
          (c) => c.subcode === code
        )

        return {
          code,
          level,
          name: capability.subcategory
        }
      })
    }
  }
}
</script>

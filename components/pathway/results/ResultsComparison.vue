<template>
  <tbody>
    <tr>
      <td class="lg:w-1/2 p-4 lg:p-8">
        <div class="flex items-center whitespace-no-wrap font-bold text-lg">
          Current skill <help-bubble tooltip="Your current role SFIA skill requirements." />
        </div>
      </td>
      <td class="lg:w-1/2 p-4 lg:p-8">
        <div class="flex items-center whitespace-no-wrap font-bold text-lg">
          Target skill <help-bubble tooltip="Your target role SFIA skill requirements." />
        </div>
      </td>
    </tr>
    <tr v-for="(skill, index) in skillsMatrix" :key="`skill-${index}`">
      <comparison-row :current-role="currentRole" :target-role="targetRole" :item="skill.current" type="skill" @skillClicked="showSkillModal" />
      <comparison-row :current-role="currentRole" :target-role="targetRole" :item="skill.target" type="skill" instructions @skillClicked="showSkillModal" />
    </tr>
    <tr>
      <td class="lg:w-1/2 p-4 lg:p-8">
        <div class="flex items-center whitespace-no-wrap font-bold text-lg">
          Current capability <help-bubble tooltip="Your current role NSW Capability requirements. These are based on the NSW Capability Framework." />
        </div>
      </td>
      <td class="lg:w-1/2 p-4 lg:p-8">
        <div class="flex items-center whitespace-no-wrap font-bold text-lg">
          Target capability <help-bubble tooltip="Your target role NSW Capability requirements. These are based on the NSW Capability Framework." />
        </div>
      </td>
    </tr>
    <tr v-for="(capability, index) in capabilitiesMatrix" :key="`capability-${index}`">
      <comparison-row :current-role="currentRole" :target-role="targetRole" :item="capability.current" type="capability" @skillClicked="showCapabilityModal" />
      <comparison-row :current-role="currentRole" :target-role="targetRole" :item="capability.target" type="capability" instructions @skillClicked="showCapabilityModal" />
    </tr>
    <modal-skill
      :show="modals.skill"
      :selected-skill="selectedSkill"
      :current-role="currentRole"
      :target-role="targetRole"
      max-width="3xl"
      :journey="modalJourney"
      @close="modals.skill = false"
    />
    <modal-capability
      :show="modals.capability"
      :selected-capability="selectedCapability"
      :current-role="currentRole"
      :target-role="targetRole"
      :journey="modalJourney"
      max-width="3xl"
      @close="modals.capability = false"
    />
  </tbody>
</template>

<script>
import ModalSkill from '@/components/pathway/results/ModalSkill'
import ModalCapability from '@/components/pathway/results/ModalCapability'
import ComparisonRow from '@/components/pathway/results/ComparisonRow'

export default {
  components: {
    ModalSkill,
    ModalCapability,
    ComparisonRow
  },
  props: {
    currentRole: {
      type: Object,
      required: true
    },
    targetRole: {
      type: [Object, Boolean],
      required: true
    }
  },
  data () {
    return {
      selectedSkill: false,
      selectedCapability: false,
      modalJourney: false,
      modals: {
        skill: false,
        capability: false
      }
    }
  },
  computed: {
    skills () {
      return this.$store.state.skills
    },
    capabilities () {
      return this.$store.state.capabilities
    },
    skillsMatrix () {
      // Start with skills from current role
      const skillCodes = this.$collect(this.currentRole.skills.focus).pluck('code').all()

      // Add skills from target role if they exist, without adding duplicates
      if (this.targetRole.skills?.focus) {
        this.$collect(this.targetRole.skills.focus)
          .pluck('code')
          .each(code => {
            if (!skillCodes.includes(code)) {
              skillCodes.push(code)
            }
          })
      }

      // Loop through final array and add role data and level to each
      const matrix = []

      skillCodes.forEach(skill => {
        matrix.push({
          current: this.isSkillRequiredByRole(this.currentRole, skill),
          target: this.targetRole.skills?.focus ? this.isSkillRequiredByRole(this.targetRole, skill) : false
        })
      })

      // Filter into groups
      const currentSkillsOnly = this.$collect(matrix).filter(skill => {
        return skill.current && !skill.target
      }).all()

      const overlappingSkills = this.$collect(matrix).filter(skill => {
        return skill.current && skill.target
      }).all()

      const targetSkillsOnly = this.$collect(matrix).filter(skill => {
        return !skill.current && skill.target
      }).all()

      return [...currentSkillsOnly, ...overlappingSkills, ...targetSkillsOnly]
    },
    capabilitiesMatrix () {
      // Start with skills from current role
      const capabilityCodes = this.$collect(this.currentRole.capabilities.focus).pluck('code').all()

      // Add skills from target role if they exist, without adding duplicates
      if (this.targetRole.capabilities?.focus) {
        this.$collect(this.targetRole.capabilities.focus)
          .pluck('code')
          .each(code => {
            if (!capabilityCodes.includes(code)) {
              capabilityCodes.push(code)
            }
          })
      }

      // Loop through final array and add role data and level to each
      const matrix = []

      capabilityCodes.forEach(capability => {
        matrix.push({
          current: this.isCapabilityRequiredByRole(this.currentRole, capability),
          target: this.targetRole.capabilities?.focus ? this.isCapabilityRequiredByRole(this.targetRole, capability) : false
        })
      })

      // Filter into groups
      const currentSkillsOnly = this.$collect(matrix).filter(skill => {
        return skill.current && !skill.target
      }).all()

      const overlappingSkills = this.$collect(matrix).filter(skill => {
        return skill.current && skill.target
      }).all()

      const targetSkillsOnly = this.$collect(matrix).filter(skill => {
        return !skill.current && skill.target
      }).all()

      return [...currentSkillsOnly, ...overlappingSkills, ...targetSkillsOnly]
    }
  },
  methods: {
    showSkillModal (modal) {
      this.selectedSkill = this.getSkillByCode(modal.skill)
      // Track in GA
      this.$ga.event({
        eventCategory: 'Skill',
        eventAction: 'Open modal',
        eventLabel: this.selectedSkill.name
      })
      this.modalJourney = modal.journey
      this.modals.skill = true
    },

    showCapabilityModal (modal) {
      this.selectedCapability = this.getCapabilityByCode(modal.skill)
      this.$ga.event({
        eventCategory: 'Capability',
        eventAction: 'Open modal',
        eventLabel: this.selectedCapability.name
      })
      this.modalJourney = modal.journey
      this.modals.capability = true
    },

    getSkillByCode (code) {
      return this.$collect(this.skills).where('code', code).first()
    },

    isSkillRequiredByRole (role, skillCode) {
      const skillRequired = this.$collect(role.skills.focus).where('code', skillCode).first()

      if (!skillRequired) {
        return false
      }

      const skill = this.getSkillByCode(skillRequired.code)

      return {
        name: skill.name,
        code: skill.code,
        level: skillRequired.level
      }
    },

    getCapabilityByCode (code) {
      return this.$collect(this.capabilities).where('subcode', code).first()
    },

    isCapabilityRequiredByRole (role, capabilityCode) {
      const capabilityRequired = this.$collect(role.capabilities.focus).where('code', capabilityCode).first()

      if (!capabilityRequired) {
        return false
      }

      const capability = this.getCapabilityByCode(capabilityRequired.code)

      return {
        name: capability.subcategory,
        code: capability.subcode,
        level: capabilityRequired.level
      }
    }
  }
}
</script>

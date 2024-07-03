<template>
  <div class="flex flex-col pb-8 border-b border-gray-300 w-full">
    <div class="flex flex-row min-w[550px]" v-if="skillsMatrix.length > 0">
      <div class="w-1/2 p-4 border-r border-gray-300 flex-grow">
        <p class="whitespace-no-wrap font-bold text-lg">Current role skills</p>
        <p class="text-sm">Based on the NSWPF Skills and Capability Set</p>
      </div>
      <div class="w-1/2 p-4 flex-grow">
        <p class="flex items-center whitespace-no-wrap font-bold text-lg">
          Target role skills
        </p>
        <p class="text-sm">Based on the NSWPF Skills and Capability Set</p>
      </div>
    </div>
    <div
      v-for="(skill, index) in skillsMatrix"
      :key="`skill-${index}`"
      class="flex flex-row min-w[550px]"
    >
      <div class="border-r border-gray-300 w-1/2 px-4 flex-grow">
        <comparison-row
          :current-role="currentRole"
          :target-role="targetRole"
          :item="skill.current"
          :full-width="true"
          :max-width="maxWidth"
          type="skill"
          instructions="selfAssessed"
          current-instructions
          role-type="current"
          @skillClicked="showSkillModal"
        />
      </div>

      <div class="w-1/2 px-4 flex-grow">
        <comparison-row
          :current-role="currentRole"
          :target-role="targetRole"
          :item="skill.target"
          :full-width="true"
          type="skill"
          instructions="selfAssessed"
          role-type="target"
          @skillClicked="showSkillModal"
        />
      </div>
    </div>
    <div class="flex flex-row min-w[550px]" v-if="capabilitiesMatrix.length > 0">
      <div class="w-1/2 p-4 pt-8 border-r border-gray-300 flex-grow">
        <p class="flex items-center whitespace-no-wrap font-bold text-lg">
          Current role capabilities
        </p>
        <p class="text-sm">Based on the NSW Government Capability Framework</p>
      </div>
      <div class="w-1/2 p-4  pt-8 flex-grow">
        <p class="flex items-center whitespace-no-wrap font-bold text-lg">
          Target role capabilities
        </p>
        <p class="text-sm">Based on the NSW Government Capability Framework</p>
      </div>
    </div>
    <div
      v-for="(capability, index) in capabilitiesMatrix"
      :key="`capability-${index}`"
      class="flex flex-row min-w[550px]"
    >
      <div class="border-r border-gray-300 w-1/2 px-4 flex-grow">
        <comparison-row
          :current-role="currentRole"
          :target-role="targetRole"
          :item="capability.current"
          :full-width="true"
          type="capability"
          instructions="selfAssessed"
          role-type="current"
          @skillClicked="showCapabilityModal"
        />
      </div>
      <div class="w-1/2 px-4 flex-grow">
        <comparison-row
          :current-role="currentRole"
          :target-role="targetRole"
          :item="capability.target"
          :full-width="true"
          type="capability"
          instructions="selfAssessed"
          role-type="target"
          @skillClicked="showCapabilityModal"
        />
      </div>
    </div>
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
  </div>
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
  data() {
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
    skills() {
      return this.$store.state.skills
    },
    capabilities() {
      return this.$store.state.capabilities
    },
    skillsMatrix() {
      // Start with skills from current role
      const skillCodes = this.$collect(this.currentRole.skills.focus)
        .pluck('code')
        .all()

      // Add skills from target role if they exist, without adding duplicates
      if (this.targetRole.skills?.focus) {
        this.$collect(this.targetRole.skills.focus)
          .pluck('code')
          .each((code) => {
            if (!skillCodes.includes(code)) {
              skillCodes.push(code)
            }
          })
      }

      // Loop through final array and add role data and level to each
      const matrix = []

      skillCodes.forEach((skill) => {
        matrix.push({
          current: this.isSkillRequiredByRole(this.currentRole, skill),
          target: this.targetRole.skills?.focus
            ? this.isSkillRequiredByRole(this.targetRole, skill)
            : false
        })
      })

      // Filter into groups
      const currentSkillsOnly = this.$collect(matrix)
        .filter((skill) => {
          return skill.current && !skill.target
        })
        .all()

      const overlappingSkills = this.$collect(matrix)
        .filter((skill) => {
          return skill.current && skill.target
        })
        .all()

      const targetSkillsOnly = this.$collect(matrix)
        .filter((skill) => {
          return !skill.current && skill.target
        })
        .all()

      return [...currentSkillsOnly, ...overlappingSkills, ...targetSkillsOnly]
    },
    capabilitiesMatrix() {
      // Start with skills from current role
      const capabilityCodes = this.$collect(this.currentRole.capabilities.focus)
        .pluck('code')
        .all()

      // Add skills from target role if they exist, without adding duplicates
      if (this.targetRole.capabilities?.focus) {
        this.$collect(this.targetRole.capabilities.focus)
          .pluck('code')
          .each((code) => {
            if (!capabilityCodes.includes(code)) {
              capabilityCodes.push(code)
            }
          })
      }

      // Loop through final array and add role data and level to each
      const matrix = []

      capabilityCodes.forEach((capability) => {
        matrix.push({
          current: this.isCapabilityRequiredByRole(
            this.currentRole,
            capability
          ),
          target: this.targetRole.capabilities?.focus
            ? this.isCapabilityRequiredByRole(this.targetRole, capability)
            : false
        })
      })

      // Filter into groups
      const currentSkillsOnly = this.$collect(matrix)
        .filter((skill) => {
          return skill.current && !skill.target
        })
        .all()

      const overlappingSkills = this.$collect(matrix)
        .filter((skill) => {
          return skill.current && skill.target
        })
        .all()

      const targetSkillsOnly = this.$collect(matrix)
        .filter((skill) => {
          return !skill.current && skill.target
        })
        .all()

      return [...currentSkillsOnly, ...overlappingSkills, ...targetSkillsOnly]
    }
  },
  methods: {
    showSkillModal(modal) {
      this.selectedSkill = this.getSkillByCode(modal.skill)
      this.modalJourney = modal.journey
      this.modals.skill = true
    },

    showCapabilityModal(modal) {
      this.selectedCapability = this.getCapabilityByCode(modal.skill)
      this.modalJourney = modal.journey
      this.modals.capability = true
    },

    getSkillByCode(code) {
      return this.$collect(this.skills).where('code', code).first()
    },

    isSkillRequiredByRole(role, skillCode) {
      const skillRequired = this.$collect(role.skills.focus)
        .where('code', skillCode)
        .first()

      if (!skillRequired) {
        return false
      }

      const skill = this.getSkillByCode(skillRequired.code)

      if (!skill) {
        console.warn(`Unable to find matching skill: ${skillRequired.code}`)
        return false
      }

      return {
        name: skill.name,
        code: skill.code,
        level: skillRequired.level
      }
    },

    getCapabilityByCode(code) {
      return this.$collect(this.capabilities).where('subcode', code).first()
    },

    isCapabilityRequiredByRole(role, capabilityCode) {
      const capabilityRequired = this.$collect(role.capabilities.focus)
        .where('code', capabilityCode)
        .first()

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

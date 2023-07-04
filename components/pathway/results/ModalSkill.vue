<template>
  <base-modal :show="show" :max-width="maxWidth" :title="selectedSkill.category" :closeable="closeable" @close="$emit('close')">
    <div class="leading-relaxed">
      <div>
        <div class="mb-6">
          <h4 class="font-bold mb-4">
            Skill description
          </h4>
          <p>{{ selectedSkill.description }}</p>
        </div>
        <div class="mb-12">
          <h4 class="text-lg font-bold mb-4">
            Skill level
          </h4>
          <div class="flex flex-col md:flex-row">
            <div class="mb-4 md:mb-0 md:mr-12">
              <h5 class="font-bold mb-3">
                You assessed
              </h5>
              <information-badge v-if="accessedLevel !== false " size="xs">
                Level {{ accessedLevel }}
              </information-badge>
              <div v-else class="italic text-nsw-grey-600">
                N/A
              </div>
            </div>
            <div class="mb-4 md:mb-0 md:mr-12">
              <h5 class="font-bold mb-3">
                Your current role
              </h5>
              <information-badge v-if="currentRoleLevel" size="xs">
                Level {{ currentRoleLevel.level }}
              </information-badge>
              <div v-else class="italic text-nsw-grey-600">
                N/A
              </div>
            </div>
            <div class="md:mr-12">
              <h5 class="font-bold mb-3">
                Target role
              </h5>
              <div class="flex space-x-3">
                <information-badge v-if="targetRoleLevel" size="xs">
                  Level {{ targetRoleLevel.level }}
                </information-badge>
                <div v-else class="italic text-nsw-grey-600">
                  Not currently known
                </div>
                <information-badge v-if="journey" size="xs" :colour="journey.colour" :tooltip="journey.tooltip">
                  {{ journey.text }}
                </information-badge>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedLevel !== false">
          <div class="border-b-2 border-nsw-grey-200 flex overflow-x-scroll">
            <panel-tab
              v-for="level in selectedSkill.levels"
              :key="level.level" :name="level.level"
              :selected="tabs.level"
              @click.native="tabs.level = level.level"
            >
              Level {{ level.level }}
            </panel-tab>
          </div>
          <div class="pt-6">
            <h5 class="font-bold mb-4">
              {{ selectedLevel.name }}
            </h5>
            <p class="mb-4">
              {{ selectedLevel.easyDescription }}
            </p>
            <ul class="list-disc pl-4 w-11/12">
              <li v-for="(attribute, index) in selectedLevel.attributes" :key="index" class="mb-2">
                {{ attribute }}.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </base-modal>
</template>

<script>
import skills from '@/data/skills.json'
import PanelTab from '@/components/pathway/results/PanelTab'
import BaseModal from '@/components/BaseModal'

export default {
  components: {
    PanelTab,
    BaseModal
  },
  props: {
    selectedSkill: {
      type: [Object, Boolean],
      required: true
    },
    currentRole: {
      type: Object,
      required: true
    },
    targetRole: {
      type: [Object, Boolean],
      required: true
    },
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '2xl'
    },
    closeable: {
      type: Boolean,
      default: true
    },
    journey: {
      type: [Object, Boolean],
      required: true
    }
  },
  data() {
    return {
      skills,
      tabs: {
        level: false
      }
    }
  },
  computed: {
    assessedSkills() {
      return this.$store.state.pathway.answers.skills
    },
    assessedCapabilities() {
      return this.$store.state.pathway.answers.capabilities
    },
    selectedLevel() {
      if (this.tabs.level === false) {
        return false
      }
      return this.selectedSkill.levels.find(level => level.level === this.tabs.level)
    },
    accessedLevel() {
      return this.selectedSkill.code in this.assessedSkills ? this.assessedSkills[this.selectedSkill.code].value : false
    },
    currentRoleLevel() {
      return this.$collect(this.currentRole.skills.focus).where('code', this.selectedSkill.code).first()
    },
    targetRoleLevel() {
      if (!this.targetRole) {
        return false
      }
      return this.$collect(this.targetRole.skills.focus).where('code', this.selectedSkill.code).first()
    }
  },
  watch: {
    selectedSkill: {
      immediate: true,
      handler(newSkill) {
        this.tabs.level = newSkill.levels?.[0].level ?? false
      }
    }
  },
  mounted() {
    this.$ga.event({
      eventCategory: 'Pathway Results',
      eventAction: 'Skill Modal Opened',
      eventLabel: this.selectedSkill.code
    })
  }
}
</script>

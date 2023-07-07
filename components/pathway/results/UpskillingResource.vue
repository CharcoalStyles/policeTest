<template>
  <div class="flex flex-col cursor-pointer">
    <div class="h-1 bg-nsw-brand-primary-blue w-full rounded-t-lg"></div>
    <div
      class="px-4 py-6 sm:px-8 sm:py-8 border-l border-l-nsw-grey-200 border-r border-r-nsw-grey-200 border-b border-b-nsw-grey-200 hover:border-nsw-grey-400 rounded-b-lg"
      style="flex-grow: 1"
    >
      <div class="w-full text-sm font-semibold">
        {{ resource.author }}
      </div>
      <div class="flex mb-4">
        <div class="flex-grow text-sm pr-4">
          {{ formats }} &bull; {{ duration }}
        </div>
        <div class="text-right text-sm">
          {{ cost }}
        </div>
      </div>
      <div class="w-full text-sm font-bold text-xl mb-4">
        {{ resource.title }}
      </div>
      <div v-if="capabilities" class="mb-2 flex flex-wrap">
        <information-badge
          v-for="item in capabilities"
          :key="item.name"
          size="xs"
          class="mr-2 mb-2"
          colour="gray"
        >
          {{ item.name }}
        </information-badge>
      </div>
      <div class="w-full">
        <v-clamp
          v-if="resource.description"
          tag="p"
          autoresize
          :max-lines="5"
          class="mb-8"
        >
          {{ resource.description }}
          <template #after="{ clamped, toggle, expanded }">
            <button
              v-if="clamped"
              class="block text-nsw-brand-primary-blue underline mt-2"
              @click="
                ($event) => {
                  $event.stopPropagation()
                  toggle()
                }
              "
            >
              Read more
            </button>
            <button
              v-if="expanded"
              class="block text-nsw-brand-primary-blue underline mt-2"
              @click="
                ($event) => {
                  $event.stopPropagation()
                  toggle()
                }
              "
            >
              Read less
            </button>
          </template>
        </v-clamp>
      </div>
      <div class="w-full flex mt-8 items-center justify-between">
        <div class="flex space-x-2">
          <information-badge
            v-for="level in resource.targetLevel"
            :key="level"
            size="xs"
            colour="blue-outline"
          >
            {{ level }}
          </information-badge>
          <information-badge
            v-if="resource.default"
            size="xs"
            colour="blue-outline"
          >
            Recommended
          </information-badge>
        </div>
        <img src="/icons/link.svg" alt="Link icon" class="w-6" />
      </div>
    </div>
  </div>
</template>

<script>
import skillMatch from '@/mixins/skillMatch'
import InformationBadge from '@/components/InformationBadge'
import capabilityNamesMap from '@/data/capabilityNamesMap.json'
import VClamp from 'vue-clamp'

export default {
  components: {
    InformationBadge,
    VClamp
  },
  mixins: [skillMatch],
  props: {
    resource: {
      type: Object,
      required: true
    },
    targetRoleCapabilities: {
      type: Array,
      default: () => []
    },
    targetRoleSkills: {
      type: Array,
      default: () => []
    },
    showAllSkills: {
      type: Boolean,
      default: false
    },
    skillsAndCapabilitiesLevelMap: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      modal: false
    }
  },
  computed: {
    capabilities() {
      if (this.showAllSkills && (this.resource.skills || this.resource.capabilities)) {
        return this.$collect(this.resource.skills)
          .merge(this.resource.capabilities)
          .map((item) => ({ name: capabilityNamesMap[item.code], level: item.level }))
          .unique('name')
          .all()
      }
      if (this.targetRoleCapabilities.length <= 0 || !this.resource.skills) {
        return false
      }

      return this.$collect(this.resource.skills)
        .merge(this.resource.capabilities)
        .filter(({ code }) => this.targetRoleCapabilities.includes(code))
        .filter(({ code, level }) => {
          if (Object.keys(this.skillsAndCapabilitiesLevelMap).length === 0 && this.skillsAndCapabilitiesLevelMap.constructor === Object) {
            return true
          }
          if (this.isNewSkill({ code, level }) || this.isUpskill({ code, level })) {
            return true
          }
          return false
        })
        .map((item) => ({ name: capabilityNamesMap[item.code], level: item.level }))
        .unique('name')
        .all()
    },
    clampText() {
      return this.expanded ? 'Read less' : 'Read more'
    },
    cost() {
      if (isNaN(this.resource.cost)) {
        return this.resource.cost
      }
      if (this.resource.cost === '0') {
        return 'FREE'
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(this.resource.cost)
    },
    duration() {
      if (this.resource.duration < 0.5) {
        return 'Less than 30 mins'
      }
      if (this.resource.duration < 1) {
        return '30 - 60 mins'
      }
      const duration = Math.round(this.resource.duration * 2) / 2
      return `${new Intl.NumberFormat('en-US').format(duration)} hrs`
    },
    formats() {
      return this.resource.format.toString()
    }
  }
}
</script>

<template>
  <base-modal :show="show" :max-width="maxWidth" title="Role Explorer" :closeable="true" :scrollable="false" @close="$emit('close')">
    <div class="flex flex-col items-center justify-center">
      <img :src="panelImage" :alt="currentPanel.alt" class="mb-6">
      <h2 class="font-bold text-lg mb-2">
        {{ currentPanel.title }}
      </h2>
      <p class="text-center">
        {{ currentPanel.text }}
      </p>
    </div>
    <template #footer>
      <div>
        <transition name="fade">
          <nsw-button v-if="!isFirstPanel" action="secondary" @click.native="pagePanelPrevious">
            Back
          </nsw-button>
        </transition>
      </div>
      <div>
        <nsw-button @click.native="nextButtonAction">
          {{ nextButtonText }}
        </nsw-button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal'

export default {
  components: {
    BaseModal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '2xl'
    }
  },
  data() {
    return {
      panels: [
        {
          title: 'Explore roles',
          text: 'Search via keywords, skills and salary to understand where roles sit inside the NSW Police Force.',
          alt: 'Graphic showing a magnifying glass near some cards representing job roles.'
        },
        {
          title: 'Understand the relationships between roles',
          text: 'See how one role relates to another based on skills, grade, salary and role functions.',
          alt: 'Graphic showing arrows between some cards representing job roles.'
        },
        {
          title: 'Take action toward desired role',
          text: 'Once you find a role of interest, use the Pathways tool to get a personalised action plan.',
          alt: 'Graphic showing a card representing a job role being moved.'
        }
      ],
      panel: 0
    }
  },
  computed: {
    nextButtonText() {
      return this.isLastPanel ? 'Explore roles' : 'Next'
    },
    currentPanel() {
      return this.panels[this.panel]
    },
    panelImage() {
      return `/onboarding-${this.panel}.svg`
    },
    isFirstPanel() {
      return this.panel === 0
    },
    isLastPanel() {
      return this.panel === 2
    }
  },
  methods: {
    pagePanelNext() {
      this.panel++
    },
    pagePanelPrevious() {
      this.panel--
    },
    nextButtonAction() {
      this.isLastPanel ? this.$emit('close') : this.pagePanelNext()
    }
  }
}
</script>

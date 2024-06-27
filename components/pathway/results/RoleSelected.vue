<template>
  <div class="p-4 lg:p-8">
    <information-badge class="mb-4 font-bold" :colour="pillColour" rounded="md">
      <p class="px-2">Your {{ type }} role</p>
    </information-badge>
    <h3 class="font-bold text-xl mb-4">
      {{ role.name }}
    </h3>
    <div class="flex flex-col flex-wrap gap-3 lg:flex-row mb-6">
      <information-badge v-if="role.grade" class="rounded-full" size="sm">
        {{ role.grade }}
      </information-badge>
      <information-badge
        v-if="role.salary.min && role.salary.max"
        class="rounded-full"
        size="sm"
      >
        {{ $currency(role.salary.min) }} -
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
    <p class="w-full lg:w-5/6 mb-6">
      {{ role.description }}
    </p>
    <div v-if="role.fullDescription" class="w-fit">
      <a
        :href="role.fullDescription"
        target="_blank"
        class="flex flex-row flex-wrap gap-1 underline text-sm text-nsw-brand-primary-blue mb-6 fold-links"
      >
        <img src="/icons/pages.svg" alt="Link icon" />
        <p>Role Description</p>
        <div class="basis-full h-0"></div>
      </a>
    </div>
    <div class="mb-4">
      <essential-requirements-icon :role="role" size="lg" />
    </div>
    <div v-if="essentialRequirements != ''">
      <div class="flex flex-row gap-2 mb-2">
        <img src="/icons/essential.svg" alt="Link icon" />
        <p class="font-bold text-nsw-brand-primary-blue">
          Essential Requirements
        </p>
      </div>
      <ul class="list-disc ml-5">
        <li v-for="er in essentialRequirements" :key="er" class="text-sm mb-2">
          {{ er }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import InformationBadge from '@/components/InformationBadge'
import EssentialRequirementsIcon from '~/components/EssentialRequirementsIcon.vue'

export default {
  components: {
    InformationBadge,
    EssentialRequirementsIcon
  },
  props: {
    role: {
      type: Object,
      required: true
    },
    roles: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'current'
    }
  },
  computed: {
    pillColour() {
      return this.type === 'current' ? 'nsw-brand-primary-blue-light' : 'green'
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
  }
}
</script>

<style scoped>
@media print {
  .fold-links::after {
    content: '(' attr(href) ')';
    word-break: break-all;
  }
}
</style>

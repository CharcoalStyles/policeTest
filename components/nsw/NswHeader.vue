<template>
  <div class="z-20">
    <div class="bg-nsw-brand-primary-blue py-2">
      <div class="container">
        <nuxt-link to="/" class="no-print-link flex flex-row gap-2">
          <img src="/icons/careerPathfinder.svg" />
          <h1 class="text-white">CAREER PATHFINDER</h1>
        </nuxt-link>
      </div>
    </div>
    <div class="xl:container bg-white py-5">
      <header class="px-6 flex gap-10">
        <img
          src="/police-force-logo.svg"
          alt="Logo for NSW Police Force"
          title="NSW Police Force"
          height="76"
        />
        <div class="">
          <img
            src="/logo.svg"
            alt="Logo for NSW Government"
            title="NSW Police Force"
            height="76"
          />
        </div>
      </header>
    </div>
    <nswpf-beta v-if="betaBanner" />
  </div>
</template>

<script>
import nswpfBeta from '../nswpfBeta.vue'
export default {
  components: { nswpfBeta },
  props: {
    betaBanner: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.no-print-link::after {
  content: none;
}
</style>

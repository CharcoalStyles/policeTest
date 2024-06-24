<template>
  <div class="z-20 ">
    <div class="bg-nsw-brand-primary-blue py-4">
      <div class="flex flex-row gap-2 xl:container pl-6">
        <img src="/icons/careerPathfinder.svg" />
        <h1 class="font-bold text-white">CAREER PATHFINDER</h1>
      </div>
    </div>
    <div class="xl:container bg-white py-5">
      <header class="px-6 flex gap-10">
        <nuxt-link to="/" class="no-print-link">
          <img
            src="/police-force-logo.svg"
            alt="Logo for NSW Police Force"
            title="NSW Police Force"
            height="76"
          />
        </nuxt-link>
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

    <!-- <div class="xl:container flex flex-row bg-nsw-grey-200 px-6 pt-8 gap-2">
      <div class="bg-nsw-brand-primary-blue font-bold text-white w-12 text-center">
        Beta
      </div>
      <div class="text-nsw-brand-primary-blue">This is a <span class="underline">new service</span> - your <span class="underline">feedback</span> will help us improve it.</div>
    </div> -->
  </div>
</template>

<script>
export default {
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

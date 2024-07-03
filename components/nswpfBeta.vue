<template>
  <div
    class="flex items-center flex-row gap-4 z-20 bg-white pl-2 p-2"
  >
    <div
      class="bg-nsw-brand-primary-blue font-bold max-w-14 text-white text-center rounded px-2 py-1 flex-grow"
    >
      Beta
    </div>
    <div class="flex-shrink text-sm md:text-base">
      <div class="text-nsw-brand-primary-blue">
        This is a new service - your
        <span class="underline cursor-pointer" @click="showModal"
          >feedback</span
        >
        will help us improve it.
      </div>
      <BaseModal
        :show="show"
        title="NSWPF Career Pathfinder"
        max-width="xl"
        :closeable="true"
        :fit-content="true"
        @close="show = false"
      >
        <div class="mt-7 mb-5 mx-2">
          <p class="mb-2">
            The NSWPF Career Pathfinder launched in mid-2024 with the goal of
            empowering employees to make informed career decisions.
          </p>
          <p class="mb-8">
            There are over 1300 roles across 60+ career pathways and this tool
            has been built to allow you to explore career pathways that are best
            suited to you.
          </p>
          <p class="font-bold">Contact us</p>
          <p>
            For feedback or more information on this tool, career coaching or
            career pathways please contact #PCC-Careers.
          </p>
          <a href="mailto:pcc-careers@police.nsw.gov.au" class="underline"
            >pcc-careers@police.nsw.gov.au</a
          >
        </div>
      </BaseModal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    showModal() {
      this.show = true
    }
  }
}
</script>

<style></style>

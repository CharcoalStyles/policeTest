<template>
  <div>
    <Nuxt />
    <portal-target name="modal" multiple />
  </div>
</template>

<script>
export default {
  async mounted() {
    await Promise.all([
      this.$store.dispatch('loadRoles'),
      this.$store.dispatch('loadSkills'),
      this.$store.dispatch('loadCapabilities')
    ])
  }
}
</script>

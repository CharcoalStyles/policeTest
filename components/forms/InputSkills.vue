<template>
  <div>
    <div v-for="skill in sortedSkills" :key="skill.code">
      <input :id="skill.code" v-model="values" class="nsw-form-checkbox__input" type="checkbox" :value="skill.code" @change="$emit('input', values)">
      <label class="nsw-form-checkbox__label" :for="skill.code">{{ skill.name }}</label>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    roles: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      values: []
    }
  },
  computed: {
    sortedSkills() {
      return this.$collect(this.$store.state.skills)
        .map(item => ({
          name: item.name,
          code: item.code
        }))
        .sortBy('name')
        .all()
    }
  },
  watch: {
    value() {
      this.values = this.value
    }
  },
  mounted() {
    this.values = this.value
  },
  methods: {
    checkSkillExists(code) {
      return this.checkedSkills.includes(code)
    }
  }
}
</script>

<template>
  <div>
    <div v-for="(subcategory, index) in groupedSkills" :key="index" class="nsw-form-checkbox mb-10">
      <h4 class="mb-6 font-bold">
        {{ subcategory.name }}
      </h4>
      <div v-for="skill in subcategory.skills" :key="skill.code">
        <input :id="skill.code" v-model="values" class="nsw-form-checkbox__input" type="checkbox" :value="skill.code" @change="$emit('input', values)">
        <label class="nsw-form-checkbox__label" :for="skill.code">{{ skill.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import skills from '@/data/skills.json'

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
  data () {
    return {
      skills,
      values: []
    }
  },
  computed: {
    // Group the skills by subcategory
    groupedSkills () {
      return this.$collect(this.skills)
        .groupBy('subcategory')
        .keys()
        .map(key => ({
          name: key,
          skills: this.$collect(this.skills)
            .where('subcategory', key)
            .sortByDesc('name')
            .all()
        }))
        .sortByDesc('subcategory')
        .all()
    }
  },
  watch: {
    value () {
      this.values = this.value
    }
  },
  mounted () {
    this.values = this.value
  },
  methods: {
    checkSkillExists (code) {
      return this.checkedSkills.includes(code)
    }
  }
}
</script>

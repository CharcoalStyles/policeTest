<template>
  <pre>{{ filteredRoles }}</pre>
</template>

<script>
import roles from '@/data/roles.json'

export default {
  layout: 'blank',
  data() {
    return {
      roles
    }
  },
  computed: {
    filteredRoles() {
      return this.roles.map(role => ({
        ...role
        // salary: this.parseSalaryRange(role.salary),
        // demand: this.parseDemand(role.demand)
      }))
    }
  },
  methods: {
    parseSalaryRange(string) {
      return ''
      // const salary = string.replace('$', '').replace('k', '').split('-')
      // return {
      //   min: parseInt(salary[0] * 1000),
      //   max: parseInt(salary[1] * 1000)
      // }
    },
    parseDemand(demand) {
      return 'High'
    }
  }
}
</script>

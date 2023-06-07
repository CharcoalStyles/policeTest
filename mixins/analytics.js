import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getHumanReadableAnswerValue'
    ])
  },
  methods: {
    logAnswersToGoogleAnalytics() {
      // Question flow: Current NSW govt employee or not
      this.$ga.event({
        eventCategory: 'Pathway Answers',
        eventAction: 'Government Employee',
        eventLabel: this.getHumanReadableAnswerValue('work-gov')
      })

      // Question flow: Are you more interested in being an individual contributor or a manager?
      this.$ga.event({
        eventCategory: 'Pathway Answers',
        eventAction: 'Manager or Contributor',
        eventLabel: this.getHumanReadableAnswerValue('management')
      })

      // Question flow, Q21 - How many & which areas of interest are selected. "What discipline areas of digital are you interested in?"
      this.$ga.event({
        eventCategory: 'Pathway Answers',
        eventAction: 'Discipline Areas Selected',
        eventLabel: this.$store.state.pathway.disciplines.value.length.toString()
      })

      // Question flow, Q23 - How many and which items items are selected for choosing a new role. "What matters to you when choosing a new role?"
      this.$ga.event({
        eventCategory: 'Pathway Answers',
        eventAction: 'Role Priorities Selected',
        eventLabel: this.$store.state.pathway.priorities.value.length.toString()
      })

      // Question flow, Q23 - How many and which items items are selected for choosing a new role. "What matters to you when choosing a new role?"
      this.$ga.event({
        eventCategory: 'Pathway Answers',
        eventAction: 'Learning Preferences Selected',
        eventLabel: this.$store.state.pathway.learning.value.length.toString()
      })
    }
  }
}

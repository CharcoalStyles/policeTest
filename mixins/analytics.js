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
    }
  }
}

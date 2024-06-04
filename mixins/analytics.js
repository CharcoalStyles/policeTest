import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getHumanReadableAnswerValue'])
  },
  methods: {
    logAnswersToGoogleAnalytics() {
      // Question flow: Current NSW govt employee or not
      // window.dataLayer.push({
      //   event: 'government_employee',
      //   category: 'pathway_answers',
      //   label: this.getHumanReadableAnswerValue('work-gov')
      // })

      // Question flow: Are you more interested in being an individual contributor or a manager?
      // window.dataLayer.push({
      //   event: 'manager_or_ontributor',
      //   category: 'pathway_answers',
      //   label: this.getHumanReadableAnswerValue('management')
      // })
    }
  }
}

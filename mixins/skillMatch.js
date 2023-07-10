export default {
  methods: {
    // Pass in resource code and resource level
    isNewSkill({ code, level }) {
      // Current role does not include code
      // Target role does include level (which is a number)
      // Resource level is equal to the target role level
      return this.skillsAndCapabilitiesLevelMap?.current?.[code] === undefined &&
        typeof this.skillsAndCapabilitiesLevelMap?.target?.[code] === 'number' &&
        parseInt(level) === this.skillsAndCapabilitiesLevelMap?.target?.[code]
    },

    // Pass in resource code and resource level
    isUpskill({ code, level }) {
      // Target role includes CODE
      // Current role includes CODE
      // Resource level is equal to the target role level
      // Resource level is greater than the self-assessed level
      // The self-assessed level is less than the target level
      return this.skillsAndCapabilitiesLevelMap?.target?.[code] &&
      this.skillsAndCapabilitiesLevelMap?.current?.[code] &&
        parseInt(level) === this.skillsAndCapabilitiesLevelMap?.target?.[code] &&
        parseInt(level) > this.skillsAndCapabilitiesLevelMap?.assessed?.[code] &&
        this.skillsAndCapabilitiesLevelMap?.assessed?.[code] < this.skillsAndCapabilitiesLevelMap?.target?.[code]
    }
  }
}

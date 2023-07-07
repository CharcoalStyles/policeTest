export default {
  methods: {
    // Pass in resource code and resource level
    isNewSkill({ code, level }) {
      // Current role does not include code
      // Target role does include level (which is a number)
      // Resource level is greater than assessed level
      // Resource level is less than OR equal to target level
      return this.skillsAndCapabilitiesLevelMap?.current?.[code] === undefined &&
        typeof this.skillsAndCapabilitiesLevelMap?.target?.[code] === 'number' &&
        parseInt(level) >= this.skillsAndCapabilitiesLevelMap?.assessed?.[code] &&
        parseInt(level) <= this.skillsAndCapabilitiesLevelMap?.target?.[code]
    },

    // Pass in resource code and resource level
    isUpskill({ code, level }) {
      // Target role includes CODE
      // Current role includes CODE
      // Resource LEVEL is greater than OR equal to target role LEVEL
      // Resource LEVEL is less than OR equal to target LEVEL
      // Resource LEVEL is greater than assessed LEVEL
      return this.skillsAndCapabilitiesLevelMap?.target?.[code] &&
      this.skillsAndCapabilitiesLevelMap?.current?.[code] &&
        parseInt(level) >= this.skillsAndCapabilitiesLevelMap?.target?.[code] &&
        parseInt(level) > this.skillsAndCapabilitiesLevelMap?.assessed?.[code] &&
        parseInt(level) <= this.skillsAndCapabilitiesLevelMap?.target?.[code] &&
        this.skillsAndCapabilitiesLevelMap?.assessed?.[code] < this.skillsAndCapabilitiesLevelMap?.target?.[code]
    }
  }
}

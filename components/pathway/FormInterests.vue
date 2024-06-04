<template>
  <div>
    <div class="nsw-forms -mt-4">
      <div class="nsw-form-group">
        <fieldset class="nsw-form-fieldset">
          <legend class="sr-only">
            {{ step.title }}
          </legend>
          <div class="nsw-form-radio">
            <div class="flex flex-col">
              <p class="font-bold">Your selections:</p>
              <div
                class="flex flex-row items-center justify-center border border-nsw-brand-primary-blue rounded-xl text-center h-28"
              >
                <p v-if="answer.length === 0" class="text-nsw-grey-700">
                  Select a maximum of three interest areas
                </p>
                <div
                  v-else
                  class="w-full flex flex-row items-center gap-2 justify-around"
                >
                  <div
                    v-for="jobFunction in answer"
                    :key="jobFunction"
                    class="flex flex-row justify-between items-center border border-nsw-brand-primary-blue rounded-md"
                  >
                    <div class="px-2 py-1">
                      <p class="text-sm">{{ jobFunction }}</p>
                    </div>
                    <div
                      class="bg-nsw-brand-primary-blue p-2"
                      @click="remove(jobFunction)"
                    >
                      <img src="/close-white.svg" class="h-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col flex-wrap w-full mt-12">
                <div
                  v-for="jobFamily in jobFamilies"
                  :key="jobFamily.jobFamily"
                  class="w-full"
                >
                  <div class="flex flex-row w-full justify-between">
                    <div class="w-1/3">
                      <p class="font-bold">{{ jobFamily.jobFamily }}</p>
                    </div>
                    <div
                      class="w-2/3 flex flex-row flex-wrap items-center gap-4"
                    >
                      <div
                        v-for="jobFunction in jobFamily.jobFunctions"
                        :key="jobFunction"
                        class="w-1/3 flex-grow"
                      >
                        <input
                          :id="jobFunction"
                          v-model="answer"
                          :name="jobFunction"
                          :value="jobFunction"
                          :disabled="isDisabled(jobFunction)"
                          class="nsw-form-checkbox__input"
                          type="checkbox"
                        />
                        <label
                          class="nsw-form-checkbox__label"
                          :for="jobFunction"
                        >{{ jobFunction }}</label>
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  computed: {
    jobFamilies() {
      return this.$store.state.roles
        .reduce((acc, role) => {
          if (role.jobFamily === 'Development program') {
            return acc
          }

          if (this.$store.state.pathway.answers.hasOwnProperty('sworn')) {
            const sworn = this.$store.state.pathway.answers.sworn
            if (sworn.value === 'sworn' && role.jobFamily !== 'Policing') {
              return acc
            }
            if (sworn.value === 'non-sworn' && role.jobFamily === 'Policing') {
              return acc
            }
          }

          if (!acc.find((x) => x.jobFamily === role.jobFamily)) {
            acc.push({
              jobFamily: role.jobFamily,
              jobFunctions: []
            })
          }
          const jobFamily = acc.find((x) => x.jobFamily === role.jobFamily)
          if (!jobFamily.jobFunctions.includes(role.jobFunction)) {
            jobFamily.jobFunctions.push(role.jobFunction)
          }

          return acc
        }, [])
        .sort((a, b) => {
          return a.jobFamily.localeCompare(b.jobFamily)
        })
        .map((jobFamily) => {
          return {
            jobFamily: jobFamily.jobFamily,
            jobFunctions: jobFamily.jobFunctions.sort()
          }
        })
    },
    answer: {
      get() {
        if (this.$store.state.pathway.answers[this.step.id]?.value) {
          return this.$store.state.pathway.answers[this.step.id].value
        }
        if (this.step.schema.field.value) {
          return this.step.schema.field.value
        }
        return []
      },
      set(value) {
        this.$store.dispatch('saveQuestionAnswer', {
          id: this.step.id,
          value
        })
      }
    }
  },

  methods: {
    isDisabled(jobFunction) {
      if (this.answer.includes(jobFunction)) {
        return false
      }
      return this.answer.length === 3
    },
    remove(jobFunction) {
      this.answer = this.answer.filter((x) => x !== jobFunction)
    }
  }
}
</script>

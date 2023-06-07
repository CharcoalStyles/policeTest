<template>
  <div key="role" class="absolute top-0 left-0 h-slider w-full lg:w-aside flex flex-col bg-white z-10">
    <div class="h-12 flex-shrink-0 bg-nsw-brand-primary-blue text-white flex items-center px-4">
      <button class="font-semibold flex items-center" @click="$emit('back')">
        <img src="/icons/chevron-left.svg" class="mr-2"> All roles
      </button>
    </div>
    <div class="slideout-scroll p-5 flex-grow overflow-y-scroll">
      <div class="mb-6">
        <h2 class="font-bold text-2xl pr-3">
          {{ role.name }}
        </h2>
      </div>
      <div class="mb-10 flex space-x-3">
        <information-badge size="xs" colour="grey">
          Grade {{ role.grade }}
        </information-badge>
        <information-badge size="xs" colour="grey">
          Salary: {{ $currency(role.salary.min) }} - {{ $currency(role.salary.max) }}
        </information-badge>
      </div>
      <div class="mb-10">
        <h4 class="font-bold text-lg mb-3">
          Role purpose
        </h4>
        <p class="pr-3">
          {{ role.description }}
        </p>
      </div>
      <div class="mb-10">
        <h4 class="font-bold text-lg mb-3">
          Job Skills
        </h4>
        <div class="flex flex-wrap">
          <information-badge v-for="skill in role.skills.focus" :key="skill.code" size="xs" colour="grey" class="mr-3 mb-3">
            {{ getSkillName(skill.code) }}
          </information-badge>
        </div>
      </div>
      <div class="mb-10">
        <div class="p-4 bg-nsw-grey-100 border-l-4 border-nsw-brand-primary-blue">
          <h5 class="font-bold mb-3">
            Interested in this role?
          </h5>
          <p class="mb-3">
            Use the pathways tool and reference this role title when completing the questionnaire
          </p>
          <nuxt-link to="/pathway" class="font-bold text-nsw-brand-primary-blue underline">
            Pathway tool
          </nuxt-link>
        </div>
      </div>
      <!-- <div class="mb-6">
        <h4 class="font-bold text-lg mb-3">
          People typically progress to
        </h4>
        <div>
          here
        </div>
      </div> -->
      <div class="mb-10">
        <h4 class="font-bold text-xl mb-3">
          Relationships to other roles
        </h4>
      </div>
      <div v-if="getSimilarRolesBySkills.items.length" class="mb-10">
        <h4 class="font-bold mb-6 flex items-center">
          Similar in skillset
          <information-badge size="xs" colour="grey" class="font-normal ml-3">
            {{ getSimilarRolesBySkills.items.length }}
          </information-badge>
        </h4>
        <div class="flex flex-col">
          <job-role
            v-for="similarRoleBySkills in getSimilarRolesBySkills"
            :key="similarRoleBySkills.id"
            :role="similarRoleBySkills"
            @click.native="$emit('selected', similarRoleBySkills)"
          />
        </div>
      </div>
      <div v-if="getSimilarRolesByGrade.length" class="mb-10">
        <h4 class="font-bold mb-6 flex items-center">
          Similar in salary
          <information-badge size="xs" colour="grey" class="font-normal ml-3">
            {{ getSimilarRolesByGrade.length }}
          </information-badge>
        </h4>
        <transition-group name="list" tag="div" class="flex flex-col">
          <job-role
            v-for="similarRoleByGrade in getSimilarRolesByGrade"
            :key="similarRoleByGrade.id"
            :role="similarRoleByGrade"
            @click.native="$emit('selected', similarRoleByGrade)"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import skills from '@/data/skills.json'
import InformationBadge from '@/components/InformationBadge'
import JobRole from '@/components/JobRole'

export default {
  components: {
    InformationBadge,
    JobRole
  },
  props: {
    roles: {
      type: Array,
      required: true
    },
    role: {
      type: [Object, Boolean],
      required: true
    }
  },
  data() {
    return {
      skills
    }
  },
  computed: {
    getSimilarRolesByGrade() {
      return this.$collect(this.roles).where('grade', this.role.grade).all()
    },
    getSimilarRolesBySkills() {
      return this.$collect(this.roles)
        .where('id', '!==', this.role.id)
        .where('gradeId', '>=', this.role.gradeId)
        .filter(role => {
          const currentRoleSkills = this.getSkillsCodeArray(this.role)
          const roleSklls = this.getSkillsCodeArray(role)
          return this.$collect(currentRoleSkills).intersect(roleSklls).count() > 1
        })
        .sortBy('gradeId')
    }
  },
  methods: {
    getSkillsCodeArray(role) {
      if (role.skills.focus) {
        return role.skills.focus.map(skill => {
          return skill.code
        })
      }
      return []
    },
    getSkillName(code) {
      const skill = this.$collect(this.skills).where('code', code).first()
      return skill.name
    }
  }
}
</script>

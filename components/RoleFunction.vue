<template>
  <div class="relative mr-32 mb-32 rounded-3xl overflow-hidden">
    <transition name="fade">
      <div
        v-show="zoomedOut"
        class="absolute inset-0 z-10 flex items-center justify-center"
        :style="getBgColour('light')"
      >
        <div class="rounded-full text-family bg-white py-12 px-32">
          {{ familyRole.roles.length }} roles
        </div>
      </div>
    </transition>
    <div class="inline-block" :style="getBgColour('light')">
      <div class="px-12 py-8 flex justify-center">
        <h2 class="font-bold text-family px-64 py-16 z-20">
          {{ familyRole.name }}
        </h2>
      </div>
      <table class="border-collapse w-full">
        <tr class="text-2xl">
          <th class="px-12 py-8 whitespace-no-wrap h-20 w-32">Salary</th>
          <th
            v-for="item in groupRolesByRoleFunction(familyRole.roles)"
            :key="item.name"
            class="px-12 py-8 whitespace-no-wrap h-20 text-left"
          >
            {{ item.name }}
          </th>
        </tr>
        <tr>
          <td
            class="px-12 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
            :style="getBgColour('dark')"
          >
            <div class="py-3 px-5 rounded-md font-semi-bold text-lg bg-white">
              {{ salaryMap['B2'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByRoleFunction(familyRole.roles)"
            :key="item.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('dark')"
            >
              <role-panel
                v-for="role in rolesInGrade(item.roles, gradeMap['B2'])"
                :key="role.id"
                :role="role"
                class="mr-8"
                clickable
                zoomable
                @click.native="$emit('selected', role)"
              />
            </transition-group>
          </td>
        </tr>
        <tr>
          <td
            class="px-12 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
            :style="getBgColour('dark')"
          >
            <div class="py-3 px-5 rounded-md font-semi-bold text-lg bg-white">
              {{ salaryMap['B1'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByRoleFunction(familyRole.roles)"
            :key="item.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('dark')"
            >
              <role-panel
                v-for="role in rolesInGrade(item.roles, gradeMap['B1'])"
                :key="role.id"
                :role="role"
                class="mr-8"
                clickable
                zoomable
                @click.native="$emit('selected', role)"
              />
            </transition-group>
          </td>
        </tr>
        <tr>
          <td
            class="px-12 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
          >
            <div class="py-3 px-5 rounded-md font-semi-bold text-lg bg-white">
              {{ salaryMap['11-12'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByRoleFunction(familyRole.roles)"
            :key="item.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('light')"
            >
              <role-panel
                v-for="role in rolesInGrade(
                  item.roles,
                  gradeMap['11-12']
                )"
                :key="role.id"
                :role="role"
                class="mr-8"
                clickable
                zoomable
                @click.native="$emit('selected', role)"
              />
            </transition-group>
          </td>
        </tr>
        <tr>
          <td
            class="px-12 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
            :style="getBgColour('dark')"
          >
            <div class="py-3 px-5 rounded-md font-semi-bold text-lg bg-white">
              {{ salaryMap['9-10'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByRoleFunction(familyRole.roles)"
            :key="item.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('dark')"
            >
              <role-panel
                v-for="role in rolesInGrade(item.roles, gradeMap['9-10'])"
                :key="role.id"
                :role="role"
                class="mr-8"
                clickable
                zoomable
                @click.native="$emit('selected', role)"
              />
            </transition-group>
          </td>
        </tr>
        <tr>
          <td
            class="px-12 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
          >
            <div class="py-3 px-5 rounded-md font-semi-bold text-lg bg-white">
              {{ salaryMap['7-8'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByRoleFunction(familyRole.roles)"
            :key="item.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('light')"
            >
              <role-panel
                v-for="role in rolesInGrade(item.roles, gradeMap['7-8'])"
                :key="role.id"
                :role="role"
                class="mr-8"
                clickable
                zoomable
                @click.native="$emit('selected', role)"
              />
            </transition-group>
          </td>
        </tr>
        <tr>
          <td
            class="px-12 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
            :style="getBgColour('dark')"
          >
            <div class="py-3 px-5 rounded-md font-semi-bold text-lg bg-white">
              {{ salaryMap['5-6'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByRoleFunction(familyRole.roles)"
            :key="item.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('dark')"
            >
              <role-panel
                v-for="role in rolesInGrade(item.roles, gradeMap['5-6'])"
                :key="role.id"
                :role="role"
                class="mr-8"
                clickable
                zoomable
                @click.native="$emit('selected', role)"
              />
            </transition-group>
          </td>
        </tr>
        <tr>
          <td
            class="px-12 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
          >
            <div class="py-3 px-5 rounded-md font-semi-bold text-lg bg-white">
              {{ salaryMap['3-4'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByRoleFunction(familyRole.roles)"
            :key="item.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('light')"
            >
              <role-panel
                v-for="role in rolesInGrade(item.roles, gradeMap['3-4'])"
                :key="role.id"
                :role="role"
                class="mr-8"
                clickable
                zoomable
                @click.native="$emit('selected', role)"
              />
            </transition-group>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import colours from '@/data/colours.json'
import RolePanel from '@/components/RolePanel'

export default {
  components: {
    RolePanel
  },
  props: {
    zoom: {
      type: Number,
      required: true
    },
    roles: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    familyRole: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      colours,
      gradeMap: {
        '3-4': 'Clerk Grade 3/4',
        '5-6': 'Clerk Grade 5/6',
        '7-8': 'Clerk Grade 7/8',
        '9-10': 'Clerk Grade 9/10',
        '11-12': 'Clerk Grade 11/12',
        B1: 'PSSE Band 1',
        B2: 'PSSE Band 2'
      },
      salaryMap: {
        '3-4': '$76k - $83k',
        '5-6': '$90k - $99k',
        '7-8': '$102k - $113k',
        '9-10': '$116k - $128k',
        '11-12': '$134k - $155k',
        B1: '$193k - $275k',
        B2: '$275k - $346'
      }
    }
  },
  computed: {
    zoomedOut() {
      return this.zoom <= 0.15
    }
  },
  methods: {
    groupRolesByFamilyRole(roles) {
      const result = this.$collect(this.roles)
        .where('familyFunction', this.roleFunction.name)
        .groupBy('familyRole')
        .keys()
        .map((key) => ({
          name: key,
          roles: this.$collect(roles).where('familyRole', key).all()
        }))
      return result
    },
    groupRolesByRoleFunction(roles) {
      const result = this.$collect(this.roles)
        .where('familyRole', this.familyRole.name)
        .groupBy('roleFunction')
        .keys()
        .map((key) => ({
          name: key,
          roles: this.$collect(roles).where('roleFunction', key).all()
        }))
      return result
    },
    getBgColour(type) {
      const colour = this.$collect(this.colours)
        .where('function', this.familyRole.name)
        .first()
      return `background-color: ${colour[type]}`
    },
    rolesInGrade(roles, level) {
      return this.$collect(roles).where('grade', level).all()
    }
  }
}
</script>

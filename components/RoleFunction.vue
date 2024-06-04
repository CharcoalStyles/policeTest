<template>
  <div class="relative mr-32 mb-32 rounded-3xl overflow-hidden">
    <transition name="fade">
      <div
        v-show="zoomedOut"
        class="absolute inset-0 z-10 flex items-center justify-center"
        :style="getBgColour('light')"
      >
        <div class="rounded-full text-family bg-white py-12 px-32">
          {{ roleFunction.roles.length }} roles
        </div>
      </div>
    </transition>
    <div class="inline-block" :style="getBgColour('light')">
      <div class="px-12 py-8 flex justify-center">
        <h2 class="font-bold text-family px-64 py-16 z-20">
          {{ roleFunction.name }}
        </h2>
      </div>
      <table class="border-collapse w-full">
        <tr class="text-3xl">
          <th class="px-12 py-8 whitespace-no-wrap h-20 w-32"></th>
          <th
            v-for="xKey in columns"
            :key="xKey"
            class="px-12 py-8 whitespace-no-wrap h-20 text-left"
          >
            {{ xKey }}
          </th>
        </tr>
        <tr v-for="(yKey, index) in rows" :key="yKey">
          <td
            class="px-12 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
            :style="getBgColour('dark')"
          >
            <div class="py-3 px-5 rounded-md font-semibold text-lg bg-white">
              {{ yKey }}
            </div>
          </td>
          <td
            v-for="xKey in columns"
            :key="xKey"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="
                index % 2 === 0 ? getBgColour('dark') : getBgColour('light')
              "
            >
              <role-panel
                v-for="role in getRolesByAxis(xKey, yKey)"
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
        <!-- <tr>
          <td
            class="px-12 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
            :style="getBgColour('dark')"
          >
            <div class="py-3 px-5 rounded-md font-semibold text-lg bg-white">
              {{ gradeMap['B1'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByFamilyRole(roleFunction.roles)"
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
            <div class="py-3 px-5 rounded-md font-semibold text-lg bg-white">
              {{ gradeMap['11-12'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByFamilyRole(roleFunction.roles)"
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
                v-for="role in rolesInGrade(item.roles, gradeMap['11-12'])"
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
            <div class="py-3 px-5 rounded-md font-semibold text-lg bg-white">
              {{ gradeMap['9-10'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByFamilyRole(roleFunction.roles)"
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
            <div class="py-3 px-5 rounded-md font-semibold text-lg bg-white">
              {{ gradeMap['7-8'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByFamilyRole(roleFunction.roles)"
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
            <div class="py-3 px-5 rounded-md font-semibold text-lg bg-white">
              {{ gradeMap['5-6'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByFamilyRole(roleFunction.roles)"
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
            <div class="py-3 px-5 rounded-md font-semibold text-lg bg-white">
              {{ gradeMap['3-4'] }}
            </div>
          </td>
          <td
            v-for="item in groupRolesByFamilyRole(roleFunction.roles)"
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
        </tr> -->
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
    roleFunction: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      colours,
      axisKeys: {
        x: 'jobFunction',
        y: 'grade'
      },
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
      },
      roleFunctionOrder: [
        'Procurement Analysis',
        'Procurement Advice',
        'Procurement Services',
        'Contract Management',
        'Procurement Executive'
      ]
    }
  },
  computed: {
    zoomedOut() {
      return this.zoom <= 0.15
    },
    columns() {
      return this.roleFunction.roles.reduce((acc, role) => {
        if (!acc.includes(role[this.axisKeys.x])) {
          acc.push(role[this.axisKeys.x])
        }
        return acc
      }, [])
    },
    rows() {
      return this.roleFunction.roles.reduce((acc, role) => {
        if (!acc.includes(role[this.axisKeys.y])) {
          acc.push(role[this.axisKeys.y])
        }
        return acc
      }, [])
    }
  },
  methods: {
    getRolesByAxis(xAxisValue, yAxisValue) {
      return this.roleFunction.roles
        .filter((role) => role[this.axisKeys.y] === yAxisValue)
        .filter((role) => role[this.axisKeys.x] === xAxisValue)
    },
    // groupEverything(roles) {
    //   const ranks = roles.map((role) => ({
    //     grade: role.grade,
    //     gradeId: role.gradeId
    //   })).sort((a, b) => a.gradeId.grade - b.gradeId.grade)
    //   const functions = roles.map((role) => ({
    //     name: rank.gradeId.type,
    //     roles: ranks.filter((r) => r.gradeId.type === rank.gradeId.type)
    //   }))

    //   return {ranks, functions}
    // },
    groupRolesByFamilyRole(roles) {
      const result = this.$collect(roles)
        // .where('familyFunction', this.roleFunction.name)
        .groupBy('jobFunction')
        .keys()
        .map((key) => ({
          name: key,
          roles: this.$collect(roles).where('jobFunction', key).all()
        }))

      return result.sort(
        (a, b) =>
          this.roleFunctionOrder.indexOf(a.name) -
          this.roleFunctionOrder.indexOf(b.name)
      )
    },
    // groupRolesByRoleFunction(roles) {
    //   const result = this.$collect(this.roles)
    //     .where('familyRole', this.familyRole.name)
    //     .groupBy('roleFunction')
    //     .keys()
    //     .map((key) => ({
    //       name: key,
    //       roles: this.$collect(roles).where('roleFunction', key).all()
    //     }))
    //   return result
    // },
    getBgColour(type) {
      const colour = this.$collect(this.colours)
        .where('function', this.roleFunction.name)
        .first()
      if (colour) {
        return `background-color: ${colour[type]}`
      }
      const defaultColour = {
        light: '#FFFAF0',
        dark: '#FEEBC8'
      }
      return `background-color: ${defaultColour[type]}`
    },
    rolesInGrade(roles, level) {
      return this.$collect(roles).where('grade', level).all()
    }
  }
}
</script>

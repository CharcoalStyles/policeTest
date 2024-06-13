<template>
  <div class="relative mr-96 mb-32 rounded-3xl overflow-visible">
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
    <div
      class="inline-block w-max bg-nsw-brand-primary-blue-light rounded-ss-3xl"
    >
      <div class="sticky w-fit left-0 px-4 py-6 ml-4 flex flex-col">
        <h2 class="font-bold text-xl">
          {{ familyName }}
        </h2>
        <h3 class="font-bold">
          {{ roleFunction.name }}
        </h3>
      </div>
      <table class="border-collapse w-full">
        <tr class="bg-nsw-grey-200">
          <th class="px-4 py-4 whitespace-no-wrap h-12 w-32">Rank</th>
          <th
            v-for="xKey in columns"
            :key="xKey"
            class="py-4 whitespace-no-wrap h-12 text-left"
          >
            <p class="px-4 sticky w-fit left-0">
              {{ xKey }}
            </p>
          </th>
        </tr>
        <tr v-for="yKey in rows" :key="yKey">
          <td
            class="px-4 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
            :style="getBgColour('dark')"
          >
            <div class="py-3 px-5 rounded-md font-bold bg-white">
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
            class="px-4 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
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
            class="px-4 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
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
            class="px-4 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
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
            class="px-4 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
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
            class="px-4 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
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
            class="px-4 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
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
    },
    familyName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      colours,
      axisKeys: {
        x: 'command_BusUnit',
        y: 'grade'
      }
    }
  },
  computed: {
    zoomedOut() {
      return this.zoom <= 0.15
    },
    columns() {
      const columns = this.roleFunction.roles.reduce((acc, role) => {
        if (!acc.includes(role[this.axisKeys.x].trim())) {
          acc.push(role[this.axisKeys.x].trim())
        }
        return acc
      }, [])

      if (this.axisKeys.x === 'grade' && this.familyName === 'Policing') {
        if (this.roleFunction.name === 'Investigations') {
          return [
            'Detective Superintendent',
            'Detective Inspector',
            'Inspector',
            'Detective Senior Sergeant',
            'Detective Sergeant',
            'Detective Senior Constable',
            'Detective Constable / Detective Senior Constable',
            'Detective Constable'
          ].filter((x) => columns.includes(x))
        }

        return [
          'Superintendent',
          'Inspector',
          'Senior Sergeant',
          'Sergeant',
          'Constable / Senior Constable',
          'Grade Clerk 1/2'
        ].filter((x) => columns.includes(x))
      }

      return columns
    },
    rows() {
      const rows = this.roleFunction.roles.reduce((acc, role) => {
        if (!acc.includes(role[this.axisKeys.y])) {
          acc.push(role[this.axisKeys.y])
        }
        return acc
      }, [])

      if (this.axisKeys.y === 'grade' && this.familyName === 'Policing') {
        if (this.roleFunction.name === 'Investigations') {
          return [
            'Detective Superintendent',
            'Detective Inspector',
            'Inspector',
            'Detective Senior Sergeant',
            'Detective Sergeant',
            'Detective Senior Constable',
            'Detective Constable / Detective Senior Constable',
            'Detective Constable'
          ].filter((x) => rows.includes(x))
        }
        return [
          'Superintendent',
          'Inspector',
          'Senior Sergeant',
          'Sergeant',
          'Senior Constable',
          'Constable / Senior Constable',
          'Constable',
          'Clerk 1/2'
        ].filter((x) => rows.includes(x))
      }

      return rows
    }
  },
  methods: {
    getRolesByAxis(xAxisValue, yAxisValue) {
      return this.roleFunction.roles
        .filter((role) => role[this.axisKeys.y] === yAxisValue)
        .filter((role) => role[this.axisKeys.x].trim() === xAxisValue)
    },
    groupRolesByFamilyRole(roles) {
      const result = this.$collect(roles)
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
    getBgColour(type) {
      switch (type) {
        case 'light':
          return 'background-color: #F0F5FB'
        case 'dark':
          return 'background-color: #E4EBF6'
        default:
          return 'background-color: #FFFAF0'
      }
    },
    rolesInGrade(roles, level) {
      return this.$collect(roles).where('grade', level).all()
    }
  }
}
</script>

<template>
  <div class="mx-3 my-3 rounded-3xl overflow-visible">
    <div class="w-max bg-nsw-brand-primary-blue-light rounded-t-3xl">
      <!-- Header; Job Family & Job function -->
      <div class="w-full border-b-4 border-white">
        <div class="sticky w-fit left-0 px-4 py-6 ml-4 flex flex-col">
          <h2 class="sticky font-bold text-xl">
            {{ familyName }}
          </h2>
          <h3 class="font-bold">
            {{ roleFunction.name }}
          </h3>
        </div>
      </div>

      <table class="w-full">
        <!-- header row -->
        <tr class="bg-nsw-grey-200">
          <th class="pl-12 text-left h-12 border-b-4 border-white">
            {{ useSalary ? 'Salary' : 'Rank' }}
          </th>
          <th
            v-for="xKey in columns"
            :key="xKey"
            class="pr-8 h-max border-b-4 border-white"
          >
            <p class="sticky max-w-60 left-0 text-left">{{ xKey }}</p>
          </th>
        </tr>
        <!-- body row -->
        <tr
          v-for="(yKey, idx) in rows.labels"
          :key="yKey.label"
          class="border-0 h-max"
          :style="idx % 2 === 0 ? getBgColour('dark') : getBgColour('light')"
        >
          <td class="pl-12 w-52 items-center text-sm font-bold">
            {{ yKey }}
          </td>
          <td v-for="xKey in columns" :key="xKey" class="p-0">
            <transition-group
              name="list"
              tag="div"
              class="whitespace-no-wrap min-h-28 h-full flex flex-col gap-2 mr-16"
            >
              <div
                v-for="roleGroup in getRolesByAxis(xKey, yKey)"
                :key="roleGroup.map((rg) => rg.name).join('-')"
                class="flex flex-row gap-2 items-start h-full"
              >
                <role-panel
                  v-for="role in roleGroup"
                  :key="role.id"
                  :role="role"
                  :selected="selectedRole && selectedRole.id === role.id"
                  clickable
                  zoomable
                  @click.native="$emit('selected', role)"
                />
              </div>
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
    roleFunction: {
      type: Object,
      required: true
    },
    familyName: {
      type: String,
      required: true
    },
    useSalary: {
      type: Boolean,
      required: true
    },
    selectedRole: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      colours,
      axisKeys: {
        x: 'command_BusUnit',
        y: 'grade'
      },
      yAxisSalaryOverride: false
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

      return columns
    },
    rows() {
      if (!this.useSalary) {
        const grades = this.roleFunction.roles.reduce((acc, role) => {
          if (!acc.includes(role[this.axisKeys.y])) {
            acc.push(role[this.axisKeys.y])
          }
          return acc
        }, [])

        if (this.familyName === 'Policing') {
          if (this.roleFunction.name === 'Investigations') {
            const labels = [
              'Detective Superintendent',
              'Detective Inspector',
              'Inspector',
              'Detective Senior Sergeant',
              'Detective Sergeant',
              'Detective Constable / Detective Senior Constable'
            ] // .filter((x) => grades.includes(x))
            return {
              labels,
              key: 'grade'
            }
          }

          const labels = [
            'Superintendent',
            'Inspector',
            'Senior Sergeant',
            'Sergeant',
            'Constable / Senior Constable'
          ] // .filter((x) => grades.includes(x))

          if (this.roleFunction.name.toLowerCase() === 'development program') {
            labels.push('Clerk 1/2')
          }

          return {
            labels,
            key: 'grade'
          }
        }

        // find if columns contain any entries that don't start with "Grade"
        const gradeCols = grades.filter((x) => {
          return !x.startsWith('Clerk')
        })

        if (gradeCols.length === 0) {
          const clerkGrades = this.roleFunction.roles
            .reduce((acc, role) => {
              if (role.grade.startsWith('Clerk') && !acc.includes(role.grade)) {
                acc.push(role.grade)
              }
              return acc
            }, [])
            .reduce((acc, grade) => {
              if (acc.includes(grade)) {
                return acc
              }
              return [...acc, grade]
            }, [])
            .sort((a, b) => {
              const aVal = a.split(' ')[1].split('/')[0]
              const bVal = b.split(' ')[1].split('/')[0]
              return bVal - aVal
            })
          const labels = clerkGrades // .filter((x) => grades.includes(x))
          return {
            labels,
            key: 'grade'
          }
        }
      }

      const labels = [
        '$185k +',
        '$151k - $184k',
        '$121k - $150k',
        '$101k - $120k',
        '< $100k'
      ] // .filter((_, i) => activeIndexes[i] > 0)

      return {
        labels,
        key: 'salary'
      }
    }
  },
  methods: {
    getRolesByAxis(xAxisValue, yAxisValue) {
      const roles = this.roleFunction.roles
        .filter((role) => {
          if (this.useSalary) {
            const io = [
              '$185k +',
              '$151k - $184k',
              '$121k - $150k',
              '$101k - $120k',
              '< $100k'
            ].indexOf(yAxisValue)

            if (role.salary.max < 101000) {
              return io === 4
            }
            if (role.salary.max < 121000) {
              return io === 3
            }
            if (role.salary.max < 151000) {
              return io === 2
            }
            if (role.salary.max < 185000) {
              return io === 1
            }
            return io === 0
          }

          return role.grade === yAxisValue
        })
        .filter((role) => role[this.axisKeys.x].trim() === xAxisValue)

      const groupedRoles = []
      while (roles.length > 0) {
        const group = roles.splice(0, 5)
        groupedRoles.push(group)
      }

      return groupedRoles
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

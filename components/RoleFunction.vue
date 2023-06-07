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
        <tr class="text-2xl">
          <th class="px-12 py-8 whitespace-no-wrap h-20 w-32">
            Salary
          </th>
          <th
            v-for="familyRole in groupRolesByFamilyRole(roleFunction.roles)"
            :key="familyRole.name"
            class="px-12 py-8 whitespace-no-wrap h-20 text-left"
          >
            {{ familyRole.name }}
          </th>
        </tr>
        <tr>
          <td
            class="px-12 py-8 whitespace-no-wrap h-56 flex items-center border-r-2 border-white"
            :style="getBgColour('dark')"
          >
            <div class="py-3 px-5 rounded-md font-semi-bold text-lg bg-white">
              $192k - $274k
            </div>
          </td>
          <td
            v-for="familyRole in groupRolesByFamilyRole(roleFunction.roles)"
            :key="familyRole.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('dark')"
            >
              <role-panel
                v-for="role in rolesInGrade(familyRole.roles, 'PSSE Band 1')"
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
              $142k - $164k
            </div>
          </td>
          <td
            v-for="familyRole in groupRolesByFamilyRole(roleFunction.roles)"
            :key="familyRole.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('light')"
            >
              <role-panel
                v-for="role in rolesInGrade(familyRole.roles, '11-12')"
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
              $122k - $135k
            </div>
          </td>
          <td
            v-for="familyRole in groupRolesByFamilyRole(roleFunction.roles)"
            :key="familyRole.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('dark')"
            >
              <role-panel
                v-for="role in rolesInGrade(familyRole.roles, '9-10')"
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
              $107k - $119k
            </div>
          </td>
          <td
            v-for="familyRole in groupRolesByFamilyRole(roleFunction.roles)"
            :key="familyRole.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('light')"
            >
              <role-panel
                v-for="role in rolesInGrade(familyRole.roles, '7-8')"
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
              $94k - $104k
            </div>
          </td>
          <td
            v-for="familyRole in groupRolesByFamilyRole(roleFunction.roles)"
            :key="familyRole.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('dark')"
            >
              <role-panel
                v-for="role in rolesInGrade(familyRole.roles, '5-6')"
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
              $80k - $87k
            </div>
          </td>
          <td
            v-for="familyRole in groupRolesByFamilyRole(roleFunction.roles)"
            :key="familyRole.name"
            class="border-r-2 border-white"
          >
            <transition-group
              name="list"
              tag="div"
              class="p-8 whitespace-no-wrap h-56 flex items-center"
              :style="getBgColour('light')"
            >
              <role-panel
                v-for="role in rolesInGrade(familyRole.roles, '3-4')"
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
    roleFunction: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      colours
    }
  },
  computed: {
    zoomedOut() {
      return this.zoom <= 0.15
    }
  },
  methods: {
    groupRolesByFamilyRole(roles) {
      return this.$collect(this.roles)
        .where('familyFunction', this.roleFunction.name)
        .groupBy('familyRole')
        .keys()
        .map((key) => ({
          name: key,
          roles: this.$collect(roles).where('familyRole', key).all()
        }))
    },
    getBgColour(type) {
      const colour = this.$collect(this.colours)
        .where('function', this.roleFunction.name)
        .first()
      return `background-color: ${colour[type]}`
    },
    rolesInGrade(roles, level) {
      return this.$collect(roles).where('grade', level).all()
    }
  }
}
</script>

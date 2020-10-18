<template>
  <b-container>
    <h1>Admin - Users</h1>

    <admin-add-role-modal :userId="userId" />

    <b-table striped hover :items="users">
      <template v-slot:cell(roles)="data">
        <ul>
          <li v-for="role in data.item.roles" :key="role.id">
            {{ role.name }} {{ role.service }} {{ role.district }}{{ role.county }}{{ role.school }}<b-icon-trash color="red" @click="deleteRole(role)"></b-icon-trash>
          </li>
        </ul>
        <b-button size="sm" variant="primary" @click="openAddRoleModal(data.item.id)"><b-icon-plus ></b-icon-plus> add role</b-button>
      </template>
    </b-table>

    <base-alert v-bind="alert" />
  </b-container>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import AdminAddRoleModal from '@/components/AdminAddRoleModal.vue'
import { BIconPlus, BIconTrash } from "bootstrap-vue";
import AdminAPI from '../api/admin.js'

export default {
  components: {
    BaseAlert,
    BIconPlus,
    BIconTrash,
    AdminAddRoleModal
  },

  data() {
    return {
      alert: {},
      users: [],
      userId: null,
    };
  },

  created() {
    //now set the vuex breadcrumbs state so breadcrumbs are updated
    this.$store.dispatch("replaceBreadcrumbs", [
      {
        text: "Home",
        to: { name: "home" },
      },
      {
        text: "Users",
        active: true,
      },
    ]);
  },

  mounted() {
    this.loadUsers()
  },

  methods: {
    openAddRoleModal(id) {
      this.userId = id
      this.$bvModal.show("role-add-modal")
    },
   
    async deleteRole(role) {
      const confirmDeletion = await this.$bvModal.msgBoxConfirm(`Are you sure you want to delete the ${role.name} role (${role.service} ${role.district}${role.county}${role.school})`, {
        title: 'Confirm Delete'
        //other options here
      })
      if (confirmDeletion) {
        this.alert = {show: true, showSpinner: true, variant: "info", name: "Deleting", message: "Deleting Role"}
        const payload = await AdminAPI.deleteRole(role.id)
        if (payload.ok) {
          this.alert = {}
          this.loadUsers()         
        } else {
          this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
        }
      }
    },

    async loadUsers() {
      this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Loading",
        message: "Fetching User List from Database"
      }
      const payload = await AdminAPI.getAllUsers()
      if (payload.ok) {
        this.alert = {}
        this.users = payload.data;
      } else {
        this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
      }
    }
  }
}
</script>
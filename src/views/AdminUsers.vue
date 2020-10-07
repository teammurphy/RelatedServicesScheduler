<template>
  <b-container>
    <h1>Admin - Users</h1>

    <admin-add-role-modal :userId="userId" />
    <base-confirm-deleteModal v-bind="deleteObject" />

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
import BaseConfirmDeleteModal from '@/components/BaseConfirmDeleteModal.vue'
import AdminAddRoleModal from '@/components/AdminAddRoleModal.vue'
import { BIconPlus, BIconTrash } from "bootstrap-vue";
import axios from "axios";

export default {
  components: {
    BaseAlert,
    BaseConfirmDeleteModal,
    BIconPlus,
    BIconTrash,
    AdminAddRoleModal
  },
  data() {
    return {
      alert: {},
      users: [],
      userId: null,
      //user: {}
      deleteObject: {path:"", message:""},
    };
  },
  methods: {
    openAddRoleModal(id) {
      this.userId = id
      this.$bvModal.show("role-add-modal")
    },
    deleteRole(role) {
      this.deleteObject = {
        //id, path to delete the document, and a enough text to identify that we are deleting the right thing
        message: `Are you sure you want to delete the ${role.name} role (${role.service} ${role.district}${role.county}${role.school})?`,
        path: "admin/role/" + role.id
      }
      this.$bvModal.show("base-confirm-delete-modal")
    }
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
    this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Loading",
        message: "Fetching User List from Database"
      }
    const url = process.env.VUE_APP_ROOT_API + "admin/users";
    //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios
      .get(url)
      .then((response) => {
        this.alert = {}
        this.users = response.data;
      })
      .catch((error) => {
        this.alert = {
          show: true,
          variant: "danger",
          name: error.name,
          message: error.message,
        };
      });
  },
};
</script>
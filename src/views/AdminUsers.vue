<template>
  <b-container>
    <h1>Admin Vue</h1>
    <h2>Users</h2>

    <admin-add-role-modal :userId="userId" />

    <b-table striped hover :items="users">
      <template v-slot:cell(roles)="data">
        <ul>
          <li v-for="role in data.item.roles" :key="role.id">
            {{ role.name }}
          </li>
        </ul>
        <!-- v-b-modal.role-add-modal -->
        <b-button size="sm" variant="primary" @click="openAddRoleModal(data.item.id)"><b-icon-plus></b-icon-plus></b-button>
      </template>
    </b-table>

    {{ users }}

    <base-alert v-bind="alert" />
  </b-container>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import AdminAddRoleModal from '@/components/AdminAddRoleModal.vue'
import { BIconPlus } from "bootstrap-vue";
import axios from "axios";

export default {
  components: {
    BaseAlert,
    BIconPlus,
    AdminAddRoleModal
  },
  data() {
    return {
      alert: {},
      users: [],
      userId: null,
      //user: {}
    };
  },
  methods: {
    openAddRoleModal(id) {
      this.userId = id
      this.$bvModal.show("role-add-modal")
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
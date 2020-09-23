<template>
  <b-container class="users">
    <h1>Users</h1>

    <b-alert show v-if="loading" class="loading">
      <b-spinner label="Loading..." class="loading"></b-spinner>
      Loading User List ...
    </b-alert>

    <b-alert v-if="error" class="error" variant="danger" show>
      {{ error }}
    </b-alert>

    <div v-if="userlist" class="content">

      <ul>
        <li v-for="item in userlist" :key="item.id">
          <router-link :to="'/user/'+item.id">
            {{ item.first_name }} {{ item.last_name }}
          </router-link>
        </li>
      </ul>

      <h1>or</h1>

      <b-table striped hover :items="userlist">
        <template v-slot:cell(username)="data">
          <router-link :to="'/user/'+data.item.id">
            {{ data.item.username }}
          </router-link>
        </template>
      </b-table>

    </div>

  </b-container>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      userlist: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getUsers()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getUsers'
  },
  methods: {
    async getUsers() {
      this.error = this.userlist = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      //const res = await fetch('https://488c64d2-8c86-4369-990c-0fff43b1145c.mock.pstmn.io/students');
      //const userlist = await res.json();

      const userlist = [
        {
          id: "001",
          username: "tom@wokeupdead.com",
          first_name: "Thomas",
          last_name: "Murphy",
          last_login: "2021-02-15T00:00:00Z"
        },
        {
          id: "002",
          username: "caroline@teanga.com",
          first_name: "Caroline",
          last_name: "Murphy",
          last_login: "2021-02-15T05:50:10Z"
        }
      ];

      this.loading = false;
      this.userlist = userlist;

      //now set the vuex breadcrumbs state so breadcrumbs are updated
      this.$store.dispatch('replaceBreadcrumbs', [
        {
          text: 'Home',
          to: {name: 'Home'}
        },
        {
          text: 'Users',
          active: true
        }
      ]);
    }
  }
}

</script>

<template>
  <b-container class="users">

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
            {{ item.firstName }} {{ item.lastName }}
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
      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/users';
      const res = await fetch(url, {
        headers: {
          'Content-Type':'application/json'
        }
      });
      const userlist = await res.json();

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
<template>
  <b-container class="users">

    <b-alert show v-if="loading" class="loading">
      <b-spinner label="Loading..." class="loading"></b-spinner>
      Loading User List ...
    </b-alert>

    <b-alert v-if="error" class="error" variant="danger" show>
      {{ error.name }} - {{ error.message }}
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
    this.displayBreadcrumbs();
    this.getUsers()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getUsers'
  },
  methods: {
    displayBreadcrumbs() {
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
    },
    async getUsers() {
      this.error = this.userlist = null
      this.loading = true
      const url = process.env.VUE_APP_ROOT_API + 'users';
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type':'application/json'
          }
        });
        if (!response.ok) {
          //we got response - but not one we like - like a 404 or something
          throw new Error({
            name: response.status, 
            message: response.statusText
          });
        }
        //good response, now lets try get the payload
        const data = await response.json();
        this.userlist = data;
      } catch(error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
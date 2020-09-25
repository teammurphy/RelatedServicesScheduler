<template>
  <b-container class="user">

    <b-alert v-if="loading" class="loading" show>
      <b-spinner label="Loading..." class="loading"></b-spinner>
      Loading User Info ...
    </b-alert>

    <b-alert v-if="error" class="error" variant="danger" show>
      {{ error }}
    </b-alert>

    <div v-if="user" class="content">
      <h2>{{ user.firstName }} {{ user.lastName }}</h2>

      <dl class="object_display">
        <div v-for="(value, index) in user" v-bind:key="index">
          <dt>{{ index }}</dt>
          <dd>{{ value }}</dd>
        </div>
      </dl>
    </div>

    <User_Caseload v-bind:userId="this.userId"/>

  </b-container>
</template>

<script>
// @ is an alias to /src
import User_Caseload from '@/components/User_Caseload.vue'

export default {
  components: {
    User_Caseload
  },

  data () {
    return {
      user: null,
      error: null,
      loading: false,
      userId: this.$route.params.userId
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getUser()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getUser'
  },
  methods: {
    async getUser() {
      this.error = this.user = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/user/' + this.userId;
      const res = await fetch(url, {
        headers: {
          'Content-Type':'application/json'
        }
      });
      const user = await res.json();

      this.loading = false;
      this.user = user;

      //now set the vuex breadcrumbs state so breadcrumbs are updated
      this.$store.dispatch('replaceBreadcrumbs', [
        {
          text: 'Home',
          to: {name: 'Home'}
        },
        {
          text: 'Users',
          to: {name: 'Users'}
        },
        {
          text: user.firstName + " " + user.lastName,
          active: true
        }
      ]);

    }
  }
}

</script>

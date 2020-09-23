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
      <h2>{{ user.first_name }} {{ user.last_name }}</h2>
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
      //use this.userId to pass userId as part of url
      //alert("Id: " + this.userId);
      //real fetch would pass userId
      //const res = await fetch('https://488c64d2-8c86-4369-990c-0fff43b1145c.mock.pstmn.io');
      //const user = await res.json();

      //fake user
      const user = {
        id: "001",
        username: "tom@wokeupdead.com",
        first_name: "Thomas",
        last_name: "Murphy",
        last_login: "2021-02-15T00:00:00Z"
      };

      this.loading = false;
      this.user = user;

    }
  }
}

</script>

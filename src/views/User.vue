<template>
  <b-container class="user">

    <base-alert v-bind="alert" />

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
import BaseAlert from '@/components/BaseAlert.vue'

export default {
  components: {
    User_Caseload,
    BaseAlert
  },
  data () {
    return {
      user: null,
      alert: {},
      userId: parseInt(this.$route.params.userId)
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
    displayBreadcrumbs(user) {
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
    },
    async getUser() {
      this.user = null
      this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Loading",
        message: "Fetching User from Database"
      }

      const url = process.env.VUE_APP_ROOT_API + 'user/' + this.userId;
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
        this.user = data;
        this.displayBreadcrumbs(data);
        this.alert = {}
      } catch(error) {
        this.alert = {
          show: true,
          variant: "danger",
          name: error.name,
          message: error.message
        }
      }
    }
  }
}

</script>

<template>
<b-container>
  <b-jumbotron header="Related Service Scheduler" lead="let us do something">
    <p>
      An attempt to demo a mechanism for allowing SEIS to better handle the
      scheduling of related services.
    </p>

    <p>
      Will show when IEP mandates have adequate scheduling. Provide useful
      information for providers, principals, supervisors, and others.
    </p>

     <p v-if="!getStoreLoggedIn">
        To use this app you'll need to
        <router-link to="/login">
          Login
        </router-link>
        or
        <router-link to="/register">
          Register
        </router-link>
      </p>
  </b-jumbotron>
</b-container>
</template>

<script>
  import { authComputed } from '../store/helpers.js'

  export default {
    computed: {
      ...authComputed
    },
    created() {
      //now set the vuex breadcrumbs state so breadcrumbs are updated
      this.$store.dispatch('replaceBreadcrumbs', [
        {
          text: 'Home',
          active: true
        }
      ]);
    }
  }
</script>

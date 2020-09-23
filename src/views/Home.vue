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
  </b-jumbotron>
</b-container>
</template>

<script>
  export default {
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

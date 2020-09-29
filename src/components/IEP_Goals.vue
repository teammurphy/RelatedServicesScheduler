<template>
<div class="iep_goals">

  <b-alert v-if="loading" class="loading" show>
    <b-spinner label="Loading..." class="loading"></b-spinner>
    Loading Goals ...
  </b-alert>

  <b-alert v-if="error" class="error" variant="danger" show>
    {{ error }}
  </b-alert>

  <div v-if="goals" class="content">
    <b-table striped hover :items="goals"></b-table>
  </div>

  <div v-else class="content">
    <h2>No Goals found</h2>
  </div>
</div>
</template>

<script>
export default {
  name: 'IEP_Goals',
  props: {
    iepId: Number
  },
  data () {
    return {
      goals: null,
      loading: false,
      error: null
    }
  },
  created() {
    // fetch the data when the view is created and the data is already being observed
    this.getGoals()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getGoals'
  },
  methods: {
    async getGoals() {
      this.error = this.goals = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/goals/byIEPId/' + this.iepId.toString();
      // const res = await fetch(url);
      const res = await fetch(url, {
        headers: {
          'Content-Type':'application/json'
        }
      });
      const goals = await res.json();

      this.loading = false;
      this.goals = goals;
    }
  }
}
</script>
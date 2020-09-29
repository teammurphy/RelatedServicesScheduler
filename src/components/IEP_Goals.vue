<template>
<div class="iep_goals">

  <b-alert v-if="loading" class="loading" show>
    <b-spinner label="Loading..." class="loading"></b-spinner>
    Loading Goals ...
  </b-alert>

  <b-alert v-if="error" class="error" variant="danger" show>
    {{ error.name }} - {{ error.message }}
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

      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/goals/byIEPId/' + this.iepId;
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
        this.goals = data;
      } catch(error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
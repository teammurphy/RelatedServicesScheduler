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
    <h3>Goals</h3>
    <b-table striped hover :items="goals"></b-table>
    <p>
      note - we can manipulate the goals array to give us linked rows, color
      unmet goals red, ....  see https://bootstrap-vue.org/docs/components/table
    </p>
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
    IEPId: String
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
      //use this.iep_id to pass iep_id as part of url
      //alert("Id: " + this.iep_id);

      //note the fetch should be hitting a goal feed, not iep
      const res = await fetch('https://488c64d2-8c86-4369-990c-0fff43b1145c.mock.pstmn.io/ieps?iep_id=' + this.IEPId);

      //should be const, but as we are overwriting for testing
      let goals = await res.json();
      this.loading = false;

      //now overwrite goals for testing
      goals = [
        {
          id: "001",
          iep_id: "001",
          goal: "To make the largest spitball possible",
          criteria: "By wet weight - including spit",
          method: "Place on scale - duh",
          schedule: "once per month"
        },
        {
          id: "002",
          iep_id: "001",
          goal: "To touch elbow to nose",
          criteria: "mm from nose",
          method: "with cloth ruler - duh",
          schedule: "once per week"
        }
      ];

      this.loading = false;
      this.goals = goals;
    }
  }
}
</script>

<style scoped>
</style>

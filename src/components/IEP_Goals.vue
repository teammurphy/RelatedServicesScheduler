<template>
<div class="iep_goals">

  <BaseAlert v-bind:alert="this.alert"/>

  <div v-if="goals" class="content">
    <b-table striped hover :items="goals"></b-table>
  </div>

  <div v-else class="content">
    <h2>No Goals found</h2>
  </div>
</div>
</template>

<script>
import BaseAlert from '@/components/BaseAlert.vue'

export default {
  name: 'IEP_Goals',
  components: {
    BaseAlert,
  },
  props: {
    iepId: Number
  },
  data () {
    return {
      goals: null,
      alert: {}
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
      this.goals = null
      this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Loading",
        message: "Fetching IEP Goals from Database",
      };

      const url = process.env.VUE_APP_ROOT_API + 'goals/byIEPId/' + this.iepId;
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
        this.alert = {}
      } catch(error) {
        this.alert = {
          show: true,
          variant: "danger",
          name: error.name,
          message: error.message,
        }
      } 
    }
  }
}
</script>
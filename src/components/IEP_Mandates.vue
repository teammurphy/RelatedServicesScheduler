<template>
<div class="iep_mandates">

  <b-alert show v-if="loading" class="loading">
    <b-spinner label="Loading..." class="loading"></b-spinner>
    Loading Mandates ...
  </b-alert>

  <b-alert v-if="error" class="error" variant="danger" show>
    {{ error }}
  </b-alert>

  <div v-if="mandates" class="content">
    <h3>Mandates</h3>
    <b-table striped hover :items="mandates"></b-table>
    <p>
      note - we can manipulate the mandates array to give us linked rows, color
      unmet mandates red, ....  see https://bootstrap-vue.org/docs/components/table
    </p>
  </div>

  <div v-else class="content">
    <h2>No Mandates found</h2>
  </div>
</div>
</template>

<script>
export default {
  name: 'IEP_Mandates',
  props: {
    IEPId: String
  },
  data () {
    return {
      mandates: null,
      loading: false,
      error: null
    }
  },
  created() {
    // fetch the data when the view is created and the data is already being observed
    this.getMandates()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getMandates'
  },
  methods: {
    async getMandates() {
      this.error = this.mandates = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      //use this.iep_id to pass iep_id as part of url
      //alert("Id: " + this.iep_id);

      //note the fetch should be hitting a mandate feed, not iep
      const res = await fetch('https://488c64d2-8c86-4369-990c-0fff43b1145c.mock.pstmn.io/ieps?iep_id=' + this.IEPId);

      //should be const, but as we are overwriting for testing
      let mandates = await res.json();
      this.loading = false;

      //overwrite mandates for testing
      mandates = [
        {
          id: "001",
          eip_id: "001",
          service: "OT",
          groupsize: 3,
          duration: 30,
          per_week: 2
        },
        {
          id: "002",
          eip_id: "001",
          service: "Speech",
          groupsize:1,
          duration: 30,
          per_week: 2
        }
      ];

      this.loading = false;
      this.mandates = mandates;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

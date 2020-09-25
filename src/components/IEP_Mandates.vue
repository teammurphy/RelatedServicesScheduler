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
      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/mandates/byIEPId/' + this.IEPId;
      // const res = await fetch(url);
      const res = await fetch(url, {
        headers: {
          'Content-Type':'application/json'
        }
      });
      const mandates = await res.json();

      this.loading = false;
      this.mandates = mandates;
    }
  }
}
</script>
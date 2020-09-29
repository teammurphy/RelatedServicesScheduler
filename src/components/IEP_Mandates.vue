<template>
<div class="iep_mandates">

  <b-alert show v-if="loading" class="loading">
    <b-spinner label="Loading..." class="loading"></b-spinner>
    Loading Mandates ...
  </b-alert>

  <b-alert v-if="error" class="error" variant="danger" show>
    {{ error.name }} - {{ error.message }}
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
    iepId: Number
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

      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/mandates/byIEPId/' + this.iepId;
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
        this.mandates = data;
      } catch(error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
<template>
<div class="iep_mandates">

  <base-alert v-bind="alert" />

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
import BaseAlert from '@/components/BaseAlert.vue'

export default {
  name: 'IEP_Mandates',
  components: {
    BaseAlert,
  },
  props: {
    iepId: Number
  },
  data () {
    return {
      mandates: null,
      alert: {}
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
      this.mandates = null
      this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Loading",
        message: "Fetching IEP Mandates from Database",
      };

      const url = process.env.VUE_APP_ROOT_API + 'mandates/byIEPId/' + this.iepId;
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
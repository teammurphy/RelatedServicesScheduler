<template>
<div class="student_iep">

  <b-alert show v-if="loading" class="loading">
    <b-spinner label="Loading..." class="loading"></b-spinner>
    Loading IEP ...
  </b-alert>

  <b-alert v-if="error" class="error" variant="danger" show>
    {{ error }}
  </b-alert>

  <div v-if="iep" class="content">
    <h2>{{ iep.start_date }} - {{ iep.end_date}}</h2>

    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">Mandates</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <IEP_Mandates v-bind:IEPId="this.iep.id"/>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info">Goals</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <IEP_Goals v-bind:IEPId="this.iep.id"/>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

  </div>

  <div v-else class="content">
    <h2>No IEP found</h2>
  </div>
</div>
</template>

<script>
import IEP_Mandates from '@/components/IEP_Mandates.vue'
import IEP_Goals from '@/components/IEP_Goals.vue'

export default {
  name: 'Student_IEP',
  components: {
    IEP_Mandates,
    IEP_Goals
  },
  props: {
    studentId: String
  },
  data () {
    return {
      iep: null,
      loading: false,
      error: null
    }
  },
  created() {
    // fetch the data when the view is created and the data is already being observed
    this.getIEP()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getIEP'
  },
  methods: {
    async getIEP() {
      this.error = this.iep = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      //use this.iep_id to pass iep_id as part of url
      //alert("Id: " + this.iep_id);

      // in real life we would pass a student id and return back only the most recent iep
      const res = await fetch('https://488c64d2-8c86-4369-990c-0fff43b1145c.mock.pstmn.io/ieps?student_id=' + this.studentId);
      const ieps = await res.json();
      // for the mock data we are going to just grab the first iep in feed
      const iep = ieps[0];

      this.loading = false;
      this.iep = iep;
      //this.iepID = "009";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

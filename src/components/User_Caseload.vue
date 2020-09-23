<template>
<div class="user_caseload">

  <b-alert v-if="loading" class="loading" show>
    <b-spinner label="Loading..." class="loading"></b-spinner>
    Loading Caseload ...
  </b-alert>

  <b-alert v-if="error" class="error" variant="danger" show>
    {{ error }}
  </b-alert>

  <div v-if="caseload" class="content">
    <h3>Caseload</h3>

    <dl class="object_display">
      <div v-for="(value, index) in caseload" v-bind:key="index">
        <dt>{{ index }}</dt>
        <dd>{{ value }}</dd>
      </div>
    </dl>

    <Caseload_Members v-bind:caseloadId="this.caseload.id"/>
  </div>

</div>
</template>

<script>
import Caseload_Members from '@/components/Caseload_Members.vue'

export default {
  name: 'User_Caseload',
  components: {
    Caseload_Members
  },
  props: {
    userId: String
  },
  data () {
    return {
      caseload: null,
      loading: false,
      error: null
    }
  },
  created() {
    // fetch the data when the view is created and the data is already being observed
    this.getCaseload()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getCaseload'
  },
  methods: {
    async getCaseload() {
      this.error = this.caseload = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      //use this.iep_id to pass iep_id as part of url
      //alert("Id: " + this.iep_id);

      // in real life we would pass a student id and return back only the most recent iep
      //const res = await fetch('https://488c64d2-8c86-4369-990c-0fff43b1145c.mock.pstmn.io/ieps?student_id=' + this.studentId);
      //const ieps = await res.json();
      // for the mock data we are going to just grab the first iep in feed
      //const iep = ieps[0];

      //fake Caseload
      const caseload = {
        id: "001",
        user_id: "001",
        title: "Summer 2021",
        service_area: "Speech",
        start_date: "2020-09-15T00:00:00Z",
        end_date: "2021-02-15T00:00:00Z"
      };

      this.loading = false;
      this.caseload = caseload;
    }
  }
}
</script>

<style scoped>
</style>
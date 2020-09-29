<template>
<div class="caseload_members">

  <b-alert v-if="loading" class="loading" show>
    <b-spinner label="Loading..." class="loading"></b-spinner>
    Loading Caseload Members ...
  </b-alert>

  <b-alert v-if="error" class="error" variant="danger" show>
    {{ error }}
  </b-alert>

  <div v-if="members" class="content">
    <h3>Caselist</h3>
    
    <b-button variant="primary" to="/mandate_scheduler/001">Mandate Scheduler</b-button>
    <b-table striped hover :items="members">
      <template v-slot:cell(studentId)="data">
          <router-link :to="'/student/'+data.item.studentId">
            {{ data.item.studentId }}
          </router-link>
        </template>
    </b-table>
  </div>

</div>
</template>

<script>
export default {
  name: 'Caseload_Members',
  props: {
    caseloadId: Number
  },
  data() {
    return {
      members: null,
      loading: false,
      error: null
    }
  },
  created() {
    // fetch the data when the view is created and the data is already being observed
    this.getMembers()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getMembers'
  },
  methods: {
    async getMembers() {
      this.error = this.members = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      //says by userId, but userId - caseloadId for now
      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/cases/byUserId/' + this.caseloadId;
      const res = await fetch(url, {
        headers: {
          'Content-Type':'application/json'
        }
      });
      const caselist = await res.json();
      this.loading = false;
      this.caselist = caselist;

      this.loading = false;
      this.members = caselist;
    }
  }
}
</script>
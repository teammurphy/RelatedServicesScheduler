<template>
<div class="caseload_members">

  <b-alert v-if="loading" class="loading" show>
    <b-spinner label="Loading..." class="loading"></b-spinner>
    Loading Caseload Members ...
  </b-alert>

  <b-alert v-if="error" class="error" variant="danger" show>
    {{ error.name }} - {{ error.message }}
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

      const url = process.env.VUE_APP_ROOT_API + 'cases/byUserId/' + this.caseloadId;
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
        this.members = data;
      } catch(error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
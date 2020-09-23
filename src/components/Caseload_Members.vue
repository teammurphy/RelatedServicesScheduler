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
    <h3>Members</h3>
    <b-table striped hover :items="members"></b-table>
    <p>
      note - we can manipulate the members array to give us linked rows, color
      unmet goals red, ....  see https://bootstrap-vue.org/docs/components/table
    </p>
  </div>

</div>
</template>

<script>
export default {
  name: 'Caseload_Members',
  props: {
    caseloadId: String
  },
  data () {
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
      //use this.iep_id to pass iep_id as part of url
      //alert("Id: " + this.iep_id);

      //note the fetch should be hitting a goal feed, not iep
      //const res = await fetch('https://488c64d2-8c86-4369-990c-0fff43b1145c.mock.pstmn.io/ieps?iep_id=' + this.IEPId);

      //should be const, but as we are overwriting for testing
      //let goals = await res.json();

      //fake Members
      const members = [
        {
          id: "001",
          caseload_id: "001",
          student_id: "001"
        },
        {
          id: "002",
          caseload_id: "001",
          student_id: "002"
        }
      ];

      this.loading = false;
      this.members = members;
    }
  }
}
</script>

<style scoped>
</style>

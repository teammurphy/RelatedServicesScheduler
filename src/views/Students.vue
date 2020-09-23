<template>
  <b-container class="students">
    <h1>Students</h1>

    <b-alert v-if="loading" class="loading" show>
      <b-spinner label="Loading..." class="loading"></b-spinner>
      Loading Student List ...
    </b-alert>

    <b-alert v-if="error" class="error" variant="danger" show>
      {{ error }}
    </b-alert>

    <div v-if="studentlist" class="content">

      <b-table striped hover :items="studentlist">
        <template v-slot:cell(first_name)="data">
          <router-link :to="'/student/'+data.item.id">
            {{ data.item.first_name }}
          </router-link>
        </template>
      </b-table>

    </div>

  </b-container>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      studentlist: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getStudents()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getStudents'
  },
  methods: {
    async getStudents() {
      this.error = this.studentlist = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      const res = await fetch('https://488c64d2-8c86-4369-990c-0fff43b1145c.mock.pstmn.io/students');
      const studentlist = await res.json();
      this.loading = false;
      this.studentlist = studentlist;
    }
  }
}

</script>

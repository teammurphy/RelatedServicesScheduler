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
        <template v-slot:cell(firstName)="data">
          <router-link :to="'/student/'+data.item.id">
            {{ data.item.firstName }}
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
      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/students';
      const res = await fetch(url, {
        headers: {
          'Content-Type':'application/json'
        }
      });
      const studentlist = await res.json();
      this.loading = false;
      this.studentlist = studentlist;


      //now set the vuex breadcrumbs state so breadcrumbs are updated
      this.$store.dispatch('replaceBreadcrumbs', [
        {
          text: 'Home',
          to: {name: 'Home'}
        },
        {
          text: 'Students',
          active: true
        }
      ]);
    }
  }
}

</script>

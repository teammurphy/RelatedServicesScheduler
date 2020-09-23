<template>
  <b-container class="student">
    <h1>Student</h1>

    <b-alert v-if="loading" class="loading" show>
      <b-spinner label="Loading..." class="loading"></b-spinner>
      Loading Student Info ...
    </b-alert>

    <b-alert v-if="error" class="error" variant="danger" show>
      {{ error }}
    </b-alert>

    <div v-if="student" class="content">
      <h2>{{ student.first_name }} {{ student.last_name }}</h2>
    </div>

    <Student_IEP v-bind:studentId="this.studentId"/>

  </b-container>
</template>

<script>
// @ is an alias to /src
import Student_IEP from '@/components/Student_IEP.vue'

export default {
  components: {
    Student_IEP
  },

  data () {
    return {
      student: null,
      error: null,
      loading: false,
      studentId: this.$route.params.studentId
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getStudent()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getStudent'
  },
  methods: {
    async getStudent() {
      this.error = this.student = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      //use this.studentId to pass studentId as part of url
      //alert("Id: " + this.studentId);
      //real fetch would pass studentId
      const res = await fetch('https://488c64d2-8c86-4369-990c-0fff43b1145c.mock.pstmn.io');
      const student = await res.json();
      this.loading = false;
      this.student = student;

    }
  }
}

</script>

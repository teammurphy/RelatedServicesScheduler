<template>
<b-container class="student">
    <b-alert v-if="loading" class="loading" show>
      <b-spinner label="Loading..." class="loading"></b-spinner>
      Loading Student Info ...
    </b-alert>

    <b-alert v-if="error" class="error" variant="danger" show>
      {{ error.name }} - {{ error.message }}
    </b-alert>

    <div v-if="student" class="content">
      <h2>Student: {{ student.firstName }} {{ student.lastName }}</h2>

      <dl class="object_display">
        <div v-for="(value, index) in student" v-bind:key="index">
          <dt>{{ index }}</dt>
          <dd>{{ value }}</dd>
        </div>
      </dl>

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
      studentId: parseInt(this.$route.params.studentId)
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
    displayBreadcrumbs(student) {
      //now set the vuex breadcrumbs state so breadcrumbs are updated
      this.$store.dispatch('replaceBreadcrumbs', [
        {
          text: 'Home',
          to: {name: 'Home'}
        },
        {
          text: 'Students',
          to: {name: 'Students'}
        },
        {
          text: student.firstName + " " + student.lastName,
          active: true
        }
      ]);
    },
    async getStudent() {
      this.error = this.student = null
      this.loading = true

      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/student/' + this.studentId;
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
        this.student = data;
        this.displayBreadcrumbs(data);
      } catch(error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

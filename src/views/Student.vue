<template>
<b-container class="student">
    <BaseAlert v-bind:alert="this.alert"/>

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
import Student_IEP from '@/components/Student_IEP.vue'
import BaseAlert from '@/components/BaseAlert.vue'

export default {
  components: {
    Student_IEP,
    BaseAlert
  },
  data () {
    return {
      student: null,
      alert: {},
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
      this.student = null
      this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Loading",
        message: "Fetching Student from Database"
      }

      const url = process.env.VUE_APP_ROOT_API + 'student/' + this.studentId;
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
        this.alert = {}
      } catch(error) {
        this.alert = {
          show: true,
          variant: "danger",
          name: error.name,
          message: error.message
        }
      } 
    }
  }
}
</script>

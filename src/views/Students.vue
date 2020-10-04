<template>
  <b-container class="students">
    <h1>Students</h1>

    <base-alert v-bind="alert" />

    <Student_Create_Modal/>
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
import Student_Create_Modal from '@/components/Student_Create_Modal.vue'
import BaseAlert from '@/components/BaseAlert.vue'

export default {
  components: {
    Student_Create_Modal,
    BaseAlert
  },
  data () {
    return {
      alert: {},
      studentlist: null,
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.displayBreadcrumbs();
    this.getStudents();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getStudents'
  },
  methods: {
    displayBreadcrumbs() {
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
    },
    async getStudents() {
      this.studentlist = null
      this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Loading",
        message: "Fetching Student List from Database"
      }

      const url = process.env.VUE_APP_ROOT_API + 'students';
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
        this.studentlist = data;
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

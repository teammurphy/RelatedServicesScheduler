<template>
  <b-container class="students">
    <base-alert v-bind="alert" />
    <student-create-modal @on-student-added="onAddStudent" />

    <h1>Students</h1>

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
import StudentCreateModal from '@/components/StudentCreateModal.vue'
import BaseAlert from '@/components/BaseAlert.vue'
import StudentAPI from '../api/students.js'

export default {
  components: {
    StudentCreateModal,
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
        {text: 'Home', to: {name: 'home'}},
        {text: 'Students', active: true}
      ]);
    },

    onAddStudent(student) {
      //listen for the emit of the child StudentCreateModal
      this.studentlist.push(student)
      //or should it be ...
      //this.getStudents()
    },

    async getStudents() {
      this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Loading",
        message: "Fetching Student List from Database"
      }
      const payload = await StudentAPI.getStudents()
      if (payload.ok) {
            this.alert = {}
            this.studentlist = payload.data
      } else {
            this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
      }
    }
  }
}

</script>

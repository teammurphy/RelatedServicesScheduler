<template>
  <b-container class="students">
    <base-alert v-bind="alert" />
    <student-create-modal @on-student-added="handleAddStudent" />

    <h1>Students</h1>

    <div v-if="studentlist" class="content">

      <b-table striped hover :items="studentlist">
        <template v-slot:cell(first_name)="data">
          <router-link :to="'/student/'+data.item.id">
            {{ data.item.first_name }}
          </router-link>
        </template>

        <template v-slot:cell(id)="data">
            <b-icon-trash color="red" @click="deleteStudent(data)"></b-icon-trash>
        </template>
      </b-table> 

    </div>
  </b-container>
</template>

<script>
import StudentCreateModal from '@/components/StudentCreateModal.vue'
import BaseAlert from '@/components/BaseAlert.vue'
import StudentAPI from '../api/student.js'
import { BIconTrash } from "bootstrap-vue";

export default {
  components: {
    StudentCreateModal,
    BaseAlert,
    BIconTrash
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

    handleAddStudent(student) {
      //listen for the emit of the child StudentCreateModal
      this.studentlist.push(student)
      //or should it be ...
      //this.getStudents()
    },

    async deleteStudent(s) {
      const confirmDeletion = await this.$bvModal.msgBoxConfirm(`Are you sure you want to delete ${s.item.first_name} ${s.item.last_name} from this caseload?`, {
        title: 'Confirm Delete'
        //other options here
      })
      if (confirmDeletion) {
        this.alert = {show: true, showSpinner: true, variant: "info", name: "Deleting", message: "Deleting student"}
        const payload = await StudentAPI.deleteStudent(s.item.id)
        if (payload.ok) {
          this.alert = {}
          //either refresh entire student list, or pull out the specific entry
          this.getStudents()
        } else {
          this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
        }
      }
    },

    async getStudents() {
      this.alert = {show: true, showSpinner: true, variant: "info", name: "Loading", message: "Fetching Student List from Database"}
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

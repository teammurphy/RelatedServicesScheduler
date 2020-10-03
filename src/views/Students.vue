<template>
  <b-container class="students">
    <h1>Students</h1>

    <BaseLoadingAlert v-bind:message="this.loadingMessage"/>
    <BaseErrorAlert v-bind:error="this.error"/>

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
import BaseErrorAlert from '@/components/BaseErrorAlert.vue'
import BaseLoadingAlert from '@/components/BaseLoadingAlert.vue'

export default {
  components: {
    Student_Create_Modal,
    BaseErrorAlert,
    BaseLoadingAlert
  },
  data () {
    return {
      loadingMessage: '',
      studentlist: null,
      error: null
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
      this.error = this.studentlist = null
      this.loadingMessage = 'Fetching Student List from Database'

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
      } catch(error) {
        this.error = error;
      } finally {
        this.loadingMessage = '';
      }
    }
  }
}

</script>

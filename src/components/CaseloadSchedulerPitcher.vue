<template>
<div class="mandateScheduler_pitcher">
  <h3>Unmet mandates</h3>
  <base-alert v-bind="alert" />

  <caseload-scheduler-pitcher-card 
    v-for="student in studentList"
    :key="student.id" 
    v-bind="student"
  />
  
</div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import CaseloadSchedulerPitcherCard from "@/components/CaseloadSchedulerPitcherCard.vue";
import StudentAPI from '../api/student.js'

export default {
  name: "CaseloadSchedulerPitcher",

  props: {
    caseloadId: Number
  },

  components: {
    BaseAlert,
    CaseloadSchedulerPitcherCard
  },

  data() {
    return {
      alert: {},
      studentList: [],
    }
  },

  created() {
    //get the caseload and mandate
    this.getStudentMandates(this.caseloadId)
  },

  methods: {
    async getStudentMandates(caseloadId) {
      //get all the students and such for the current caseload
      this.alert = {show: true, showSpinner: true, variant: "info", name: "Retrieving", message: "Retrieving students"}
      //this should be moved to CaseloadAPI
      const payload = await StudentAPI.getStudentMandates(caseloadId)
      if (payload.ok) {
        this.studentList = payload.data
        this.alert = {}
      } else {
        this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
        this.cases = []
      }
    }  
  }
}
</script>

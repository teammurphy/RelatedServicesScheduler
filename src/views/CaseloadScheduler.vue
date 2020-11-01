<template>
<div class="container-fluid d-flex flex-column vh-100 overflow-hidden">
  <h1>Caseload Scheduler</h1>
  <b-row class="row flex-grow-1 overflow-hidden">
    <b-col cols="2" class="mh-100 overflow-auto py-2">
      <caseload-scheduler-pitcher v-bind:caseloadId="caseloadId"/>
    </b-col>

    <b-col cols="10" class="mh-100 overflow-auto">
      <caseload-scheduler-catcher v-bind:caseloadId="caseloadId"/>
    </b-col>
  </b-row>
</div>
</template>

<script>
import CaseloadSchedulerPitcher from '@/components/CaseloadSchedulerPitcher.vue'
import CaseloadSchedulerCatcher from '@/components/CaseloadSchedulerCatcher.vue'
import { authComputed } from '../store/helpers.js'

export default {
  name: "CaseloadScheduler",
  computed: {
      ...authComputed
  },
  data() {
    return {
      user: null,
      caseloadId: parseInt(this.$route.params.caseloadId, 10)
    }
  },
  components: {
    CaseloadSchedulerPitcher,
    CaseloadSchedulerCatcher
  },

  created() {
    this.user = this.getStoreUser
    this.displayBreadcrumbs();    
  },

  methods: {
    displayBreadcrumbs() {
      //now set the vuex breadcrumbs state so breadcrumbs are updated
      this.$store.dispatch('replaceBreadcrumbs', [
        {text: 'Home', to: {name: 'home'}},
        {text: 'Users', to: {name: 'Users'}},
        {text: "My Caseload", to: {name:'mycaseload'}},
        {text: 'Caseload Scheduler', active: true}
      ]);
    },

  }
}
</script>

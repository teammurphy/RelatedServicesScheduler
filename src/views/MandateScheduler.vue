<template>
<div class="container-fluid d-flex flex-column vh-100 overflow-hidden">
  <h1>MandateScheduler</h1>
  <b-row class="row flex-grow-1 overflow-hidden">
    <b-col cols="2" class="mh-100 overflow-auto py-2">
      <MandateScheduler_Pitcher v-bind:userId="this.userId"/>
    </b-col>

    <b-col cols="10" class="mh-100 overflow-auto">
      <MandateScheduler_Catcher v-bind:userId="this.userId"/>
    </b-col>
  </b-row>
</div>
</template>

<script>
  import MandateScheduler_Pitcher from '@/components/MandateScheduler_Pitcher.vue'
  import MandateScheduler_Catcher from '@/components/MandateScheduler_Catcher.vue'

  export default {
    data() {
      return {
        //userId needs to be from somewhere else
        userId: 1,
        caseloadId: this.$route.params.caseloadId
      }
    },
    components: {
      MandateScheduler_Pitcher,
      MandateScheduler_Catcher
    },
    created() {
      //now set the vuex breadcrumbs state so breadcrumbs are updated
      this.$store.dispatch('replaceBreadcrumbs', [
        {
          text: 'Home',
          to: {name: 'Home'}
        },
        {
          text: 'Users',
          to: {name: 'Users'}
        },
        {
          //will need to get both users name and userId from the peroper place
          text: "should be users name",
          to: {name:'User', params: {userId: 1} }
        },
        {
          text: 'Mandate Scheduler',
          active: true
        }
      ]);
    }
  }
</script>

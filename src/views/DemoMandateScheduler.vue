<template>
<div>
    <h1>DemoMandateScheduler</h1>
    <b-row>
        <b-col cols="2">
            <h1>Mandates</h1>
                <MandateScheduler_Pitcher v-bind:userId="this.userId"/>
        </b-col>

        <b-col cols="10">
            <h1>Calendar</h1>
            <MandateScheduler_Catcher v-bind:userId="this.userId"/>
        </b-col>
    </b-row>
  
</div>
</template>

<script>


/*
export default {
  components: {
    MandateScheduler_Pitcher
  },
  data () {
    return {
      userId: null
    }
  }
}
 */
  import MandateScheduler_Pitcher from '@/components/MandateScheduler_Pitcher.vue'
  import MandateScheduler_Catcher from '@/components/MandateScheduler_Catcher.vue'

  export default {
    data() {
      return {
        userId: "001"
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
          text: 'Demo Mandate Scheduler',
          active: true
        }
      ]);
    }
  }
 
</script>

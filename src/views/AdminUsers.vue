<template>
    <b-container>
        <h1>Admin Vue</h1>
        <h2>Users</h2>

        <base-alert v-bind="alert" />
    </b-container>
</template>

<script>
import BaseAlert from '@/components/BaseAlert.vue'

export default {
  components: {
    BaseAlert
  },
  data () {
    return {
      alert: {},
    }
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
        active: true
      }
    ]);
  }
}
</script>
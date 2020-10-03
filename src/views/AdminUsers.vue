<template>
    <b-container>
        <h1>Admin Vue</h1>
        <h2>Users</h2>

        <BaseErrorAlert v-bind:error="this.error"/>
    </b-container>
</template>

<script>
  export default {
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

<style scoped>
</style>
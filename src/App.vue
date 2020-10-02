<template>
  <div id="app">

    <app-nav/>

    <template>
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    </template>

    <router-view tag="b-container"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppNav from '@/components/AppNav'

export default {
  components: {
    // User_Login_Modal,
    // User_Signup_Modal,
    AppNav
  },
  computed: {
    ...mapState(['breadcrumbs'])
  }
}
</script>

<style>
.object_display {
  border: 3px double #ccc;
  padding: 0.5em;
}
.object_display dt {
  float: left;
  clear: left;
  width: 100px;
  text-align: right;
  font-weight: bold;
  color: green;
}
.object_display dt::after {
  content: ":";
}
.object_display dd {
  margin: 0 0 0 110px;
  padding: 0 0 0.5em 0;
}

</style>

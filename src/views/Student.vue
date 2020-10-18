<template>
<b-container class="student">

    <student-card v-bind:studentId="studentId"/>

</b-container>
</template>

<script>
import StudentCard from '@/components/StudentCard.vue'

export default {
  components: {
    StudentCard
  },
  data () {
    return {
      student: null,
      alert: {},
      studentId: parseInt(this.$route.params.studentId)
    }
  },
 
  methods: {
    displayBreadcrumbs(student) {
      //now set the vuex breadcrumbs state so breadcrumbs are updated
      this.$store.dispatch('replaceBreadcrumbs', [
        {text: 'Home', to: {name: 'home'}},
        {text: 'Students', to: {name: 'Students'}},
        {text: student.firstName + " " + student.lastName, active: true}
      ]);
    },
  }
}
</script>

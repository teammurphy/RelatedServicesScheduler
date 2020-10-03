<template>
<div class="user_caseload">

  <BaseAlert v-bind:alert="this.alert"/>

  <div v-if="caseloads" class="content">
    <h3>Caseload</h3>

    <b-form-select v-model="caseloadId" :options="caseloads"></b-form-select>

    <dl class="object_display">
      <div v-for="(value, index) in caseloads[caseloadId]" v-bind:key="index">
        <dt>{{ index }}</dt>
        <dd>{{ value }}</dd>
      </div>
    </dl>

    <Caseload_Members v-bind:caseloadId="this.caseloadId"/>
  </div>

</div>
</template>

<script>
import Caseload_Members from '@/components/Caseload_Members.vue'
import BaseAlert from '@/components/BaseAlert.vue'

export default {
  name: 'User_Caseload',
  components: {
    Caseload_Members,
    BaseAlert
  },
  props: {
    userId: Number
  },
  data () {
    return {
      //caseloadId is the selected caseload
      caseloadId: null,
      caseloads: null,
      alert: {}
    }
  },
  created() {
    // fetch the data when the view is created and the data is already being observed
    this.getCaseload()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getCaseload'
  },
  methods: {
    async getCaseload() {
      this.caseload = null
      this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Loading",
        message: "Fetching Caseload from Database",
      };

      const url = process.env.VUE_APP_ROOT_API + 'caseloads/byUserId/' + this.userId;
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
        //add value and text properties to caseload array so we can use it in the select easily
        data.forEach(function(obj){
          obj.text = obj.title;
          obj.value = obj.id.toString();
        });
        this.caseloads = data;
        //set the first caseload in list as active
        this.caseloadId = data[0].id;
        this.alert = {}
      } catch(error) {
        this.alert = {
          show: true,
          variant: "danger",
          name: error.name,
          message: error.message,
        }
      } 
    }
  }
}
</script>
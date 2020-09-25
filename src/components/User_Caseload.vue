<template>
<div class="user_caseload">

  <b-alert v-if="loading" class="loading" show>
    <b-spinner label="Loading..." class="loading"></b-spinner>
    Loading Caseload ...
  </b-alert>

  <b-alert v-if="error" class="error" variant="danger" show>
    {{ error }}
  </b-alert>

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

export default {
  name: 'User_Caseload',
  components: {
    Caseload_Members
  },
  props: {
    userId: String
  },
  data () {
    return {
      //caseloadId is the selected caseload
      caseloadId: null,
      caseloads: null,
      loading: false,
      error: null
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
      this.error = this.caseload = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/caseloads/byUserId/' + this.userId;
      // const res = await fetch(url);
      const res = await fetch(url, {
        headers: {
          'Content-Type':'application/json'
        }
      });
      const caseloads = await res.json();

      //add value and text properties to caseload array so we can use it in the select easily
      caseloads.forEach(function(obj){
        obj.text = obj.title;
        obj.value = obj.id.toString();
      });
      
      this.loading = false;
      this.caseloads = caseloads;
      //set the first caseload in list as active
      this.caseloadId = caseloads[0].id;
    }
  }
}
</script>
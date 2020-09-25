<template>
<div class="student_iep">

  <b-alert show v-if="loading" class="loading">
    <b-spinner label="Loading..." class="loading"></b-spinner>
    Loading IEP ...
  </b-alert>

  <b-alert v-if="error" class="error" variant="danger" show>
    {{ error }}
  </b-alert>

  <div v-if="ieps" class="content">
    <h2>IEP</h2>

    <b-form-select v-model="iepId" :options="ieps"></b-form-select>

    <dl class="object_display">
      <div v-for="(value, index) in ieps[iepId]" v-bind:key="index">
        <dt>{{ index }}</dt>
        <dd>{{ value }}</dd>
      </div>
    </dl>

    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">Mandates</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <IEP_Mandates v-bind:IEPId="this.iepId"/>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info">Goals</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <IEP_Goals v-bind:IEPId="this.iepId"/>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

  </div>

  <div v-else class="content">
    <h2>No IEP found</h2>
  </div>
</div>
</template>

<script>
import IEP_Mandates from '@/components/IEP_Mandates.vue'
import IEP_Goals from '@/components/IEP_Goals.vue'

export default {
  name: 'Student_IEP',
  components: {
    IEP_Mandates,
    IEP_Goals
  },
  props: {
    studentId: String
  },
  data () {
    return {
      ieps: null,
      iepId: null,
      loading: false,
      error: null
    }
  },
  created() {
    // fetch the data when the view is created and the data is already being observed
    this.getIEP()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getIEP'
  },
  methods: {
    async getIEP() {
      this.error = this.iep = null
      this.loading = true

      //see https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888
      //for more complete example with using headers for authorization
      const url = 'https://virtserver.swaggerhub.com/teammurphy/related-services/1.0.1/ieps/byStudentId/' + this.studentId;
      const res = await fetch(url, {
        headers: {
          'Content-Type':'application/json'
        }
      });
      const ieps = await res.json();

      //add value and text properties to iep array so we can use it in the select easily
      ieps.forEach(function(obj){
        obj.text = obj.startDate + " - " + obj.endDate;
        obj.value = obj.id.toString();
      });
      
      this.loading = false;
      this.ieps = ieps;
      //set the first iep in list as active
      this.iepId = ieps[0].id;
    }
  }
}
</script>
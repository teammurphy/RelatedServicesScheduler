<template>
<div class="student_iep">

  <BaseAlert v-bind:alert="this.alert"/>

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
              <IEP_Mandates v-bind:iepId="this.iepId"/>
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
              <IEP_Goals v-bind:iepId="this.iepId"/>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="info">Calendar</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <h1>Calendar_Generic v-bind:eventSources="this.eventSources"/</h1>
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
import BaseAlert from '@/components/BaseAlert.vue'
//import Calendar_Generic from '@/components/Calendar_Generic.vue'

export default {
  name: 'Student_IEP',
  components: {
    IEP_Mandates,
    IEP_Goals,
    BaseAlert
    //,
    //Calendar_Generic
  },
  props: {
    studentId: Number
    //,
    //  eventSources: [String]
  },
  data () {
    return {
      ieps: null,
      iepId: null,
      alert: {}
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
      this.iep = null
      this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Loading",
        message: "Fetching IEP Mandate from Database",
      };

      const url = process.env.VUE_APP_ROOT_API + 'ieps/byStudentId/' + this.studentId;
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
        const ieps = await response.json();
        //add value and text properties to iep array so we can use it in the select easily
        ieps.forEach(function(obj){
          obj.text = obj.startDate + " - " + obj.endDate;
          obj.value = obj.id.toString();
        });
        this.ieps = ieps;
        //set the first iep in list as active
        this.iepId = ieps[0].id;
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
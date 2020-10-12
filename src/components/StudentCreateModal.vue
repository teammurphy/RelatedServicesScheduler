<template>
  <div class="student-create-modal">
    <b-button variant="primary" v-b-modal.student-create-modal>
        <b-icon-person-plus-fill></b-icon-person-plus-fill> Create New Student
    </b-button>

    <b-modal id="student-create-modal" ref="studentCreateModal" title="Create Student" header-bg-variant="primary" @show="resetModal" @hidden="resetModal" @ok="handleOk">
      <base-alert v-bind="alert" />

      <b-overlay :show="showModalOverlay" rounded="sm">
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label="First Name" label-for="first_name-input" invalid-feedback="First Name is required">
                <b-form-input id="first_name-input" v-model="form.first_name" :state="firstNameState" required></b-form-input>
            </b-form-group>

            <b-form-group label="Last Name" label-for="last_name-input" invalid-feedback="Last Name is required">
                <b-form-input id="last_name-input" v-model="form.last_name"></b-form-input>
            </b-form-group>

            <b-form-group label="DBN" label-for="school_id-input" invalid-feedback="DBN is required">
                <b-form-input id="school_id-input" v-model="form.school_id" :state="schoolIdState" required></b-form-input>
            </b-form-group>

            <b-form-group label="OSIS #" label-for="OSIS-input" invalid-feedback="OSIS is required">
                <b-form-input id="OSIS-input" v-model="form.osis"></b-form-input>
            </b-form-group>

            <b-form-group label="Birth Date" label-for="birthDate-input" invalid-feedback="Birth Date is required">
                <b-form-input id="birthDate-input" v-model="form.birthdate" type="date"></b-form-input>
            </b-form-group>

            <b-form-group label="Grade" label-for="grade-select" invalid-feedback="Grade is required">
                <b-form-select v-model="form.grade" id="grade-select" :options="gradeOptions"></b-form-select>
            </b-form-group>

        </b-form>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
import { BIconPersonPlusFill } from "bootstrap-vue";
import BaseAlert from "@/components/BaseAlert.vue";
import StudentAPI from '../api/students.js'

export default {
  components: {
    BIconPersonPlusFill,
    BaseAlert,
  },
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        school_id: null,
        osis: "",
        birthdate: "",
        grade: "",
      },
      gradeOptions: [],
      firstNameState: null,
      schoolIdState: null,
      showModalOverlay: false,
      alert: {},
      informational: null,
      showInformational: false,
    };
  },
  mounted() {
    this.buildGradeOption()
  },
  methods: {
    ordinal(n) {
        if (n > 3 && n < 21) return "th"
        switch (n % 10) {
            case 1: return "st"
            case 2: return "nd"
            case 3: return "rd"
            default: return "th"
        }
    },

    buildGradeOption() {
        //prob should getfrom back end database to keep in sync
        let gradeOptions = [{ value: "3K", text: "3K" },{ value: "PK", text: "PreK" }]
        let i
        for (i = 1; i<=12; i++) {
            gradeOptions.push({value: i.toString(), text: `${i}${this.ordinal(i)} Grade`})
        }
        this.gradeOptions = gradeOptions
    },

    checkFormValidity() {
      //some checks before we actually submit name message
      const isValid = this.$refs.form.checkValidity();
      if (!isValid) {
        this.alert = {
          show: true,
          variant: "danger",
          name: "Validation Error",
          message: "error validating fields",
        };
        //we need to look at each field in turn to know which were the problems
        this.firstNameState = this.form.firstName.trim().length > 0 ? true : false;
        this.schoolIdState = this.form.schoolId.trim().length > 0 ? true : false;
      } else {
        this.alert = {}
        this.firstNameState = true;
        this.schoolIdState = true;
      }
      return isValid;
    },

    hideModal() {
      this.resetModal();
      this.$refs["studentCreateModal"].hide();
    },

    resetModal() {
      //blank everything else out
      for (const property in this.form) {
          this.form[property] = null
      } 
    },

    handleOk(bvModalEvt) {
        //prevent modal from closing
        bvModalEvt.preventDefault();
        //trigger submit handler
        //Exit when the form isn't valid
        if (!this.checkFormValidity()) {
            return;
        }
        //we can set data = this.form, and then pass that to handle submit if we need to massage
        this.handleSubmit();
    },

    async handleSubmit() {
        this.alert = {
            show: true,
            showSpinner: true,
            variant: "info",
            name: "Loading",
            message: "Submitting new student",
        };
        this.showModalOverlay = true;

        const payload = await StudentAPI.createStudent(this.form)
        if (payload.ok) {
            this.alert = {}
            this.$emit('on-student-added', payload.data)
            //this.hideModal()
        } else {
            this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
        }
        this.showModalOverlay = false;
    }
  }
}
</script>
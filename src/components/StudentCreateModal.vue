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

            <b-form-group label="District" >
              <base-select-district @district-has-changed="handleDistrictChange" />              
            </b-form-group>

            <b-form-group label="School ID" label-for="school_id-input" invalid-feedback="School ID is required">
              <base-select-school-by-district v-bind:district="form.district" :key="form.district" @school-has-changed="handleSchoolChange"/>
            </b-form-group>

            <b-form-group label="OSIS #" label-for="OSIS-input" invalid-feedback="OSIS is required">
                <b-form-input id="OSIS-input" v-model="form.osis"></b-form-input>
            </b-form-group>

            <b-form-group label="Birth Date" label-for="birthDate-input" invalid-feedback="Birth Date is required">
                <b-form-input id="birthDate-input" v-model="form.birthdate" type="date"></b-form-input>
            </b-form-group>

            <b-form-group label="Grade" label-for="grade-select" invalid-feedback="Grade is required">
              <base-select-grade @grade-has-changed="handleGradeChange" /> 
            </b-form-group>

        </b-form>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import BaseSelectDistrict from "@/components/BaseSelectDistrict.vue";
import BaseSelectGrade from "@/components/BaseSelectGrade.vue";
import BaseSelectSchoolByDistrict from "@/components/BaseSelectSchoolByDistrict.vue";
import { BIconPersonPlusFill } from "bootstrap-vue";
import StudentAPI from '../api/student.js'

export default {
  name: "StudentCreateModal",
  components: {
    BIconPersonPlusFill,
    BaseAlert,
    BaseSelectDistrict,
    BaseSelectGrade,
    BaseSelectSchoolByDistrict
  },
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        district: "",
        school_id: null,
        osis: "",
        birthdate: "",
        grade: "",
      },
      firstNameState: null,
      schoolIdState: null,
      showModalOverlay: false,
      alert: {},
      informational: null,
      showInformational: false,
    };
  },

  methods: {
    handleDistrictChange(district) {
      this.form.district = district
      //school list will be updated as we have :key="form.district"
    },

    handleGradeChange(grade) {
      this.form.grade = grade
    },

    handleSchoolChange(schoolId) {
      this.form.school_id = schoolId
    },

    checkFormValidity() {
      //some checks before we actually submit name message
      const isValid = this.$refs.form.checkValidity();
      if (!isValid) {
        this.alert = {show: true, variant: "danger", name: "Validation Error", message: "error validating fields"};
        //we need to look at each field in turn to know which were the problems
        this.firstNameState = this.form.first_name.trim().length > 0 ? true : false;
        this.schoolIdState = this.form.school_id.trim().length > 0 ? true : false;
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
        this.alert = {show: true, showSpinner: true, variant: "info", name: "Loading", message: "Submitting new student",};
        this.showModalOverlay = true;

        const payload = await StudentAPI.createStudent(this.form)
        if (payload.ok) {
            this.alert = {}
            this.$emit('on-student-added', payload.data)
            this.resetModal()
            //this.hideModal()
        } else {
            this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
        }
        this.showModalOverlay = false;
    }
  }
}
</script>
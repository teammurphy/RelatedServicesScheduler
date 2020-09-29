<template>
<div class="student_create_modal">
    <b-button variant="primary" v-b-modal.student-create-modal>Create New Student</b-button>

    <!--    add fading alerts here to let the user know the form has been submitted, 
            and inform when successful - or perhaps this should be in the model itself before
            before allow closing
    -->

    <b-modal 
        id="student-create-modal" 
        ref="modal"
        title="Create Student"
        @show="resetModal"
        @hidden="resetModal"
        @ok=handleOk
    >

        <b-alert v-if="loading" class="loading" show>
            <b-spinner label="Loading..." class="loading"></b-spinner>
            Loading Something ...
        </b-alert>

        <b-alert v-if="error" class="error" variant="danger" show>
            {{ error.name }} - {{ error.message }}
        </b-alert>

        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
                label="First Name"
                label-for="firstName-input"
                invalid-feedback="First Name is required"
            >
                <b-form-input
                    id="firstName-input"
                    v-model="firstName"
                    :state="firstNameState"
                    required
                    placeholder="Jane"
                >
                </b-form-input>
            </b-form-group>

            <b-form-group
                label="Last Name"
                label-for="lastName-input"
                invalid-feedback="Last Name is required"
            >
                <b-form-input
                    id="lastName-input"
                    v-model="lastName"
                    placeholder="Doe"
                >
                </b-form-input>
            </b-form-group>

            <b-form-group
                label="DBN"
                label-for="schoolId-input"
                invalid-feedback="DBN is required"
            >
                <b-form-input
                    id="schoolId-input"
                    v-model="schoolId"
                    :state="schoolIdState"
                    required
                    placeholder="24Q299"
                >
                </b-form-input>
            </b-form-group>

            <b-form-group
                label="OSIS #"
                label-for="OSIS-input"
                invalid-feedback="OSIS is required"
            >
                <b-form-input
                    id="OSIS-input"
                    v-model="OSIS"
                    placeholder="1111111"
                >
                </b-form-input>
            </b-form-group>

            <b-form-group
                label="Birth Date"
                label-for="birthDate-input"
                invalid-feedback="Birth Date is required"
            >
                <b-form-input
                    id="birthDate-input"
                    v-model="birthDate"
                    type='date'
                    placeholder="11/11/2000"
                >
                </b-form-input>
            </b-form-group>

            <b-form-group
                label="Grade"
                label-for="grade-select"
                invalid-feedback="Grade is required"
            >
                <b-form-select v-model="grade" id="grade-select" :options="gradeOptions"></b-form-select>
            </b-form-group>
        </form>
        
    </b-modal>

</div>
</template>

<script>
export default {
  data() {
    return {
        firstName: '',
        lastName: '',
        schoolId: '',
        OSIS:'',
        birthDate:'',
        grade: '',
        gradeOptions: [
          { value: 'PreK', text: 'PreK' },
          { value: 'K', text: 'Kindergarten' },
          { value: '1', text: '1st Grade' },
          { value: '2', text: '2nd Grade' },
          { value: '3', text: '3rd Grade' }
        ],
        firstNameState: null,
        schoolIdState: null,
        error: null,
        loading: null
    }
  },
  methods: {
    checkFormValidity() {
        //some checks before we actually submit
        const isValid = this.$refs.form.checkValidity();
        if (!isValid) {
            this.error = 'error validating fields';
            //we need to look at each field in turn to know which were the problems
            this.firstNameState = ((this.firstName.trim().length >0) ? true : false);
            this.schoolIdState = ((this.schoolId.trim().length >0) ? true : false);
        } else {
            this.error = null;
            this.firstNameState = true;
            this.schoolIdState = true;
        }
        return isValid;
    },
    resetModal() {
        //blank everything else out
        this.firstName = '';
        this.lastName = '';
        this.firstName = '';
        this.schoolId = '';
        this.OSIS = '';
        this.birthDate = '';
        this.grade = '';
    },
    handleOk(bvModalEvt) {
        //prevent modal from closing
        bvModalEvt.preventDefault();
        //trigger submit handler
        this.handleSubmit();
    },
    handleSubmit() {
        //Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }

        //do a submit to the server
        //show "submitting" alert
        //wait for response, and 
        //display results of successful submit in fading alert

        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
    }
  }
}
</script>
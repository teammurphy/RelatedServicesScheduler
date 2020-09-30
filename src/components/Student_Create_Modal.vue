<template>
<div class="student_create_modal">
    
    <b-button variant="primary" v-b-modal.student-create-modal><b-icon-person-plus-fill></b-icon-person-plus-fill> Create New Student</b-button>

    <b-alert dismissible fade :show="showInformational">
        {{ informational }}
    </b-alert>
    <!--    add fading alerts here to let the user know the form has been submitted, 
            and inform when successful - or perhaps this should be in the model itself before
            before allow closing
    -->

    <b-modal 
        id="student-create-modal" 
        ref="studentCreateModal"
        title="Create Student"
        header-bg-variant="primary"
        @show="resetModal"
        @hidden="resetModal"
        @ok=handleOk
    >

        <b-alert v-if="loading" class="loading" show>
            <b-spinner label="Loading..." class="loading"></b-spinner>
            {{ loading }}
        </b-alert>

        <b-alert v-if="error" class="error" variant="danger" show>
            {{ error.name }} - {{ error.message }}
        </b-alert>
        <b-overlay :show="showModalOverlay" rounded="sm">
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label="First Name" label-for="firstName-input" invalid-feedback="First Name is required">
                <b-form-input id="firstName-input" v-model="form.firstName" :state="firstNameState" required></b-form-input>
            </b-form-group>

            <b-form-group label="Last Name" label-for="lastName-input" invalid-feedback="Last Name is required">
                <b-form-input id="lastName-input" v-model="form.lastName"> </b-form-input>
            </b-form-group>

            <b-form-group label="DBN" label-for="schoolId-input" invalid-feedback="DBN is required">
                <b-form-input id="schoolId-input" v-model="form.schoolId" :state="schoolIdState" required></b-form-input>
            </b-form-group>

            <b-form-group label="OSIS #" label-for="OSIS-input" invalid-feedback="OSIS is required">
                <b-form-input id="OSIS-input" v-model="form.OSIS"></b-form-input>
            </b-form-group>

            <b-form-group label="Birth Date" label-for="birthDate-input" invalid-feedback="Birth Date is required">
                <b-form-input id="birthDate-input" v-model="form.birthDate" type='date'></b-form-input>
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
import { BIconPersonPlusFill } from 'bootstrap-vue'

export default {
    components: {
        BIconPersonPlusFill
    },
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                schoolId: '',
                OSIS:'',
                birthDate:'',
                grade: '',
            },
            gradeOptions: [
                { value: 'PreK', text: 'PreK' },
                { value: 'K', text: 'Kindergarten' },
                { value: '1', text: '1st Grade' },
                { value: '2', text: '2nd Grade' },
                { value: '3', text: '3rd Grade' }
            ],
            firstNameState: null,
            schoolIdState: null,
            showModalOverlay: false,
            error: null,
            loading: null,
            informational: null,
            showInformational : false
        }
    },
    methods: {
        checkFormValidity() {
            //some checks before we actually submit name message
            const isValid = this.$refs.form.checkValidity();
            if (!isValid) {
                this.error = {name: "Validation Error", message: 'error validating fields'};
                //we need to look at each field in turn to know which were the problems
                this.firstNameState = ((this.form.firstName.trim().length >0) ? true : false);
                this.schoolIdState = ((this.form.schoolId.trim().length >0) ? true : false);
            } else {
                this.error = null;
                this.firstNameState = true;
                this.schoolIdState = true;
            }
            return isValid;
        },
        hideModal() {
            this.resetModal();
            this.$refs['studentCreateModal'].hide();
        },
        resetModal() {
            //blank everything else out
            this.form.firstName = '';
            this.form.lastName = '';
            this.form.firstName = '';
            this.form.schoolId = '';
            this.form.OSIS = '';
            this.form.birthDate = '';
            this.form.grade = '';
        },
        handleOk(bvModalEvt) {
            //prevent modal from closing
            bvModalEvt.preventDefault();
            //trigger submit handler
            //Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            //need to build data object
            //we can set data = this.form, and then pass that to handle submit if we need to massage
            this.handleSubmit();
        },
        async handleSubmit() {
            //do a submit to the server
            //show "submitting" alert
            //wait for response, and 
            //display results of successful submit in fading alert
            this.error = this.user = null;
            this.loading = "Submitting new student";
            this.showModalOverlay = true;

            const url = process.env.VUE_APP_ROOT_API + '/student';
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(this.form)
                });
                if (!response.ok) {
                    //we got response - but not one we like - like a 404 or something
                    throw new Error({
                        name: response.status, 
                        message: response.statusText
                    });
                }
                //good response, now lets try get the payload which should represent the newly added student document
                this.hideModal();
                //const data = await response.json();
                //show something like first and last name - but get from response doc
                this.informational = "Student " + "data.firstName" + " " + "data.lastName" + " successfully added";
                this.showInformational = true;
                
                //notify parent so the new entry can be added bakck to the database
            } catch(error) {
                this.error = error;
            } finally {
                this.loading = null;
                this.showModalOverlay = false;
            }
        }
    }
}
</script>
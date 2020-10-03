<template>
<div class="auth-signup-modal">
    
    <b-dropdown-item v-b-modal.user-signup-modal>Sign Up</b-dropdown-item>

    <b-modal id="user-signup-modal" ref="userSignupModal" title="Sign Up" @show="resetModal" header-bg-variant="primary" header-text-variant="white" @hidden="resetModal" @ok=handleOk>
        
        <b-alert v-if="error" class="error" variant="danger" show>
            {{ error.name }} - {{ error.message }}
        </b-alert>
        
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label="Username" label-for="username-input" invalid-feedback="Username is required">
                <b-form-input type="email" id="username-input" v-model="form.username" :state="usernameState" required></b-form-input>
            </b-form-group>

            <b-form-group label="Email" label-for="email-input" invalid-feedback="Email is required">
                <b-form-input type="email" id="email-input" v-model="form.email" :state="emailState" required></b-form-input>
            </b-form-group>

            <b-form-group label="Password" label-for="password-input" invalid-feedback="Password is required">
                <b-form-input type="password" id="password-input" v-model="form.password" :state="passwordState" required> </b-form-input>
            </b-form-group>

            <h1>Add the other fields when we work it out</h1>

        </b-form>
        
    </b-modal>

</div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                email: ''
            },
            usernameState: null,
            passwordState: null,
            emailState: null,
            error: null
        }
    },
    methods: {
        checkFormValidity() {
            //some checks before we actually submit name message
            const isValid = this.$refs.form.checkValidity();
            if (!isValid) {
                this.error = {name: "Validation Error", message: 'error validating fields'};
                //we need to look at each field in turn to know which were the problems
                this.usernameState = ((this.form.username.trim().length >0) ? true : false);
                this.passwordState = ((this.form.password.trim().length >0) ? true : false);
                this.emailState = ((this.form.email.trim().length >0) ? true : false);
            } else {
                this.error = null;
                this.usernameState = true;
                this.passwordState = true;
                this.emailState = true;
            }
            return isValid;
        },
        hideModal() {
            this.resetModal();
            this.$refs['userSignupModal'].hide();
        },
        resetModal() {
            //blank everything else out
            this.form.username = '';
            this.form.password = '';
            this.form.email = '';
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
            this.register();
        },
        register() {
            this.$store.dispatch('register', {
                username: this.username,
                last_name: "Smith",
                first_name: "Fred",
                email: this.email,
                password: this.password
            })
            .then( () => {
                this.$router.push({ name: 'dashboard'})
            })
            .catch(err => {
                this.error = err
            })
        }
    }
}
</script>
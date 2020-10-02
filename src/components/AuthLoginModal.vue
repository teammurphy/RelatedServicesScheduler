<template>
<div class="auth-login-modal">
    
    <b-dropdown-item v-b-modal.user-login-modal>Sign In</b-dropdown-item>

    <b-modal id="user-login-modal" ref="userLoginModal" title="Login" header-bg-variant="primary" @show="resetModal" @hidden="resetModal" @ok=handleOk>
        
        <b-alert v-if="error" class="error" variant="danger" show>
            {{ error.name }} - {{ error.message }}
        </b-alert>
        
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label="Username" label-for="username-input" invalid-feedback="Username is required">
                <b-form-input type="email" id="username-input" v-model="form.username" :state="usernameState" required></b-form-input>
            </b-form-group>

            <b-form-group label="Password" label-for="password-input" invalid-feedback="Password is required">
                <b-form-input type="password" id="password-input" v-model="form.password" :state="passwordState" required> </b-form-input>
            </b-form-group>

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
                password: ''
            },
            usernameState: null,
            passwordState: null,
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
            } else {
                this.error = null;
                this.usernameState = true;
                this.passwordState = true;
            }
            return isValid;
        },
        hideModal() {
            this.resetModal();
            this.$refs['userLoginModal'].hide();
        },
        resetModal() {
            //blank everything else out
            this.form.username = '';
            this.form.password = '';
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

            const url = process.env.VUE_APP_ROOT_API + 'user/login';
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
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    //do we have to set the vuex stuff
                    this.hideModal();
                }
                this.hideModal();
                //const data = await response.json();
                //now we have to set the vuex stuff and set nav icons properly
                
                //notify parent so the new entry can be added bakck to the database
            } catch(error) {
                this.error = error;
            }
        }
    }
}
</script>
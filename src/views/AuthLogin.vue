<template>
<b-container class="auth-login">
    <b-form @submit.prevent="login">
        <b-card header="Login" header-bg-variant="primary" header-text-variant="white" style="max-width: 20rem" class="mx-auto">
    
            <b-form-group label="Username:">
                <b-form-input v-model="username" name="username" ></b-form-input>
            </b-form-group>

            <b-form-group label="Password:">
                <b-form-input v-model="password" type="password"></b-form-input>
            </b-form-group>

    
            <b-button type="submit" name="button" variant="primary">Login</b-button>

            <BaseAlert v-bind:alert="this.alert"/>

            <b-card-footer>
                <router-link to="/register">Don't have an account? Register</router-link>
            </b-card-footer>
        </b-card>
    </b-form>
</b-container>
</template>

<script>
import BaseAlert from '@/components/BaseAlert.vue'

export default {
    components: {
        BaseAlert
    },
    data() {
        return{
            username: '',
            password: '',
            alert: {}
        }
    },
    created() {
        //now set the vuex breadcrumbs state so breadcrumbs are updated
        this.$store.dispatch('replaceBreadcrumbs', [
            {text: 'Home',to: {name: 'Home'}},
            {text: 'Login',active: true}
        ]);
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
            .then( () => {
                this.$router.push({ name: 'dashboard'})
            })
            .catch(err => {
                this.alert = {
                    show: true,
                    variant: "danger",
                    name: err.name,
                    message: err.message
                }
            })
        }
    }
}
</script>
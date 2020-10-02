<template>
  <b-container class="auth-login">
    <b-card header="Register" header-bg-variant="primary" header-text-variant="white" style="max-width: 20rem" class="mx-auto">
      <form class="form-signin" @submit.prevent="register">

        <b-form-group label="Username:">
          <b-form-input v-model="username" name="username" type="text"></b-form-input>
        </b-form-group>

        <b-form-group label="Email:">
          <b-form-input v-model="email" name="email" type="email"></b-form-input>
        </b-form-group>

        <b-form-group label="Password:">
          <b-form-input v-model="password" name="password" type="password"></b-form-input>
        </b-form-group>
    
        <b-alert show variant="danger" v-if="error" class="error">{{ error }}</b-alert>

        <router-link to="/login">Already have an account? Login</router-link>

        <b-card-footer>
          <b-button type="submit" name="button" variant="primary">Register</b-button>
        </b-card-footer>

      </form>
    </b-card>
  </b-container>
</template>

<script>
    export default {
        data() {
            return{
                username: '',
                email: '',
                password: '',
                error: null
            }
        },
        created() {
            //now set the vuex breadcrumbs state so breadcrumbs are updated
            this.$store.dispatch('replaceBreadcrumbs', [
                {text: 'Home',to: {name: 'Home'}},
                {text: 'Register',active: true}
            ]);
        },
        methods: {
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

<style scoped></style>
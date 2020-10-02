<template>
    <div>
        <form @submit.prevent="login">
    
          <label for="email">
            Email:
          </label>
          <input v-model="email" name="email" value>
    
          <label for="password">
            Password:
          </label>
          <input v-model="password" type="password" name value>
    
          <button type="submit" name="button">
            Login
          </button>

          <p>{{ error }}</p>

            <div>
                <router-link to="/register">
                    Don't have an account? Register
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                email: '',
                password: '',
                error: null
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', {
                    username: this.email,
                    password: this.password
                })
                .then( () => {
                  this.$router.push({ name: 'dashboard'})
                })
                .catch(err => {
                    this.error = err.message
                })
            }
        }
    }
</script>

<style scoped>
</style>
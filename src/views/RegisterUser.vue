<template>
    <div>
        <form @submit.prevent="register">
          <label for="name">
            Name:
          </label>
          <input v-model="name" type="text" name="name" value>
    
          <label for="email">
            Email:
          </label>
          <input v-model="email" type="email" name="email" value>
    
          <label for="password">
            Password:
          </label>
          <input v-model="password" type="password" name value>
    
          <button type="submit" name="button">
            Register
          </button>

          <p>{{ error }}</p>

          <div>
            <router-link to="/login">
              Already have an account?  Login
            </router-link>
          </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                name: '',
                email: '',
                password: '',
                error: null
            }
        },
        methods: {
            register() {
                this.$store.dispatch('register', {
                    username: this.name,
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
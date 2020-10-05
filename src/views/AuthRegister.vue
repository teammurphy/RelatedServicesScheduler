<template>
  <b-container class="auth-login">
    <b-card
      header="Register"
      header-bg-variant="primary"
      header-text-variant="white"
      style="max-width: 20rem"
      class="mx-auto"
    >
      <form class="form-signin" @submit.prevent="register">
        <b-form-group label="Username:">
          <b-form-input
            v-model="username"
            name="username"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Email:">
          <b-form-input
            v-model="email"
            name="email"
            type="email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password:">
          <b-form-input
            v-model="password"
            name="password"
            type="password"
          ></b-form-input>
        </b-form-group>

        <base-alert v-bind="alert" />

        <router-link to="/login">Already have an account? Login</router-link>

        <b-card-footer>
          <b-button type="submit" name="button" variant="primary"
            >Register</b-button
          >
        </b-card-footer>
      </form>
    </b-card>
  </b-container>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";

export default {
  components: {
    BaseAlert,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      alert: {},
    };
  },
  created() {
    //now set the vuex breadcrumbs state so breadcrumbs are updated
    this.$store.dispatch("replaceBreadcrumbs", [
      { text: "Home", to: { name: "home" } },
      { text: "Register", active: true },
    ]);
  },
  methods: {
    register() {
      this.alert = {
        show: true,
        showSpinner: true,
        variant: "info",
        name: "Registering",
        message: "Registering you as a new user"
      }
      this.$store
        .dispatch("register", {
          username: this.username,
          last_name: "Smith",
          first_name: "Fred",
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.alert = {}
          //this.$router.push({ name: "dashboard" });
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          this.alert = {
            show: true,
            variant: "danger",
            name: err.name,
            message: err.message,
          };
        });
    },
  },
};
</script>
<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <router-link tag="b-navbar-brand" to="/">Related Services Scheduler</router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link tag="b-nav-item" to="/about">About</router-link>
            <router-link tag="b-nav-item" to="/students">Students</router-link>
            <router-link tag="b-nav-item" to="/users">Providers</router-link>


            <router-link tag="b-nav-item" to="/dashboard">Dashboard</router-link>

            <b-nav-item-dropdown text="Garbage" v-if="getStoreRoleNames.includes('admin')">
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item v-if="getStoreRoleNames.includes('provider')">Provider Stuff</b-nav-item>
            <b-nav-item v-if="getStoreRoleNames.includes('supervisor')">Supervisor Stuff</b-nav-item>
            <b-nav-item v-if="getStoreRoleNames.includes('principal')">Principal Stuff</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown text="Admin" right>
              <router-link tag="b-dropdown-item" to="/demofullcalendar">FullCalendar</router-link>
              <router-link tag="b-dropdown-item" to="/adminusers">Users</router-link>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>Users Name</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>

              <auth-signup-modal v-if="!getStoreLoggedIn" />

              <auth-login-modal v-if="!getStoreLoggedIn" />

              <router-link tag="b-dropdown-item" v-if="!getStoreLoggedIn" to="/login">Login</router-link>
              <router-link tag="b-dropdown-item" v-if="!getStoreLoggedIn" to="/register">Register</router-link>

              <b-dropdown-item v-if="getStoreLoggedIn" @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

</template>

<script>
import AuthLoginModal from '@/components/AuthLoginModal.vue'
import AuthSignupModal from '@/components/AuthSignupModal.vue'
import { authComputed } from '../store/helpers.js'

export default {
  computed: {
    ...authComputed
  },
  components: {
    AuthLoginModal,
    AuthSignupModal,
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
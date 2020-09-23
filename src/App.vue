<template>
  <div id="app">

    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <router-link tag="b-navbar-brand" to="/">Related Services Scheduler</router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>

            <router-link tag="b-nav-item" to="/about">About</router-link>
            <router-link tag="b-nav-item" to="/demofullcalendar">FullCalendar</router-link>
            <router-link tag="b-nav-item" to="/students">Students</router-link>
            <router-link tag="b-nav-item" to="/users">Users</router-link>

          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <template>
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    </template>

    <router-view tag="b-container"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['breadcrumbs'])
  }
}
</script>

<style>
.object_display {
  border: 3px double #ccc;
  padding: 0.5em;
}
.object_display dt {
  float: left;
  clear: left;
  width: 100px;
  text-align: right;
  font-weight: bold;
  color: green;
}
.object_display dt::after {
  content: ":";
}
.object_display dd {
  margin: 0 0 0 110px;
  padding: 0 0 0.5em 0;
}

</style>

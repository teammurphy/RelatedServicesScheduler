<template>
<b-container>
  <h1>Related Service Scheduler</h1>
  <p>
    A Vue.js app to manage related services scheduling.  Will be using fullcalendar
    for calendaring services.  Information comes from REST endpoints, currently
    served from a fastapi server fronting a postgres server, but hopefully much will eventually come from DOE sources.
  </p>

  <h3>Installed CLI Plugins</h3>
  <ul>
    <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
    <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
    <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
    <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
  </ul>

  <h3>Other plugins</h3>
  <ul>
    <li>
      <a href="https://bootstrap-vue.org/docs" target="_blank" rel="noopener">bootstrap-vue-app</a>
      <p>Added using the Vue Cli.  See <a href="https://vuejsdevelopers.com/2020/07/29/bootstrap-vue/">Build a Bootstrap 4 & Vue App</a> for more information.</p>
      <pre>
        <code class="language-bash hljs">
          $ vue create bootstrap-vue-app
        </code>
      </pre>
    </li>
    <li>
      <a href="https://fullcalendar.io">fullcalendar</a>
      <p>Will provide a mechanism for displaying and manipulating the related service schedules</p>
      <pre>
        <code class="language-bash hljs">
          $ npm install --save @fullcalendar/vue @fullcalendar/daygrid
        </code>
        <code class="language-bash hljs">
          $ npm install --save @fullcalendar/interaction @fullcalendar/timegrid
        </code>
      </pre>

    </li>
  </ul>
  
  <h3>Ecosystem</h3>
  <ul>
    <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
    <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
    <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
    <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
    <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
  </ul>
</b-container>
</template>

<script>
  export default {
    created() {
      //now set the vuex breadcrumbs state so breadcrumbs are updated
      this.$store.dispatch('replaceBreadcrumbs', [
        {
          text: 'Home',
          to: {name: 'home'}
        },
        {
          text: 'About',
          active: true
        }
      ]);
    }
  }
</script>

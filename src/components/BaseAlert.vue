<template>
    <b-alert :class="alert.error" :variant="alert.variant" :show="alert.show" :dismissible="alert.dismissible" fade>
        <b-spinner v-if="alert.showSpinner" label="Loading..." class="loading"></b-spinner>
        <strong>{{ alert.name }}</strong> {{ alert.message }}
    </b-alert>
</template>

<script>
/*
pass in alert with properties in the form...
alert: {show: true,
        showSpinner: true,
        dismissible: false,
        class: "loading",
        variant: "info", //primary, secondary, success, danger, warning, info, light, dark
        name: "Loading",
        message: "Fetching Student List from Database"
*/
export default {
    name: 'BaseAlert',
    props: {
        alert: Object
    }
}
</script>
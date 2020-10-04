<template>
    <b-alert :variant="variant" :show="show" :dismissible="dismissible" fade>
        <b-spinner v-if="showSpinner" label="Loading..." class="loading"></b-spinner>
        <strong>{{ name }}</strong> {{ message }}
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
    //name: 'BaseAlert',
    props: {
        show: {type: Boolean, default: false},
        showSpinner: {type: Boolean, default: false},
        dismissible: {type: Boolean, default: false},
        variant: {type: String, default: "info"},
        name: {type: String, required: false},
        message: {type: String, required: true}
    }
}
</script>
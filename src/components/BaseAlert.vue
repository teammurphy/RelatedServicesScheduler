<template>
    <b-alert :variant="variant" :show="show" :dismissible="dismissible" fade>
        <b-spinner v-if="showSpinner" label="Loading..." class="loading"></b-spinner>
        <b-icon-exclamation-diamond-fill v-if="variant=='danger'"></b-icon-exclamation-diamond-fill>
        <b-icon-info-circle-fill v-if="variant=='info'"></b-icon-info-circle-fill>
        <strong>{{ name }}</strong> {{ message }}
    </b-alert>
</template>

<script>
import { BIconExclamationDiamondFill, BIconInfoCircleFill } from "bootstrap-vue";

export default {
    components: {
        BIconExclamationDiamondFill,
        BIconInfoCircleFill
    },
    name: 'BaseAlert',
    props: {
        show: {type: Boolean, default: false},
        showSpinner: {type: Boolean, default: false},
        dismissible: {type: Boolean, default: false},
        variant: {type: String, default: "info"},
        name: {type: String, default: 'no name'},
        message: {type: String, default: 'no message'}
    }
}
</script>
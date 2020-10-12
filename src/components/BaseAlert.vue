<template>
    <b-alert :variant="variant" :show="show" :dismissible="dismissible" fade>
        <b-spinner v-if="showSpinner" label="Loading..." class="loading" variant="info"></b-spinner>
        <b-icon-exclamation-diamond-fill v-if="variant=='danger'" font-scale="3" variant="danger"></b-icon-exclamation-diamond-fill>
        <b-icon-info-circle-fill v-if="variant=='info'" font-scale="3" variant="info"></b-icon-info-circle-fill>
        <b-icon-check-circle-fill v-if="variant=='success'" font-scale="3" variant="success"></b-icon-check-circle-fill>
        <b-icon-exclamation-circle-fill v-if="variant=='warning'" font-scale="3" variant="warning"></b-icon-exclamation-circle-fill>
        <strong>{{ name }}</strong> {{ message }}
    </b-alert>
</template>

<script>
import { BIconExclamationDiamondFill, BIconInfoCircleFill, BIconCheckCircleFill, BIconExclamationCircleFill } from "bootstrap-vue";

export default {
    components: {
        BIconExclamationDiamondFill,
        BIconInfoCircleFill,
        BIconCheckCircleFill,
        BIconExclamationCircleFill
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
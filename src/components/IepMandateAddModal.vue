<template>
<div> 
    <b-button v-b-modal.iep-mandate-add-modal variant="primary"><b-icon-plus ></b-icon-plus> Add Mandate</b-button>

    <b-modal id="iep-mandate-add-modal" ref="iepMandateAddModal" title="Add Mandate" @show="resetModal" header-bg-variant="primary" header-text-variant="white" @hidden="resetModal" @ok=handleOk>
        <base-alert v-bind="alert" />

        <b-form ref="form" @submit.stop.prevent="handleOk">

            <b-form-group label="Service" label-for="service">
                <b-form-select id="service" v-model="form.service" :options="serviceOptions"></b-form-select>
            </b-form-group>

            <b-form-group label="Group Size" label-for="group-size">
                <b-form-input v-model="form.group_size" id="group-size" type="number"></b-form-input>
            </b-form-group>

            <b-form-group label="Duration (minutes)" label-for="duration">
                <b-form-input v-model="form.duration" id="duration" type="number"></b-form-input>
            </b-form-group>

            <b-form-group label="Periodicity" label-for="periodicity">
                <b-form-select id="periodicity" v-model="form.periodicity" :options="periodicityOptions"></b-form-select>
            </b-form-group>

            <b-form-group label="Frequency (how many times per period)" label-for="frequency">
                <b-form-input v-model="form.frequency" id="frequency" type="number"></b-form-input>
            </b-form-group>

            <b-form-group label="Interval (1 for every week, 2 for every other week...)" label-for="interval">
                <b-form-input v-model="form.interval" id="interval" type="number"></b-form-input>
            </b-form-group>

        </b-form>
        
    </b-modal>

</div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import { BIconPlus } from "bootstrap-vue";
import IEPAPI from '../api/iep.js'
import configs from '../config.js'

export default {
    name: "IEPMandateAddModal",
    components: {
        BaseAlert,
        BIconPlus
    },
    props: {
        iepId: Number
    },
    data() {
        return {
            alert: {},
            form: {
                service: configs.serviceOptions[0],
                group_size: 1,
                duration: 30,
                periodicity: configs.periodicityOptions[0],
                frequency: 1,
                interval: 1,
                iep_id: this.iepId
            },
            periodicityOptions: configs.periodicityOptions,
            serviceOptions: configs.serviceOptions
        };
    },

    methods: {
        handleOk(bvModalEvt) {
            //prevent modal from closing
            bvModalEvt.preventDefault();
            this.createMandate() 
        },

        hideModal() {
            this.resetModal();
            this.$refs["iepMandateAddModal"].hide();
        },

        resetModal() {
            //blank everything else out
            this.alert = {}
            this.form.service = configs.serviceOptions[0]
            this.form.group_size = 1
            this.form.duration = 30
            this.form.periodicity = configs.periodicityOptions[0]
            this.form.frequency = 1
            this.form.interval = 1
        },
       
        async createMandate() {
            this.alert = {show: true, showSpinner: true, variant: "info", name: "Submitting", message: "Adding Mandate"}
            const payload = await IEPAPI.createMandate(this.form)
            if (payload.ok) {
                this.alert = {}
                //emit event back to parent so we can update mandate table
                this.$emit("mandate-added", payload.data)

                this.resetModal();
                this.$refs["iepMandateAddModal"].hide();
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        }
    }
};
</script>
<template>
<div> 
    <b-button v-b-modal.iep-mandate-add-modal variant="primary">Add Mandate</b-button>

    <b-modal id="iep-mandate-add-modal" ref="iepMandateAddModal" title="Add Mandate" @show="resetModal" header-bg-variant="primary" header-text-variant="white" @hidden="resetModal" @ok=handleOk>
        <base-alert v-bind="alert" />

        <b-form ref="form" @submit.stop.prevent="handleOk">

            <b-form-group label="Service" label-for="service">
                <b-form-input v-model="form.service" id="service"></b-form-input>
            </b-form-group>

            <b-form-group label="Group Size" label-for="group-size">
                <b-form-input v-model="form.group_size" id="group-size" type="number"></b-form-input>
            </b-form-group>

            <b-form-group label="Duration" label-for="duration">
                <b-form-input v-model="form.duration" id="duration" type="number"></b-form-input>
            </b-form-group>

            <b-form-group label="Periodicity" label-for="periodicity">
                <b-form-input v-model="form.periodicity" id="periodicity"></b-form-input>
            </b-form-group>

            <b-form-group label="Frequency" label-for="frequency">
                <b-form-input v-model="form.frequency" id="frequency" type="number"></b-form-input>
            </b-form-group>

            <b-form-group label="Interval" label-for="interval">
                <b-form-input v-model="form.interval" id="interval" type="number"></b-form-input>
            </b-form-group>

        </b-form>
        
    </b-modal>

</div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import IEPAPI from '../api/iep.js'

export default {
    name: "IEPMandateAddModal",
    components: {
        BaseAlert,
    },
    props: {
        iepId: Number
    },
    data() {
        return {
            alert: {},
            form: {
                service: null,
                group_size: null,
                duration: null,
                periodicity: null,
                frequency: null,
                interval: null,
                iep_id: this.iepId
            }
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
            this.form.service = null
            this.form.group_size = null
            this.form.duration = null
            this.form.periodicity = null
            this.form.frequency = null
            this.form.interval = null
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
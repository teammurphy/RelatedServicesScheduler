<template>
<div> 
    <b-button v-b-modal.iep-add-modal variant="primary"><b-icon-plus ></b-icon-plus> Add IEP</b-button>

    <b-modal id="iep-add-modal" ref="iepAddModal" title="Add IEP" @show="resetModal" header-bg-variant="primary" header-text-variant="white" @hidden="resetModal" @ok=handleOk>
        <base-alert v-bind="alert" />

        <b-form ref="form" @submit.stop.prevent="handleOk">

            <b-form-group label="Start Date" label-for="start-date">
                <b-form-datepicker v-model="form.start_date" id="start-date"></b-form-datepicker>
            </b-form-group>

            <b-form-group label="End Date" label-for="end-date">
                <b-form-datepicker v-model="form.end_date" id="end-date"></b-form-datepicker>
            </b-form-group>

        </b-form>
        
    </b-modal>

</div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import { BIconPlus } from "bootstrap-vue";
import IEPAPI from '../api/iep.js'

export default {
    name: "IEPAddModal",
    components: {
        BaseAlert,
        BIconPlus
    },
    props: {
        studentId: Number
    },
    data() {
        return {
            alert: {},
            form: {
                start_date: null,
                end_date: null,
                student_id: this.studentId
            }
        };
    },

    methods: {
        handleOk(bvModalEvt) {
            //prevent modal from closing
            bvModalEvt.preventDefault();
            this.createIEP() 
        },

        hideModal() {
            this.resetModal();
            this.$refs["iepAddModal"].hide();
        },

        resetModal() {
            //blank everything else out
            this.alert = {}
            this.form.start_date = null
            this.form.end_date = null
        },
       
        async createIEP() {
            //create the IEPdocument in the database 
            this.alert = {show: true, showSpinner: true, variant: "info", name: "Submitting", message: "Adding IEP"}
            const payload = await IEPAPI.createIEP(this.form)
            if (payload.ok) {
                this.alert = {}
                //emit event back to parent so we can update caseload list
                this.$emit("iep-added", payload.data)

                this.resetModal();
                this.$refs["iepAddModal"].hide();
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        }
    }
};
</script>
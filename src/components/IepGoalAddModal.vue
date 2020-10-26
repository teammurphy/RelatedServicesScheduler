<template>
<div> 
    <b-button v-b-modal.iep-goal-add-modal variant="primary"><b-icon-plus ></b-icon-plus> Add Goal</b-button>

    <b-modal id="iep-goal-add-modal" ref="iepGoalAddModal" title="Add Goal" @show="resetModal" header-bg-variant="primary" header-text-variant="white" @hidden="resetModal" @ok=handleOk>
        <base-alert v-bind="alert" />

        <b-form ref="form" @submit.stop.prevent="handleOk">

            <b-form-group label="Goal" label-for="goal">
                <b-form-input v-model="form.goal" id="goal"></b-form-input>
            </b-form-group>

            <b-form-group label="Criteria" label-for="criteria">
                <b-form-input v-model="form.criteria" id="criteria"></b-form-input>
            </b-form-group>

            <b-form-group label="Method" label-for="method">
                <b-form-input v-model="form.method" id="method"></b-form-input>
            </b-form-group>

            <b-form-group label="Schedule" label-for="schedule">
                <b-form-input v-model="form.schedule" id="schedule"></b-form-input>
            </b-form-group>

        </b-form>
        
    </b-modal>

</div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import IEPAPI from '../api/iep.js'
import { BIconPlus } from "bootstrap-vue";

export default {
    name: "IEPGoalAddModal",
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
                goal: null,
                criteria: null,
                method: null,
                schedule: null,
                iep_id: this.iepId
            }
        };
    },

    methods: {
        handleOk(bvModalEvt) {
            //prevent modal from closing
            bvModalEvt.preventDefault();
            this.createGoal() 
        },

        hideModal() {
            this.resetModal();
            this.$refs["iepGoalAddModal"].hide();
        },

        resetModal() {
            //blank everything else out
            this.alert = {}
            this.form.goal = null
            this.form.criteria = null
            this.form.method = null
            this.form.schedule = null
        },
       
        async createGoal() {
            //create the IEPdocument in the database 
            this.alert = {show: true, showSpinner: true, variant: "info", name: "Submitting", message: "Adding Goal"}
            const payload = await IEPAPI.createGoal(this.form)
            if (payload.ok) {
                this.alert = {}
                //emit event back to parent so we can update goal table
                this.$emit("goal-added", payload.data)

                this.resetModal();
                this.$refs["iepGoalAddModal"].hide();
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        }
    }
};
</script>
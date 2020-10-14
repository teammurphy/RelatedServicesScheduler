<template>
<div class="caseload-add-modal">

    <b-modal id="caseload-add-modal" ref="caseloadAddModal" title="Add Caseload?" @show="resetModal" @hidden="resetModal" header-bg-variant="primary" header-text-variant="white" @ok=handleOk>
        
        <b-form ref="form" @submit.stop.prevent="handleOk">

            <b-form-group label="title" label-for="title">
                <b-form-input v-model="form.title" id="title"></b-form-input>
            </b-form-group>

            <b-form-group label="Related Service Area" label-for="service">
                <b-form-select id="service" v-model="form.service" :options="serviceAreas"></b-form-select>
            </b-form-group>
        </b-form>

        <base-alert v-bind="alert" />
        
    </b-modal>

</div>
</template>

<script>
import BaseAlert from '@/components/BaseAlert.vue'
import CaseloadAPI from '../api/caseload.js'
import { authComputed } from '../store/helpers.js'

export default {
    name: "CaseloadAddModal",
    components: {
        BaseAlert
    },
    computed: {
        ...authComputed
    },
    props: {
        userId: {type: Number, required: true},
        serviceAreas: Array //this is the uniqued list from the users roles
    },
    data() {
        return {
            alert: {},
            form: {
                title: "",
                service: ""
            },
        }
    },
    created() {
        this.form.service = this.serviceAreas[0]
    },
    methods: {
        resetModal() {
            this.form.title = ''
        },
        clearAlert() {
            this.alert = {}
        },
        hideModal() {
            this.resetModal();
            this.$refs['caseloadAddModal'].hide();
        },

        handleOk(bvModalEvt) {
            //prevent modal from closing
            bvModalEvt.preventDefault();
            this.alert = {show: true, variant: "info", name: "Create Caseload", message: "Creating new Caseload."}
            this.addCaseload()
            
        },
        async addCaseload() {
            this.alert = {show: true, showSpinner: true, variant: "info", name: "Submitting", message: "sending caseload to server"}
            this.form.user_id = this.userId
            const payload = await CaseloadAPI.addCaseload(this.form)
            if (payload.ok) {
                this.alert = {}
                //send caseload back up to parent
                this.$emit('on-add-caseload', payload.data)
                this.resetModal()
                this.$refs["caseloadAddModal"].hide();
                //this needs to do an emit back to the calling form with payload.data
            } else {
                console.log(payload)
                this.alert = {show: true, variant: "danger", name: "Error", message: "Could not submit caseload"}
            }
        }
    }
}
</script>
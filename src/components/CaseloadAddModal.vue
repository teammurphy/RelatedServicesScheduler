<template>
<div class="caseload-add-modal">

    <b-modal id="caseload-add-modal" ref="caseloadAddModal" title="Add Caseload?" @show="resetModal" @hidden="resetModal" header-bg-variant="primary" header-text-variant="white" @ok=handleOk>
        
        <b-form ref="form" @submit.stop.prevent="handleSubmit">

            <b-form-group label="title" label-for="title">
                <b-form-input id="title"></b-form-input>
            </b-form-group>

            <b-form-group label="Related Service Area" label-for="service">
                <b-form-select id="service" v-model="selectedArea" :options="serviceAreas"></b-form-select>
            </b-form-group>

        </b-form>

        <base-alert v-bind="alert" />
        
    </b-modal>

</div>
</template>

<script>
import BaseAlert from '@/components/BaseAlert.vue'
import { authComputed } from '../store/helpers.js'

export default {
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
            selectedArea: ''
        }
    },
    created() {
        this.selectedArea = this.serviceAreas[0]
    },
    methods: {
        resetModal() {
            this.title = ''
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
            this.alert = {
                show: true,
                variant: "info",
                name: "Create Caseload",
                message: "Creating new Caseload."
            }
            this.addCaseload()
            
        },
        async addCaseload() {
            const url = process.env.VUE_APP_ROOT_API + "caseload"
            let headers = new Headers()
            const token = this.getStoreToken
            this.form.user_id = this.user.id
            headers.append('Content-Type', 'application/json')
            if (token) {
                headers.append('Authorization', `Bearer ${token}`)
            }
            try { 
                const response = await fetch(url, {
                    method: 'Post',
                    mode: 'cors',
                    headers: headers,
                    body: JSON.stringify(this.form)
                });
                //normally we do the .json here, but not using the data in this case if submitted successfully
                //should be changed so we emit back to parent to update view
                const data = await response.json();
                if (response.ok) {
                    //this.whatever = data
                    this.alert = {}
                    this.hideModal()
                } else {
                    this.alert = {
                        show: true,
                        variant: "danger",
                        name: "Bad Response",
                        message: data.message
                    }
                } 
            } catch(error) {
                this.alert = {
                    show: true,
                    variant: "danger",
                    name: error.name,
                    message: error.message
                }
            }

        }
    }
}
</script>
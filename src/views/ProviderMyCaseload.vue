<template>
<b-container class="students" >

    <caseload-add-modal v-bind:userId="user.id" v-bind:serviceAreas="serviceAreas" @on-add-caseload="onAddCaseload" />

    <user-card v-bind="user" />

    <b-card>
        <b-form-group v-if="caseloadOptions.length" label="Caseloads" label-for="caseloadSelect">
            <b-form-select id="caseloadSelect" value-field="id" text-field="title" :options="caseloadOptions" @change="handleChange"></b-form-select>
        </b-form-group>

        <b-button variant="primary" @click="addCaseload">Add New Caseload</b-button>
        <b-button v-if="caseload" variant="danger" @click="confirmDeleteCaseload">Delete Entire Caseload</b-button>
    </b-card>

    <caseload-card v-if="caseload" v-bind="caseload" :key="caseload.id" />
   
</b-container>
</template> 

<script>
import UserCard from '@/components/UserCard.vue'
import CaseloadCard from '@/components/CaseloadCard.vue'
import CaseloadAddModal from '@/components/CaseloadAddModal.vue'
import { authComputed } from '../store/helpers.js'
import CaseloadAPI from '../api/caseload.js'

export default {
    name: "ProviderMyCaseload",
    components: {
        UserCard,
        CaseloadCard,
        CaseloadAddModal,
    },
    computed: {
        ...authComputed
    },
    data () {
        return {
            alert: {},
            user: null,
            caseloadOptions: [],
            caseload: null,
            serviceAreas: [],
        }
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.user = this.getStoreUser
        
        //get unique list of service areas for this user (normally a single area)
        this.serviceAreas = this.user.roles.map(item => item.service).filter((v,i,a) => a.indexOf(v) === i)

        this.displayBreadcrumbs();

        this.getCaseloads(this.user.id)
        
    },
    methods: {
        displayBreadcrumbs() {
            //now set the vuex breadcrumbs state so breadcrumbs are updated
            this.$store.dispatch('replaceBreadcrumbs', [
                {text: 'Home', to: {name: 'home'}},
                {text: 'My Caseload', active: true}
            ]);
        },

        handleChange(id) {
            //now set the caseload
            const filterArray = this.caseloadOptions.filter(function(e){
                return e.id == id
            })
            this.caseload = filterArray[0]
        },

        onAddCaseload(caseload) {
            //listen for the emit of the child CaseloadAddModal
            this.caseload = caseload
            this.caseloadOptions.push(caseload)
            //this.getCaseload()
        },

        addCaseload() {
            this.$bvModal.show("caseload-add-modal")
            this.alert = {}
        },
        
        async confirmDeleteCaseload() {
            const confirmDeletion = await this.$bvModal.msgBoxConfirm(`Are you sure you want to delete the entire ${this.caseload.title} caseload?`, {
                title: 'Confirm Delete'
                //other options here
            })
            if (confirmDeletion) {
                this.alert = {show: true, showSpinner: true, variant: "info", name: "Deleting", message: "Deleting caseload"}
                const payload = await CaseloadAPI.deleteCaseload(this.caseload.id)
                if (payload.ok) {
                    this.alert = {}
                    //refresh caseload list
                    this.getCaseloads(this.user.id)
                } else {
                    this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
                }
            }
        },

        async getCaseloads(userId) {
            //get the list of all caseloads for this user
            this.alert = {show: true, showSpinner: true, variant: "info", name: "Retrieving", message: "Getting all of your caseloads"}
            const payload = await CaseloadAPI.getCaseloads(userId)
            if (payload.ok) {
                this.alert = {}
                this.caseloadOptions = payload.data
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        }
    }
}
</script>
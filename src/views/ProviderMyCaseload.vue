<template>
<b-container class="students" >
    <base-confirm-deleteModal v-bind="deleteObject" @on-delete="onDelete"/>
    <caseload-add-modal v-bind:userId="user.id" v-bind:serviceAreas="serviceAreas" @on-add-caseload="onAddCaseload" />
    <user-card v-bind="user" />

    <b-card>
        <b-form-group v-if="caseloadOptions.length" label="Caseloads" label-for="caseloadSelect">
            <b-form-select id="caseloadSelect" v-model="selectedCaseload" :options="caseloadOptions" @change="getCaseload"></b-form-select>
        </b-form-group>

        <b-button variant="primary" @click="addCaseload">Add New Caseload</b-button>
        <b-button v-if="selectedCaseload" variant="danger" @click="deleteCaseload">Delete Entire Caseload</b-button>
    </b-card>

    <b-card v-if="selectedCaseload" :title="selectedCaseloadTitle">

        <base-alert v-bind="alert" />

        <b-table striped hover :items="caseload">
            <template v-slot:cell(case_id)="data">
                <b-icon-trash color="red" @click="deleteCase(data)"></b-icon-trash>
            </template>
        </b-table>

        <case-add-modal v-bind:caseloadId="selectedCaseload"/>
    
    </b-card>
</b-container>
</template> 

<script>
import UserCard from '@/components/UserCard.vue'
import BaseAlert from "@/components/BaseAlert.vue";
import BaseConfirmDeleteModal from '@/components/BaseConfirmDeleteModal.vue'
import CaseloadAddModal from '@/components/CaseloadAddModal.vue'
import CaseAddModal from '@/components/CaseAddModal.vue'
import { BIconTrash } from "bootstrap-vue";
import { authComputed } from '../store/helpers.js'
import StudentsAPI from '../api/students.js'
import CaseloadAPI from '../api/caseload.js'

export default {
    components: {
        UserCard,
        BaseAlert,
        BaseConfirmDeleteModal,
        CaseloadAddModal,
        CaseAddModal,
        BIconTrash
    },
    computed: {
        ...authComputed
    },
    data () {
        return {
            alert: {},
            user: null,
            selectedCaseload: null,
            selectedCaseloadTitle: '',
            caseloadOptions: [],
            caseload: null,
            serviceAreas: [],
            deleteObject: {path:"", message:""},
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

        onAddCaseload(caseload) {
            //listen for the emit of the child CaseloadAddModal
            this.selectedCaseload = caseload.id
            this.selectedCaseloadTitle = caseload.title
            caseload.value = caseload.id
            caseload.text = caseload.title
            this.caseloadOptions.push(caseload)
            this.getCaseload()
        },

        onDelete(data) {
            //listen for the emit of the BaseConfirmDeletionModal
            //something was deleted - refresh what is needed.
            console.log("delete", data)
            
            //refresh caseload options - which triggers a refresh of student list
            this.getCaseloads(this.user.id)
        },

        addCaseload() {
            this.$bvModal.show("caseload-add-modal")
        },
        deleteCase(caseObj) {
            this.deleteObject = {
                message: `Are you sure you want to drop ${caseObj.item.first_name} ${caseObj.item.last_name} from this caseload?`,
                path: "case/" + caseObj.item.case_id
            }
            this.$bvModal.show("base-confirm-delete-modal")
        },
        deleteCaseload() {
            this.deleteObject = {
                message: `Are you sure you want to delete the entire ${this.selectedCaseloadTitle} caseload?`,
                path: "caseload/" + this.selectedCaseload
            }
            this.$bvModal.show("base-confirm-delete-modal")
        },
        async getCaseloads(userId) {
            //get the list of all caseloads for this user
            this.alert = {
                show: true,
                showSpinner: true,
                variant: "info",
                name: "Retrieving",
                message: "Getting all of your caseloads"
            }
            const payload = await CaseloadAPI.getCaseloads(userId)
            if (payload.ok) {
                this.alert = {}

                this.caseloadOptions = payload.data.map(function(item) { 
                    return {value: item.id, text: item.title}
                });

                if (this.caseloadOptions.length) {
                    this.selectedCaseload = this.caseloadOptions[0].value
                    this.selectedCaseloadTitle = this.caseloadOptions[0].text
                    this.getCaseload()
                }
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        },

        async getCaseload() {
            //get all the students and such for the current caseload
            this.alert = {
                show: true,
                showSpinner: true,
                variant: "info",
                name: "Retrieving",
                message: "Retrieving students in caseload from database"
            }
            //need to set this.selectedCaseloadTitle
            const selectedOption = this.caseloadOptions.filter(obj => {
                return obj.value === this.selectedCaseload
            })
            this.selectedCaseloadTitle = selectedOption[0].text
            const payload = await StudentsAPI.getCaseloadStudents(this.selectedCaseload)
            if (payload.ok) {
                this.caseload = payload.data
                this.alert = {}
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
                this.caseload = []
            }
        
        }
    }
}
</script>

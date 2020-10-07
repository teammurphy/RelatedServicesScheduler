<template>
<b-container class="students">
    <base-confirm-deleteModal v-bind="deleteObject" />
    <caseload-add-modal v-bind:userId="user.id" v-bind:serviceAreas="serviceAreas" />
    <user-card v-bind="user" />

    <b-card>
        <b-form-group v-if="caseloadOptions.length" label="Caseloads" label-for="caseloadSelect">
            <b-form-select id="caseloadSelect" v-model="selectedCaseload" :options="caseloadOptions" @change="getCaseload"></b-form-select>
        </b-form-group>

        <b-button variant="primary" @click="addCaseload">Add New Caseload</b-button>
        <b-button variant="danger" @click="deleteCaseload">Delete Entire Caseload</b-button>
    </b-card>

    <b-card v-if="selectedCaseload" :title="selectedCaseloadTitle">

        <base-alert v-bind="alert" />

        <b-table striped hover :items="caseload">
            <template v-slot:cell(case_id)="data">
                <b-icon-trash color="red" @click="deleteCase(data)"></b-icon-trash>
            </template>
        </b-table>

        <b-button variant="primary" @click="addStudentToCaseload">Add student to this caseload</b-button>
    
    </b-card>
</b-container>
</template> 

<script>
import UserCard from '@/components/UserCard.vue'
import BaseAlert from "@/components/BaseAlert.vue";
import BaseConfirmDeleteModal from '@/components/BaseConfirmDeleteModal.vue'
import CaseloadAddModal from '@/components/CaseloadAddModal.vue'
import { BIconTrash } from "bootstrap-vue";
import { authComputed } from '../store/helpers.js'

export default {
    components: {
        UserCard,
        BaseAlert,
        BaseConfirmDeleteModal,
        CaseloadAddModal,
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
        //this.serviceAreas = this.user.roles.map(item => item.service).filter((v,i,a) =>a.indexOf(v)===i)
        this.serviceAreas = this.user.roles.map(function(item) {
            return item.service
        })
        //we really want to unique this list - but...
        /*.filter(function (v,i,a) {
            a.indexOf(v) === i
        })
        */
        this.displayBreadcrumbs();
    
        //this.caseloadOptions = this.user.caseloads.map(item => {value: item.id, text: item.title});
        this.caseloadOptions = this.user.caseloads.map(function(item) { 
            return {value: item.id, text: item.title}
        });
        this.selectedCaseload = this.caseloadOptions[0].value
        this.selectedCaseloadTitle = this.caseloadOptions[0].text

        this.getCaseload()
    
        //
        //call getCaseload only when we have a selectedCaseload
        //this.getCaseload(this.selectedCaseload);
    },
    methods: {
        displayBreadcrumbs() {
            //now set the vuex breadcrumbs state so breadcrumbs are updated
            this.$store.dispatch('replaceBreadcrumbs', [
                {text: 'Home', to: {name: 'home'}},
                {text: 'My Caseload', active: true}
            ]);
        },
        addCaseload() {
            this.$bvModal.show("caseload-add-modal")
        },
        addStudentToCaseload() {
            alert("give some mechanism for adding a student to a caseload")
        },
        deleteCase(caseObj) {
            this.deleteObject = {
                message: `Are you sure you want to drop ${caseObj.item.first_name} ${caseObj.item.last_name} from this caseload?`,
                path: "/case/" + caseObj.item.case_id
            }
            this.$bvModal.show("base-confirm-delete-modal")
        },
        deleteCaseload() {
            alert("deleteCaseload - still to be implemented - make sure brendan handles the cascading delete")
            this.deleteObject = {
                message: `Are you sure you want to delete the entire ${this.selectedCaseloadTitle} caseload?`,
                path: "/caseload/" + this.selectedCaseload
            }
            this.$bvModal.show("base-confirm-delete-modal")
        },
        async getCaseload() {
            this.alert = {
                show: true,
                showSpinner: true,
                variant: "info",
                name: "Retrieving",
                message: "Retrieving caseload from database"
            }

            //need to set this.selectedCaseloadTitle
            const selectedOption = this.caseloadOptions.filter(obj => {
                return obj.value === this.selectedCaseload
            })
            this.selectedCaseloadTitle = selectedOption[0].text


            //path to this api route should be changed to students/bycaseloadid/:caseloadid
            const url = process.env.VUE_APP_ROOT_API + "students/" + this.selectedCaseload
            //this.form.user_id = this.userId
            let headers = new Headers()
            //const token = authComputed.getStoreToken()
            const token = this.getStoreToken
            headers.append('Content-Type', 'application/json')
            if (token) {
                headers.append('Authorization', `Bearer ${token}`)
            }
            try { 
                const response = await fetch(url, {
                    mode: 'cors',
                    headers: headers,
                });
                const data = await response.json();
                if (response.ok) {
                    this.caseload = data
                    this.alert = {}
                } else {
                    this.caseload = []
                    this.alert = {
                        show: true,
                        variant: "danger",
                        name: "Bad Response",
                        message: data.message
                    }
                } 
            } catch(error) {
                this.caseload = []
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

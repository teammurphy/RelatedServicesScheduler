<template>
<b-card  :title="title">
    <base-alert v-bind="alert" />

    <b-table striped hover :items="cases" >
        <template v-slot:cell(case_id)="data">
            <b-icon-trash color="red" @click="deleteCase(data)"></b-icon-trash>
        </template>
    </b-table>

    <case-add-modal v-bind:caseloadId="id" @student-added-to-caseload="handleStudentAdded" />
    
</b-card>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import CaseAddModal from '@/components/CaseAddModal.vue'
import { BIconTrash } from "bootstrap-vue";
import StudentsAPI from '../api/student.js'
import CaseAPI from '../api/case.js'
//the api call for the caseload should be in CaseloadAPI, but is currently in StudentsAPI
//import CaseloadAPI from '../api/caseload.js'

export default {
    name: "CaseloadCard",
    components: {
        BaseAlert,
        CaseAddModal,
        BIconTrash
    },

    props: {
        title: {type: String},
        service: {type: String},
        user_id: {type: Number},
        id: {type: Number}
    },

    data () {
        return {
            alert: {},
            cases: []
        }
    },

    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getCaseload()
    },

    methods: {
        handleStudentAdded(student) {
            //the CaseAddModal component has emitted a new student back
            //either push into array, or refresh entire caseload
            console.log("student added -" + JSON.stringify(student))
            this.cases.push(student)
            //this.getCaseload()
        },

        async deleteCase(c) {
            const confirmDeletion = await this.$bvModal.msgBoxConfirm(`Are you sure you want to remove  ${c.item.first_name} ${c.item.last_name} from this caseload?`, {
                title: 'Confirm Delete'
                //other options here
            })
            if (confirmDeletion) {
                this.alert = {show: true, showSpinner: true, variant: "info", name: "Deleting", message: "Deleting case"}
                const payload = await CaseAPI.deleteCase(c.item.case_id)
                if (payload.ok) {
                    this.alert = {}
                    //either refresh entire caseload, or pull out the specific entry
                    this.getCaseload()
                } else {
                    this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
                }
            }
        },
 
        async getCaseload() {
            //get all the students and such for the current caseload
            this.alert = {show: true, showSpinner: true, variant: "info", name: "Retrieving", message: "Retrieving students"}
            //this should be moved to CaseloadAPI
            const payload = await StudentsAPI.getCaseloadStudents(this.id)
            if (payload.ok) {
                this.cases = payload.data
                this.alert = {}
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
                this.cases = []
            }
        }
    }
}
</script>
<template>
<div class="auth-login-modal">
    
    <b-button v-b-modal.case-add-modal variant="primary">Add Students to Caseload</b-button>

    <b-modal id="case-add-modal" ref="caseAddModal" title="Add Students to Caseload" @show="resetModal" header-bg-variant="primary" header-text-variant="white" @hidden="resetModal" hide-footer>
        <base-alert v-bind="alert" />

        <b-card header="Students added to caseload" v-if="studentsAddedToCaseload.length">
            <b-list-group>
                <b-list-group-item variant="success" v-for="student in studentsAddedToCaseload" :key="student">
                    {{ student }}
                </b-list-group-item>
            </b-list-group>
        </b-card>
        

        <b-form-group label="Student" label-for="student-id-input" invalid-feedback="Student is required">
            <b-form-select id="studentSelect" v-model="selectedStudentId" :options="studentOptions" @change="getStudentToAdd"></b-form-select>
        </b-form-group>

        <b-button v-if="selectedStudentId" @click="postStudentToDatabase" variant="primary"><b-icon-plus ></b-icon-plus> Add {{ selectedStudentName }} to Caseload</b-button>

        <b-nav align='end'>
            <b-button variant="danger" @click="$bvModal.hide('case-add-modal')">Cancel</b-button>
        </b-nav>
    </b-modal>

</div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import { BIconPlus } from "bootstrap-vue";
import { authComputed } from '../store/helpers.js'
import CaseAPI from '../api/case.js'
import StudentAPI from '../api/student.js'

export default {
    components: {
        BaseAlert,
        BIconPlus
    },
    props: {
        caseloadId: Number
    },
    computed: {
        ...authComputed
    },
    data() {
        return {
            alert: {},
            studentsAddedToCaseload: [],
            studentOptions: [
                {value: 1, text: "Freddy Mercury"},
                {value: 3, text: "Momma Katz"}
            ],
            selectedStudentId: null,
            selectedStudentName: ''
        };
    },
    methods: {
        hideModal() {
            this.resetModal();
            this.$refs["roleAddModal"].hide();
        },
        resetModal() {
            //blank everything else out
            this.alert = {}
            this.studentsAddedToCaseload = []
            this.selectedStudentId = null
            this.selectedStudentName = ''
        },
       
        getStudentToAdd() {
            //set the button to the students name
            const selectedOption = this.studentOptions.filter(obj => {
                return obj.value === this.selectedStudentId
            })
            this.selectedStudentName = selectedOption[0].text
            //
        },

        async getStudentList() {
            //here is where we run to database and get all students that this provider is allowed to see to let 
            //provider select from them
            this.alert = {
                show: true,
                showSpinner: true,
                variant: "info",
                name: "Fetching",
                message: "Getting list of students from database"
            }
            const roles = this.getStoreRoles
            const schools = roles.map(role => role.school).filter((v, i, a) => a.indexOf(v) === i)
            const payload = await StudentAPI.getStudentsBySchools(schools)
        },

        async postStudentToDatabase() {
            this.alert = {
                show: true,
                showSpinner: true,
                variant: "info",
                name: "Submitting",
                message: "Adding student to caseload"
            }
            const payload = await CaseAPI.addCase(this.caseloadId, this.selectedStudentId)
            if (payload.ok) {
                this.alert = {}
                //add to list of added students
                this.studentsAddedToCaseload.push(this.selectedStudentName)
                this.selectedStudentName = ''
                this.selectedStudentId = null
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        }
    }
};
</script>
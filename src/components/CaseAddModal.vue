.<template>
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

        <b-form-group v-if="schoolOptions.length>1" label="Select School" label-for="school-id-select">
            <b-form-select id="school-id=select" v-model="schoolId" :options="schoolOptions"></b-form-select>
        </b-form-group>

        <b-form-group label="Select Student" label-for="student-select">
            <base-select-student-by-school v-bind:schoolId="schoolId" :key="schoolId" @student-has-changed="handleStudentChange" />
        </b-form-group>

        <b-button @click="createCase" variant="primary"><b-icon-plus ></b-icon-plus> Add {{ selectedStudent.full_name }} to Caseload</b-button>

        <b-nav align='end'>
            <b-button variant="danger" @click="$bvModal.hide('case-add-modal')">Close</b-button>
        </b-nav>
    </b-modal>

</div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import BaseSelectStudentBySchool from "@/components/BaseSelectStudentBySchool.vue";
import { BIconPlus } from "bootstrap-vue";
import { authComputed } from '../store/helpers.js'
import CaseAPI from '../api/case.js'

export default {
    name: "CaseAddModal",
    components: {
        BaseAlert,
        BaseSelectStudentBySchool,
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
            schoolId: null,
            selectedStudent: {},
            schoolOptions: [],
            studentsAddedToCaseload: []
        };
    },

    created() {
        this.schoolOptions = this.getStoreRoles.map(role => role.school_id)
        if (this.schoolOptions.length) {
            this.schoolId = this.schoolOptions[0]
        } else {
            this.schoolId = null
        } 
    },

    methods: {
        handleStudentChange(student) {
            this.selectedStudent = student
        },

        hideModal() {
            this.resetModal();
            this.$refs["roleAddModal"].hide();
        },

        resetModal() {
            //blank everything else out
            this.alert = {}
            this.studentsAddedToCaseload = []
            this.selectedStudent = {}
        },
       
        async createCase() {
            //create the Case document in the database to associate student with this caseload
            this.alert = {show: true, showSpinner: true, variant: "info", name: "Submitting", message: "Adding student to caseload"}
            const payload = await CaseAPI.addCase(this.caseloadId, this.selectedStudent.id)
            if (payload.ok) {
                this.alert = {}
                //add to list of added students
                this.studentsAddedToCaseload.push(this.selectedStudent.full_name)
                //emit event back to parent so we can update caseload list
                this.$emit("student-added-to-caseload", this.selectedStudent)
                this.selectedStudent = {}
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        }
    }
};
</script>
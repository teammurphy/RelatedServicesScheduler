<template>
  <div class="admin-add-role-modal">
    <b-modal id="role-add-modal" ref="roleAddModal" title="Add Role" @show="resetModal" header-bg-variant="primary" header-text-variant="white" @hidden="resetModal" @ok="handleOk">

      <base-alert v-bind="alert" />

      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Role" label-for="name-select" invalid-feedback="Role is required">
            <b-form-select id="name-select" v-model="form.name" :options="roleOptions"></b-form-select>
        </b-form-group>

        <b-form-group label="Related Service Area" label-for="service-select">
            <b-form-select id="service-select" v-model="form.service" :options="serviceOptions"></b-form-select>
        </b-form-group>

        <b-form-group label="County" label-for="county-select" invalid-feedback="County is required">
            <b-form-select id="county-select" v-model="form.county" :options="countyOptions"></b-form-select>
        </b-form-group>

        <b-form-group label="District" label-for="district-select">
            <b-form-select id="district-select" v-model="form.district" :options="districtOptions" @change="getSchools"></b-form-select>
        </b-form-group>

        <b-form-group label="School" label-for="school-select">
            <b-form-select id="school-select" v-model="form.school_id" :options="schoolOptions"></b-form-select>
        </b-form-group>

      </b-form>
    </b-modal>
  </div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import { authComputed } from '../store/helpers.js'
import AdminAPI from '../api/admin.js'
import SchoolAPI from '../api/school.js'

export default {
    components: {
        BaseAlert
    },
    props: {
        userId: Number
    },
    computed: {
        ...authComputed
    },
    data() {
        return {
            testToken: "",
            form: {
                name: "",
                school_id: "",
                district: "",
                county: "",
                service: ""
            },
            state: {name: null, school: null, district: null, county: null, service: null},
            alert: {},
            roleOptions: ['admin', 'provider', 'supervisor', 'principal', 'student'],
            countyOptions: ['Q', 'K', 'R', 'X', 'M'],
            serviceOptions: ["Speech", "OT", "PT"],
            schoolOptions: [],
            districtOptions: []
        };
    },
    mounted() {
        let i
        let districts = []
        for (i=1; i<33; i++) {
            districts.push(i.toString())
        }
        districts.push("75")
        this.districtOptions = districts
    },
    methods: {
        checkFormValidity() {
            //some checks before we actually submit name message
            const isValid = this.$refs.form.checkValidity();
            if (!isValid) {
                this.alert = {show: true, variant: "danger", name: "Validation Error", message: "Error validating fields"}
                //we need to look at each field in turn to know which were the problems
                for (const property in this.state) {
                    this.state[property] = this.form[property].trim().length > 0 ? true : false;
                }
            } else {
                this.alert = {};
                for (const property in this.state) {
                    this.state[property] = true
                }
            }
            return isValid;
        },
        hideModal() {
            this.resetModal();
            this.$refs["roleAddModal"].hide();
        },
        resetModal() {
            //blank everything else out
            for (const property in this.form) {
                this.form[property] = ""
            }
        },
        handleOk(bvModalEvt) {
            //prevent modal from closing
            bvModalEvt.preventDefault();
            //trigger submit handler
            //Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }
            //need to build data object
            //we can set data = this.form, and then pass that to handle submit if we need to massage
            this.submitRole();
        },

        async getSchools() {
            this.alert = {show: true, showSpinner: true, variant: "info", name: "Loading", message: "Loading school list"}
            const payload = await SchoolAPI.getSchoolsByDistrict(this.form.district)
            if (payload.ok) {
                this.alert = {}

                const tempSchoolOptions = payload.data.map(function(item) { 
                    return {value: item.id, text: `${item.dbn} ${item.name}`}
                });

                this.schoolOptions = tempSchoolOptions
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        },

        async submitRole() {
            this.alert = { show: true, showSpinner: true, variant: "info", name: "Submitting", message: "Adding role to database"}
            const payload = await AdminAPI.addRole(this.userId, this.form)
            if (payload.ok) {
                this.alert = {}
                this.hideModal()
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        }
    }
};
</script>
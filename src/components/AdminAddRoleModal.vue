<template>
  <div class="admin-add-role-modal">
    <b-modal id="role-add-modal" ref="roleAddModal" title="Add Role" @show="resetModal" header-bg-variant="primary" header-text-variant="white" @hidden="resetModal" @ok="handleOk">

      <h1>id: {{ userId }}</h1>
      

      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Role" label-for="name-input" invalid-feedback="Role is required">
            <b-form-select id="name-input" v-model="form.name" :options="roleOptions"></b-form-select>
        </b-form-group>

        <b-form-group label="Related Service Area" label-for="service-input">
            <b-form-select id="service-input" v-model="form.service" :options="serviceOptions"></b-form-select>
        </b-form-group>

        <b-form-group label="County" label-for="county-input" invalid-feedback="County is required">
            <b-form-select id="county-input" v-model="form.county" :options="countyOptions"></b-form-select>
        </b-form-group>

        <b-form-group label="District" label-for="district-input">
            <b-form-input type="text" id="district-input" v-model="form.district" />
        </b-form-group>

        <b-form-group label="School" label-for="school-input">
            <b-form-input type="text" id="school-input" v-model="form.school" />
        </b-form-group>

        <base-alert v-bind="alert" />

      </b-form>
    </b-modal>
  </div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import axios from "axios";
import { authComputed } from '../store/helpers.js'

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
                school: "",
                district: "",
                county: "",
                service: ""
            },
            nameState: null,
            schoolState: null,
            districtState: null,
            countyState: null,
            serviceState: null,
            alert: {},
            roleOptions: ['admin', 'provider', 'supervisor'],
            countyOptions: ['Q', 'K', 'R', 'X', 'M'],
            serviceOptions: ["Speech", "OT", "PT"]
        };
    },
    methods: {
        checkFormValidity() {
        //some checks before we actually submit name message
        const isValid = this.$refs.form.checkValidity();
        if (!isValid) {
            this.alert = {
                show: true,
                variant: "danger",
                name: "Validation Error",
                message: "Error validating fields",
            };
            //we need to look at each field in turn to know which were the problems
            this.nameState = this.form.name.trim().length > 0 ? true : false;
            this.schoolState = this.form.school.trim().length > 0 ? true : false;
            this.districtState = this.form.district.trim().length > 0 ? true : false;
            this.countyState = this.form.county.trim().length > 0 ? true : false;
            this.serviceState = this.form.service.trim().length > 0 ? true : false;
        } else {
            this.alert = {};
            this.nameState = true;
            this.schoolState = true;
            this.districtState = true;
            this.countyState = true;
            this.serviceState = true;
        }
        return isValid;
    },
    hideModal() {
        this.resetModal();
        this.$refs["rollAddModal"].hide();
    },
    resetModal() {
        //blank everything else out
        this.form.name = "";
        this.form.school = "";
        this.form.district = "";
        this.form.county = "";
        this.form.service = "";
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
        this.submitRole_fetch();
    },
    async submitRole_fetch() {
        this.alert = {
            show: true,
            showSpinner: true,
            variant: "info",
            name: "Submitting",
            message: "Adding role to database"
        }

        const url = process.env.VUE_APP_ROOT_API + "admin/" + this.userId.toString() + "/role";
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
                method: 'POST',
                mode: 'cors',
                // headers: { 'Content-Type':'application/json'},
                headers: headers,
                body: JSON.stringify(this.form)
            });
            if (!response.ok) {
                this.alert = {}
                //we got response - but not one we like - like a 404 or something
                throw new Error({
                    name: response.status, 
                    message: response.statusText
                });
            }
            //good response, now lets try get the payload
            const data = await response.json();
            this.studentlist = data;
            this.alert = {}
        } catch(error) {
            this.alert = {
                show: true,
                variant: "danger",
                name: error.name,
                message: error.message
            }
        } 
    },
    submitRole() {
        this.alert = {
            show: true,
            showSpinner: true,
            variant: "info",
            name: "Submitting",
            message: "Submitting request to add role to server",
        };

        const url = process.env.VUE_APP_ROOT_API + "admin/" + this.userId.toString() + "/role";
        //this.form.user_id = this.userId
        axios
        .post(url, this.form)
        .then((response) => {
            this.alert = {}
            this.users = response.data;
            //now close the dialog
        })
        .catch((error) => {
            alert(JSON.toString(error))
            this.alert = {
                show: true,
                variant: "danger",
                name: error.name,
                message: error.message,
            };
        })
        },
    },
};
</script>
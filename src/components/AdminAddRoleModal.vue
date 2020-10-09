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
import { authComputed } from '../store/helpers.js'
import AdminAPI from '../api/admin.js'

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
            state: {name: null, school: null, district: null, county: null, service: null},
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
        async submitRole() {
            this.alert = {
                show: true,
                showSpinner: true,
                variant: "info",
                name: "Submitting",
                message: "Adding role to database"
            }
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
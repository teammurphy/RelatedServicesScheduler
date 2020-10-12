<template>
<div class="base-confirm-delete">

    <b-modal id="base-confirm-delete-modal" ref="confirmDeleteModal" title="Are you sure?" @show="resetModal" @hidden="resetModal" header-bg-variant="primary" header-text-variant="white" @ok=handleOk>
        
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
            <p>{{ message }}</p>

            <b-form-group label="Are you sure?" label-for="confirmationCheck">
                <b-form-checkbox
                    id="confirmationCheck"
                    v-model="status"
                    value="delete"
                    unchecked-value="do_not_delete"
                    @change="clearAlert"
                >
                    I understand the awesome responsibility and do indeed wish to terminate this document
                </b-form-checkbox>
            </b-form-group>

        </b-form>

        <base-alert v-bind="alert" />
        
    </b-modal>

</div>
</template>

<script>
import BaseAlert from '@/components/BaseAlert.vue'
import { authComputed } from '../store/helpers.js'
import API from '../api/api.js'

export default {
    components: {
        BaseAlert
    },
    computed: {
        ...authComputed
    },
    props: {
        path: {type: String, required: true},
        message: {type: String, required: true}
    },
    data() {
        return {
            alert: {},
            status: 'do_not_delete'
        }
    },
    methods: {
        resetModal() {
            //blank out confirmation field
            this.alert = {}
            this.status = 'do_not_delete'
        },
        clearAlert() {
            this.alert = {}
        },
        hideModal() {
            this.resetModal();
            this.$refs['confirmDeleteModal'].hide();
        },
        handleOk(bvModalEvt) {
            //prevent modal from closing
            bvModalEvt.preventDefault();
            //if the confirmation field is "Yes", then do the deletion
            //otherwise close the dialog without doing anything
            if (this.status == "delete") {
                this.alert = {
                    show: true,
                    variant: "danger",
                    name: "Delete",
                    message: "this document is being destroyed."
                }
                this.killDocument()
            } else {
                this.alert = {
                    show: true,
                    variant: "success",
                    name: "Mercy",
                    message: "this document will not be destroyed."
                }
            }
        },
        async killDocument() {
            const url = process.env.VUE_APP_ROOT_API + this.path;
            const payload = await API.delete(url)
            if (payload.ok) {
                this.alert = {}
                this.$emit('on-delete', payload.data)
                this.hideModal()
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        }
    }
}
</script>
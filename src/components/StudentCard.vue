<template>
<b-card  :title="title">
    <base-alert v-bind="alert" />

    <dl class="object_display">
        <div v-for="(value, index) in student" v-bind:key="index">
            <dt>{{ index }}</dt>
            <dd>{{ value }}</dd>
        </div>
    </dl>
    <!-- add iep button and list of ieps -->
    <!-- long term hide unless iepOptions.length > 1 -->
    <b-form-group label="Select IEP" label-for="iep-select">
        <b-form-select id="iep-select" v-model="iepId" :options="iepOptions"></b-form-select>
    </b-form-group>

    <iep-add-modal v-bind:studentId="studentId" @iep-added="handleIEPAdded" />

    <!-- display the iep card - which includes goals and mandates -->
    <!-- would v-model be better??? -->
    <iep-card v-if="iepId" v-bind:iepId="iepId" :key="iepId" />
    
</b-card>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import IepAddModal from "@/components/IepAddModal.vue";
import IepCard from "@/components/IepCard.vue";
import StudentAPI from '../api/student.js'

export default {
    name: "StudentCard",
    components: {
        BaseAlert,
        IepAddModal,
        IepCard
    },

    props: {
        studentId: Number
    },

    data () {
        return {
            alert: {},
            student: null,
            title: "",
            iepId: null,
            iepOptions:[]
        }
    },

    created () {
        this.getStudent()
    },

    methods: {
        handleIEPAdded(iep) {
            console.log(JSON.stringify(iep))
            //now push this IEP into iepOptions
            iep.value = iep.id;
            iep.text = iep.start_date + " - " + iep.end_date
            this.iepOptions.push(iep)
            //and make it active so we can add goals and mandates
            this.iepId = iep.id
        },

        async getStudent() {
            this.student = null
            this.alert = { show: true, showSpinner: true, variant: "info", name: "Loading", message: "Fetching Student from Database"}
            const payload = await StudentAPI.getStudent(this.studentId)
            if (payload.ok) {
                this.alert = {}
                this.student = payload.data
                this.title = this.student.first_name + " " + this.student.last_name

                //now build IEP options - or do in component BaseSelectIep - but not sure how to pass complex object
                this.iepOptions = payload.data.ieps.map(function(item) {
                    return {value: item.id, text: `${item.start_date} - ${item.start_date}`}
                })

                //lastly if there is only one IEP, set iepId = this one IEP
                //should one of the ieps be made active regardless???
                if (payload.data.ieps.length ===1) {
                    this.iepId = payload.data.ieps[0].id
                }
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        }
    }
}
</script>
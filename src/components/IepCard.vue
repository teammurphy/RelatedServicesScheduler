<template>
<b-card  :title="title">
    <base-alert v-bind="alert" />
    <!-- iep selector and iep add modal included on student doc - perhaps belong here -->
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-1 variant="primary">Goals</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <div v-if="iep.goals">
                        <b-table striped hover :items="iep.goals"></b-table>
                    </div>
          
                    <iep-goal-add-modal v-bind:iepId="iepId" @goal-added="handleGoalAddition" />
                </b-card-body>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-2 variant="primary">Mandates</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <div v-if="iep.mandates">
                        <b-table striped hover :items="iep.mandates"></b-table>
                    </div>

                    <iep-mandate-add-modal v-bind:iepId="iepId" @mandate-added="handleMandateAddition" />
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
    
</b-card>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";
import IepGoalAddModal from "@/components/IepGoalAddModal.vue";
import IepMandateAddModal from "@/components/IepMandateAddModal.vue";
import IEPAPI from '../api/iep.js'

export default {
    name: "IEPCard",
    components: {
        BaseAlert,
        IepGoalAddModal,
        IepMandateAddModal
    },

    props: {
        iepId: Number
    },

    data () {
        return {
            alert: {},
            title: "",
            iep: null
        }
    },
    created() {
        this.getIEP()
    },

    methods: {
        handleGoalAddition(goal) {
            this.iep.goals.push(goal)
        },

        handleMandateAddition(mandate) {
            this.iep.mandates.push(mandate)
        },

        async getIEP() {
            this.alert = { show: true, showSpinner: true, variant: "info", name: "Loading", message: "Fetching IEP"}
            const payload = await IEPAPI.getIEP(this.iepId)
            if (payload.ok) {
                this.alert = {}
                this.iep = payload.data
                this.title = this.iep.start_date + " - " + this.iep.end_date
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
        }
       
    }
}
</script>
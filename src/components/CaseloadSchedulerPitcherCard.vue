<template>
<b-card  :title="title">
    <b-list-group>
        <b-list-group-item 
            v-for="mandate in mandates" 
            :key="mandate.id" 
            variant="primary" 
            class="make-draggable"
            :data-mandateId=mandate.id
            :data-studentId=id
            :data-periodicity=mandate.periodicity
            :data-frequency=mandate.frequency
            :data-service=mandate.service
            :data-duration=mandate.duration
            :data-interval=mandate.interval
            :data-group_size=mandate.group_size
            :data-title=title
        >

            {{ mandate.frequency }}/{{ mandate.periodicity }} x {{ mandate.duration }} min. x {{ mandate.group_size }}

        </b-list-group-item>
    </b-list-group>
    
</b-card>
</template>

<script>
import { Draggable } from '@fullcalendar/interaction';

export default {
    name: "CaseloadSchedulerPitcherCard",

    props: {
        first_name: {type: String},
        last_name: {type: String},
        osis: {type: String},
        birthdate: {type: String},
        grade: {type: String},
        id: {type: Number},
        school_id: {type: Number},
        mandates: {type: Array}
    },

    data () {
        return {
            alert: {},
            title: this.first_name + " " + this.last_name
        }
    },

    mounted() {
        this.setupDraggable();
    },

    methods: {
        setupDraggable() {
            //const nodeList = document.querySelectorAll(".make-draggable");
            //need to limit the nodeList to only those elements created by this component
            //or could use some modification of this.$children
            const nodeList = this.$el.querySelectorAll(".make-draggable");
            nodeList.forEach((node) => {
                let eventObj = {}
                eventObj.title = node.dataset.title
                //eventObj.id = node.dataset.id
                let rrule = {}
                rrule.freq = node.dataset.periodicity
                rrule.interval = node.dataset.interval
                //we need to pass in the end of the caseload period
                //for now just repeat until end of school year
                rrule.until = "2021-06-30"
                
                //duration needs to be in hh:mm format
                const hours = Math.floor(node.dataset.duration/60)
                const minutes = node.dataset.duration % 60
                const durationString = ("00" + hours).slice(-2) + ":" + ("00" + minutes).slice(-2)
                eventObj.duration = durationString

                eventObj.rrule = rrule
                //draggable does not handle rrules correctly in current version, 
                //so need to pass through extended props to be picked up by the eventDrop
                eventObj.extendedProps = rrule
                eventObj.extendedProps.mandate_id = node.dataset.mandateId
                eventObj.extendedProps.student_id = this.id
                eventObj.extendedProps.school_id = this.school_id
                eventObj.extendedProps.service = node.dataset.service
                eventObj.extendedProps.duration = node.dataset.duration


                new Draggable(node, {
                    //eventData: node.dataset
                    eventData: eventObj
                });
            });
        }
    }
}
</script>

<style scoped>
  .fc-event {
    cursor: move;
    margin: 3px 0;
  }
</style>
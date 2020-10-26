<template>
<b-card  :title="title">
    <b-list-group>
        <b-list-group-item 
            v-for="mandate in mandates" 
            :key="mandate.id" 
            variant="primary" 
            class="make-draggable"
            :data-id=mandate.id
            :data-periodicity=mandate.periodicity
            :data-frequency=mandate.frequency
            :data-service=mandate.service
            :data-duration=mandate.duration
            :data-interval=mandate.interval
            :data-group_size=mandate.group_size
            :data-title=title
        >

            {{ mandate.frequency }}/{{ mandate.periodicity }} group of {{ mandate.group_size }}

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
            const nodeList = document.querySelectorAll(".make-draggable");
            nodeList.forEach((node) => {
                new Draggable(node, {
                    eventData: node.dataset
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
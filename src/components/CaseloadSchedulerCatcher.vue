<template>
<div class="caseload-scheduler-catcher">
    <b-overlay :show="showOverlay" rounded="sm">
        <full-calendar :options="calendarOptions" />
    </b-overlay>
</div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
//import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import EventAPI from '../api/event.js'

export default {
    name: "CaseloadSchedulerCatcher",
    components: {
        FullCalendar 
    },
    props: {
        caseloadId: Number
    },
    data() {
        return {
            showOverlay: false,
            calendarOptions: {
                plugins: [ timeGridPlugin, interactionPlugin, rrulePlugin ],
                initialView: 'timeGridWeek',
                weekends: false,
                editable: true,
                droppable: true,
                eventDrop: this.handleEventDrop,
                //eventAdd: this.handleEventAdd,
                eventReceive: this.handleEventReceive,
                eventChange: this.handleEventChange,
                events: [
                    {
                        title: 'my recurring event',
                        duration: "02:45",
                        rrule: {
                            freq: 'weekly',
                            interval: 1,
                            byweekday: [ 'mo', 'fr' ],
                            dtstart: '2020-10-19T10:30:00', // will also accept '20120201T103000'
                            until: '2021-06-01' // will also accept '20120201'
                        }
                    },
                    {id: "001", title: "bogus1", start: "2020-10-30T13:00:00"},
                    {id: "002", title: "bogus2", start: "2020-10-30T10:00:00"},
                    {id: "003", title: "bogus3", start: "2020-10-30T16:00:00"}
                ]
            }
        }
    },
    methods: {
        handleEventDrop(info) {
            //fires when an event is moved - before event Change
            //check out https://fullcalendar.io/docs/eventDrop for eventDropInfo properties

            alert("eventDrop - " + JSON.stringify(info));
            //alert("drop: " + info.event.title + " was dropped on " + info.event.start.toISOString());

            if (!confirm("Are you sure about this change?")) {
                info.revert();
            }
        },

        handleEventChange(info) {
            alert("eventChange - " + JSON.stringify(info));
        },

        handleEventReceive(info) {
            //fired when an external entry is received - before event add is fired
            //make sure to add caseload_id to what we pass to server
            alert("eventReceive - " + JSON.stringify(info));
            let eventObj = {}
            eventObj.title = info.event.title
            eventObj.service = info.event.extendedProps.service
            eventObj.mandate_id = info.event.extendedProps.mandate_id
            eventObj.student_id = info.event.extendedProps.student_id
            eventObj.school_id = info.event.extendedProps.school_id
            eventObj.caseload_id = this.caseloadId
            eventObj.duration = info.event.extendedProps.duration
            eventObj.periodicity = info.event.extendedProps.freq
            eventObj.interval = info.event.extendedProps.interval
            eventObj.dtstart = info.event.extendedProps.dtstart
            eventObj.until = info.event.extendedProps.until

            this.createEvent(eventObj)
        },
        /*
        handleEventAdd(info) {
            alert("eventAdd - " + JSON.stringify(info));
        },
        */
        async createEvent(event) {
            //given an event, post it to the database
            //alert needs to be changed to overlay
            this.showOverlay = true
            const payload = await EventAPI.createEvent(event)
            if (payload.ok) {
                this.alert = {}
                //now push the returned event back into the calendar by pushing it into event array
            } else {
                this.alert = {show:true, variant: "danger", name: payload.name, message: payload.message}
            }
            this.showOverlay = false
        }
    }
}
</script>
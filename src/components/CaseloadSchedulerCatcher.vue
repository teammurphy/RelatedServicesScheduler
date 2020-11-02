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
                eventClick: this.handleEventClick,
                events: []
                /*
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
                */
            }
        }
    },

    mounted() {
        this.getEvents();
    },

    methods: {
        handleEventClick(info) {
            alert("eventClicked - " + JSON.stringify(info))
        },


        handleEventDrop(info) {
            //fires when an event is moved - before event Change
            //check out https://fullcalendar.io/docs/eventDrop for eventDropInfo properties

            //alert("eventDrop - " + JSON.stringify(info));
            //alert("drop: " + info.event.title + " was dropped on " + info.event.start.toISOString());

            if (!confirm("Are you sure about this change?")) {
                info.revert();
            }
            //will go to handleeventChange if we agree to change
        },

        handleEventChange(info) {
            //alert("eventChange - " + JSON.stringify(info));
            //let data = info.oldEvent.extendedProps
            let data = Object.assign({}, info.oldEvent.extendedProps)
            data.dtstart = info.event.start
            this.modifyEvent(info.event.id, data)
        },

        handleEventReceive(info) {
            //fired when an external entry is received - before event add is fired
            //alert("eventReceive - " + JSON.stringify(info));
            let eventObj = {}
            eventObj.title = info.event.title
            eventObj.dtstart = info.event.start
            eventObj.caseload_id = this.caseloadId
            eventObj.service = info.event.extendedProps.service
            eventObj.mandate_id = info.event.extendedProps.mandate_id
            eventObj.student_id = info.event.extendedProps.student_id
            eventObj.school_id = info.event.extendedProps.school_id
            eventObj.duration = info.event.extendedProps.duration
            eventObj.periodicity = info.event.extendedProps.freq
            eventObj.interval = info.event.extendedProps.interval
            eventObj.end_date = info.event.extendedProps.until

            //alert("event - " + JSON.stringify(eventObj));

            this.createEvent(eventObj)
        },
        /*
        handleEventAdd(info) {
            alert("eventAdd - " + JSON.stringify(info));
        },
        */
        async createEvent(event) {
            //given an event, post it to the database
            //then show the new event in this database
            this.showOverlay = true
            
            const payload = await EventAPI.createEvent(event)
            if (payload.ok) {
                //now push the returned event back into the calendar by pushing it into event array
                const evt = this.createEventObject(payload.data)

                this.calendarOptions.events.push(evt)

                this.showOverlay = false
                this.$bvToast.toast("Event Added", {
                    title: "Event added to schedule",
                    variant: "success",
                    solid: true
                })
            } else {
                this.showOverlay = false
                this.$bvToast.toast(`${payload.name} - ${payload.message}`, {
                    title: "Error adding event",
                    variant: "danger",
                    solid: true
                })
            }
        },

        async getEvents() {
            //get all events for this caseload and display on calendar
            const _self = this;
            this.showOverlay = true

            const payload = await EventAPI.getEventsByCaseload(this.caseloadId)
            if (payload.ok) {
                const events = payload.data.map(function(event) {
                    return _self.createEventObject(event)
                })
                //alert(JSON.stringify(events))
                this.calendarOptions.events = events
                this.showOverlay = false
            } else {
                this.showOverlay = false
                this.$bvToast.toast(`${payload.name} - ${payload.message}`, {
                    title: "Error fetching events",
                    variant: "danger",
                    solid: true
                })
            }
        },

        async modifyEvent(id, data) {
            this.showOverlay = true
            
            const payload = await EventAPI.modifyEvent(id, data)
            if (payload.ok) {
                //now push the returned event back into the calendar by pushing it into event array
                const evt = this.createEventObject(payload.data)

                this.calendarOptions.events.push(evt)

                this.showOverlay = false
                this.$bvToast.toast("Event Modified", {
                    title: "Event was rescheduled",
                    variant: "success",
                    solid: true
                })
                this.showOverlay = false
            } else {
                this.showOverlay = false
                this.$bvToast.toast(`${payload.name} - ${payload.message}`, {
                    title: "Error modifiying event",
                    variant: "danger",
                    solid: true
                })
            }
        },

        createEventObject(e) {
            let rrule = {}
            rrule.interval = e.interval
            //bad data - need to get rid of it, but for now...
            if (e.periodicity == "string") {
                rrule.freq = "weekly"
                e.periodicity = "weekly"
            } else {
                rrule.freq = e.periodicity
            }
            //rrule.freq = e.periodicity
            rrule.until = e.end_date
            rrule.dtstart = e.dtstart

            let event = {} 
            event.title = e.title
            event.id = e.id
            //duration needs to be in hh:mm format
            const hours = Math.floor(e.duration/60)
            const minutes = e.duration % 60
            event.duration = ("00" + hours).slice(-2) + ":" + ("00" + minutes).slice(-2)
            event.rrule = rrule
            //stash the original event in extendedProps so we can use in changes and such
            event.extendedProps = e
            return event
        }
    }
}
</script>
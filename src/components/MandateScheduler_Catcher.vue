<template>
<div class="mandateScheduler_catcher">
    <FullCalendar :options="calendarOptions" />
</div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
//import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: {
    userId: Number
  },
  data() {
    return {
      calendarOptions: {
        plugins: 
          [ timeGridPlugin, interactionPlugin, 
            rrulePlugin 
          ],
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
      alert("eventReceive - " + JSON.stringify(info));
    },
    /*
    handleEventAdd(info) {
      alert("eventAdd - " + JSON.stringify(info));
    },
    */
  }
}
</script>
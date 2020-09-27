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

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: {
    userId: String
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ timeGridPlugin, interactionPlugin ],
        initialView: 'timeGridWeek',
        weekends: false,
        editable: true,
        droppable: true,
        eventDrop: this.handleEventDrop,
        eventReceive: this.handleEventReceive,
        eventChange: this.handleEventChange,
        events: [
          {id: "001", title: "bogus", start: "2020-09-16T13:00:00"},
          {id: "002", title: "bogus", start: "2020-09-16T10:00:00"},
          {id: "003", title: "bogus", start: "2020-09-16T16:00:00"}
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
    handleEventReceive(info) {
      //fired when an external entry is received - before event add is fired
      alert("eventReceive - " + JSON.stringify(info));
    },
    handleEventChange(info) {
      alert("eventChange - " + JSON.stringify(info));
    }
  }
}
</script>
<template>
<div class='demo-app'>
  <div class='demo-app-sidebar'>
    <div class='demo-app-sidebar-section'>
      <h2>Instructions</h2>
      <ul>
        <li>Select dates and you will be prompted to create a new event</li>
        <li>Drag, drop, and resize events</li>
        <li>Click an event to delete it</li>
      </ul>

      <dl class="object_display">
        <div v-for="(value, index) in calendarOptions.initialEvents" v-bind:key="index">
          <dt>{{ index }}</dt>
          <dd>{{ value }}</dd>
        </div>
      </dl>

    </div>
    <div class='demo-app-sidebar-section'>
      <label>
        <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
        toggle weekends
      </label>
    </div>
    <div class='demo-app-sidebar-section'>
      <h2>All Events ({{ currentEvents.length }})</h2>
      <ul>
        <li v-for='event in currentEvents' :key='event.id'>
          <b>{{ event.startStr }}</b>
          <i>{{ event.title }}</i>
        </li>
      </ul>
    </div>
  </div>
  <div class='demo-app-main'>
    <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
      <template v-slot:eventContent='arg'>
        <b>{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>
  </div>
</div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'

import {
  INITIAL_EVENTS,
  createEventId
} from '../event-utils'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          rrulePlugin, // needed for more advanced repeats
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,

        //added eventDrop and eventResize, but perhaps eventChange is all we need
        eventDrop: this.handleEventDrop,
        eventResize: this.handleEventResize,
        eventChange: this.handleEventChange,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */

        // added by me to test
        //events: "/rules/student?student_id=" + student_id
        /*
        eventSources: [{
          url: '/rules/student?student_id=' + 1,
          color: 'rgb(46,163,230)'
        },
        {
          url: '/rules/student?student_id=' + 2,
          color: 'rgb(96,141,48)'
        }]
        */
        events: [
          {id: "003", title: "bogus", start: "2020-09-16T13:00:00"},
          {
            id: "004", 
            //groupId: "004",
            title: "simple repeat", 
            daysOfWeek: ['2', '4'], 
            startTime:"10:30:00",
            endTime: "11:30:00",
            startRecur: "2020-08-01",
            endRecur: "2020-10-16"
          },
          {
            id: "005",
            //groupId: "004", 
            title: "rrule", 
            duration: "00:30",
            rrule: {
              freq: 'weekly',
              interval: 2,
              byweekday: ['mo', 'fr'],
              dtstart: "2020-08-01T14:00:00",
              until: "2020-10-16"
            }
          }
        ]
      },
      currentEvents: []
    }
  },
  created() {
      //now set the vuex breadcrumbs state so breadcrumbs are updated
      this.$store.dispatch('replaceBreadcrumbs', [
         {
          text: 'Home',
          to: {name: 'Home'}
        },
        {
          text: 'Full Calendar',
          active: true
        }
      ]);
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        }) 
      }
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEventDrop(info) {
      //fires when an event is moved - before event Change
      //check out https://fullcalendar.io/docs/eventDrop for eventDropInfo properties

      alert("drop: " + info.event.title + " was dropped on " + info.event.start.toISOString());

      if (!confirm("Are you sure about this change?")) {
        info.revert();
      }
    },
    handleEventResize(info) {
      //fires when a event is resized - before eventChange
      //see https://fullcalendar.io/docs/eventResize for eventResizeInfo properties
  
      alert(info.event.title + " end is now " + info.event.end.toISOString());
      if (!confirm("is this okay?")) {
        info.revert();
      }
    },
    handleEventChange(info) {
      //event change fires after eventDrop and eventResize
      //warning - fires even if we revert the changes in the earlier event
      alert("boo: " + info);

      if (!confirm("Are you sure about this change?")) {
        info.revert();
      }
    },
    handleEvents(events) {
      this.currentEvents = events
    }
  }
}
</script>

<style lang='css'>
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}
.demo-app-sidebar-section {
  padding: 2em;
}
.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}
.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>

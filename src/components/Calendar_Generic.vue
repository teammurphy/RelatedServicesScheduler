<template>
<div class="generic_calendar">

  <base-alert v-bind="alert" />

  <div v-if="events" class="content">
    <FullCalendar class='app-calendar' :options='calendarOptions'>
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
import BaseAlert from '@/components/BaseAlert.vue'

import {
  INITIAL_EVENTS,
  createEventId
} from '../event-utils'

export default {
  components: {
    FullCalendar,
    BaseAlert
  },
  props: {
    eventSources: [String]
  },
  data: function() {
    return {
      alert: {},
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
        //eventsSet: this.handleEvents,

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
          to: {name: 'home'}
        },
        {
          text: 'Full Calendar',
          active: true
        }
      ]);
  },
  methods: {
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
    }
  }
}
</script>
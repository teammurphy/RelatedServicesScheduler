<template>
<div class="mandateScheduler_pitcher" id="planned-tasks">
      <h3>draggable</h3>
      <div  class="row planned-tasks">
        <div class="col-md-3 col-sm-6">
          <span class="fc-event">Task 1</span>
        </div>
        <div class="col-md-3 col-sm-6">
          <span class="fc-event">Task 2</span>
        </div>
      </div>

      <b-card title="card title">
        <b-button-group vertical id="make-draggable-container">
          <b-button variant="info" class="make-draggable" data-mandateId="001">Top</b-button>
          <b-button variant="info" class="make-draggable" data-mandateId="1111">MiddleMiddle</b-button>
          <b-button variant="info" class="make-draggable" data-mandateId="222">Bottom</b-button>
        </b-button-group>
      </b-card>
</div>
</template>

<script>
import { Draggable } from '@fullcalendar/interaction';

export default {
  props: {
    userId: String
  },
  data() {
    return {
      pitchData: [
        {studentName: "Fred Jones", studentId: "001", 
          mandates: [
            {title: "3x30x3", mandateId: "001", duration: "00:30"},
            {title: "1x30x1", mandateId: "1111", duration:"00:30"}
          ]
        },
        {studentName: "Mary Moore", studentId: "002", 
          mandates: [
            {title: "2x30x3", mandateId: "333", duration: "00:30"},
            {title: "1x30x2", mandateId: "131", duration:"00:30"}
          ]
        }
      ],
      events: [
        {id: "001", title: "bogus", start: "2020-09-16T13:00:00"},
          {id: "002", title: "bogus", start: "2020-09-16T10:00:00"},
          {id: "003", title: "bogus", start: "2020-09-16T16:00:00"}
      ]
    }
  },
  mounted() {
    this.setupDraggable();
  },
  methods: {
    setupDraggable() {


      /* works (to a point)
      new Draggable(document.getElementById("make-draggable-container"), {
        itemSelector: ".make-draggable",
        eventData: function(eventEl) {
          let event = {
            id: eventEl.dataset.mandateId,
            title: eventEl.innerText,
            wwalla: eventEl.getAttribute("data-mandateId"),
            woody: "boing",
            draggable: true,
            editable: true,
            duration: "01:00"
          };
          console.log(event);
          return event;
        }
      });
      */

      //works!!!!!!!
      const nodeList = document.querySelectorAll(".make-draggable");
      nodeList.forEach((node) => {
        new Draggable(node, {
          eventData: {
            title: node.innerText,
            wookie: "blah"
          }
        });
        
      });

      

      /*
      //start - try to build draggable list in js - also works
      const nodeList = document.querySelectorAll(".make-draggable");
      new Draggable(document.getElementById("make-draggable-container"), {
        nodeList,
        eventData: function(eventEl) {
          let event = {
            id: eventEl.dataset.mandateId,
            title: eventEl.innerText,
            wwalla: eventEl.getAttribute("data-mandateId"),
            woody: "boing2",
            draggable: true,
            editable: true,
            duration: "01:00"
          };
          console.log(event);
          return event;
        }
      });
      //end
      */

    

      new Draggable(document.getElementById("planned-tasks"), {
        itemSelector: ".fc-event",
        eventData: function(eventEl) {
          let event = {
            title: eventEl.innerText,
            draggable: true,
            editable: true,
            duration: "01:00"
          };
          console.log(event);
          return event;
        }
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
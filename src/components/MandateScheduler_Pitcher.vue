<template>
<div class="mandateScheduler_pitcher">
  <h3>Unmet mandates</h3>
  <div>
    <div v-for="pitch in pitchData" v-bind:key="pitch.studentId">
      <strong>{{ pitch.studentName }}</strong>
      <b-list-group>
        <b-list-group-item 
          variant="primary" 
          v-for="mandate in pitch.mandates" 
          v-bind:key="mandate.mandateId" 
          class="make-draggable"
          :data-mandateId=mandate.mandateId
          :data-periodicity=mandate.periodicity
          :data-frequency=mandate.frequency
          :data-service=mandate.service
          :data-duration=mandate.duration
          :data-title=mandate.title>
            {{ mandate.title }}
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</div>
</template>

<script>
import { Draggable } from '@fullcalendar/interaction';

export default {
  props: {
    userId: Number
  },
  data() {
    return {
      pitchData: [
        {studentName: "Fred Jones", studentId: 1, 
          mandates: [
            {title: "3x30x3", mandateId: 1, duration: "00:30", periodicity: "weekly", frequency: 3, service: "Speech"},
            {title: "1x60x1", mandateId: 1111, duration:"01:00", periodicity: "weekly", frequency: 3, service: "Speech"}
          ]
        },
        {studentName: "Mary Moore", studentId: 2, 
          mandates: [
            {title: "2x30x3", mandateId: 333, duration: "00:30", periodicity: "weekly", frequency: 3, service: "Speech"},
            {title: "1x30x2", mandateId: 131, duration:"00:30", periodicity: "weekly", frequency: 3, service: "Speech"}
          ]
        }
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
          eventData: node.dataset
          /*
          eventData: {
            title: node.innerText,
            payload: node.dataset
          }
          */
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
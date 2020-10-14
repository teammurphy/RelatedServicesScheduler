<template>
<div class="student-select">
    <b-form-select v-model="selectedStudentId" value-field="id" text-field="full_name" :options="studentOptions" v-on:change="handleChange"></b-form-select>
</div>
</template>
 
<script>
import StudentAPI from '../api/students.js'

export default {
    name: "StudentSelect",
    props: {
        //would prefer number
        schoolId: String
    },
    data() {
        return {
            studentOptions: [{id:null, text:"Loading..."}],
            selectedStudentId: null
        };
    },

    mounted() {
        this.getStudentOptions()
    },

    methods: {
        handleChange() {
            
            const student = this.studentOptions.find( ({id}) => id === this.selectedStudentId)

            this.$emit('studentSelected', student)
        },

        mockStudentOptions() {
            this.studentOptions = [
                {id: null, text: "Select Student"},
                {id: 1, text:"Larry"},
                {id: 2, text:"Curly"},
                {id: 3, text: "Moe"}
            ]
        },

        async getStudentOptions() {
            //here is where we run to database and get all students in school represented by schoolId
            const payload = await StudentAPI.getStudentsBySchoolId(this.schoolId)
            if (payload.ok) {
                /*
                const tempStudentOptions = payload.data.map(function(item) { 
                    return {id: item.id, text: `${item.first_name} ${item.last_name}`}
                });
                this.studentOptions = tempStudentOptions
                */

               //can we remove all students already in the list
               //pass in array of caseload students
               //iterate over array, and do something like
               //for (var i = payload.data.length -1; i>=0; --i) {
               //    if (payload.data[i].)
               //}

               this.studentOptions = payload.data
            } else {
                this.alert = {show: true, variant: "danger", name: "Error", message: "Could not get list of students"}
                this.studentOptions = [{value:null, text:"Error loading students"}]
            }
        }
    }
}

</script>
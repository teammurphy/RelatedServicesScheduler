<template>
    <b-form-select :options="studentOptions" @change="handleChange" value-field="id" text-field="full_name"></b-form-select>
</template>

<script>
import StudentAPI from '../api/student.js'

export default {
    name: "BaseSelectStudentBySchool",
    props: {
        schoolId: Number
    },
    data() {
        return {
            studentOptions: [{id:null, full_name:"Loading..."}]
        };
    },
    mounted() {
        this.buildStudentOptionsBySchool(this.schoolId)
    },
    methods: {
        handleChange(studentId) {
            //given the student ID, go figure out the student obj
            //const student = this.studentOptions.find( ({id}) => id === this.selectedStudentId)

            const student = this.studentOptions.find(s => s.id == studentId)
            //return the student obj to the calling app
            this.$emit("student-has-changed", student)
        },

        async buildStudentOptionsBySchool(schoolId) {
            this.schoolOptions = [{id:null, full_name:"Loading..."}]
            const payload = await StudentAPI.getStudentsBySchoolId(schoolId)
            if (payload.ok) {
                /*
                const tempStudentOptions = payload.data.map(function(item) { 
                    return {value: item.id, text: `${item.first_name} ${item.last_name}`}
                });
                */
                this.studentOptions = payload.data
            } else {
                this.studentOptions = [{id:null, full_name:"Error loading students..."}]
            }            
        }
    }
};
</script>
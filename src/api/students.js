/*
*   All the api calls for students
*/
import genericAPI from '../api/api.js'

const apiRootURL = process.env.VUE_APP_ROOT_API

export default {
    getStudents() {
        //return vue of all students
        alert("in getStudents")
    },

    getStudentsBySchools(schools) {
        //given an array of school ids, will return all students in one of those schools
        alert("in getStudentsBySchools")
        //post where we pass the array in the body
        //or get where we pass the array as query strings id /getStudentsBySchools?school=30Q211&school=30Q11
        //check that passing function in caseaddmodal actually does the unique
        const qs = schools.map(school=>"school=" + school).join('&')
        const url = `${apiRootURL}students/schools?${qs}`
        return genericAPI.get(url)
    }

    getStudent(id) {
        //return one student
        alert("in getStudent" + id)

        //const userJSON = localStorage.getItem('user')
        //const user = JSON.parse(userJSON)
        //const token = JSON.parse(localStorage.getItem('user')).access_token
        //alert("token: " + JSON.parse(localStorage.getItem('user')).access_token)
        //alert(id + " - token: " + genericAPI.getToken())

    },

    createStudent(payload) {
        alert("in student.js.createStudent" + JSON.stringify(payload))
    },

    deleteStudent(id) {
        //given a student id, perform the deletion
        //deletes should normally be done direct through api.js
        alert("in deleteStudent" + id)
    },

    getCaseloadStudents(id) {
        const url =  `${apiRootURL}students/caseload/${id}`
        return genericAPI.get(url)
    }

}
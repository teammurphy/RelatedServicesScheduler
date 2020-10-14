/*
*   All the api calls for students
*/
import genericAPI from '../api/api.js'

const apiRootURL = process.env.VUE_APP_ROOT_API

export default {
    getStudents() {
        //return vue of all students you can see
        const url = `${apiRootURL}students`
        return genericAPI.get(url)
    },

    getStudentsBySchools(schoolIds) {
        //badly named - rename to getStudentsBySchoolIds - but see note in next function to see if even needed
        //given an array of school ids, will return all students in one of those schools
        //post where we pass the array in the body
        //or get where we pass the array as query strings id /getStudentsBySchools?school=30Q211&school=30Q11
        //check that passing function in caseaddmodal actually does the unique
        const qs = schoolIds.map(id=>"school_id=" + id).join('&')
        const url = `${apiRootURL}students/schools?${qs}`
        return genericAPI.get(url)
    },

    getStudentsBySchoolId(schoolId) {
        //given a school id, will return all students in school
        //simpler version of above - could have used above - may not need both - check
        const url = `${apiRootURL}students/school/${schoolId}`
        return genericAPI.get(url)
    },

    getStudent(id) {
        //return one student
        alert("in getStudent" + id)

        //const userJSON = localStorage.getItem('user')
        //const user = JSON.parse(userJSON)
        //const token = JSON.parse(localStorage.getItem('user')).access_token
        //alert("token: " + JSON.parse(localStorage.getItem('user')).access_token)
        //alert(id + " - token: " + genericAPI.getToken())

    },

    createStudent(student) {
        const url = `${apiRootURL}student`
        return genericAPI.post(url, student)
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
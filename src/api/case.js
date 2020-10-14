/*
*   Case routhes
*   A case is a very simple document that connects a student (via student_id)
*   to a caseload (caseload_id)
*/
import genericAPI from '../api/api.js'

const apiRootURL = process.env.VUE_APP_ROOT_API

export default {
    addCase(caseloadId, studentId) {
        //will create case document tying a student to a caseload
        const url =  `${apiRootURL}case`
        const data = {caseload_id: caseloadId, student_id: studentId}
        return genericAPI.post(url,data)
    },

    deleteCase(id) {
        //given a case id, remove student from this caseload
        const url =  `${genericAPI.getAPIRoot()}case/${id}`
        return genericAPI.delete(url)
    }
}
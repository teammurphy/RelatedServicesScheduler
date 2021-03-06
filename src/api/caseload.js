/*
*   All the api calls for students
*/
import genericAPI from '../api/api.js'

export default {
    getCaseloads(id) {
        //return all caseloads for this user
        const url =  `${genericAPI.getAPIRoot()}caseloads/user/${id}`
        return genericAPI.get(url)
    },

    getCaseload(id) {
        //return specific caseload
        const url =  `${genericAPI.getAPIRoot()}caseload/${id}`
        return genericAPI.get(url)
    },
    
    addCaseload(caseload) {
        //given a caseload, let us put it in the databsae
        const url =  `${genericAPI.getAPIRoot()}caseload`
        return genericAPI.post(url, caseload)
    },

    deleteCaseload(id) {
        //given a caseload id, get rid of it
        const url =  `${genericAPI.getAPIRoot()}caseload/${id}`
        return genericAPI.delete(url)
    }
}
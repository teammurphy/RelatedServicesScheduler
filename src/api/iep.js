/*
*   All the api calls for iep
*/
import genericAPI from './api.js'

const apiRootURL = process.env.VUE_APP_ROOT_API

export default {
    getIEP(id) {
        //return one IEP
        const url = `${apiRootURL}iep/${id}`
        return genericAPI.get(url)
    },

    createIEP(iep) {
        const url = `${apiRootURL}iep`
        return genericAPI.post(url, iep)
    },

    deleteIEP(id) {
        //given a IEP id, perform the deletion
        const url =  `${genericAPI.getAPIRoot()}iep/${id}`
        return genericAPI.delete(url)
    },

    //Goals
    createGoal(goal) {
        const url = `${apiRootURL}goal`
        return genericAPI.post(url, goal)
    },

    deleteGoal(id) {
        //given a IEP id, perform the deletion
        const url =  `${genericAPI.getAPIRoot()}goal/${id}`
        return genericAPI.delete(url)
    },

    //Mandates
    createMandate(mandate) {
        const url = `${apiRootURL}mandate`
        return genericAPI.post(url, mandate)
    },

    deleteMandate(id) {
        //given a IEP id, perform the deletion
        const url =  `${genericAPI.getAPIRoot()}mandate/${id}`
        return genericAPI.delete(url)
    }

}
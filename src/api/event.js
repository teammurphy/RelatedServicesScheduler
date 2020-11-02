/*
*   All the api calls for events
*/
import genericAPI from './api.js'

const apiRootURL = process.env.VUE_APP_ROOT_API

export default {
    /*
    getEvents
    getEventsByStudent
    getEventsByProvider
    */

    createEvent(event) {
        const url = `${apiRootURL}event`
        return genericAPI.post(url, event)
    },
    
    getEventsByCaseload(id) {
        const url = `${apiRootURL}events/caseload/${id}`
        return genericAPI.get(url)
    },

    modifyEvent(id, event) {
        const url = `${apiRootURL}event/${id}`
        return genericAPI.put(url, event)
    }
}
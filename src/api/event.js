/*
*   All the api calls for events
*/
import genericAPI from './api.js'

const apiRootURL = process.env.VUE_APP_ROOT_API

export default {
    /*
    getEvents
    getEventsByCaseload
    getEventsByStudent
    getEventsByProvider
    */

    createEvent(event) {
        const url = `${apiRootURL}event`
        return genericAPI.post(url, event)
    }
}
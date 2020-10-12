/*
*   School routes
*/
import genericAPI from '../api/api.js'

export default {
    getSchoolsByDistrict(district) {
        // given a district, will return list of schools
        const url =  `${genericAPI.getAPIRoot()}schools/district/${district}`
        return genericAPI.get(url)
    }
}
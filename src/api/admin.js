/*
*   Admin routes
*/
import genericAPI from '../api/api.js'

const apiRootURL = process.env.VUE_APP_ROOT_API

export default {
    addRole(userId,role) {
        //will add passed role to specified user
        const url =  `${apiRootURL}admin/${userId}/role`
        return genericAPI.post(url,role)
    },

    getAllUsers() {
        //will return all users - used by admins to set roles and such
        const url =  `${apiRootURL}admin/users`
        return genericAPI.get(url)
    }
}
/*
*   Admin routes
*/
import genericAPI from '../api/api.js'

export default {
    addRole(userId,role) {
        //will add passed role to specified user
        const url =  `${genericAPI.getAPIRoot()}admin/${userId}/role`
        return genericAPI.post(url,role)
    },

    deleteRole(id) {
        //given a role id, will blow it away
        const url =  `${genericAPI.getAPIRoot()}admin/role/${id}`
        return genericAPI.delete(url)
    },

    getAllUsers() {
        //will return all users - used by admins to set roles and such
        const url =  `${genericAPI.getAPIRoot()}admin/users`
        return genericAPI.get(url)
    }
}
import { mapGetters } from 'vuex'

export const authComputed = {
    //...mapGetters(['loggedIn', 'roleNames', 'roles'])
    ...mapGetters(['getStoreLoggedIn', 'getStoreUser', 'getStoreRoleNames', 'getStoreRoles'])
}
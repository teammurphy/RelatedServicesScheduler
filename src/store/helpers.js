import { mapGetters } from 'vuex'

export const authComputed = {
    ...mapGetters(['getStoreLoggedIn', 'getStoreUser', 'getStoreToken', 'getStoreRoleNames', 'getStoreRoles'])
}
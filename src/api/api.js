/*
*   the generic calls using fetch
*/
//const apiRootURL = process.env.VUE_APP_ROOT_API

export default {
    getToken() {
        let token = null
        try {
            //would prefer getting the token from the vuex store - but for now...
            token = JSON.parse(localStorage.getItem('user')).access_token
        } catch(e) {
            token = null
        }
        return token
    },

    async genericFetch(request) {
        try {
            const response = await fetch(request)
            if (response.ok) {
                const data =  await response.json()
                return {ok: true, data: data}
            } else {
                throw {ok:false, name:response.status.toString(), message:response.statusText}
            }
        } catch (e) {
            console.error(e)
            e.ok = false
            return e
        }
    },

    post(url, data) {
        const token = this.getToken()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        if (token) {
            headers.append('Authorization', `Bearer ${token}`)
        }
        const request = new Request(url, {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            cache: 'no-store',
            body: JSON.stringify(data)
        })
        return this.genericFetch(request)
    },

    get(url) {
        const token = this.getToken()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        if (token) {
            headers.append('Authorization', `Bearer ${token}`)
        }
        const request = new Request(url, {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
        })
        return this.genericFetch(request)
    }, 

    delete(url) {
        const token = this.getToken()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        if (token) {
            headers.append('Authorization', `Bearer ${token}`)
        }
        const request = new Request(url, {
            method: 'DELETE',
            headers: headers,
            mode: 'cors',
            cache: 'no-store'
        })
        return this.genericFetch(request)
    }
}
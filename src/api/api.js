/*
*   the generic calls using fetch
*/

export default {
    getAPIRoot() {
        return process.env.VUE_APP_ROOT_API
    },

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
        //note - if we start using headers to request other than json, will need to re-think
        try {
            const response = await fetch(request)
            const data =  await response.json()
            if (response.ok) {
                return {ok: true, data: data}
            } else {
                console.log(data)
                throw {ok:false, name:response.status.toString(), message:data.detail}
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
        //do we need this if we are using cors mode in the request?
        //headers.append('Access-Control-Allow-Origin', '*')
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

    put(url, data) {
        const token = this.getToken()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        //do we need this if we are using cors mode in the request?
        //headers.append('Access-Control-Allow-Origin', '*')
        if (token) {
            headers.append('Authorization', `Bearer ${token}`)
        }
        const request = new Request(url, {
            method: 'PUT',
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
        //do we need this if we are using cors mode in the request?
        //headers.append('Access-Control-Allow-Origin', '*')
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
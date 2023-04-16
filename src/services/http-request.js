import { getCurrentSession } from './authentication.js'

const API_URL = import.meta.env.VITE_API_SERVER;

export async function postReq(url, data) {
    const session = getCurrentSession()
    
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    if (session) {
        headers.Authorization = session.token
    }

    const response = await fetch(`${API_URL}/${url}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })

    const responseJson = await response.json();

    if (response.ok) {
        return responseJson
    } else {
        throw new Error(responseJson.message)
    }
}

export async function putReq(url, data) {
    const session = getCurrentSession()
    
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    if (session) {
        headers.Authorization = session.token
    }

    const response = await fetch(`${API_URL}/${url}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
    })

    const responseJson = await response.json();

    if (response.ok) {
        return responseJson
    } else {
        throw new Error(responseJson.message)
    }
}

export async function deleteReq(url) {
    const session = getCurrentSession()
    
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    if (session) {
        headers.Authorization = session.token
    }

    const response = await fetch(`${API_URL}/${url}`, {
        method: "DELETE",
        headers: headers
    })

    const responseJson = await response.json();

    if (response.ok) {
        return responseJson
    } else {
        throw new Error(responseJson.message)
    }
}

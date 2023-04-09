export function setUserLoggedIn(data) {
    const { token, profile } = data
    localStorage.setItem('token', token)
    localStorage.setItem('profile', JSON.stringify(profile))
}

export function getUserProfile() {
    return JSON.parse(localStorage.getItem('profile'))
}
export function isUserLoggedIn() {
    const token = localStorage.getItem('token')
    return token !== null && token !== undefined
}

export function clearUserStorage() {
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
}

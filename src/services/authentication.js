export function getUserProfile() {
    return this.getCurrentSession()?.profile;
}

export function getCurrentSession() {
    return JSON.parse(localStorage.getItem('auth'))
}

export function isUserLoggedIn() {
    const session = getCurrentSession()
    return session !== null && session !== undefined
}

export function clearUserStorage() {
    localStorage.removeItem('auth')
}

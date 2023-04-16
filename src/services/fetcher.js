const fetcher = (args) => {
    if(typeof args === 'string') {
        return fetch(args).then(res => res.json())
    }

    return fetch(...args).then(res => res.json())
}

export {
    fetcher
}
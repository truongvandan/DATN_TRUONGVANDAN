const API_URL = 'http://localhost:3000';

export async function post(url, data) {
    const response = await fetch(`${API_URL}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data),
    })

    const responseJson = await response.json();

    if (response.ok) {
        return responseJson
    } else {
        throw new Error(responseJson.message)
    }
}

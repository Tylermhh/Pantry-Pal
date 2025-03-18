export async function sendPostRequest(url: RequestInfo | URL, payload: { name: any; password: any; }) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: payload.name,
            password: payload.password,
        })
    })

    return response;
}
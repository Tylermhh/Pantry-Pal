export async function createUserPantryData(userId: string, username: string, authToken: string) {
    const response = await fetch(`/api/data/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({
            username: username
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to create user's pantry data. Status: ${response.status}`);
    }
    return response.json();
}
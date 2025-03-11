import { useEffect, useState } from "react";
import PantryGroup from "../components/PantryGroup.tsx";
/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param userId {string} the image ID to fetch, or all of them if empty string
 * @param authToken {string} the authentication token to pass into the fetch request
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, pantryData: PantryGroup[], userName: String}} fetch state and data
 */
export function useDataFetching(userId, authToken, delay=1000) {
    const [isLoading, setIsLoading] = useState(true);
    const [pantryData, setPantryData] = useState([]);
    const [userName, setUserName] = useState("");
    useEffect(() => {
        console.log("fetching user data");
        fetch(`/api/data?user=${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setPantryData(data.data);
                setUserName(data.username);
                setIsLoading(false);
            });
    }, [userId, authToken]);

    return { isLoading, pantryData, userName };
}

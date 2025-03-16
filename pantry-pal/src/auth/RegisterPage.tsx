import UsernamePasswordForm from "./UsernamePasswordForm.js";
import {sendPostRequest} from "./sendPostRequest.js";
import {useNavigate} from "react-router";
import {createUserPantryData} from "./createUserPantryData.ts";

export interface AuthPageProps {
    setAuthToken: (token: string) => void;
    setUserId: (id: string) => void;
}

export default function RegisterPage(props: AuthPageProps) {
    const navigate = useNavigate();

    async function handleSubmit(name: string, password: string) {
        const payload = {
            name: name,
            password: password,
        }
        const response = await sendPostRequest("/auth/register", payload);
        if (response.status === 400) {
            console.log("400 response");
            return {
                type: "error",
                message: `Submission Failed: Username already taken.`,
            };
        }
        if (response.status === 500) {
            return {
                type: "error",
                message: `Submission Failed: Internal Server Error: ${response.status}`,
            }
        }
        if (response.status === 201) {
            try {
                const parsedResponse = await response.json();
                props.setAuthToken(parsedResponse.token);
                props.setUserId(parsedResponse.userId);

                try {
                    await createUserPantryData(parsedResponse.userId, parsedResponse.userId, parsedResponse.token);
                    console.log("Successfully created user pantry data");
                } catch (error) {
                    console.error("Error creating user pantry data:", error);
                }
                navigate('/');
            } catch (error) {
                console.log(`Error parsing response token: ${error}`);
            }

        }
    }
    return (
        <>
            <div className="flex flex-col bgPrimary textInverse min-h-screen items-center">
                {/*Form and Header container*/}
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-2xl">Register A New Account</h1>
                    <UsernamePasswordForm onSubmit={handleSubmit} />
                </div>
            </div>
        </>
    )
}
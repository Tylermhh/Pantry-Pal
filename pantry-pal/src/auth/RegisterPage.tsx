import UsernamePasswordForm from "./UsernamePasswordForm.js";
import {sendPostRequest} from "./sendPostRequest.js";
import {useNavigate} from "react-router";

export interface AuthPageProps {
    setAuthToken: (token: string) => void;
}

export default function RegisterPage(props: AuthPageProps) {
    const navigate = useNavigate();
    async function handleSubmit(name: String, password: String) {
        console.log("inside handle register submit")
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
                console.log("response token: ", parsedResponse.token);
                props.setAuthToken(parsedResponse.token);
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
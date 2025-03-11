import UsernamePasswordForm from "./UsernamePasswordForm.js";
import {Link, useNavigate} from "react-router";
import {sendPostRequest} from "./sendPostRequest.js";
import {AuthPageProps} from "./RegisterPage.tsx";

export default function LoginPage(props: AuthPageProps) {
    const navigate = useNavigate();
    async function handleSubmit(name: String, password: String) {
        const payload = {
            name: name,
            password: password,
        }
        const response = await sendPostRequest("/auth/login", payload);
        if (response.status === 401) {
            console.log("401 response: Username or Password incorrect");
            return {
                type: "error",
                message: `Submission Failed: Invalid credentials.`,
            };
        }
        if (response.status === 500) {
            console.log("500 response: Internal Server Error");
            return {
                type: "error",
                message: `Submission Failed: Internal Server Error. Please try again later.`,
            };
        }

        if (response.status === 200) {
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
                    <h1 className="font-bold text-2xl">Login</h1>
                    <UsernamePasswordForm onSubmit={handleSubmit} />
                    {/*the &... stuff are just html entities for ' and space*/}
                    <p>Don&#39;t have an account?&nbsp;
                        <Link to="/register">Register Here</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
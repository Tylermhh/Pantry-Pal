import {useActionState} from "react";
import "./UsernamePasswordForm.css";

interface AuthFormProps {
    onSubmit: (username: string, password: string) => Promise<{ type: string; message: string; } | undefined>;
}

export default function UsernamePasswordForm(props: AuthFormProps) {
    const [result, submitAction, isPending] = useActionState(
        async (previousState: any, formData: { get: (arg0: string) => any; }) => {
            const name = formData.get("name");
            const password = formData.get("password");

            if (!name || !password) {
                return {
                    type: "error",
                    message: `Please fill in your name and password.`,
                };
            }

            const submitResult = await props.onSubmit(name, password);

            return submitResult;
            // return {
            //     type: "success",
            //     message: `You have succesfully submitted!`,
            // };
        },
        null
    );

    return (
        <>
            {result && <p className={`${result.type}`}>{result.message}</p>}
            {isPending && <p className="message loading">Loading ...</p>}
            <form action={submitAction}
                  className="flex flex-col bgCards w-fit rounded-lg shadow-md px-5 py-3 gap-3"
            >
                <div className="flex flex-col">
                    <label htmlFor="name" className="textPrimary">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        disabled={isPending}
                        className="bgPrimary rounded-lg py-1 px-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="textPrimary">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        disabled={isPending}
                        className="bgPrimary rounded-lg py-1 px-2"
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" disabled={isPending} className="bgSecondary textSecondary rounded-lg px-2 py-1">Submit</button>
                </div>
            </form>
        </>
    );
}
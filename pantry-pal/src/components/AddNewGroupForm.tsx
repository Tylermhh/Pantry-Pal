import {useActionState} from "react";

interface AddNewGroupFormProps {
    onSubmit: (name: string) => void
}

export default function AddNewGroupForm(props: AddNewGroupFormProps) {
    const [result, submitAction, isPending] = useActionState(
        async (previousState: any, formData: { get: (arg0: string) => any; }) => {
            const name = formData.get("name");

            if (!name) {
                return {
                    type: "error",
                    message: `Please fill in the name of your new category`,
                };
            }

            // eslint-disable-next-line react/prop-types
            const submitResult = await props.onSubmit(name)
            console.log(submitResult);

            return submitResult;
        },
        null
    );

    return (
        <>
            {result && <p className={`${result.type}`}>{result.message}</p>}
            {isPending && <p className="message loading">Loading ...</p>}
            <form className="flex flex-col gap-3" action={submitAction}>
                <div className="flex gap-2">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        disabled={isPending}
                        className="rounded-sm border border-gray-500 w-full"
                    />
                </div>

                <div>
                    <button
                        className="bgSecondary textSecondary rounded-sm px-1.5 py-0 w-full"
                        type="submit"
                        disabled={isPending}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}
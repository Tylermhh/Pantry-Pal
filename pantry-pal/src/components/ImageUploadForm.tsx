import {useActionState, useId, useState} from "react";

interface ImageUploadFormProps {
    authToken: string;
    userId: string;
    groupId: string;
}

export function ImageUploadForm(props: ImageUploadFormProps) {
    const id = useId();
    const [dataUrl, setDataUrl] = useState<string | undefined>(undefined);
    const [result, submitAction, isPending] = useActionState(
        async (previousState: any, formData: FormData) => {
            const image = formData.get("image");

            if (!image) {
                return {
                    type: "error",
                    message: `Please upload an image.`,
                };
            }

            try {
                console.log("Making post request...");
                const response = await fetch(`/api/images/${props.userId}?groupId=${props.groupId}`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${props.authToken}`
                    }
                });
                setDataUrl(undefined);
                if (!response.ok) {
                    // Handle HTTP 400 bad upload, HTTP 401 Unauthorized, etc...
                    if (response.status === 400) {
                        const parsedResponse = await response.json();
                        return {
                            type: "error",
                            message: parsedResponse.message,
                        }
                    }

                    if (response.status === 401) {
                        return {
                            type: "error",
                            message: `Unauthorized access token.`,
                        };
                    }

                    if (response.status === 402) {
                        const parsedResponse = await response.json();
                        return {
                            type: "error",
                            message: parsedResponse.message,
                        }
                    }

                    if (response.status === 500) {
                        const parsedResponse = await response.json();
                        return {
                            type: "error",
                            message: parsedResponse.message,
                        }
                    }

                }
                if (response.status === 201) {
                    return {
                        type: "success",
                        message: `Successfully uploaded.`,
                    };
                }

            } catch (error) { // Network error
                console.error(error);
                return {
                    type: "error",
                    message: `Network Error. Please try again later.`,
                };
            }
        },
        null
    );

    function readAsDataURL(file: Blob) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    function handleFileSelected(e: { target: any; }) {
        const inputElement = e.target;
        const fileObj = inputElement.files[0];
        const newDataURL = readAsDataURL(fileObj);
        newDataURL.then(data => {
            setDataUrl(data as string | undefined)
        })
    }

    return (
        <>
            {result && <p className={`${result.type}`}>{result.message}</p>}
            {isPending && <p className="message loading">Loading ...</p>}
            <form className="flex flex-col gap-3" action={submitAction} >
                <div className="flex gap-3">
                    <label htmlFor={id}>Choose image to upload: </label>
                    <input
                        id={id}
                        name="image"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleFileSelected}
                        className="flex bg-white border border-gray-300 rounded-md w-auto"
                    />
                </div>

                <div> {/* Preview img element */}
                    <img style={{maxWidth: "20em"}} src={dataUrl} alt="" />
                </div>

                <button className="bgSecondary textSecondary rounded-sm px-1.5 py-0 w-full" >Confirm upload</button>
            </form>
        </>
    );
}
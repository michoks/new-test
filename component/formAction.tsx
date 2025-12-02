"use client"

import { useState, useTransition } from "react"
import submitForm from "./formServer";



export default function ContactPage() {
    const [message, setMessage] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            try {
                const result = await submitForm(formData);
                setMessage(result.message);
            } catch (error: any) {
                setMessage(error.message);
            }
        })
    }

    return (
        <div className=" text-white">
            <form action={handleSubmit}>

                <label><span>Name</span>
                    <input type='text' name="name" required />
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" name="email" required />
                </label>
                <button type='submit' disabled={isPending}>{isPending ? "Submitting..." : "Submit"} </button>

            </form>

        </div>
    )

}





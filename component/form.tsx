"use client"
import { useState } from "react"


export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<{ name?: string; email?: string }>({});
    const [submitted, setSubmitted] = useState(false)

    const validateForm = () => {
        const newError: { name?: string; email?: string } = {};
        if (!name.trim()) newError.name = "Name is required";
        if (!email.trim()) newError.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = "Enter a valid email address";
        }
        return newError;
    }

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            setSubmitted(false);
            return;
        }
        setError({});
        setSubmitted(true);
        console.log("Form Submitted");
        setName('');
        setEmail("");
    }


    return (
        <form className=" text-white " onSubmit={handleSumbit}>

            <label htmlFor="text" className="block">Name</label>
            <input id="text" type="text" value={name}
                onChange={(e) => setName(e.target.value)}
                className={` ${error.name ? "border-red-500" : "border-green-300"}  `} required />
            {error.name && <p className=" text-red-500 ">{error.name}</p>}

            <label htmlFor="email" className=" block ">Email</label>
            <input id="email" type="text" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={` ${error.email ? "border-red-500" : "border-green-300"}  `} required />
            {error.email && <p className=" text-red-500 ">{error.email}</p>}

            <button type="submit" className=" border-2 p-2 rounded-2xl border-green-500 " >submit</button>


        </form>
    )

}
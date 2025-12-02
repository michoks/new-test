import { AuthenticateWithRedirectCallback, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function SSOCallback() {
    const { isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn) { redirect("/") }
    }, [isSignedIn, redirect])

    return <AuthenticateWithRedirectCallback />
}
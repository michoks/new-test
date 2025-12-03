"use client";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "@/lib/formSchema";
import { Button } from "@/components/ui/button";

export default function Page() {
    const { signUp, isLoaded } = useSignUp();
    const {
        register, handleSubmit,
        formState: { errors }
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    })
    const router = useRouter()
    const [clerkErrors, setClerkErrors] = useState<{ email?: string, password?: string }>({});

    const onSubmit = async (value: FormSchema) => {
        if (!isLoaded) return;
        try {
            setClerkErrors({});
            const result = await signUp.create({
                emailAddress: value.email,
                password: value.password
            });

            if (result.status === "complete") {
                await signUp.prepareEmailAddressVerification({
                    strategy: "email_code"
                });
                router.push('/verify-email');
            }



        } catch (err: any) {
            console.error('Sign in error:', err);
            if (err.errors && Array.isArray(err.errors)) {
                err.errors.forEach((error: any) => {
                    const message = error.message || "Authentication failed";

                    // Handle specific Clerk error codes
                    switch (error.code) {
                        case "form_identifier_not_found":
                            clerkErrors.email = "No account found with this email";
                            break;
                        case "form_password_incorrect":
                            clerkErrors.password = "Incorrect password";
                            break;
                        case "form_identifier_invalid":
                            clerkErrors.email = "Invalid email format";
                            break;
                        case "form_param_format_invalid":
                            if (error.meta?.paramName === "email") {
                                clerkErrors.email = "Please enter a valid email";
                            } else if (error.meta?.paramName === "password") {
                                clerkErrors.password = "Please enter a valid password";
                            }
                            break;
                        default:
                            // If the error message contains specific keywords
                            if (error.message.toLowerCase().includes("password")) {
                                clerkErrors.password = message;
                            } else if (error.message.toLowerCase().includes("email")) {
                                clerkErrors.email = message;
                            } else {
                                // If we can't determine which field caused the error
                                clerkErrors.email = message;
                            }
                    }
                });
            } else {
                clerkErrors.email = "An unexpected error occurred during sign in";
            }
            setClerkErrors(clerkErrors);
        }
    }

    type OAuthProvider = "google" | "facebook" | "apple";
    const authSubmit = async (e: React.FormEvent, provider: OAuthProvider) => {
        e.preventDefault();
        if (!isLoaded) return;
        try {
            await signUp.authenticateWithRedirect({
                strategy: `oauth_${provider}`,
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/'
            })
        } catch (err: any) {
            console.error('Sign in error:', err);
            if (err.errors && Array.isArray(err.errors)) {
                err.errors.forEach((error: any) => {
                    const message = error.message || "Authentication failed";

                    // Handle specific Clerk error codes
                    switch (error.code) {
                        case "form_identifier_not_found":
                            clerkErrors.email = "No account found with this email";
                            break;
                        case "form_password_incorrect":
                            clerkErrors.password = "Incorrect password";
                            break;
                        case "form_identifier_invalid":
                            clerkErrors.email = "Invalid email format";
                            break;
                        case "form_param_format_invalid":
                            if (error.meta?.paramName === "email") {
                                clerkErrors.email = "Please enter a valid email";
                            } else if (error.meta?.paramName === "password") {
                                clerkErrors.password = "Please enter a valid password";
                            }
                            break;
                        default:
                            // If the error message contains specific keywords
                            if (error.message.toLowerCase().includes("password")) {
                                clerkErrors.password = message;
                            } else if (error.message.toLowerCase().includes("email")) {
                                clerkErrors.email = message;
                            } else {
                                // If we can't determine which field caused the error
                                clerkErrors.email = message;
                            }
                    }
                });
            } else {
                clerkErrors.email = "An unexpected error occurred during sign in";
            }
            setClerkErrors(clerkErrors);
        }


    }

    return (
        <div className=" h-screen bg-blue-800 ">
            <form onSubmit={handleSubmit(onSubmit)} className=" pt-20 bg-white ">
                <h2>Create Account</h2>
                <input type="email" placeholder="Email"
                    {...register("email")} />
                {errors.email && <p className=" text-red-600 "> {errors.email.message} </p>}
                {clerkErrors.email && <p className=" text-red-600 "> {clerkErrors.email} </p>}

                <input type="password" placeholder="password"
                    {...register("password")} />
                {errors.password && <p className=" text-red-600 "> {errors.password.message} </p>}
                {clerkErrors.password && <p className=" text-red-600 "> {clerkErrors.password} </p>}

                <Button type="submit" className=" bg-red-900 " >Sign Up</Button>

                <Button type="button" onClick={(e) => { authSubmit(e, "facebook") }}> signUp with google</Button>
            </form>
        </div>
    )
}
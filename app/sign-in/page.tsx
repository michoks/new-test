"use client"
import { useSignIn } from "@clerk/nextjs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "@/lib/formSchema";
import {
    Form, FormControl, FormMessage,
    FormField, FormItem, FormLabel
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";


export default function SignInPage() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    }
    )
    const [error, setError] = useState<{ email?: string, password?: string }>({});


    const handleSignIn = async (value: FormSchema) => {
        setError({});
        if (!isLoaded) return;
        const newError: { email?: string, password?: string } = {};

        try {
            console.log(value.email, value.password)
            const result = await signIn.create({
                identifier: value.email,
                password: value.password
            })
            console.log('clerk is loading')
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId })
                router.push("/")
            } else { console.log("sign-in is not complete") }

        }
        catch (err: any) {
            console.error('Sign in error:', err);
            if (err.errors && Array.isArray(err.errors)) {
                err.errors.forEach((error: any) => {
                    const message = error.message || "Authentication failed";

                    // Handle specific Clerk error codes
                    switch (error.code) {
                        case "form_identifier_not_found":
                            newError.email = "No account found with this email";
                            break;
                        case "form_password_incorrect":
                            newError.password = "Incorrect password";
                            break;
                        case "form_identifier_invalid":
                            newError.email = "Invalid email format";
                            break;
                        case "form_param_format_invalid":
                            if (error.meta?.paramName === "email") {
                                newError.email = "Please enter a valid email";
                            } else if (error.meta?.paramName === "password") {
                                newError.password = "Please enter a valid password";
                            }
                            break;
                        default:
                            // If the error message contains specific keywords
                            if (error.message.toLowerCase().includes("password")) {
                                newError.password = message;
                            } else if (error.message.toLowerCase().includes("email")) {
                                newError.email = message;
                            } else {
                                // If we can't determine which field caused the error
                                newError.email = message;
                            }
                    }
                });
            } else {
                newError.email = "An unexpected error occurred during sign in";
            }
            setError(newError);
        }
    }

    type oAuthProvider = "google" | "facebook";
    const handleSocialSignIn = async (provider: oAuthProvider) => {
        if (!isLoaded) return;
        try {
            await signIn.authenticateWithRedirect({
                strategy: `oauth_${provider}`,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/"
            })
        } catch (err: any) {

        }
    }

    return (
        <div className=" p-20 sm:p-0 h-screen flex justify-center items-center ">

            <Card className="ssm:w-full h-auto sm:w-1/2 lg:w-3/7  mx-auto text-white bg-gray-900/20 rounded-2xl border-1 border-gray-400/50 px-3  ">
                <CardHeader>
                    <CardTitle>
                        <h1>sign in form</h1>
                    </CardTitle>
                    <CardDescription>
                        {error.email && <p className=" text-red-400 "> {error.email} </p>}
                    </CardDescription>
                    <CardDescription>
                        {error.password && <p className=" text-red-400 "> {error.password} </p>}
                    </CardDescription>
                </CardHeader>
                <Separator className=" border-b-1 border-gray-500/40 "></Separator>
                <CardContent>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(handleSignIn)} className=" flex  flex-col gap-4  ">
                            <FormField name="email" control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter an email address"  {...field} className="  " />
                                        </FormControl>
                                        <FormMessage className=" text-red-400 " />
                                        {error.email && <p>{error.email}</p>}
                                    </FormItem>
                                )} />

                            <FormField name="password" control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-white ">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="........." {...field} />
                                        </FormControl>
                                        <FormMessage className=" text-red-400 " />
                                        {error.password && <p>{error.password}</p>}
                                    </FormItem>
                                )} />


                            <Button type="submit" className=" relative "> signIn {form.formState.isSubmitting && <span className=" absolute right-5 ">submitting...</span>} </Button>


                            <Separator></Separator>
                            <div className=" flex justify-between items-baseline gap-2  ">
                                <hr className=" w-full border-gray-300/80 "></hr>
                                <p className=" text-gray-300/80 ">or</p>
                                <hr className=" w-full border-gray-300/80 "></hr>
                            </div>

                            <Separator></Separator>


                            <Button type="button" onClick={() => {
                                handleSocialSignIn("google")
                            }} className="  " > continue with google  </Button>

                            <Button type="button" onClick={() => {
                                handleSocialSignIn("facebook")
                            }} className="  " > continue with facebook  </Button>
                        </form>
                    </Form>
                </CardContent>
                <Separator className=" border-b-1 border-gray-500/40 "></Separator>
                <CardFooter>
                    sign in form
                </CardFooter>
            </Card>



        </div >
    )
}
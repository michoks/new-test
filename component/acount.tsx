"useClient"
import { useAuth, useUser } from "@clerk/nextjs";
import { useMenuStore } from "@/store/menuStore";
import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormSchema, profileFormSchema } from "@/lib/profileFormSchema";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function ManageAccount() {
    const openManageAccount = useMenuStore((s) => s.openManageAccount);
    const toggleManageAccount = useMenuStore(s => s.toggleManageAccount);
    const { user, isLoaded, isSignedIn } = useUser()
    const { signOut } = useAuth()
    const [error, setError] = useState();
    const [cancelUpdate, setCancelUpdate] = useState(false)
    const [cancleProfileUpdate, setCancelProfileUpdate] = useState(false)

    const form = useForm<ProfileFormSchema>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: "",
            lastName: ""
        }
    });

    const handleNameUpdate = async (value: ProfileFormSchema) => {
        if (!isLoaded) return;
        try {
            if (!cancelUpdate) throw new Error("update has been canceled")
            user?.update({
                firstName: value.firstName,
                lastName: value.lastName
            })
        }
        catch (err: any) {
            if (err.errors && err.errors[0]) {
                setError(err.errors[0].message)
            }
        }
    }

    const cancleNameUpdate = async () => {
        setCancelUpdate(!cancelUpdate)
        form.reset({
            firstName: "",
            lastName: ""
        })
    }

    return (
        <div className=" fixed top-0 bg-gray-950/60 w-full h-full flex items-center justify-center ">
            <div className="   ">

                <Card className=" relative bg-white text-black ">
                    <p onClick={() => { toggleManageAccount() }} className=" absolute top-0 right-0 rounded-full p-3 hover:bg-gray-200/50 " > x </p>
                    <CardHeader className=" border-b-1 border-gray-200 pb-2 ">
                        <CardTitle>
                            profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs className=" flex flex-row items-start gap-10 ">
                            <TabsList className="  ">
                                <TabsTrigger onClick={() => setCancelProfileUpdate(!cancleProfileUpdate)} value="profile">
                                    profile
                                </TabsTrigger>
                            </TabsList>

                            {
                                cancleProfileUpdate &&
                                <TabsContent className=" relative flex flex-col items-left border-1 border-gray-200 rounded-md p-5 gap-6 " value="profile">
                                    <div className=" flex items-center space-x-4   ">
                                        <Image
                                            className=" bg-blue-200 rounded-full "
                                            src={"/public/global.svg"}
                                            alt="user"
                                            height="20"
                                            width="20"
                                        />
                                        <p> {user?.firstName || "name"} </p>

                                    </div>
                                    <div>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(handleNameUpdate)} className=" flex flex-col gap-5 " >
                                                <FormField name="firstName" control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                first name
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input type="text" className=" border-gray-200 " {...field} />
                                                            </FormControl>
                                                            <FormMessage className=" text-red-500 " />
                                                        </FormItem>

                                                    )} />

                                                <FormField name="lastName" control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                last name
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input type="text" className=" border-gray-200 " {...field} />
                                                            </FormControl>
                                                            <FormMessage className=" text-red-500 " />
                                                        </FormItem>


                                                    )} />

                                                <div className=" flex justify-between ">
                                                    <Button type="submit" className=" text-white disabled:bg-black/90 " disabled={!isSignedIn}>upadate</Button>
                                                    <Button type="button" onClick={cancleNameUpdate} className=" text-white  "> cancel </Button>
                                                </div>

                                            </form>
                                        </Form>
                                    </div>
                                    <p onClick={() => setCancelProfileUpdate(!cancleProfileUpdate)} className=" absolute top-0 right-0 p-2 rounded-full bg-gray-200 " > x </p>
                                </TabsContent>
                            }

                        </Tabs>


                    </CardContent>
                    <CardFooter>
                        <CardDescription></CardDescription>
                    </CardFooter>
                </Card>

            </div>



        </div >
    )

}
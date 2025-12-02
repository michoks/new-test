"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postFormSchema, PostFormSchema } from "@/lib/postFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

type UserData = {
    id: number,
    name: string,
    class: string,
    age: string
}
export default function PostForm() {
    const queryClient = useQueryClient();

    const form = useForm<PostFormSchema>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            name: "",
            class: "",
            age: ""
        }
    })

    const mutateData = useMutation({
        mutationFn: async (newData: { name: string, class: string, age: string }) => {
            const res = await axios.post<UserData>("/api/getRequest", newData, {
                headers: {
                    "content-type": "application/json",
                },
            });
            return res.data;
        }
        ,
        onSuccess: (newData) => {
            queryClient.setQueryData<UserData[]>(["users"], (oldData = []) => [...oldData, newData])
        },
        onError: (err: any) => {
            queryClient.cancelQueries()
            console.log(err.message)
        }
    })

    const onSubmit = (value: PostFormSchema) => {
        mutateData.mutate(value)
        console.log(value)
    }

    return (
        <div className=" p-20 ">
            <Card className=" text-white ">
                <CardHeader>
                    <CardTitle>name</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form  {...form} >
                        <form className=" flex flex-col gap-4 " onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name="name" control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>name</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            <FormField name="class" control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>class</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            <FormField name="age" control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Age</FormLabel>
                                        <FormControl>
                                            <Input type="text"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <Button type="submit">add</Button>

                        </form>
                    </Form>
                    <Button>make me</Button>
                </CardContent>
                <CardFooter>
                    <CardDescription></CardDescription>
                </CardFooter>
            </Card>
        </div>
    )

}
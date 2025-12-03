"use client"
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

import { useEffect } from "react";



type Users = {
    id: number,
    name: string,
    class: string,
    age: string
}

export default function CheckQuery() {

    const { user } = useUser()

    const useClient = useQueryClient();
    const previousData = useClient.getQueryData<Users[]>(["users"]) || []

    useEffect(() => {
        useClient.invalidateQueries({ queryKey: ["users"] })

    }, [useClient
    ])

    console.log(previousData.length)

    const { data, isError, error, refetch, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await axios.get<Users[]>("http://localhost:3000/api/getRequest")
            return result.data
        },
        staleTime: 10000,
    });



    if (isLoading) "Loading...";
    if (isError) (<div>
        {isError && <p> Error: {(error as Error).message} </p>}
    </div>);

    return (
        <div>
            <div className=" pt-30 bg-white  ">
                <h1 className=" text-2xl capitalize font-bold ">welcome, {user?.fullName} </h1>
                {data?.map((user) => (
                    <li key={user.id}> {user.name} </li>
                ))}

            </div>
            <button onClick={() => refetch()} className=" capitalize bg-green-400 text-white font-bold ">retry</button>
        </div>

    )

}
import Image from "next/image";
import { useUser, useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import ManageAccount from "./acount";
import { useMenuStore } from "@/store/menuStore";




export default function ProfilePage() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [open, setOpen] = useState(false);
    const openManageAccount = useMenuStore((s) => s.openManageAccount);
    const toggleManageAccount = useMenuStore(s => s.toggleManageAccount);

    return (
        <div className=" text-white ">
            <Image onClick={() => setOpen(!open)}
                className=" bg-blue-400 rounded-full text-center "
                src="/image.png"
                alt="m"
                height="40"
                width="40"
            />

            {open && <div className=" fixed top-0 bottom-auto left-0 right-1/2 z-1000 flex flex-col gap-6 bg-black  ">

                <div className=" flex gap-10 ">
                    <Image onClick={() => setOpen(!open)}
                        className=" bg-blue-400 rounded-full text-center "
                        src="/image.png"
                        alt="m"
                        height="40"
                        width="40"
                    />
                    <div className=" text-start ">
                        <p> {user?.firstName} </p>
                        <p>{user?.primaryEmailAddress?.emailAddress} </p>
                    </div>

                </div>
                <div>
                    <div className="  " onClick={() => toggleManageAccount()}>magnage account</div>

                    {openManageAccount && <ManageAccount />}
                </div>
                <div> <Button type="button" onClick={() => signOut()}> signOut </Button> </div>

            </div >}

        </div >
    )
}
"use client";
import { useState } from "react";
import SideBar from "./sideBar";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMenuStore } from "@/store/menuStore";
import clsx from "clsx";
import ProfilePage from "./profile";


export default function Header() {
    const openMenu = useMenuStore((state) => state.openMenu)
    const setOpenMenu = useMenuStore((state) => state.toggleOpenMenu)

    return (
        <header className="  md:m-0
         bg-white ">
            <div className="  ">
                <div onClick={setOpenMenu}
                    className={` fixed h-screen w-screen  bg-gray-900/70  ${openMenu ? "" : "hidden"} md:hidden `}>
                </div>

                {openMenu && <div className="fixed z-4 w-3/5 md:block bg-blue-200 h-screen ">  <SideBar /> </div>}

                <div className=" flex justify-between items-center p-2 ">
                    <p className="  uppercase text-md font-medium text-blue-700/90 pl-3 ">vimpire</p>

                    <div className=" flex items-center gap-5 ">
                        <ProfilePage />
                        <UserButton />

                        <button onClick={setOpenMenu} disabled={openMenu ? true : false} className=" md:hidden bg-blue-200 rounded-sm py-1 px-3 hover:cursor-pointer text-sm disabled:bg-gray-400  disabled:text-white ">Menu</button>
                        <button className=" capitalize text-pink-600 "> try new skills</button>
                    </div>



                </div>
            </div>


        </header >
    )
}
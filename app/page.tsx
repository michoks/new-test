"use client";
import { useMenuStore } from "@/store/menuStore";
import HeroSection from "@/component/Hero"
import SideBar from "@/component/sideBar"
import Link from "next/link"


export default function Home() {
    const openMenu = useMenuStore((state) => state.openMenu);

    return (<div className=" pt-10 ">
        <div className=" md:grid grid-cols-12 ">

            <div className=" md:col-span-3  lg:col-span-2 ">

                <div className=" fixed hidden md:block bg-blue-200 md:h-screen w-full  md:max-w-3/12 lg:max-w-2/12 ">  <SideBar />  </div>

            </div >
            <div className="  md:col-span-9 lg:col-span-10 ">
                <HeroSection />
                <div className="my-4 flex justify-center">
                    <Link href="/searchId" className=" flex-1 max-w-3/4 md:max-w-1/2">
                        <input placeholder="Search Content" name="name"
                            className=" w-full bg-white text-black text-center  rounded-lg text-xl py-2 font-semibold  hover:cursor-pointer " />
                    </Link>
                </div>
            </div>
            <div className={` pt-10 ${openMenu ? "overflow-hidden" : ""} overflow-hidden h-1000 `}></div>
        </div>

    </div>



    )
}
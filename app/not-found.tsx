"use client";
import Link from "next/link";


export default function NotFound() {
    return (
        <div className=" py-20 flex justify-center ">
            <h1 className="  text-white  text-4xl ">Page not-found</h1>
            <Link href={"/"} className=" capitalize bg-green-400 p-3 text-white text-4xl font-bold rounded-8 ">Home</Link>
        </div>
    )
}
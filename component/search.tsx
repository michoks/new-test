"use client"
import { useState, useRef } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

export default function Search() {
    const [value, setValue] = useState("");
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();


    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return (
        <div className=" pt-10 ">
            <div className="  flex justify-center items-center my-4 ">
                <input name="query"
                    value={value}
                    placeholder="Search Content"
                    onChange={(e) => {
                        handleSearch(e.target.value);
                        setValue(e.target.value);
                    }
                    }
                    className=" flex-1 bg-white text-black max-w-3/4 md:max-w-1/2 rounded-md text-xl pl-8 pr-24 py-2 border-none font-semibold  border-blue-500/80 hover:ring-2 hover:cursor-pointer focus:outline-0 " />

                {
                    value && <p onClick={() => {
                        setValue("")
                        handleSearch("");
                    }}
                        className=" text-white font-md text-2xl bg-black -ml-10 text-center rounded-full capitalize h-8 w-8 hover:text-blue-200 hover:cursor-pointer ">x</p>
                }

            </div >
            <Link href="/"> <p>Home</p></Link>
        </div>

    )
}


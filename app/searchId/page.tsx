import Form from "@/component/form";
import ContactPage from "@/component/formAction";
import Search from "@/component/search";
import { Suspense } from "react";

export default async function searchPage() {

    return (
        <div className=" text-white ">
            <Suspense fallback={<div> Loading...</div>}>
                <Search />
            </Suspense>

            <Form />
            <ContactPage />
        </div>
    )

}
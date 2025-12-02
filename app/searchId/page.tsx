import Form from "@/component/form";
import ContactPage from "@/component/formAction";
import Search from "@/component/search";

export default async function searchPage() {

    return (
        <div className=" text-white ">
            <Search />
            <Form />
            <ContactPage />
        </div>
    )

}
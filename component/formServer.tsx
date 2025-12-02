
export default async function submitForm(formData: FormData) {

    const name = formData.get("name");
    const email = formData.get("email");
    if (!name || !email) {
        throw new Error("Name and Email are required");
    };
    console.log("server received", { name, email });
    return { message: "form submitted successfully" };
}

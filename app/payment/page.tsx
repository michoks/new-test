import { notFound } from "next/navigation";


export default async function SuccessPage({ searchParams }: { searchParams: any }) {
    const reference = searchParams.reference;
    console.log(reference);
    if (!reference) {
        return notFound();
    }

    const res = await fetch(`http://localhost:3000/api/paystack/callback?reference=${reference}`, {
        cache: "no-store"
    });
    const data = await res.json();
    if (data?.status) return notFound();
    console.log(data);

    const tx = data.data;

    return (
        <div className="pt-30 text-9xl text-white">
            PAID
            <p> {tx.status} </p>
            <p> {tx.reference} </p>
        </div>
    )
}
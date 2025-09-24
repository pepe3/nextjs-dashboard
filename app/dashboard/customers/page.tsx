import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Customers',
};
export default async function Page(props: { searchParams?: Promise<{ query?: string | undefined }> }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const customers = await fetchFilteredCustomers(query)
    return (
        <div className="w-full">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <CustomersTable customers={customers} />
            </div>
        </div>
    );
}
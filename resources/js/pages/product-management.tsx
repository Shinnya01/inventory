import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function ProductManagement() {
    return (
        <AppLayout>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                product management
            </div>
        </AppLayout>
    )
}
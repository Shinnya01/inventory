import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const lowStockItems = [
    {
        item: 'Bond Paper A4',
        stock: 12,
        status: 'Low Stock',
    },
    {
        item: 'Marker Black',
        stock: 5,
        status: 'Critical',
    },
    {
        item: 'Ballpen Blue',
        stock: 20,
        status: 'Low Stock',
    },
    {
        item: 'Folder Long',
        stock: 2,
        status: 'Critical',
    },
    {
        item: 'Yellow Pad',
        stock: 15,
        status: 'Low Stock',
    },
];

export default function ProductManagement() {
    return (
        <AppLayout>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Table>
                    <TableCaption>Items that need restocking.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Item</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                                Remaining Stock
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {lowStockItems.map((item) => (
                            <TableRow key={item.item}>
                                <TableCell className="font-medium">
                                    {item.item}
                                </TableCell>
                                <TableCell
                                    className={
                                        item.status === 'Critical'
                                            ? 'font-semibold text-red-600'
                                            : 'font-semibold text-yellow-600'
                                    }
                                >
                                    {item.status}
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.stock}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>
                                Total Low-Stock Items
                            </TableCell>
                            <TableCell className="text-right">
                                {lowStockItems.length}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    );
}

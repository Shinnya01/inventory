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

const movements = [
    {
        id: 1,
        item: 'Bond Paper A4',
        type: 'Stock In',
        qty: 200,
        user: 'Admin',
        date: '2025-01-10',
    },
    {
        id: 2,
        item: 'Bond Paper A4',
        type: 'Stock Out',
        qty: 50,
        user: 'Teacher John',
        date: '2025-01-12',
    },
    {
        id: 3,
        item: 'Marker Black',
        type: 'Stock Out',
        qty: 20,
        user: 'Teacher Anne',
        date: '2025-01-15',
    },
    {
        id: 4,
        item: 'Yellow Pad',
        type: 'Stock In',
        qty: 80,
        user: 'Admin',
        date: '2025-01-18',
    },
];

export default function StockMovement() {
    return (
        <AppLayout>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Table>
                    <TableCaption>Recent stock movement history.</TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">Item</TableHead>
                            <TableHead>Movement</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {movements.map((m) => (
                            <TableRow key={m.id}>
                                <TableCell className="font-medium">
                                    {m.item}
                                </TableCell>

                                <TableCell
                                    className={
                                        m.type === 'Stock In'
                                            ? 'font-semibold text-green-600'
                                            : 'font-semibold text-red-600'
                                    }
                                >
                                    {m.type}
                                </TableCell>

                                <TableCell>{m.qty}</TableCell>
                                <TableCell>{m.user}</TableCell>
                                <TableCell className="text-right">
                                    {m.date}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total Movements</TableCell>
                            <TableCell className="text-right">
                                {movements.length}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    );
}

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
        type: 'IN',
        qty: 200,
        user: 'Admin',
        date: '2025-01-10',
    },
    {
        id: 2,
        item: 'Bond Paper A4',
        type: 'OUT',
        qty: 50,
        user: 'Teacher John',
        date: '2025-01-12',
    },
    {
        id: 3,
        item: 'Marker Black',
        type: 'OUT',
        qty: 20,
        user: 'Teacher Anne',
        date: '2025-01-15',
    },
    {
        id: 4,
        item: 'Yellow Pad',
        type: 'IN',
        qty: 80,
        user: 'Admin',
        date: '2025-01-18',
    },
];

// Summary Calculations
const totalIn = movements
    .filter((m) => m.type === 'IN')
    .reduce((sum, m) => sum + m.qty, 0);

const totalOut = movements
    .filter((m) => m.type === 'OUT')
    .reduce((sum, m) => sum + m.qty, 0);

const netMovement = totalIn - totalOut;

export default function ProductManagement() {
    return (
        <AppLayout>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Table>
                    <TableCaption>
                        Complete report of stock movements.
                    </TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead>Movement</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {movements.map((m) => (
                            <TableRow key={m.id}>
                                <TableCell
                                    className={
                                        m.type === 'IN'
                                            ? 'font-semibold text-green-600'
                                            : 'font-semibold text-red-600'
                                    }
                                >
                                    {m.type === 'IN' ? 'Stock In' : 'Stock Out'}
                                </TableCell>

                                <TableCell className="font-medium">
                                    {m.item}
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
                            <TableCell className="font-bold text-green-700">
                                Total IN
                            </TableCell>
                            <TableCell colSpan={3}></TableCell>
                            <TableCell className="text-right font-bold">
                                {totalIn}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-bold text-red-700">
                                Total OUT
                            </TableCell>
                            <TableCell colSpan={3}></TableCell>
                            <TableCell className="text-right font-bold">
                                {totalOut}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-bold">
                                Net Movement
                            </TableCell>
                            <TableCell colSpan={3}></TableCell>
                            <TableCell
                                className={`text-right font-bold ${
                                    netMovement >= 0
                                        ? 'text-green-700'
                                        : 'text-red-700'
                                }`}
                            >
                                {netMovement}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    );
}

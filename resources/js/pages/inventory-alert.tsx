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
import { Product } from '@/types';
import { Head } from '@inertiajs/react';


export default function ProductManagement({inventories}: {inventories: Product[]}) {
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
                        {inventories.map((inventory) => (
                            <TableRow key={inventory.id}>
                                <TableCell className="font-medium">
                                    {inventory.name}
                                </TableCell>
                                <TableCell
                                    className={
                                        inventory.stock <= 0
                                            ? 'font-semibold text-red-600'
                                        : inventory.stock <= 10
                                            ? 'font-semibold text-yellow-600'
                                        :  'font-semibold text-green-600'
                                            
                                    }
                                >
                                    {inventory.stock <= 0
                                        ? 'Critical'
                                    : inventory.stock <= 10   
                                        ? 'Low Stock'
                                    :  'In Stock'
                                    }
                                </TableCell>
                                <TableCell className="text-right">
                                    {inventory.stock}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>
                                Total Stock
                            </TableCell>
                            <TableCell className="text-right">
                                {inventories.length}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    );
}

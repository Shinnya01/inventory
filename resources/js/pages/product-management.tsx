import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product, SharedData } from "@/types";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react";

export default function ProductManagement({products} : {products:Product[]}) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        description: "",
        price: "",
        stock: "",
    });

    const buyForm = useForm({
        quantity: 0,
    });



    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();

        post("/product-management", {
            onSuccess: () => {
                reset();
            }
        });
    };

    
    return (
        
        <AppLayout>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between items-center">
                    <InputGroup className="max-w-lg">
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton>Search</InputGroupButton>
                    </InputGroupAddon>
                    </InputGroup>
                    {auth.user.role === "admin" &&
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Create Product</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <form onSubmit={handleCreate} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Create New Product</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to create a new product.
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData("name", e.target.value)}
                                    placeholder="Product name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Nescription</Label>
                                <Input 
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData("description", e.target.value)}
                                    placeholder="Product description"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input 
                                        id="price"
                                        value={data.price}
                                        onChange={e => setData("price", e.target.value)}
                                        placeholder="Product price"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input 
                                        id="stock"
                                        value={data.stock}
                                        onChange={e => setData("stock", e.target.value)}
                                        placeholder="Product stock"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 items-center">
                                <Button variant="ghost">Discard</Button>
                                <Button className="">Create Product</Button>
                            </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                    }
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Product Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            {auth.user.role === "admin" ? (
                            <TableCell className="text-right space-x-2">
                                
                                <Button size="sm" variant="destructive">Delete</Button>
                                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">Edit</Button>
                                
                            </TableCell>
                            ) : (
                                <TableCell className="text-right space-x-2">
                                
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                                Buy
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Buy {product.name}</DialogTitle>
                                            </DialogHeader>

                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    buyForm.post(`/buy/${product.id}`, {
                                                        onSuccess: () => buyForm.reset(),
                                                    });

                                                }}
                                                className="space-y-4"
                                            >
                                                <Label>Quantity</Label>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    value={buyForm.data.quantity}
                                                    onChange={(e) => buyForm.setData("quantity", Number(e.target.value))}
                                                />

                                                <Button type="submit" disabled={buyForm.processing}>
                                                    Confirm Purchase
                                                </Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                
                                </TableCell>
                                )
                            }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    )
}
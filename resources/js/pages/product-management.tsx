import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage, router, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

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
import { SearchIcon, AlertCircle, CheckCircle, Trash2 } from "lucide-react";

export default function ProductManagement({products} : {products:Product[]}) {
    const { auth } = usePage<SharedData>().props;
    const { flash } = usePage<SharedData>().props;
    const [buyError, setBuyError] = useState<string | null>(null);
    const [buySuccess, setBuySuccess] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        description: "",
        price: "",
        stock: "",
    });

    const editForm = useForm({
        name: "",
        description: "",
        price: "",
        stock: "",
    });

    const deleteForm = useForm({});

    const buyForm = useForm({
        quantity: 0,
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();

        post("/product-management", {
            onSuccess: () => {
                reset();
                setIsCreateDialogOpen(false);
                // Reload the page to get updated product list
                router.visit('/product-management');
            }
        });
    };

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        editForm.setData({
            name: product.name,
            description: product.description || "",
            price: String(product.price),
            stock: String(product.stock),
        });
        setIsEditDialogOpen(true);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedProduct) return;

        console.log('=== UPDATE START ===');
        console.log('Product ID:', selectedProduct.id);
        console.log('Form Data:', editForm.data);

        editForm.put(`/product-management/${selectedProduct.id}`, {
            onSuccess: (response) => {
                console.log('=== UPDATE SUCCESS ===');
                console.log('Response:', response);
                setIsEditDialogOpen(false);
                setSelectedProduct(null);
                editForm.reset();
                window.location.reload();
            },
            onError: (errors) => {
                console.error('=== UPDATE ERROR ===');
                console.error('Errors:', errors);
            },
            onFinish: () => {
                console.log('=== UPDATE FINISH ===');
            }
        });
    };

    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        if (!productToDelete) return;

        console.log('=== DELETE START ===');
        console.log('Product ID:', productToDelete.id);
        console.log('Product name:', productToDelete.name);

        deleteForm.delete(`/product-management/${productToDelete.id}`, {
            onSuccess: (response) => {
                console.log('=== DELETE SUCCESS ===');
                console.log('Response:', response);
                setShowDeleteConfirm(false);
                setProductToDelete(null);
                window.location.reload();
            },
            onError: (errors) => {
                console.error('=== DELETE ERROR ===');
                console.error('Errors:', errors);
            },
            onFinish: () => {
                console.log('=== DELETE FINISH ===');
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
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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
                                <Button 
                                    variant="ghost"
                                    onClick={() => setIsCreateDialogOpen(false)}
                                >
                                    Discard
                                </Button>
                                <Button className="" disabled={processing}>
                                    Create Product
                                </Button>
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
                                <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleDeleteClick(product)}
                                >
                                    Delete
                                </Button>
                                <Button 
                                    size="sm" 
                                    className="bg-blue-500 hover:bg-blue-600"
                                    onClick={() => handleEditClick(product)}
                                >
                                    Edit
                                </Button>
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

                                            {buyError && (
                                                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                                                    <AlertCircle size={20} />
                                                    <span>{buyError}</span>
                                                </div>
                                            )}

                                            {buySuccess && (
                                                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
                                                    <CheckCircle size={20} />
                                                    <span>{buySuccess}</span>
                                                </div>
                                            )}

                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    setBuyError(null);
                                                    setBuySuccess(null);
                                                    
                                                    // Check stock before submitting
                                                    if (buyForm.data.quantity > product.stock) {
                                                        setBuyError(`Not enough stock available. Current stock: ${product.stock}`);
                                                        return;
                                                    }

                                                    buyForm.post(`/buy/${product.id}`, {
                                                        onSuccess: () => {
                                                            buyForm.reset();
                                                            setBuySuccess('Purchase successful!');
                                                            setTimeout(() => setBuySuccess(null), 3000);
                                                        },
                                                        onError: () => {
                                                            const errors = buyForm.errors;
                                                            if (Object.keys(errors).length > 0) {
                                                                setBuyError(Object.values(errors)[0] as string);
                                                            }
                                                        }
                                                    });

                                                }}
                                                className="space-y-4"
                                            >
                                                <div>
                                                    <Label>Quantity</Label>
                                                    <p className="text-sm text-gray-600 mb-2">Available stock: {product.stock}</p>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        max={product.stock}
                                                        value={buyForm.data.quantity}
                                                        onChange={(e) => buyForm.setData("quantity", Number(e.target.value))}
                                                    />
                                                </div>

                                                <Button 
                                                    type="submit" 
                                                    disabled={buyForm.processing || product.stock === 0}
                                                >
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

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                            <DialogDescription>
                                Update the product details.
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <Label htmlFor="edit-name">Name</Label>
                            <Input 
                                id="edit-name"
                                value={editForm.data.name}
                                onChange={e => editForm.setData("name", e.target.value)}
                                placeholder="Product name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Input 
                                id="edit-description"
                                value={editForm.data.description}
                                onChange={e => editForm.setData("description", e.target.value)}
                                placeholder="Product description"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit-price">Price</Label>
                                <Input 
                                    id="edit-price"
                                    value={editForm.data.price}
                                    onChange={e => editForm.setData("price", e.target.value)}
                                    placeholder="Product price"
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-stock">Stock</Label>
                                <Input 
                                    id="edit-stock"
                                    value={editForm.data.stock}
                                    onChange={e => editForm.setData("stock", e.target.value)}
                                    placeholder="Product stock"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 items-center">
                            <Button 
                                disabled={editForm.processing}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4">
                        <Button 
                            variant="ghost"
                            onClick={() => setShowDeleteConfirm(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive"
                            onClick={handleConfirmDelete}
                            disabled={deleteForm.processing}
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}
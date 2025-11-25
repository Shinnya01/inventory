import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { User } from '@/types';
import { useState } from 'react';

export default function UserManagement({ users }: { users: User[] }) {
    const [editUser, setEditUser] = useState<User | null>(null);
    
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [deleteUser, setDeleteUser] = useState<User | null>(null);

    const handleEdit = (user: User) => {
        setEditUser(user);
    };


    const {
        data: { name, email, password, password2 },
        setData,
    } = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const handleCreateUser = () => {
        router.post(
            '/user-management',
            {
                name,
                email,
                password,
                password_confirmation: password2,
            },
            {
                onSuccess: () => {
                    // close modal
                    setIsCreateOpen(false);

                    // reset form
                    setData({
                        name: '',
                        email: '',
                        password: '',
                        password2: '',
                    });
                },
            },
        );
    };


    return (
        <AppLayout>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-end">
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>Create Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Account</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to create a new account.
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    value={name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="user name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">email</Label>
                                <Input
                                    value={email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder="user email"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">password</Label>
                                <Input
                                    value={password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="user password"
                                />
                            </div>
                            <div>
                                <Label htmlFor="repeat password">
                                    repeat password
                                </Label>
                                <Input
                                    value={password2}
                                    onChange={(e) =>
                                        setData('password2', e.target.value)
                                    }
                                    placeholder="repeat password"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <Button variant="ghost">Discard</Button>
                                <Button onClick={handleCreateUser}>
                                    Create Account
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>email</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>

                                <TableCell className="space-x-2 text-right">
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => setDeleteUser(user)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-blue-500 hover:bg-blue-600"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Delete user modal */}
                {deleteUser && (
                    <Dialog
                        open={!!deleteUser}
                        onOpenChange={() => setDeleteUser(null)}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete User</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete{' '}
                                    <strong>{deleteUser.name}</strong>? This
                                    action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-4 flex justify-end gap-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => setDeleteUser(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        router.delete(
                                            `/user-management/${deleteUser.id}`,
                                            {
                                                onSuccess: () =>
                                                    setDeleteUser(null), // close modal after delete
                                            },
                                        );
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}

                {/* EDIT USER */}
                {editUser && (
                    <Dialog
                        open={!!editUser}
                        onOpenChange={() => setEditUser(null)}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Account</DialogTitle>
                                <DialogDescription>
                                    Update the user details below.
                                </DialogDescription>
                            </DialogHeader>

                            <div>
                                <Label>Name</Label>
                                <Input
                                    value={editUser.name}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="mt-2">
                                <Label>Email</Label>
                                <Input
                                    value={editUser.email}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            {/* OPTIONAL: If you want password update */}

                            <div className="mt-2">
                                <Label>New Password (optional)</Label>
                                <Input
                                    type="password"
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            password: e.target.value,
                                        })
                                    }
                                    placeholder="Leave blank to keep existing password"
                                />
                            </div>

                            <div className="mt-4 flex justify-end gap-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => setEditUser(null)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={() =>
                                        router.put(
                                            `/user-management/${editUser.id}`,
                                            {
                                                name: editUser.name,
                                                email: editUser.email,
                                                password: editUser.password,
                                            },
                                            {
                                                onSuccess: () =>
                                                    setEditUser(null), // closes the modal
                                            },
                                        )
                                    }
                                    className="bg-blue-600 text-white"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </AppLayout>
    );
}

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Package, Pen, User } from 'lucide-react';
import AppLogo from './app-logo';

const adminNavItems: NavItem[] = [
    {
        title: 'User Management',
        href: '/user-management',
        icon: User,
    },
    {
        title: 'Product Management',
        href: '/product-management',
        icon: Pen,
    },
    {
        title: 'Stock Movement',
        href: '/stock-movement',
        icon: Package,
    },
    {
        title: 'Inventory Alerts',
        href: '/inventory-alerts',
        icon: Package,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: Package,
    },
];
const userNavItems: NavItem[] = [
    {
        title: 'Product Management',
        href: '/product-management',
        icon: Pen,
    },
    {
        title: 'Stock Movement',
        href: '/stock-movement',
        icon: Package,
    },
    {
        title: 'Inventory Alerts',
        href: '/inventory-alerts',
        icon: Package,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: Package,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {auth.user.role === 'admin' ? (
                    <NavMain items={adminNavItems} />
                ) : (
                    <NavMain items={userNavItems} />
                )}
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

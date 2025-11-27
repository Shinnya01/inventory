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
import { Package, Pen, User, UsersIcon, FilePenLine , FileSliders, Siren, MegaphoneIcon, ShoppingBagIcon} from 'lucide-react';
import AppLogo from './app-logo';

const adminNavItems: NavItem[] = [
    {
        title: 'Users Management',
        href: '/user-management',
        icon: UsersIcon,
    },
    {
        title: 'Product Management',
        href: '/product-management',
        icon: FilePenLine,
    },
    {
        title: 'Stock Movement',
        href: '/stock-movement',
        icon: FileSliders,
    },
    {
        title: 'Inventory Alerts',
        href: '/inventory-alerts',
        icon: Siren,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: MegaphoneIcon,
    },
];
const userNavItems: NavItem[] = [
    {
        title: 'Products',
        href: '/product-management',
        icon: ShoppingBagIcon,
    },
    {
        title: 'Stock Movement',
        href: '/stock-movement',
        icon: FileSliders,
    },
    {
        title: 'Inventory Alerts',
        href: '/inventory-alerts',
        icon: Siren,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: MegaphoneIcon,
    },
];

const footerNavItems: NavItem[] = [

];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href='/' prefetch>
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

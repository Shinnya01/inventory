import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    password: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Stock {
    id: number;
    product_id: number;
    quantity: number;
    movement_type: 'in' | 'out';
    user_id: number;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...

    product: Product;
    user: User;
}

export interface ReportType {
  id: number
  name: string        // product name
  quantity: number    // stock moved
  current_stock: number
  detail: string      // 'Admin added stock', 'User bought', etc.
  date: string        // movement date
  status: string
  created_at: string;
  
  product: Product;
}


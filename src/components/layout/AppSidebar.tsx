import { Link, useLocation } from 'react-router-dom';
import {
  FileSignature,
  Layers,
  LayoutDashboard,
  Package,
  SearchCheck,
  ShoppingBag,
  Users,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavUser } from './sidebar/NavUser';

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Orders', url: '/orders', icon: Package },
  { title: 'Batch', url: '/batch', icon: Layers },
  { title: 'Customers', url: '/customers', icon: Users },
];

const otherNavItems = [
  { title: 'Public Form', url: '/order-form', icon: FileSignature },
  { title: 'Track Order', url: '/track', icon: SearchCheck },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const isActive = (url: string) =>
    url === '/' ? pathname === '/' : pathname.startsWith(url);

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="xl"
              render={<Link to="/" />}
              variant='ghost'
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-pastel-blue-dark">
                <ShoppingBag className='text-white' />
              </span>
              <div className="grid min-w-0 flex-1 text-start leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-lg font-bold tracking-tight">Ikigai Carry</span>
                <span className="truncate text-xs text-muted-foreground">Order Management</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton render={<Link to={item.url} />} isActive={isActive(item.url)} tooltip={item.title}>
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarMenu>
            {otherNavItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton render={<Link to={item.url} />} isActive={isActive(item.url)} tooltip={item.title}>
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
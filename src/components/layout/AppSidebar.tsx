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
              size="lg"
              render={<Link to="/" />}
              className="group-data-[collapsible=icon]:p-0!"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-pastel-pink-text">
                <ShoppingBag className='text-white' />
              </span>
              <div className="grid min-w-0 flex-1 text-start leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-base font-bold tracking-tight">ikigai Carry</span>
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                A
              </span>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-semibold">Admin</span>
                <span className="truncate text-xs text-muted-foreground">admin@ikigai.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
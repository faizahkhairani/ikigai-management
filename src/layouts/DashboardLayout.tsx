import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';
import { Search } from '@/components/common/Search';
import { UserProfile } from '@/components/common/UserProfile';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header fixed>
          <p className="shrink-0 text-black">Dashboard</p>
          <div className="ml-auto flex items-center gap-4">
            <Search />
            <UserProfile />
          </div>
        </Header>
        <main className="mx-auto w-full max-w-8xl flex-1 px-7 pb-6 mt-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
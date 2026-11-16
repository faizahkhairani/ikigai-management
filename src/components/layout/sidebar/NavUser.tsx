import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'
import { useAuthStore } from "@/features/auth/store"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"

export function NavUser() {
  const { profile } = useAuthStore()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const getInitials = (name?: string) =>
    (name ?? '')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? '')
      .join('') || '?'


  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SidebarMenuButton
                size='lg'
                variant='ghost'
              >
                <Avatar className='h-8 w-8 rounded-lg'>
                  {/* <AvatarImage src={user.avatar} alt={profile?.name} /> */}
                  <AvatarFallback className="text-black rounded-full">{getInitials(profile?.name)}</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-start text-sm leading-tight'>
                  <span className='truncate text-xs font-semibold text-black'>{profile?.name}</span>
                  <span className='truncate text-xs text-black'>{profile?.email}</span>
                </div>
                <ChevronsUpDown className='ms-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-64">
              <DropdownMenuGroup>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col gap-1.5'>
                    <p className='text-sm leading-none font-medium'>{profile?.name}</p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {profile?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to='/settings/account' className='flex w-full items-center gap-2'>
                  <BadgeCheck />
                  Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to='/settings' className='flex w-full items-center gap-2'>
                  <CreditCard />
                  Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to='/settings/notifications' className='flex w-full items-center gap-2'>
                  <Bell />
                  Notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}

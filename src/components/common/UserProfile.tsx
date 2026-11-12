import { useNavigate } from "react-router-dom"
import { 
DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut 
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthStore } from "@/features/auth/store"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { Separator } from "../ui/separator"

export function UserProfile() {
  const { profile, isLoading } = useAuthStore()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
            <div className="flex justify-between cursor-pointer">
                <button className="w-full flex items-center gap-3">
                  {isLoading ? (
                    <>
                      {/* Skeleton Avatar */}
                      <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                    </>
                  ) : (
                    <>
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-emerald-900 flex items-center justify-center text-xs font-medium text-white shrink-0">
                        {profile?.name?.charAt(0) ?? "?"}
                      </div>
                    </>
                  )}
                </button>
            </div>
          
        }
      />
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
          <Separator />
           <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem >
              Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
              Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import Link from "next/link"
import { Bell, Search, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">R</span>
          </div>
          <span className="text-lg font-semibold">Recycle IMS</span>
        </Link>

        <nav className="flex flex-1 items-center gap-6 text-sm">
          <Link href="/dashboard" className="font-medium text-foreground transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/inventory" className="text-muted-foreground transition-colors hover:text-foreground">
            Inventory
          </Link>
          <Link href="/sales" className="text-muted-foreground transition-colors hover:text-foreground">
            Sales
          </Link>
          <Link href="/purchase-orders" className="text-muted-foreground transition-colors hover:text-foreground">
            Purchase Orders
          </Link>
          <Link href="/invoices" className="text-muted-foreground transition-colors hover:text-foreground">
            Invoices
          </Link>
          <Link href="/compliance" className="text-muted-foreground transition-colors hover:text-foreground">
            Compliance
          </Link>
          <Link href="/reports" className="text-muted-foreground transition-colors hover:text-foreground">
            Reports
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-64 pl-8" />
          </div>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

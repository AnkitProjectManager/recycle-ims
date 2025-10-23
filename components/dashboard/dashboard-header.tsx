"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/'
    }
    return pathname.startsWith(path)
  }
  
  const getLinkClasses = (path: string) => {
    const baseClasses = "transition-colors hover:scale-105 transform"
    if (isActive(path)) {
      return `text-gray-900 relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:rounded-full hover:text-green-600 ${baseClasses}` 
        + ` after:bg-green-500`
    }
    return `text-gray-600 hover:text-green-600 ${baseClasses}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="flex h-16 items-center gap-6 px-6 max-w-8xl mx-auto">
        {/* Logo - Ola inspired */}
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg" style={{background: 'linear-gradient(135deg, #00D100 0%, #00B000 100%)'}}>
            <span className="text-lg font-bold">R</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">RecycleIMS</span>
        </Link>

        {/* Navigation - Modern spacing */}
        <nav className="flex flex-1 items-center gap-8 text-sm font-medium ml-8">
          <Link 
            href="/dashboard" 
            className={getLinkClasses('/dashboard')}
          >
            Dashboard
          </Link>
          <Link 
            href="/inventory" 
            className={getLinkClasses('/inventory')}
          >
            Inventory
          </Link>
          <Link 
            href="/sales" 
            className={getLinkClasses('/sales')}
          >
            Sales
          </Link>
          <Link 
            href="/purchase-orders" 
            className={getLinkClasses('/purchase-orders')}
          >
            Purchase Orders
          </Link>
          <Link 
            href="/invoices" 
            className={getLinkClasses('/invoices')}
          >
            Invoices
          </Link>
          <Link 
            href="/compliance" 
            className={getLinkClasses('/compliance')}
          >
            Compliance
          </Link>
          <Link 
            href="/reports" 
            className={getLinkClasses('/reports')}
          >
            Reports
          </Link>
        </nav>

        {/* Actions - Modern Ola-inspired */}
        <div className="flex items-center gap-3">
          {/* Search - Prominent like Ola */}
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search anything..." 
              className="w-80 pl-11 h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all font-medium placeholder:text-gray-400" 
            />
          </div>

          {/* Notifications - Clean style */}
          <Button 
            variant="ghost" 
            size="icon"
            className="h-11 w-11 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all hover:scale-105 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 text-white text-xs rounded-full flex items-center justify-center font-bold" style={{backgroundColor: '#00D100'}}>
              3
            </span>
          </Button>

          {/* Profile - Avatar style like Uber/Ola */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost"
                className="h-11 w-11 rounded-xl p-0 hover:bg-gray-100 transition-all hover:scale-105"
              >
                <div className="h-9 w-9 rounded-lg flex items-center justify-center text-white font-semibold text-sm" style={{background: 'linear-gradient(135deg, #00D100 0%, #00B000 100%)'}}>
                  JD
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-xl border-0 bg-white">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">john@recycleims.com</p>
              </div>
              <DropdownMenuItem className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-none">
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-none">
                <User className="mr-3 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem className="px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-none">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

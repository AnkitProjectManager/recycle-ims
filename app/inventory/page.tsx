import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InventoryStats } from "@/components/inventory/inventory-stats"
import { InventoryList } from "@/components/inventory/inventory-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-2xl shadow-emerald-500/20">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Inventory Management</h1>
              <p className="text-emerald-100 text-lg">Track, manage, and optimize your material inventory efficiently</p>
            </div>
            <Link href="/inventory/new">
              <Button 
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                variant="outline"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Material
              </Button>
            </Link>
          </div>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-cyan-400/20 blur-xl"></div>
        </div>

        <InventoryStats />
        <InventoryList />
      </main>
    </div>
  )
}

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InventoryStats } from "@/components/inventory/inventory-stats"
import { InventoryList } from "@/components/inventory/inventory-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-8xl mx-auto px-6 py-8 space-y-8">
        {/* Header Section - Ola-inspired modern layout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 text-lg">Track and manage your material inventory efficiently</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#00D100'}}></div>
                <span className="text-sm text-gray-600 font-medium">342 Active Items</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 font-medium">$124K Value</span>
              </div>
            </div>
          </div>
          <Link href="/inventory/new">
            <Button size="lg" className="shadow-lg hover:shadow-xl">
              <Plus className="h-5 w-5 mr-2" />
              Add New Material
            </Button>
          </Link>
        </div>

        <InventoryStats />
        <InventoryList />
      </main>
    </div>
  )
}

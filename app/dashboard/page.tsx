import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { InventoryChart } from "@/components/dashboard/inventory-chart"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TopMaterials } from "@/components/dashboard/top-materials"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-8xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section - Clean Ola style */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, John! 👋</h1>
              <p className="text-gray-600 text-lg">Here's what's happening with your recycling operations today.</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-ola-primary">94%</div>
                <div className="text-sm text-gray-500">Efficiency</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$452K</div>
                <div className="text-sm text-gray-500">Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <Suspense fallback={<KPICardsSkeleton />}>
          <KPICards />
        </Suspense>

        {/* Charts Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Suspense fallback={<ChartSkeleton />}>
            <InventoryChart />
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <SalesChart />
          </Suspense>
        </div>

        {/* Activity Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<ActivitySkeleton />}>
              <RecentActivity />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<ActivitySkeleton />}>
              <TopMaterials />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}

function KPICardsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="h-4 bg-slate-200 rounded w-20"></div>
            <div className="h-10 w-10 bg-slate-200 rounded-xl"></div>
          </div>
          <div className="h-8 bg-slate-200 rounded w-24 mb-3"></div>
          <div className="h-4 bg-slate-200 rounded w-32"></div>
        </div>
      ))}
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="h-6 bg-slate-200 rounded w-40 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-64"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-4 bg-slate-200 rounded w-16"></div>
          <div className="h-4 bg-slate-200 rounded w-16"></div>
        </div>
      </div>
      <div className="h-80 bg-slate-200 rounded-lg"></div>
    </div>
  )
}

function ActivitySkeleton() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-pulse">
      <div className="h-6 bg-slate-200 rounded w-32 mb-4"></div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
              <div>
                <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-16"></div>
              </div>
            </div>
            <div className="h-4 bg-slate-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

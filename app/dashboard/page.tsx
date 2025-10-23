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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 p-8 text-white shadow-2xl shadow-blue-500/20">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
            <p className="text-blue-100 text-lg">Welcome back! Here's what's happening with your recycling operations today.</p>
          </div>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-emerald-400/20 blur-xl"></div>
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

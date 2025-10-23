import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SalesOrdersList } from "@/components/sales/sales-orders-list"
import { SalesStats } from "@/components/sales/sales-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function SalesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales Orders</h1>
            <p className="text-muted-foreground">Manage sales orders and generate invoices</p>
          </div>
          <Link href="/sales/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Sales Order
            </Button>
          </Link>
        </div>

        <Suspense fallback={<Skeleton className="h-32" />}>
          <SalesStats />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-96" />}>
          <SalesOrdersList />
        </Suspense>
      </main>
    </div>
  )
}

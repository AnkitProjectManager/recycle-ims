import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PurchaseOrdersList } from "@/components/purchase-orders/purchase-orders-list"
import { PurchaseOrderStats } from "@/components/purchase-orders/purchase-order-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function PurchaseOrdersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
            <p className="text-muted-foreground">Manage purchase orders and vendor relationships</p>
          </div>
          <Link href="/purchase-orders/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Purchase Order
            </Button>
          </Link>
        </div>

        <Suspense fallback={<Skeleton className="h-32" />}>
          <PurchaseOrderStats />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-96" />}>
          <PurchaseOrdersList />
        </Suspense>
      </main>
    </div>
  )
}

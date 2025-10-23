import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NewPurchaseOrderForm } from "@/components/purchase-orders/new-purchase-order-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewPurchaseOrderPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Link href="/purchase-orders">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Purchase Order</h1>
            <p className="text-muted-foreground">Create a new purchase order for a vendor</p>
          </div>
        </div>

        <NewPurchaseOrderForm />
      </main>
    </div>
  )
}

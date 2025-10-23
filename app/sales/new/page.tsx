import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NewSalesOrderForm } from "@/components/sales/new-sales-order-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewSalesOrderPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Link href="/sales">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Sales Order</h1>
            <p className="text-muted-foreground">Create a new sales order for a customer</p>
          </div>
        </div>

        <NewSalesOrderForm />
      </main>
    </div>
  )
}

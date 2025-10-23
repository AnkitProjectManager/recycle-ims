import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NewInvoiceForm } from "@/components/invoices/new-invoice-form"
import { Skeleton } from "@/components/ui/skeleton"

export default function NewInvoicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
            <p className="text-muted-foreground">Generate a new invoice for your customers</p>
          </div>
        </div>

        <Suspense fallback={<Skeleton className="h-96" />}>
          <NewInvoiceForm />
        </Suspense>
      </main>
    </div>
  )
}
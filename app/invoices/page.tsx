import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InvoicesList } from "@/components/invoices/invoices-list"
import { InvoiceStats } from "@/components/invoices/invoice-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function InvoicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="text-muted-foreground">Manage invoices and track payments</p>
          </div>
          <Link href="/invoices/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </Link>
        </div>

        <Suspense fallback={<Skeleton className="h-32" />}>
          <InvoiceStats />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-96" />}>
          <InvoicesList />
        </Suspense>
      </main>
    </div>
  )
}

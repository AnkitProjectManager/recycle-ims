import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NewInventoryForm } from "@/components/inventory/new-inventory-form"
import { Skeleton } from "@/components/ui/skeleton"

export default function NewInventoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Material</h1>
            <p className="text-muted-foreground">Add a new material to your inventory system</p>
          </div>
        </div>

        <Suspense fallback={<Skeleton className="h-96" />}>
          <NewInventoryForm />
        </Suspense>
      </main>
    </div>
  )
}
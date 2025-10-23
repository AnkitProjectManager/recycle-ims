import { Suspense } from "react"
import { CustomerPortalHeader } from "@/components/customer-portal/customer-portal-header"
import { CustomerStats } from "@/components/customer-portal/customer-stats"
import { WasteDiversionChart } from "@/components/customer-portal/waste-diversion-chart"
import { DestructionCertificates } from "@/components/customer-portal/destruction-certificates"
import { EnvironmentalImpact } from "@/components/customer-portal/environmental-impact"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomerPortalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <CustomerPortalHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Portal</h1>
            <p className="text-muted-foreground">View your destruction certificates and environmental impact</p>
          </div>
        </div>

        <Suspense fallback={<Skeleton className="h-32" />}>
          <CustomerStats />
        </Suspense>

        <div className="grid gap-6 md:grid-cols-2">
          <Suspense fallback={<Skeleton className="h-96" />}>
            <WasteDiversionChart />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-96" />}>
            <EnvironmentalImpact />
          </Suspense>
        </div>

        <Suspense fallback={<Skeleton className="h-96" />}>
          <DestructionCertificates />
        </Suspense>
      </main>
    </div>
  )
}

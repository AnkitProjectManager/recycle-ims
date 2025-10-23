import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ComplianceStats } from "@/components/compliance/compliance-stats"
import { CertificatesList } from "@/components/compliance/certificates-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function CompliancePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compliance & Certificates</h1>
            <p className="text-muted-foreground">Manage destruction certificates and compliance documents</p>
          </div>
          <Link href="/compliance/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Certificate
            </Button>
          </Link>
        </div>

        <Suspense fallback={<Skeleton className="h-32" />}>
          <ComplianceStats />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-96" />}>
          <CertificatesList />
        </Suspense>
      </main>
    </div>
  )
}

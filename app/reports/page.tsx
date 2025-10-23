import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ReportsGrid } from "@/components/reports/reports-grid"
import { RecentReports } from "@/components/reports/recent-reports"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6 space-y-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">Generate and view comprehensive business reports</p>
        </div>

        <ReportsGrid />
        <RecentReports />
      </main>
    </div>
  )
}

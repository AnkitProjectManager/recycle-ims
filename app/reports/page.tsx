import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ReportsGrid } from "@/components/reports/reports-grid"
import { RecentReports } from "@/components/reports/recent-reports"

export default function ReportsPage() {
  return (
  <div className="min-h-screen bg-gradient-to-br from-[color:var(--muted)] via-[color:var(--background)] to-[color:var(--primary)]/10">
      <DashboardHeader />
      <main className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Generate and view comprehensive business reports</p>
        </div>

        <ReportsGrid />
        <RecentReports />
      </main>
    </div>
  )
}

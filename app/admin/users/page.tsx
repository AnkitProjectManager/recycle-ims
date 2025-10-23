import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { UsersList } from "@/components/admin/users-list"
import { UserStats } from "@/components/admin/user-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function UsersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions</p>
          </div>
          <Link href="/admin/users/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
        </div>

        <Suspense fallback={<Skeleton className="h-32" />}>
          <UserStats />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-96" />}>
          <UsersList />
        </Suspense>
      </main>
    </div>
  )
}

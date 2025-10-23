import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, UserCheck, UserCog, Users } from "lucide-react"

// Mock data
const stats = [
  {
    title: "Total Users",
    value: "48",
    icon: Users,
    description: "Active accounts",
  },
  {
    title: "Administrators",
    value: "3",
    icon: Shield,
    description: "Full access",
  },
  {
    title: "Managers",
    value: "8",
    icon: UserCog,
    description: "Department leads",
  },
  {
    title: "Active Today",
    value: "32",
    icon: UserCheck,
    description: "Currently online",
  },
]

export function UserStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

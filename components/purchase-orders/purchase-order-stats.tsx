import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign, Package, TrendingDown } from "lucide-react"

// Mock data
const stats = [
  {
    title: "Total PO Value",
    value: "$89,450",
    icon: DollarSign,
    description: "This month",
  },
  {
    title: "Open POs",
    value: "15",
    icon: Package,
    description: "Awaiting delivery",
  },
  {
    title: "Pending Approval",
    value: "4",
    icon: Clock,
    description: "Requires review",
  },
  {
    title: "Avg Lead Time",
    value: "12 days",
    icon: TrendingDown,
    description: "-2 days from last month",
  },
]

export function PurchaseOrderStats() {
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

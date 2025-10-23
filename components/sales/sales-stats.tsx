import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FileText, Package, TrendingUp } from "lucide-react"

// Mock data
const stats = [
  {
    title: "Total Sales",
    value: "$124,582",
    icon: DollarSign,
    description: "This month",
  },
  {
    title: "Open Orders",
    value: "23",
    icon: Package,
    description: "Awaiting shipment",
  },
  {
    title: "Pending Invoices",
    value: "12",
    icon: FileText,
    description: "To be generated",
  },
  {
    title: "Avg Order Value",
    value: "$5,416",
    icon: TrendingUp,
    description: "+12% from last month",
  },
]

export function SalesStats() {
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

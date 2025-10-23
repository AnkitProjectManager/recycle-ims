import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react"

export function InventoryStats() {
  const stats = [
    {
      title: "Total Materials",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Total Value",
      value: "$2.4M",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "-5 from last week",
      trend: "down",
      icon: AlertTriangle,
    },
    {
      title: "Turnover Rate",
      value: "4.2x",
      change: "+0.3x",
      trend: "up",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border border-border bg-surface shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-foreground mb-2">{stat.value}</div>
              <div className="flex items-center text-xs">
                <span className={`inline-flex items-center px-2 py-0.5 rounded font-medium ${
                  stat.trend === "up" 
                    ? "bg-green-50 text-green-700" 
                    : "bg-red-50 text-red-700"
                }`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

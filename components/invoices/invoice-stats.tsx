import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Clock, DollarSign } from "lucide-react"

// Mock data
const stats = [
  {
    title: "Total Outstanding",
    value: "$45,230",
    icon: DollarSign,
    description: "18 unpaid invoices",
  },
  {
    title: "Paid This Month",
    value: "$89,450",
    icon: CheckCircle,
    description: "34 invoices",
  },
  {
    title: "Overdue",
    value: "$12,800",
    icon: AlertCircle,
    description: "5 invoices",
  },
  {
    title: "Avg Payment Time",
    value: "28 days",
    icon: Clock,
    description: "-3 days from last month",
  },
]

export function InvoiceStats() {
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

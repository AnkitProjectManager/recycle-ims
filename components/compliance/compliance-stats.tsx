import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, FileCheck, Leaf, TrendingUp } from "lucide-react"

// Mock data
const stats = [
  {
    title: "Total Certificates",
    value: "156",
    icon: FileCheck,
    description: "This year",
  },
  {
    title: "Materials Processed",
    value: "234,500 lbs",
    icon: TrendingUp,
    description: "Total weight",
  },
  {
    title: "Avg Diversion Rate",
    value: "92.8%",
    icon: Leaf,
    description: "Across all customers",
  },
  {
    title: "Compliance Score",
    value: "98.5%",
    icon: Award,
    description: "Documentation complete",
  },
]

export function ComplianceStats() {
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

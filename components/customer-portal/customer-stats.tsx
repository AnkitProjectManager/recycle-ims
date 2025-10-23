import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, FileCheck, Leaf, TrendingUp } from "lucide-react"

// Mock data
const stats = [
  {
    title: "Total Materials Recycled",
    value: "45,230 lbs",
    icon: TrendingUp,
    description: "This year",
  },
  {
    title: "Waste Diversion Rate",
    value: "94.2%",
    icon: Leaf,
    description: "+2.3% from last year",
  },
  {
    title: "Destruction Certificates",
    value: "23",
    icon: FileCheck,
    description: "Available for download",
  },
  {
    title: "CO₂ Offset",
    value: "12.4 tons",
    icon: Award,
    description: "Environmental impact",
  },
]

export function CustomerStats() {
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

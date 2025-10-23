import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock data - will be replaced with real API calls
const materials = [
  {
    name: "Aluminum Scrap",
    revenue: 45200,
    percentage: 92,
    trend: "up",
  },
  {
    name: "Copper Wire",
    revenue: 38500,
    percentage: 78,
    trend: "up",
  },
  {
    name: "Steel Beams",
    revenue: 32100,
    percentage: 65,
    trend: "down",
  },
  {
    name: "Electronic Waste",
    revenue: 28900,
    percentage: 59,
    trend: "up",
  },
  {
    name: "Brass Fittings",
    revenue: 21400,
    percentage: 43,
    trend: "up",
  },
]

export function TopMaterials() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Materials by Revenue</CardTitle>
        <CardDescription>Best performing materials this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {materials.map((material) => (
            <div key={material.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{material.name}</span>
                <span className="text-muted-foreground">${material.revenue.toLocaleString()}</span>
              </div>
              <Progress value={material.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

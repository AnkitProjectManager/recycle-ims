import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, Droplets, Zap, TreePine } from "lucide-react"

// Mock data
const impacts = [
  {
    title: "CO₂ Emissions Avoided",
    value: "12.4 tons",
    equivalent: "Equal to 27,000 miles driven",
    progress: 85,
    icon: Leaf,
  },
  {
    title: "Water Saved",
    value: "450,000 gallons",
    equivalent: "Equal to 6,800 showers",
    progress: 72,
    icon: Droplets,
  },
  {
    title: "Energy Saved",
    value: "18,500 kWh",
    equivalent: "Powers 2 homes for a year",
    progress: 68,
    icon: Zap,
  },
  {
    title: "Trees Saved",
    value: "234 trees",
    equivalent: "Equivalent forest area",
    progress: 90,
    icon: TreePine,
  },
]

export function EnvironmentalImpact() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Environmental Impact</CardTitle>
        <CardDescription>Your contribution to sustainability</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {impacts.map((impact) => {
            const Icon = impact.icon
            return (
              <div key={impact.title} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                    <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{impact.title}</p>
                      <p className="text-sm font-bold">{impact.value}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{impact.equivalent}</p>
                  </div>
                </div>
                <Progress value={impact.progress} className="h-2" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

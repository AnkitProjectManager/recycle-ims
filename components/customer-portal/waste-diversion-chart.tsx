"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Mock data
const data = [
  { name: "Recycled", value: 38500, color: "hsl(var(--chart-1))" },
  { name: "Reused", value: 4200, color: "hsl(var(--chart-2))" },
  { name: "Energy Recovery", value: 2100, color: "hsl(var(--chart-3))" },
  { name: "Landfill", value: 430, color: "hsl(var(--chart-4))" },
]

export function WasteDiversionChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const diversionRate = ((total - data.find((d) => d.name === "Landfill")!.value) / total) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waste Diversion Breakdown</CardTitle>
        <CardDescription>How your materials are being processed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <ResponsiveContainer width="60%" height={250}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.value.toLocaleString()} lbs</p>
                </div>
              </div>
            ))}
            <div className="border-t pt-4">
              <p className="text-sm font-medium">Diversion Rate</p>
              <p className="text-2xl font-bold text-green-600">{diversionRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

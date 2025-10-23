"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data - will be replaced with real API calls
const data = [
  { month: "Jan", revenue: 45000, cogs: 28000 },
  { month: "Feb", revenue: 52000, cogs: 32000 },
  { month: "Mar", revenue: 48000, cogs: 30000 },
  { month: "Apr", revenue: 61000, cogs: 38000 },
  { month: "May", revenue: 55000, cogs: 34000 },
  { month: "Jun", revenue: 67000, cogs: 42000 },
]

export function SalesChart() {
  return (
    <Card className="border-0 bg-gradient-to-br from-white to-green-50/30 backdrop-blur-sm shadow-lg shadow-green-100/50 hover:shadow-xl transition-all duration-300 dark:bg-slate-800/60 dark:shadow-slate-900/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Revenue & COGS</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
              Monthly revenue and cost of goods sold trends
            </CardDescription>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-700 font-semibold">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-gray-700 font-semibold">COGS</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D100" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D100" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="colorCogs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              strokeOpacity={0.5}
              className="dark:stroke-slate-600" 
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: "#374151", 
                fontSize: 12,
                fontWeight: 600 
              }} 
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: "#374151", 
                fontSize: 12,
                fontWeight: 600 
              }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backdropFilter: "blur(10px)",
                fontSize: "14px",
                fontWeight: "500"
              }}
              labelStyle={{ 
                color: "#111827",
                fontWeight: "700",
                marginBottom: "8px"
              }}
              itemStyle={{
                color: "#374151",
                fontWeight: "600"
              }}
              formatter={(value, name) => [
                `$${Number(value).toLocaleString()}`,
                name === "revenue" ? "Revenue" : "COGS"
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#00D100"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="revenue"
            />
            <Area
              type="monotone"
              dataKey="cogs"
              stroke="#f97316"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCogs)"
              name="cogs"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

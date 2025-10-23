"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data - will be replaced with real API calls
const data = [
  { name: "Ferrous", current: 45000, target: 50000 },
  { name: "Non-Ferrous", current: 32000, target: 35000 },
  { name: "Electronics", current: 18000, target: 20000 },
  { name: "Paper", current: 28000, target: 25000 },
  { name: "Plastics", current: 15000, target: 18000 },
]

export function InventoryChart() {
  return (
    <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 dark:bg-slate-800/60 dark:shadow-slate-900/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Inventory by Category</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
              Current stock levels vs target goals (lbs)
            </CardDescription>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"></div>
              <span className="text-slate-600 dark:text-slate-400">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-slate-400 to-slate-500"></div>
              <span className="text-slate-600 dark:text-slate-400">Target</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barGap={8}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              strokeOpacity={0.5}
              className="dark:stroke-slate-600" 
            />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: "#64748b", 
                fontSize: 12,
                fontWeight: 500 
              }} 
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: "#64748b", 
                fontSize: 12,
                fontWeight: 500 
              }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
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
                color: "#1e293b",
                fontWeight: "600",
                marginBottom: "8px"
              }}
              formatter={(value, name) => [
                `${Number(value).toLocaleString()} lbs`,
                name === "current" ? "Current Stock" : "Target"
              ]}
            />
            <Bar 
              dataKey="current" 
              fill="url(#currentGradient)" 
              name="current"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="target" 
              fill="url(#targetGradient)" 
              name="target"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

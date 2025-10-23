import { ArrowDown, ArrowUp, DollarSign, Package, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data - will be replaced with real API calls
const kpiData = [
  {
    title: "Total Revenue",
    value: "$124,582",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Inventory Value",
    value: "$89,234",
    change: "+8.2%",
    trend: "up" as const,
    icon: Package,
  },
  {
    title: "Active Orders",
    value: "47",
    change: "-3.1%",
    trend: "down" as const,
    icon: TrendingUp,
  },
  {
    title: "Total Customers",
    value: "234",
    change: "+5.4%",
    trend: "up" as const,
    icon: Users,
  },
]

export function KPICards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon
        const isPositive = kpi.trend === "up"
        
        return (
          <Card 
            key={kpi.title} 
            className="group relative overflow-hidden border-0 bg-white/60 backdrop-blur-sm shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 dark:bg-slate-800/60 dark:shadow-slate-900/20"
          >
            {/* Background gradient based on KPI type */}
            <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${
              index === 0 ? 'from-emerald-400 to-teal-500' :
              index === 1 ? 'from-blue-400 to-indigo-500' :
              index === 2 ? 'from-purple-400 to-pink-500' :
              'from-orange-400 to-red-500'
            }`}></div>
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${
                index === 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                index === 1 ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                index === 2 ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
              } group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {kpi.value}
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  isPositive 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {isPositive ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  <span>{kpi.change}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">vs last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

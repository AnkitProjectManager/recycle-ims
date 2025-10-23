import { Card, CardContent } from "@/components/ui/card"
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react"

export function InventoryStats() {
  const stats = [
    {
      title: "Total Materials",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Package,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      title: "Total Value",
      value: "$2.4M",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "-5 from last week",
      trend: "down",
      icon: AlertTriangle,
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50",
    },
    {
      title: "Turnover Rate",
      value: "4.2x",
      change: "+0.3x",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="group relative overflow-hidden border-0 bg-white/60 backdrop-blur-sm shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 dark:bg-slate-800/60 dark:shadow-slate-900/20">
          {/* Background gradient */}
          <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${stat.bgGradient} dark:opacity-10`}></div>
          
          <CardContent className="relative p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {stat.value}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.trend === "up"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

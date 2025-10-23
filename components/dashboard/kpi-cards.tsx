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
            className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-gray-300 transition-all duration-200 hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6">
              <CardTitle className="text-sm font-semibold text-gray-600 tracking-wide uppercase">
                {kpi.title}
              </CardTitle>
              <div className={`p-2.5 rounded-xl ${
                index === 0 ? 'bg-green-100 text-ola-primary' :
                index === 1 ? 'bg-blue-100 text-blue-600' :
                index === 2 ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              } group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="text-3xl font-bold text-gray-900 tracking-tight">
                {kpi.value}
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold ${
                  isPositive 
                    ? 'bg-green-50 text-ola-primary border border-green-200' 
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                  {isPositive ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  <span>{kpi.change}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">vs last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

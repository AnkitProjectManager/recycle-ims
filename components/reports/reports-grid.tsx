import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, TrendingUp, Package, DollarSign, Users, BarChart3, Download } from "lucide-react"

export function ReportsGrid() {
  const reports = [
    {
      title: "Sales Report",
      description: "Comprehensive sales analysis and trends",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Inventory Report",
      description: "Current stock levels and movements",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Financial Report",
      description: "Revenue, expenses, and profitability",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Customer Report",
      description: "Customer activity and engagement",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Compliance Report",
      description: "Certificates and waste diversion metrics",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Performance Report",
      description: "KPIs and operational metrics",
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <Card key={report.title} className="border-0 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className={`${report.bgColor} ${report.color} p-3 rounded-xl`}>
                <report.icon className="h-6 w-6" />
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-4">{report.title}</CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

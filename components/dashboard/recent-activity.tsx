import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDownRight, ArrowUpRight, FileText, Package } from "lucide-react"

// Mock data - will be replaced with real API calls
const activities = [
  {
    id: 1,
    type: "sale",
    description: "Invoice #INV-2024-0145 created",
    customer: "ABC Manufacturing",
    amount: "$4,250",
    time: "2 hours ago",
    icon: FileText,
  },
  {
    id: 2,
    type: "receipt",
    description: "Material received from PO #PO-2024-0089",
    vendor: "Metal Suppliers Inc",
    quantity: "2,500 lbs",
    time: "4 hours ago",
    icon: ArrowDownRight,
  },
  {
    id: 3,
    type: "shipment",
    description: "Order #SO-2024-0234 shipped",
    customer: "XYZ Industries",
    quantity: "1,800 lbs",
    time: "5 hours ago",
    icon: ArrowUpRight,
  },
  {
    id: 4,
    type: "inventory",
    description: "Low stock alert: Copper Wire",
    quantity: "450 lbs remaining",
    time: "6 hours ago",
    icon: Package,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest transactions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {"customer" in activity && <span>{activity.customer}</span>}
                    {"vendor" in activity && <span>{activity.vendor}</span>}
                    {"amount" in activity && <Badge variant="secondary">{activity.amount}</Badge>}
                    {"quantity" in activity && <Badge variant="outline">{activity.quantity}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

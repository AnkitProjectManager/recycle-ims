"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckCircle, Download, Eye, MoreHorizontal, Send } from "lucide-react"
import Link from "next/link"

// Mock data
const purchaseOrders = [
  {
    id: 1,
    poNumber: "PO-2024-0089",
    vendor: "Metal Suppliers Inc",
    date: "2024-01-15",
    expectedDelivery: "2024-01-25",
    status: "sent",
    total: 15200.0,
    items: 4,
  },
  {
    id: 2,
    poNumber: "PO-2024-0088",
    vendor: "Copper Wholesale LLC",
    date: "2024-01-14",
    expectedDelivery: "2024-01-22",
    status: "confirmed",
    total: 22500.0,
    items: 3,
  },
  {
    id: 3,
    poNumber: "PO-2024-0087",
    vendor: "Electronics Recycling Co",
    date: "2024-01-12",
    expectedDelivery: "2024-01-20",
    status: "received",
    total: 8900.0,
    items: 6,
  },
  {
    id: 4,
    poNumber: "PO-2024-0086",
    vendor: "Steel Distributors",
    date: "2024-01-10",
    expectedDelivery: "2024-01-18",
    status: "draft",
    total: 18700.0,
    items: 5,
  },
  {
    id: 5,
    poNumber: "PO-2024-0085",
    vendor: "Aluminum Traders",
    date: "2024-01-08",
    expectedDelivery: "2024-01-16",
    status: "completed",
    total: 12400.0,
    items: 2,
  },
]

const statusConfig = {
  draft: { label: "Draft", variant: "secondary" as const },
  sent: { label: "Sent", variant: "default" as const },
  confirmed: { label: "Confirmed", variant: "default" as const },
  received: { label: "Received", variant: "default" as const },
  completed: { label: "Completed", variant: "default" as const },
  cancelled: { label: "Cancelled", variant: "destructive" as const },
}

export function PurchaseOrdersList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPOs = purchaseOrders.filter(
    (po) =>
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Purchase Orders</CardTitle>
            <CardDescription>View and manage all purchase orders</CardDescription>
          </div>
          <Input
            placeholder="Search POs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPOs.map((po) => (
              <TableRow key={po.id}>
                <TableCell className="font-medium">{po.poNumber}</TableCell>
                <TableCell>{po.vendor}</TableCell>
                <TableCell>{new Date(po.date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(po.expectedDelivery).toLocaleDateString()}</TableCell>
                <TableCell>{po.items}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[po.status].variant}>{statusConfig[po.status].label}</Badge>
                </TableCell>
                <TableCell className="text-right">${po.total.toLocaleString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/purchase-orders/${po.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      {po.status === "draft" && (
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Send to Vendor
                        </DropdownMenuItem>
                      )}
                      {po.status === "confirmed" && (
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Received
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

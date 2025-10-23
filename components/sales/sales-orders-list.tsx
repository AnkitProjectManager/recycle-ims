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
import { Eye, FileText, MoreHorizontal, Truck } from "lucide-react"
import Link from "next/link"

// Mock data
const orders = [
  {
    id: 1,
    orderNumber: "SO-2024-0234",
    customer: "ABC Manufacturing",
    date: "2024-01-15",
    status: "confirmed",
    total: 8450.0,
    items: 3,
  },
  {
    id: 2,
    orderNumber: "SO-2024-0233",
    customer: "XYZ Industries",
    date: "2024-01-14",
    status: "shipped",
    total: 12300.0,
    items: 5,
  },
  {
    id: 3,
    orderNumber: "SO-2024-0232",
    customer: "Tech Recyclers LLC",
    date: "2024-01-14",
    status: "draft",
    total: 5200.0,
    items: 2,
  },
  {
    id: 4,
    orderNumber: "SO-2024-0231",
    customer: "Green Solutions Inc",
    date: "2024-01-13",
    status: "completed",
    total: 15600.0,
    items: 7,
  },
  {
    id: 5,
    orderNumber: "SO-2024-0230",
    customer: "Metro Metals",
    date: "2024-01-12",
    status: "in_progress",
    total: 9800.0,
    items: 4,
  },
]

const statusConfig = {
  draft: { label: "Draft", variant: "secondary" as const },
  confirmed: { label: "Confirmed", variant: "default" as const },
  in_progress: { label: "In Progress", variant: "default" as const },
  shipped: { label: "Shipped", variant: "default" as const },
  completed: { label: "Completed", variant: "default" as const },
  cancelled: { label: "Cancelled", variant: "destructive" as const },
} as const

type StatusKey = keyof typeof statusConfig

export function SalesOrdersList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Orders</CardTitle>
            <CardDescription>View and manage all sales orders</CardDescription>
          </div>
          <Input
            placeholder="Search orders..."
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
              <TableHead>Order Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[order.status as StatusKey].variant}>{statusConfig[order.status as StatusKey].label}</Badge>
                </TableCell>
                <TableCell className="text-right">${order.total.toLocaleString()}</TableCell>
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
                        <Link href={`/sales/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/invoices/new?orderId=${order.id}`}>
                          <FileText className="mr-2 h-4 w-4" />
                          Generate Invoice
                        </Link>
                      </DropdownMenuItem>
                      {order.status === "confirmed" && (
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          Mark as Shipped
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

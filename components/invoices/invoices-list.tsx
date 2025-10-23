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
import { Download, Eye, Mail, MoreHorizontal, Send } from "lucide-react"

// Mock data
const invoices = [
  {
    id: 1,
    invoiceNumber: "INV-2024-0145",
    customer: "ABC Manufacturing",
    date: "2024-01-15",
    dueDate: "2024-02-14",
    status: "sent",
    total: 8450.0,
    paid: 0,
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-0144",
    customer: "XYZ Industries",
    date: "2024-01-14",
    dueDate: "2024-02-13",
    status: "paid",
    total: 12300.0,
    paid: 12300.0,
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-0143",
    customer: "Tech Recyclers LLC",
    date: "2024-01-10",
    dueDate: "2024-02-09",
    status: "overdue",
    total: 5200.0,
    paid: 0,
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-0142",
    customer: "Green Solutions Inc",
    date: "2024-01-08",
    dueDate: "2024-02-07",
    status: "paid",
    total: 15600.0,
    paid: 15600.0,
  },
  {
    id: 5,
    invoiceNumber: "INV-2024-0141",
    customer: "Metro Metals",
    date: "2024-01-05",
    dueDate: "2024-02-04",
    status: "draft",
    total: 9800.0,
    paid: 0,
  },
]

const statusConfig = {
  draft: { label: "Draft", variant: "secondary" as const },
  sent: { label: "Sent", variant: "default" as const },
  paid: { label: "Paid", variant: "default" as const },
  overdue: { label: "Overdue", variant: "destructive" as const },
  cancelled: { label: "Cancelled", variant: "destructive" as const },
} as const

type StatusKey = keyof typeof statusConfig

export function InvoicesList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>View and manage all invoices</CardDescription>
          </div>
          <Input
            placeholder="Search invoices..."
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
              <TableHead>Invoice Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[invoice.status as StatusKey].variant}>{statusConfig[invoice.status as StatusKey].label}</Badge>
                </TableCell>
                <TableCell className="text-right">${invoice.total.toLocaleString()}</TableCell>
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
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      {invoice.status === "draft" && (
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Send to Customer
                        </DropdownMenuItem>
                      )}
                      {invoice.status !== "paid" && (
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Reminder
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

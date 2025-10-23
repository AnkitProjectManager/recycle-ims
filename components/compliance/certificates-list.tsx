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
const certificates = [
  {
    id: 1,
    certificateNumber: "CERT-2024-0045",
    customer: "ABC Manufacturing",
    date: "2024-01-15",
    materialType: "Electronic Waste",
    weight: 2450,
    status: "issued",
  },
  {
    id: 2,
    certificateNumber: "CERT-2024-0044",
    customer: "XYZ Industries",
    date: "2024-01-10",
    materialType: "Aluminum Scrap",
    weight: 5200,
    status: "issued",
  },
  {
    id: 3,
    certificateNumber: "CERT-2024-0043",
    customer: "Tech Recyclers LLC",
    date: "2024-01-05",
    materialType: "Copper Wire",
    weight: 1800,
    status: "sent",
  },
  {
    id: 4,
    certificateNumber: "CERT-2024-0042",
    customer: "Green Solutions Inc",
    date: "2024-01-02",
    materialType: "Steel Beams",
    weight: 8900,
    status: "draft",
  },
]

const statusConfig = {
  draft: { label: "Draft", variant: "secondary" as const },
  issued: { label: "Issued", variant: "default" as const },
  sent: { label: "Sent", variant: "default" as const },
  archived: { label: "Archived", variant: "outline" as const },
}

export function CertificatesList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.materialType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Destruction Certificates</CardTitle>
            <CardDescription>View and manage all destruction certificates</CardDescription>
          </div>
          <Input
            placeholder="Search certificates..."
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
              <TableHead>Certificate Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Material Type</TableHead>
              <TableHead>Weight (lbs)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCertificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.certificateNumber}</TableCell>
                <TableCell>{cert.customer}</TableCell>
                <TableCell>{new Date(cert.date).toLocaleDateString()}</TableCell>
                <TableCell>{cert.materialType}</TableCell>
                <TableCell>{cert.weight.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[cert.status].variant}>{statusConfig[cert.status].label}</Badge>
                </TableCell>
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
                      {cert.status === "issued" && (
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Send to Customer
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Email Certificate
                      </DropdownMenuItem>
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

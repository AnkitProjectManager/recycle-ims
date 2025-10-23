"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye, FileText } from "lucide-react"

// Mock data
const certificates = [
  {
    id: 1,
    certificateNumber: "CERT-2024-0045",
    date: "2024-01-15",
    materialType: "Electronic Waste",
    weight: "2,450 lbs",
    status: "issued",
  },
  {
    id: 2,
    certificateNumber: "CERT-2024-0044",
    date: "2024-01-10",
    materialType: "Aluminum Scrap",
    weight: "5,200 lbs",
    status: "issued",
  },
  {
    id: 3,
    certificateNumber: "CERT-2024-0043",
    date: "2024-01-05",
    materialType: "Copper Wire",
    weight: "1,800 lbs",
    status: "issued",
  },
  {
    id: 4,
    certificateNumber: "CERT-2023-0142",
    date: "2023-12-28",
    materialType: "Steel Beams",
    weight: "8,900 lbs",
    status: "issued",
  },
  {
    id: 5,
    certificateNumber: "CERT-2023-0141",
    date: "2023-12-20",
    materialType: "Mixed Metals",
    weight: "3,400 lbs",
    status: "issued",
  },
]

export function DestructionCertificates() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.materialType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Destruction Certificates</CardTitle>
            <CardDescription>View and download your certificates of destruction</CardDescription>
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
              <TableHead>Date</TableHead>
              <TableHead>Material Type</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCertificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {cert.certificateNumber}
                  </div>
                </TableCell>
                <TableCell>{new Date(cert.date).toLocaleDateString()}</TableCell>
                <TableCell>{cert.materialType}</TableCell>
                <TableCell>{cert.weight}</TableCell>
                <TableCell>
                  <Badge variant="default">Issued</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

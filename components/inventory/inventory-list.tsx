"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreVertical, Edit, Trash2, Eye, Filter, Download } from "lucide-react"

export function InventoryList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const materials = [
    {
      id: "MAT-001",
      name: "Aluminum Scrap",
      category: "Non-Ferrous",
      quantity: 15420,
      unit: "lbs",
      location: "Warehouse A",
      value: 18504,
      status: "In Stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: "MAT-002",
      name: "Copper Wire",
      category: "Non-Ferrous",
      quantity: 8750,
      unit: "lbs",
      location: "Warehouse B",
      value: 35000,
      status: "In Stock",
      lastUpdated: "2024-01-14",
    },
    {
      id: "MAT-003",
      name: "Steel Beams",
      category: "Ferrous",
      quantity: 450,
      unit: "lbs",
      location: "Yard 1",
      value: 2250,
      status: "Low Stock",
      lastUpdated: "2024-01-13",
    },
    {
      id: "MAT-004",
      name: "Brass Fittings",
      category: "Non-Ferrous",
      quantity: 3200,
      unit: "lbs",
      location: "Warehouse A",
      value: 12800,
      status: "In Stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: "MAT-005",
      name: "Stainless Steel",
      category: "Ferrous",
      quantity: 12500,
      unit: "lbs",
      location: "Warehouse C",
      value: 25000,
      status: "In Stock",
      lastUpdated: "2024-01-12",
    },
  ]

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !categoryFilter || material.category === categoryFilter
    const matchesStatus = !statusFilter || material.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Low Stock":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Out of Stock":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <Card className="border border-border bg-card/80 backdrop-blur-sm">
      <CardHeader className="border-b border-border bg-gradient-to-r from-muted/20 to-primary/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">Material Inventory</CardTitle>
            <p className="text-muted-foreground mt-1">Manage and track all materials in your inventory</p>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="Ferrous">Ferrous</SelectItem>
                  <SelectItem value="Non-Ferrous">Non-Ferrous</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" className="bg-white/80 border-slate-200 hover:bg-slate-50 dark:bg-slate-700/80">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/90 border-slate-200 dark:bg-slate-700/50 dark:border-slate-600">
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Material ID</TableHead>
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Name & Category</TableHead>
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Quantity</TableHead>
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Location</TableHead>
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Value</TableHead>
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Status</TableHead>
                <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <Search className="h-8 w-8" />
                      <p className="font-medium">No materials found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredMaterials.map((material) => (
                  <TableRow 
                    key={material.id} 
                    className="hover:bg-slate-50/60 transition-colors border-slate-200/60 dark:hover:bg-slate-700/30 dark:border-slate-600/60"
                  >
                    <TableCell className="font-mono font-medium text-blue-600 dark:text-blue-400">
                      {material.id}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{material.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{material.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground">
                          {material.quantity.toLocaleString()} {material.unit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated {material.lastUpdated.split('T')[0]}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {material.location}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-green-400">
                        ${material.value.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(material.status)} variant="outline">
                        {material.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Material
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {filteredMaterials.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/60 bg-slate-50/30 dark:border-slate-600/60 dark:bg-slate-700/30">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Showing {filteredMaterials.length} of {materials.length} materials
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Total Value: <span className="text-emerald-600 dark:text-emerald-400">
                ${filteredMaterials.reduce((sum, material) => sum + material.value, 0).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

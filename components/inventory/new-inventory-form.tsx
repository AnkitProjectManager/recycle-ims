"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Package, Trash2, Zap, Droplets, Shield, AlertTriangle } from "lucide-react"

type MaterialCategory = "ferrous" | "non-ferrous" | "electronics" | "paper" | "plastics" | "hazardous"
type MaterialCondition = "excellent" | "good" | "fair" | "poor"

interface MaterialData {
  id: string
  name: string
  category: MaterialCategory
  description: string
  quantity: number
  unit: string
  unitPrice: number
  location: string
  condition: MaterialCondition
  supplier: string
  notes: string
}

export function NewInventoryForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<MaterialData>({
    id: "",
    name: "",
    category: "ferrous",
    description: "",
    quantity: 0,
    unit: "lbs",
    unitPrice: 0,
    location: "",
    condition: "excellent",
    supplier: "",
    notes: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof MaterialData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate material ID if not provided
      const materialId = formData.id || `MAT-${Date.now().toString().slice(-6)}`
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would submit the form data to your API
      console.log("Material added:", {
        ...formData,
        id: materialId,
        value: formData.quantity * formData.unitPrice,
        dateAdded: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      })

      router.push("/inventory")
    } catch (error) {
      console.error("Error adding material:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCategoryIcon = (category: MaterialCategory) => {
    switch (category) {
      case "ferrous": return <Package className="h-4 w-4" />
      case "non-ferrous": return <Zap className="h-4 w-4" />
      case "electronics": return <Zap className="h-4 w-4" />
      case "paper": return <Package className="h-4 w-4" />
      case "plastics": return <Droplets className="h-4 w-4" />
      case "hazardous": return <AlertTriangle className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: MaterialCategory) => {
    switch (category) {
      case "ferrous": return "bg-gray-100 text-gray-800 border-gray-200"
      case "non-ferrous": return "bg-blue-100 text-blue-800 border-blue-200"
      case "electronics": return "bg-purple-100 text-purple-800 border-purple-200"
      case "paper": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "plastics": return "bg-green-100 text-green-800 border-green-200"
      case "hazardous": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getConditionColor = (condition: MaterialCondition) => {
    switch (condition) {
      case "excellent": return "bg-green-100 text-green-800 border-green-200"
      case "good": return "bg-blue-100 text-blue-800 border-blue-200"
      case "fair": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "poor": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const totalValue = formData.quantity * formData.unitPrice

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Material Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="material-id">Material ID (Optional)</Label>
              <Input
                id="material-id"
                value={formData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                placeholder="MAT-001 (auto-generated if empty)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="material-name">Material Name *</Label>
              <Input
                id="material-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Aluminum Cans"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value: MaterialCategory) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select material category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ferrous">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Ferrous Metals
                    </div>
                  </SelectItem>
                  <SelectItem value="non-ferrous">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Non-Ferrous Metals
                    </div>
                  </SelectItem>
                  <SelectItem value="electronics">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Electronic Waste
                    </div>
                  </SelectItem>
                  <SelectItem value="paper">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Paper & Cardboard
                    </div>
                  </SelectItem>
                  <SelectItem value="plastics">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      Plastics
                    </div>
                  </SelectItem>
                  <SelectItem value="hazardous">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Hazardous Materials
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category Preview</Label>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={getCategoryColor(formData.category)}>
                  {getCategoryIcon(formData.category)}
                  <span className="ml-1 capitalize">{formData.category.replace('-', ' ')}</span>
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detailed description of the material..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Quantity & Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value) || 0)}
                placeholder="1000"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="tons">Tons</SelectItem>
                  <SelectItem value="pieces">Pieces</SelectItem>
                  <SelectItem value="cubic_ft">Cubic Feet</SelectItem>
                  <SelectItem value="cubic_meters">Cubic Meters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit-price">Unit Price ($) *</Label>
              <Input
                id="unit-price"
                type="number"
                value={formData.unitPrice}
                onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                placeholder="2.50"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {totalValue > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Total Value:</span>
                <span className="text-lg font-bold" style={{color: '#00D100'}}>
                  ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Storage & Condition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Storage Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Warehouse A, Bay 5"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Material Condition *</Label>
              <Select value={formData.condition} onValueChange={(value: MaterialCondition) => handleInputChange('condition', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">
                    <Badge variant="secondary" className={getConditionColor("excellent")}>
                      Excellent
                    </Badge>
                  </SelectItem>
                  <SelectItem value="good">
                    <Badge variant="secondary" className={getConditionColor("good")}>
                      Good
                    </Badge>
                  </SelectItem>
                  <SelectItem value="fair">
                    <Badge variant="secondary" className={getConditionColor("fair")}>
                      Fair
                    </Badge>
                  </SelectItem>
                  <SelectItem value="poor">
                    <Badge variant="secondary" className={getConditionColor("poor")}>
                      Poor
                    </Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier/Source</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => handleInputChange('supplier', e.target.value)}
              placeholder="ABC Recycling Company"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional information about this material..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/inventory")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding Material..." : "Add Material"}
        </Button>
      </div>
    </form>
  )
}
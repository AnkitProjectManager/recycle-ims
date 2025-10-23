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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, FileText, Plus, X, User, DollarSign } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type PaymentTerms = "net_15" | "net_30" | "net_45" | "net_60" | "due_on_receipt"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface InvoiceData {
  invoiceNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  customerAddress: string
  issueDate: Date | undefined
  dueDate: Date | undefined
  paymentTerms: PaymentTerms
  items: InvoiceItem[]
  notes: string
  taxRate: number
}

export function NewInvoiceForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    customerId: "",
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    issueDate: new Date(),
    dueDate: undefined,
    paymentTerms: "net_30",
    items: [],
    notes: "",
    taxRate: 8.25
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addLineItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}-${formData.items.length}`,
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0
    }
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const updateLineItem = (id: string, updates: Partial<InvoiceItem>) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, ...updates }
          updated.total = updated.quantity * updated.unitPrice
          return updated
        }
        return item
      })
    }))
  }

  const removeLineItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const updateFormData = (field: keyof InvoiceData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * (formData.taxRate / 100)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would submit the form data to your API
      console.log("Invoice created:", {
        ...formData,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
        status: "draft",
        createdAt: new Date().toISOString()
      })

      router.push("/invoices")
    } catch (error) {
      console.error("Error creating invoice:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPaymentTermsLabel = (terms: PaymentTerms) => {
    switch (terms) {
      case "net_15": return "Net 15 days"
      case "net_30": return "Net 30 days"
      case "net_45": return "Net 45 days"
      case "net_60": return "Net 60 days"
      case "due_on_receipt": return "Due on receipt"
      default: return "Net 30 days"
    }
  }

  // Auto-calculate due date based on payment terms
  const calculateDueDate = (issueDate: Date, terms: PaymentTerms) => {
    if (!issueDate) return undefined
    const daysToAdd = terms === "due_on_receipt" ? 0 :
                     terms === "net_15" ? 15 :
                     terms === "net_30" ? 30 :
                     terms === "net_45" ? 45 :
                     terms === "net_60" ? 60 : 30
    const dueDate = new Date(issueDate)
    dueDate.setDate(dueDate.getDate() + daysToAdd)
    return dueDate
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoice-number">Invoice Number</Label>
              <Input
                id="invoice-number"
                value={formData.invoiceNumber}
                onChange={(e) => updateFormData('invoiceNumber', e.target.value)}
                placeholder="INV-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Issue Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.issueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.issueDate ? format(formData.issueDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.issueDate}
                    onSelect={(date) => {
                      updateFormData('issueDate', date)
                      if (date) {
                        updateFormData('dueDate', calculateDueDate(date, formData.paymentTerms))
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-terms">Payment Terms</Label>
              <Select 
                value={formData.paymentTerms} 
                onValueChange={(value: PaymentTerms) => {
                  updateFormData('paymentTerms', value)
                  if (formData.issueDate) {
                    updateFormData('dueDate', calculateDueDate(formData.issueDate, value))
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="due_on_receipt">Due on Receipt</SelectItem>
                  <SelectItem value="net_15">Net 15 Days</SelectItem>
                  <SelectItem value="net_30">Net 30 Days</SelectItem>
                  <SelectItem value="net_45">Net 45 Days</SelectItem>
                  <SelectItem value="net_60">Net 60 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.dueDate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Due Date: {format(formData.dueDate, "PPP")} ({getPaymentTermsLabel(formData.paymentTerms)})
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer-id">Customer ID</Label>
              <Input
                id="customer-id"
                value={formData.customerId}
                onChange={(e) => updateFormData('customerId', e.target.value)}
                placeholder="CUST-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input
                id="customer-name"
                value={formData.customerName}
                onChange={(e) => updateFormData('customerName', e.target.value)}
                placeholder="ABC Manufacturing Corp"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer-email">Customer Email</Label>
            <Input
              id="customer-email"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => updateFormData('customerEmail', e.target.value)}
              placeholder="billing@abcmanufacturing.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer-address">Billing Address</Label>
            <Textarea
              id="customer-address"
              value={formData.customerAddress}
              onChange={(e) => updateFormData('customerAddress', e.target.value)}
              placeholder="123 Industrial Park, Business City, ST 12345"
              rows={3}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Invoice Items
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No items added yet. Click "Add Item" to start building your invoice.
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-24">Qty</TableHead>
                    <TableHead className="w-32">Unit Price</TableHead>
                    <TableHead className="w-32">Total</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, { description: e.target.value })}
                          placeholder="Service or product description"
                          className="border-0 p-0 h-auto"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                          min="0"
                          step="0.01"
                          className="border-0 p-0 h-auto text-center"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-1">$</span>
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateLineItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                            min="0"
                            step="0.01"
                            className="border-0 p-0 h-auto"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${item.total.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLineItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {formData.items.length > 0 && (
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax ({formData.taxRate}%):</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span style={{color: '#00D100'}}>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Input
                id="tax-rate"
                type="number"
                value={formData.taxRate}
                onChange={(e) => updateFormData('taxRate', parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                step="0.01"
                placeholder="8.25"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes & Terms</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateFormData('notes', e.target.value)}
              placeholder="Payment instructions, terms and conditions, or additional notes..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/invoices")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || formData.items.length === 0}>
          {isSubmitting ? "Creating Invoice..." : "Create Invoice"}
        </Button>
      </div>
    </form>
  )
}
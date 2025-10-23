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
import { CalendarIcon, FileText, Shield, Trash2, Upload, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type CertificateType = "destruction" | "compliance" | "audit" | "environmental"

interface WasteMaterial {
  id: string
  name: string
  quantity: number
  unit: string
  hazardLevel: "low" | "medium" | "high"
}

export function NewCertificateForm() {
  const router = useRouter()
  const [certificateType, setCertificateType] = useState<CertificateType>("destruction")
  const [clientName, setClientName] = useState("")
  const [clientId, setClientId] = useState("")
  const [facilityName, setFacilityName] = useState("")
  const [facilityAddress, setFacilityAddress] = useState("")
  const [destructionDate, setDestructionDate] = useState<Date>()
  const [certificateNumber, setCertificateNumber] = useState("")
  const [destructionMethod, setDestructionMethod] = useState("")
  const [wasteMaterials, setWasteMaterials] = useState<WasteMaterial[]>([])
  const [complianceNotes, setComplianceNotes] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addWasteMaterial = () => {
    const newMaterial: WasteMaterial = {
      id: `material-${Date.now()}-${wasteMaterials.length}`,
      name: "",
      quantity: 0,
      unit: "kg",
      hazardLevel: "low"
    }
    setWasteMaterials([...wasteMaterials, newMaterial])
  }

  const updateWasteMaterial = (id: string, updates: Partial<WasteMaterial>) => {
    setWasteMaterials(wasteMaterials.map(material => 
      material.id === id ? { ...material, ...updates } : material
    ))
  }

  const removeWasteMaterial = (id: string) => {
    setWasteMaterials(wasteMaterials.filter(material => material.id !== id))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments([...attachments, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would submit the form data to your API
      console.log("Certificate created:", {
        certificateType,
        clientName,
        clientId,
        facilityName,
        facilityAddress,
        destructionDate,
        certificateNumber,
        destructionMethod,
        wasteMaterials,
        complianceNotes,
        attachments: attachments.map(f => f.name)
      })

      router.push("/compliance")
    } catch (error) {
      console.error("Error creating certificate:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getHazardLevelColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default: return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getCertificateTypeIcon = (type: CertificateType) => {
    switch (type) {
      case "destruction": return <Trash2 className="h-4 w-4" />
      case "compliance": return <Shield className="h-4 w-4" />
      case "audit": return <FileText className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getCertificateTypeIcon(certificateType)}
            Certificate Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="certificate-type">Certificate Type</Label>
              <Select value={certificateType} onValueChange={(value: CertificateType) => setCertificateType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select certificate type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="destruction">
                    <div className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Destruction Certificate
                    </div>
                  </SelectItem>
                  <SelectItem value="compliance">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Compliance Certificate
                    </div>
                  </SelectItem>
                  <SelectItem value="audit">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Audit Certificate
                    </div>
                  </SelectItem>
                  <SelectItem value="environmental">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Environmental Certificate
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificate-number">Certificate Number</Label>
              <Input
                id="certificate-number"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                placeholder="CERT-2024-001"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-name">Client Name</Label>
              <Input
                id="client-name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="ABC Corporation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-id">Client ID</Label>
              <Input
                id="client-id"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="CLIENT-001"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destruction-date">
              {certificateType === "destruction" ? "Destruction Date" : "Certificate Date"}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !destructionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {destructionDate ? format(destructionDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={destructionDate}
                  onSelect={setDestructionDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facility Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facility-name">Facility Name</Label>
            <Input
              id="facility-name"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              placeholder="Green Recycling Facility"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facility-address">Facility Address</Label>
            <Textarea
              id="facility-address"
              value={facilityAddress}
              onChange={(e) => setFacilityAddress(e.target.value)}
              placeholder="123 Industrial Park, City, State, ZIP"
              rows={3}
              required
            />
          </div>

          {certificateType === "destruction" && (
            <div className="space-y-2">
              <Label htmlFor="destruction-method">Destruction Method</Label>
              <Select value={destructionMethod} onValueChange={setDestructionMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destruction method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incineration">Incineration</SelectItem>
                  <SelectItem value="shredding">Shredding</SelectItem>
                  <SelectItem value="chemical">Chemical Treatment</SelectItem>
                  <SelectItem value="mechanical">Mechanical Processing</SelectItem>
                  <SelectItem value="thermal">Thermal Treatment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Waste Materials
            <Button type="button" variant="outline" size="sm" onClick={addWasteMaterial}>
              Add Material
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {wasteMaterials.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No waste materials added yet. Click "Add Material" to start.
            </div>
          ) : (
            <div className="space-y-4">
              {wasteMaterials.map((material) => (
                <div key={material.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Material #{material.id.split("-")[2]}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeWasteMaterial(material.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <Label>Material Name</Label>
                      <Input
                        value={material.name}
                        onChange={(e) => updateWasteMaterial(material.id, { name: e.target.value })}
                        placeholder="Electronic waste"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={material.quantity}
                        onChange={(e) => updateWasteMaterial(material.id, { quantity: parseFloat(e.target.value) || 0 })}
                        placeholder="100"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label>Unit</Label>
                      <Select 
                        value={material.unit} 
                        onValueChange={(value) => updateWasteMaterial(material.id, { unit: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilograms</SelectItem>
                          <SelectItem value="lbs">Pounds</SelectItem>
                          <SelectItem value="tons">Tons</SelectItem>
                          <SelectItem value="pieces">Pieces</SelectItem>
                          <SelectItem value="cubic_meters">Cubic Meters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <Label>Hazard Level</Label>
                      <Select 
                        value={material.hazardLevel} 
                        onValueChange={(value: "low" | "medium" | "high") => updateWasteMaterial(material.id, { hazardLevel: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">
                            <Badge variant="secondary" className={getHazardLevelColor("low")}>
                              Low Risk
                            </Badge>
                          </SelectItem>
                          <SelectItem value="medium">
                            <Badge variant="secondary" className={getHazardLevelColor("medium")}>
                              Medium Risk
                            </Badge>
                          </SelectItem>
                          <SelectItem value="high">
                            <Badge variant="secondary" className={getHazardLevelColor("high")}>
                              High Risk
                            </Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="compliance-notes">Notes & Compliance Details</Label>
            <Textarea
              id="compliance-notes"
              value={complianceNotes}
              onChange={(e) => setComplianceNotes(e.target.value)}
              placeholder="Additional notes, compliance standards met, certifications, etc."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
                <span className="text-sm text-muted-foreground">
                  PDF, DOC, DOCX, JPG, PNG files only
                </span>
              </div>
              
              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/compliance")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Certificate..." : "Create Certificate"}
        </Button>
      </div>
    </form>
  )
}
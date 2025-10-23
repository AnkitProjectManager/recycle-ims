"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function NewUserForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] New user form submitted:", {
      firstName,
      lastName,
      email,
      role,
      sendWelcomeEmail,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Enter the basic user details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.smith@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="trader">Trader</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendWelcome"
              checked={sendWelcomeEmail}
              onCheckedChange={(checked) => setSendWelcomeEmail(checked === true)}
            />
            <Label htmlFor="sendWelcome" className="text-sm font-normal">
              Send welcome email with login instructions
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>Configure user access permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="mb-3 font-medium">Role-based Permissions</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {role === "admin" && (
                  <ul className="list-inside list-disc space-y-1">
                    <li>Full system access</li>
                    <li>User management</li>
                    <li>System configuration</li>
                    <li>All module access</li>
                  </ul>
                )}
                {role === "manager" && (
                  <ul className="list-inside list-disc space-y-1">
                    <li>Dashboard and reports</li>
                    <li>Inventory management</li>
                    <li>Sales and purchasing</li>
                    <li>Compliance documents</li>
                  </ul>
                )}
                {role === "trader" && (
                  <ul className="list-inside list-disc space-y-1">
                    <li>Sales order management</li>
                    <li>Purchase order creation</li>
                    <li>Customer and vendor access</li>
                    <li>Inventory viewing</li>
                  </ul>
                )}
                {role === "operator" && (
                  <ul className="list-inside list-disc space-y-1">
                    <li>Inventory viewing</li>
                    <li>Order status viewing</li>
                    <li>Basic reporting</li>
                  </ul>
                )}
                {role === "customer" && (
                  <ul className="list-inside list-disc space-y-1">
                    <li>Customer portal access</li>
                    <li>View destruction certificates</li>
                    <li>View invoices</li>
                    <li>Environmental reports</li>
                  </ul>
                )}
                {!role && <p>Select a role to view permissions</p>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Create User</Button>
      </div>
    </form>
  )
}

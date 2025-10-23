import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-5xl space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-xl font-bold">R</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to Recycle IMS</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <div className="mx-auto max-w-md">
          <LoginForm />
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Need help?{" "}
          <Link href="/support" className="font-medium text-primary hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare } from "lucide-react"

export default function RegisterPage() {
    return (
        <Card className="border-primary/20 shadow-lg w-full max-w-lg">
            <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                </div>
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>
                    Get started with your free 7-day trial
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input id="orgName" placeholder="Acme Inc." />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select>
                        <SelectTrigger id="industry">
                            <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="education">Education Institute</SelectItem>
                            <SelectItem value="real-estate">Real Estate Business</SelectItem>
                            <SelectItem value="healthcare">Healthcare / Clinic</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full text-lg">Start Free Trial</Button>
                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-primary hover:underline font-medium">
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}

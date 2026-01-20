"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare } from "lucide-react"

export default function LoginPage() {
    return (
        <Card className="border-primary/20 shadow-lg">
            <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                </div>
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>
                    Enter your email to sign in to your dashboard
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                    {/* Checkbox will go here */}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full">Sign In</Button>
                <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/register" className="text-primary hover:underline font-medium">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}

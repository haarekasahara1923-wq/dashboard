import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Building2, GraduationCap, Stethoscope, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/95 backdrop-blur z-50 sticky top-0">
        <Link className="flex items-center justify-center gap-2" href="#">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <Zap className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg md:text-xl">DAZO - Powered by Shree Shyam Tech</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors hidden md:block" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors hidden md:block" href="#pricing">
            Pricing
          </Link>
          <Link href="/auth/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Automate Your Business. <br />
                  <span className="text-primary">Scale Without Limits.</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl pt-4">
                  The all-in-one platform for Real Estate, Education, and Healthcare. Manage leads, admissions, and appointments with AI-driven automation using WhatsApp.
                </p>
              </div>
              <div className="space-x-4 pt-4">
                <Link href="/auth/register">
                  <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                    Start 7-Day Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full">
                    Explore Demo
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground pt-4">
                No credit card required for trial. Cancel anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                Industry Solutions
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tailored for Your Growth</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We don&apos;t believe in one-size-fits-all. Choose the dashboard built specifically for your industry needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Real Estate */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                    <Building2 className="h-16 w-16 text-blue-600 opacity-20" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <h3 className="text-xl font-bold">Real Estate</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Manage leads, schedule site visits, and track property deals. Automate follow-ups via WhatsApp.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Lead Pipeline</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Site Visit Calendar</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Agent Performance</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <div className="absolute inset-0 bg-green-600/10 flex items-center justify-center">
                    <GraduationCap className="h-16 w-16 text-green-600 opacity-20" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                    <h3 className="text-xl font-bold">Education</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Streamline admissions, manage student fees, and track attendance. Communicate with parents instantly.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Admission Management</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Fee Invoicing</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Attendance Tracking</li>
                  </ul>
                </div>
              </div>

              {/* Healthcare */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center">
                    <Stethoscope className="h-16 w-16 text-red-600 opacity-20" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="h-5 w-5 text-red-600" />
                    <h3 className="text-xl font-bold">Healthcare</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Book appointments, manage patient records, and optimize doctor schedules. Reduce no-shows.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Appointment Scheduling</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Patient Records (EMR)</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Doctor Availability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Start with a 7-day free trial. Upgrade when you are ready to scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Monthly Plan */}
              <div className="flex flex-col p-8 border rounded-2xl shadow-lg bg-background hover:border-primary transition-colors">
                <h3 className="text-2xl font-bold">Monthly Plan</h3>
                <p className="text-muted-foreground mt-2">Perfect for startups and small teams.</p>
                <div className="my-6">
                  <span className="text-4xl font-bold">₹2,100</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Full Access to Dashboard</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Leads/Students</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Basic Automation</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 24/7 Support</li>
                </ul>
                <Link href="/auth/register?plan=monthly" className="w-full">
                  <Button className="w-full" variant="outline" size="lg">Choose Monthly</Button>
                </Link>
              </div>

              {/* Yearly Plan */}
              <div className="flex flex-col p-8 border-2 border-primary rounded-2xl shadow-xl bg-background relative">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  BEST VALUE
                </div>
                <h3 className="text-2xl font-bold">Yearly Plan</h3>
                <p className="text-muted-foreground mt-2">Save money with annual billing.</p>
                <div className="my-6">
                  <span className="text-4xl font-bold">₹16,800</span>
                  <span className="text-muted-foreground">/year</span>
                </div>
                <p className="text-sm text-green-600 font-medium mb-4">You save ₹8,400 per year!</p>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> All Monthly Features</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Priority Support</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Advanced Automation</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Custom Onboarding</li>
                </ul>
                <Link href="/auth/register?plan=yearly" className="w-full">
                  <Button className="w-full" size="lg">Choose Yearly</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Ready to transform your business?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl mb-8">
              Join hundreds of businesses using DAZO to streamline operations and grow revenue.
            </p>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="px-8 h-12 text-lg rounded-full">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-4 md:px-6 border-t bg-muted/20">
        <div className="container grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-lg">DAZO</h4>
            <p className="text-sm text-muted-foreground">
              Powered by Shree Shyam Tech
            </p>
            <p className="text-xs text-muted-foreground">
              © 2026 All rights reserved.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-primary">Terms and Conditions</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Contact Us</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><span className="font-semibold text-foreground">DAZO - Powered by Shree Shyam Tech</span></p>
              <p>Add. Gangotri Vihar, Dehradun(UK)- 248001</p>
              <p>Email: support.dazo@wapiflow.site</p>
              <p>WhatsApp: 919457440300</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

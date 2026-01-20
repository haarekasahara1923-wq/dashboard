"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Building2, GraduationCap, Stethoscope, ArrowRight, MessageSquare, Zap, BarChart3 } from "lucide-react";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-2xl text-primary">
            <MessageSquare className="h-8 w-8" />
            <span>SaaSAuto</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#industries" className="text-sm font-medium hover:text-primary transition-colors">Industries</Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-4xl mx-auto space-y-6"
            >
              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Automate Your Business with <span className="text-primary">WhatsApp First</span> Power
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The all-in-one automation platform for Education, Real Estate, and Healthcare. Capture leads, manage operations, and scale faster.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/auth/register">
                  <Button size="lg" className="h-12 px-8 text-lg">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
                <Link href="#demo">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-lg">View Demo</Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative background blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Industries Section */}
        <section id="industries" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Tailored for Your Industry</h2>
              <p className="text-muted-foreground">Specialized tools and dashboards for your specific needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <IndustryCard
                icon={<GraduationCap className="h-10 w-10 text-primary" />}
                title="Education Institutes"
                features={["Admissions & Enquiries", "Automated Attendance", "Fee Reminders", "Parent Communication"]}
                link="/industries/education"
              />
              <IndustryCard
                icon={<Building2 className="h-10 w-10 text-primary" />}
                title="Real Estate"
                features={["Lead Management", "Site Visit Scheduling", "Property Listings", "Automated Follow-ups"]}
                link="/industries/real-estate"
              />
              <IndustryCard
                icon={<Stethoscope className="h-10 w-10 text-primary" />}
                title="Healthcare"
                features={["Appointment Booking", "Patient Records", "Report Delivery", "Feedback Automation"]}
                link="/industries/healthcare"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Automation Engine</h2>
              <p className="text-muted-foreground">Built to save you time and increase conversions.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<MessageSquare className="h-6 w-6" />}
                title="WhatsApp Integration"
                description="Official Meta API integration for verified business communication."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="Smart Triggers"
                description="Trigger actions based on leads, payments, or custom events."
              />
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6" />}
                title="Deep Analytics"
                description="Track every interaction, conversion, and penny of revenue."
              />
              {/* Add more features as needed */}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of businesses automating their growth today.</p>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-lg font-bold text-primary">Get Started Now</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 SaaSAuto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function IndustryCard({ icon, title, features, link }: { icon: React.ReactNode, title: string, features: string[], link: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow border-primary/10">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 mr-2 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <Link href={link}>
          <Button variant="outline" className="w-full group">
            Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col p-6 rounded-lg bg-card border hover:border-primary/50 transition-colors">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

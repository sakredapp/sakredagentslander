import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { CommissionCalculator } from "@/components/CommissionCalculator";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

import { forwardRef } from "react";

const GoldButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold tracking-wide transition-all duration-300 bg-gradient-to-r from-[#C5A059] via-[#D4B76E] to-[#C5A059] text-[#0F172A] border border-[#A68A4A]/40 shadow-sm hover:shadow-lg hover:from-[#B8933F] hover:via-[#C5A059] hover:to-[#B8933F] disabled:pointer-events-none disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
GoldButton.displayName = "GoldButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#0F172A]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[#A68A4A] uppercase border border-[#C5A059]/30 rounded-full bg-[#C5A059]/5">
                Independent Agent Model
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }} data-testid="text-hero-headline">
              Build a recurring-income book in{" "}
              <span className="bg-gradient-to-r from-[#C5A059] via-[#D4B76E] to-[#A68A4A] bg-clip-text text-transparent">
                private healthcare.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#0F172A]/55 max-w-2xl mx-auto leading-relaxed pt-4">
              Independent agent model. Structured onboarding. Weekly recruiting call. 
              You can keep selling life wherever you are.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm text-[#0F172A]/40 max-w-xl mx-auto pt-2 italic">
              Phone number required — if you register and miss the call, we'll give you a ring to reschedule.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <GoldButton data-testid="button-apply-hero" className="h-14 px-10 text-base min-w-[220px]">
                    Apply to Join
                  </GoldButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] border-[#C5A059]/20">
                  <DialogHeader>
                    <DialogTitle className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>Start Your Application</DialogTitle>
                    <DialogDescription>
                      Complete the form below to schedule your introduction call.
                    </DialogDescription>
                  </DialogHeader>
                  <LeadForm />
                </DialogContent>
              </Dialog>
              <button 
                data-testid="button-view-calculator"
                className="h-14 px-10 text-base min-w-[220px] rounded-md border border-[#0F172A]/15 text-[#0F172A] font-medium tracking-wide hover:bg-[#0F172A]/5 transition-all duration-300"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Income Calculator
              </button>
            </motion.div>

            {/* 3-step strip */}
            <motion.div variants={fadeInUp} className="pt-12">
              <div className="inline-flex items-center gap-6 px-8 py-4 border border-[#C5A059]/20 rounded-full bg-white/60 backdrop-blur-sm">
                <span className="text-sm font-medium text-[#0F172A]/70">Apply</span>
                <span className="text-[#C5A059]">&#8594;</span>
                <span className="text-sm font-medium text-[#0F172A]/70">Weekly Call</span>
                <span className="text-[#C5A059]">&#8594;</span>
                <span className="text-sm font-medium text-[#0F172A]/70">Onboarding</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Opportunity Section */}
      <section id="opportunity" className="py-24 bg-white border-y border-[#C5A059]/10" data-testid="section-opportunity">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#C5A059] to-[#D4B76E] mb-6" />
              <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Private Healthcare Division</h3>
              <p className="text-[#0F172A]/55 leading-relaxed">
                We focus on private healthcare solutions for individuals, families, and self-employed clients. 
                A massive, underserved market with growing demand.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#C5A059] to-[#D4B76E] mb-6" />
              <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Independent Agent Model</h3>
              <p className="text-[#0F172A]/55 leading-relaxed">
                You remain independent and can keep selling life or other lines with your current setup. 
                We provide contracts, carrier access, and training infrastructure.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#C5A059] to-[#D4B76E] mb-6" />
              <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Recurring Commissions</h3>
              <p className="text-[#0F172A]/55 leading-relaxed">
                Your book can compound over time through renewals and consistent production. 
                Stop trading time for money — build an asset.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Who This Is For</h2>
            <p className="text-[#0F172A]/55">Two paths. Same destination.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white border-[#C5A059]/20 shadow-lg shadow-[#C5A059]/5" data-testid="card-licensed">
              <CardContent className="p-10 space-y-5">
                <div className="text-xs font-semibold tracking-[0.2em] text-[#A68A4A] uppercase">Fast Track</div>
                <h3 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Licensed Agents</h3>
                <p className="text-[#0F172A]/55 leading-relaxed">
                  Life &amp; Health licensed. You want better products, higher splits, and true ownership of your book.
                </p>
                <ul className="space-y-2 text-[#0F172A]/65 text-sm">
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Fast track onboarding</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Carrier contracting guidance</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Quoting + enrollment workflow</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Weekly call cadence</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#0F172A] text-white border-none shadow-xl" data-testid="card-not-licensed">
              <CardContent className="p-10 space-y-5">
                <div className="text-xs font-semibold tracking-[0.2em] text-[#D4B76E] uppercase">Getting Started</div>
                <h3 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Not Licensed Yet</h3>
                <p className="text-white/60 leading-relaxed">
                  Sales professionals, entrepreneurs, career changers. Willing to get licensed for a career with no ceiling.
                </p>
                <ul className="space-y-2 text-white/55 text-sm">
                  <li className="flex items-start gap-2"><span className="text-[#D4B76E] mt-0.5">&#8226;</span> Clear steps to get licensed</li>
                  <li className="flex items-start gap-2"><span className="text-[#D4B76E] mt-0.5">&#8226;</span> Pre-training access and expectations</li>
                  <li className="flex items-start gap-2"><span className="text-[#D4B76E] mt-0.5">&#8226;</span> Route into onboarding once licensed</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Dialog>
              <DialogTrigger asChild>
                <GoldButton data-testid="button-apply-cards" className="h-12 px-8 text-sm">
                  Apply to Join
                </GoldButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] border-[#C5A059]/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>Start Your Application</DialogTitle>
                  <DialogDescription>Complete the form below to schedule your introduction call.</DialogDescription>
                </DialogHeader>
                <LeadForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 bg-white" data-testid="section-calculator">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Income Calculator</h2>
              <p className="text-[#0F172A]/55 leading-relaxed text-lg">
                Model your residual income growth based on consistent monthly production.
              </p>
              <p className="text-[#0F172A]/40 text-sm leading-relaxed italic">
                Estimates only. Actual comp varies by carrier, persistency, and contracting.
              </p>
            </div>
            <div className="lg:col-span-8">
              <CommissionCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 bg-[#F9F9F7]" data-testid="section-process">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>How It Works</h2>
            
            <div className="space-y-0">
              {[
                { step: "1", title: "Apply", desc: "5 minutes. Phone number required." },
                { step: "2", title: "Join Weekly Call", desc: "Expectations, structure, and next steps." },
                { step: "3", title: "Start Onboarding", desc: "Contracting, workflow, and training." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 py-8 border-b border-[#C5A059]/15 last:border-b-0">
                  <span className="text-3xl font-bold text-[#C5A059]/30 font-serif min-w-[40px]">{item.step}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                    <p className="text-[#0F172A]/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agent Infrastructure */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Agent Infrastructure</h2>
            <Card className="border-[#C5A059]/20 bg-white">
              <CardContent className="p-8 md:p-10">
                <ul className="space-y-4 text-[#0F172A]/65">
                  {[
                    "Scripts + objection handling",
                    "Quoting workflow",
                    "Weekly training / recruiting cadence",
                    "Manager visibility + support",
                    "Clear expectations + path by experience level",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base">
                      <span className="text-[#C5A059] mt-1">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Requirements</h2>
            <ul className="space-y-4 text-[#0F172A]/65">
              {[
                "Must be licensed or committed to licensing",
                "Professional communication + follow-up discipline",
                "Willingness to follow the process",
                "Compliance-first behavior",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base py-3 border-b border-[#C5A059]/10 last:border-b-0">
                  <span className="text-[#C5A059] mt-0.5">&#8226;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white" data-testid="section-faq">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Can I keep selling life with my current upline?", a: "Yes. You remain independent. This is an additional line of business, not a replacement." },
              { q: "Do I need to be licensed?", a: "Preferred. If you're not licensed yet, we'll guide you through the licensing process — it typically takes 1-2 weeks." },
              { q: "What's the weekly call?", a: "A brief overview call covering expectations, next steps, and current opportunities. It's how we stay aligned." },
              { q: "How fast can I start?", a: "Depends on your licensing and contracting status. Licensed agents can start within days." },
              { q: "Do you provide leads?", a: "We teach you how to generate your own high-intent leads and provide access to discounted lead vendors. We don't hand out free leads." },
              { q: "Is this part-time possible?", a: "Yes. Many agents start part-time while transitioning. We prefer a plan to go full-time within 3-6 months." },
              { q: "Which states do you operate in?", a: "Varies by carrier. We can discuss your specific state during the intro call." },
              { q: "What happens after I apply?", a: "You'll be directed to schedule a call via Calendly. If you register and don't attend, we'll call to reschedule." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#C5A059]/10">
                <AccordionTrigger className="text-base font-medium py-5 hover:no-underline" style={{ fontFamily: "'Playfair Display', serif" }} data-testid={`accordion-faq-${i}`}>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#0F172A]/55 text-base leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="bg-[#0F172A] text-white py-24">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Apply to Join the Weekly Call
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            If you register and don't attend, we'll call to reschedule.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <GoldButton data-testid="button-apply-footer" className="h-14 px-10 text-base min-w-[220px]">
                  Apply Now
                </GoldButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] border-[#C5A059]/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-[#0F172A]" style={{ fontFamily: "'Playfair Display', serif" }}>Start Your Application</DialogTitle>
                  <DialogDescription>
                    Complete the form below to schedule your introduction call.
                  </DialogDescription>
                </DialogHeader>
                <LeadForm />
              </DialogContent>
            </Dialog>
            <button
              data-testid="button-view-calculator-footer"
              className="h-14 px-10 text-base min-w-[220px] rounded-md border border-white/20 text-white/70 font-medium tracking-wide hover:text-white hover:border-white/40 transition-all duration-300"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Calculator
            </button>
          </div>
          <div className="pt-20 text-sm text-white/25 border-t border-white/10 mt-12">
            &copy; {new Date().getFullYear()} Sakred Advisors. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

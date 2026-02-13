import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { forwardRef } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const GoldButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`gold-glow-btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium tracking-wide disabled:pointer-events-none disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
GoldButton.displayName = "GoldButton";

const clientTypes = [
  {
    title: "Self-Employed Individuals",
    summary: "Freelancers, 1099 contractors, gig workers, small business owners",
    avgPremium: "$6,000 – $9,600",
    detail: "Self-employed people don't get employer-sponsored coverage and are often overpaying on the marketplace or going uninsured. They need help navigating private options that fit their budget and actually cover what matters. This is one of the fastest-growing segments — and most of them don't know a health insurance agent exists.",
    tags: ["Ages 25–55", "Individual plans", "High demand"]
  },
  {
    title: "Families",
    summary: "Married couples, parents with dependents, multi-generational households",
    avgPremium: "$14,000 – $28,000",
    detail: "Families need comprehensive coverage that accounts for pediatric care, maternity, prescriptions, and varying health needs across age groups. A single family case can generate significant annual premium — and these clients tend to stay on plans long-term because switching is painful. High retention, high value.",
    tags: ["Ages 28–50", "Family plans", "High retention"]
  },
  {
    title: "Early Retirees",
    summary: "Ages 50–64 — too young for Medicare, too old for employer coverage",
    avgPremium: "$10,000 – $18,000",
    detail: "This is the coverage gap. People who've left corporate jobs or retired early have limited options and often don't understand them. They're typically higher-income, health-conscious, and willing to pay for good coverage. They need an agent who can walk them through private plan options before Medicare kicks in at 65.",
    tags: ["Ages 50–64", "Pre-Medicare", "Higher income"]
  },
  {
    title: "Young Adults Aging Off Parents' Plans",
    summary: "Ages 26–30 — just lost coverage and don't know what to do",
    avgPremium: "$3,600 – $6,000",
    detail: "At 26, you get dropped from your parents' plan. Most young adults have no idea what their options are and default to going uninsured or picking the cheapest marketplace plan without understanding what it covers. They need simple guidance and affordable private options. Lower premium, but easy to close and high volume.",
    tags: ["Ages 26–30", "Individual plans", "High volume"]
  },
  {
    title: "Small Business Owners with Employees",
    summary: "2–50 employees — too small for group, too big to ignore",
    avgPremium: "$4,800 – $8,400 per employee",
    detail: "Small businesses that can't afford or qualify for traditional group plans still need to offer something to attract and retain employees. Private individual plans through an agent give them a way to provide coverage without the overhead of group administration. You become their go-to for every new hire.",
    tags: ["2–50 employees", "Per-employee plans", "Recurring referrals"]
  },
];

const infrastructureItems = [
  {
    title: "Assigned Mentor",
    summary: "One-on-one guidance from day one",
    detail: "Every new agent is paired with an experienced mentor who has built their own healthcare book. Your mentor walks you through your first cases, reviews your quoting process, and is available for real-time support as you ramp up. This isn't a group chat — it's a direct relationship with someone who's done what you're doing."
  },
  {
    title: "Proprietary Training Platform",
    summary: "On-demand access to structured coursework",
    detail: "Our private training software covers everything from carrier product knowledge and compliance requirements to advanced sales techniques. Modules are self-paced with assessments, so you can train on your schedule. New content is added regularly as carriers update plans and guidelines change."
  },
  {
    title: "Scripts & Objection Handling",
    summary: "Tested frameworks for real client conversations",
    detail: "You'll receive proven call scripts, email templates, and objection-handling frameworks refined over thousands of client interactions. These aren't generic templates — they're specific to private healthcare enrollment and built for the objections you'll actually hear from prospects."
  },
  {
    title: "Lead Flow & Lead Cost Programs",
    summary: "Access to leads with potential cost coverage",
    detail: "We provide access to vetted lead vendors at discounted rates. For agents hitting consistent production targets, there's potential for lead costs to be partially or fully covered at a reduced commission split. You also get training on organic lead generation so you're never fully dependent on purchased leads."
  },
  {
    title: "Quoting & Enrollment Workflow",
    summary: "Streamlined process from first call to active policy",
    detail: "Our step-by-step quoting workflow takes you from needs analysis through carrier selection, plan comparison, client presentation, and enrollment submission. You'll know exactly what to do at each stage — no guesswork. Includes carrier-specific submission checklists so nothing falls through the cracks."
  },
  {
    title: "Weekly Training & Team Calls",
    summary: "Live sessions on products, compliance, and strategy",
    detail: "Every week we run live training covering new carrier products, compliance updates, sales strategy, and real case studies. There's also a dedicated recruiting call for agents building teams. These aren't optional webinars — they're working sessions designed to keep you sharp and connected to what's happening in the market."
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#0F172A]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navigation />

      {/* Hero — leads with the opportunity, not the audience */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-[#A68A4A] uppercase border border-[#C5A059]/30 rounded-full bg-[#C5A059]/5">
                Private Healthcare &middot; Recurring Commissions
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }} data-testid="text-hero-headline">
              Add private healthcare to{" "}
              <span className="bg-gradient-to-r from-[#C5A059] via-[#D4B76E] to-[#A68A4A] bg-clip-text text-transparent">
                your book.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#0F172A]/55 max-w-2xl mx-auto leading-relaxed pt-4">
              Private healthcare is a recurring-commission line with compounding renewals.
              We give you the carriers, contracts, training, and infrastructure to build a book that pays you month after month.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm text-[#0F172A]/40 max-w-xl mx-auto pt-2 italic">
              Phone number required — if you register and miss the call, we'll give you a ring to reschedule.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <GoldButton data-testid="button-apply-hero" className="text-base min-w-[220px]">
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
              <Button 
                data-testid="button-view-calculator"
                variant="outline"
                className="text-base min-w-[220px]"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Income Calculator
              </Button>
            </motion.div>

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

      {/* Client Types — who's buying and what they pay */}
      <section id="opportunity" className="py-24 bg-white border-y border-[#C5A059]/10" data-testid="section-opportunity">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-4">The Market</div>
              <h2 className="text-3xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Types of Clients</h2>
            </div>

            <Accordion type="multiple" className="w-full space-y-4">
              {clientTypes.map((client, i) => (
                <AccordionItem
                  key={i}
                  value={`client-${i}`}
                  className="gold-card border-0 overflow-visible px-0"
                  data-testid={`card-client-type-${i}`}
                >
                  <AccordionTrigger className="px-8 py-6 hover:no-underline [&[data-state=open]]:pb-2">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex flex-col items-start text-left gap-1">
                        <h3 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{client.title}</h3>
                        <p className="text-[#0F172A]/45 text-sm font-normal">{client.summary}</p>
                      </div>
                      <div className="hidden sm:block text-right shrink-0 ml-6">
                        <div className="text-xs font-medium tracking-[0.15em] text-[#A68A4A] uppercase">Avg. Annual Premium</div>
                        <div className="text-lg font-medium text-[#0F172A]">{client.avgPremium}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-8 pt-2">
                    <div className="border-t border-[#C5A059]/10 pt-5 space-y-4">
                      <div className="sm:hidden flex items-center gap-2 text-sm">
                        <span className="font-medium tracking-[0.1em] text-[#A68A4A] uppercase text-xs">Avg. Annual Premium:</span>
                        <span className="font-medium">{client.avgPremium}</span>
                      </div>
                      <p className="text-[#0F172A]/60 text-sm leading-[1.8]">{client.detail}</p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {client.tags.map((tag, j) => (
                          <span key={j} className="text-xs font-medium tracking-wide text-[#A68A4A] bg-[#C5A059]/8 px-3 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Already Selling Life? — clean, on-brand */}
      <section className="py-24 bg-white border-y border-[#C5A059]/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase">For Life Insurance Agents</div>
            <h2 className="text-3xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
              Already selling life?
            </h2>
            <p className="text-[#0F172A]/55 text-lg leading-relaxed max-w-2xl mx-auto">
              Keep your book, your upline, your carriers. We're not a life platform. We give you healthcare carrier access and infrastructure so you can add a recurring-commission line — without disrupting anything.
            </p>
            <div className="pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <GoldButton data-testid="button-apply-life-agents" className="text-base min-w-[220px]">
                    Apply to Join
                  </GoldButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] border-[#C5A059]/20">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-[#0F172A]" style={{ fontFamily: "'Playfair Display', serif" }}>Start Your Application</DialogTitle>
                    <DialogDescription>Complete the form below to schedule your introduction call.</DialogDescription>
                  </DialogHeader>
                  <LeadForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white border-[#C5A059]/20 shadow-lg shadow-[#C5A059]/5" data-testid="card-licensed">
              <CardContent className="p-10 space-y-5">
                <div className="text-xs font-medium tracking-[0.2em] text-[#A68A4A] uppercase">Fast Track</div>
                <h3 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Licensed Agents</h3>
                <p className="text-[#0F172A]/55 leading-relaxed">
                  You already hold a Life &amp; Health license. You want access to healthcare carriers, higher splits, and real ownership of a compounding book.
                </p>
                <ul className="space-y-2 text-[#0F172A]/65 text-sm">
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Fast track onboarding</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Carrier contracting guidance</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Quoting + enrollment workflow</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Mentor assignment + weekly cadence</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#C5A059]/20 shadow-lg shadow-[#C5A059]/5" data-testid="card-not-licensed">
              <CardContent className="p-10 space-y-5">
                <div className="text-xs font-medium tracking-[0.2em] text-[#A68A4A] uppercase">Getting Started</div>
                <h3 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Not Licensed Yet</h3>
                <p className="text-[#0F172A]/55 leading-relaxed">
                  Entrepreneurs, sales professionals, career changers. You're willing to get licensed and build a healthcare book from scratch with full onboarding support.
                </p>
                <ul className="space-y-2 text-[#0F172A]/65 text-sm">
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Clear steps to get licensed</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Pre-training access and expectations</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Full onboarding once licensed</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Dialog>
              <DialogTrigger asChild>
                <GoldButton data-testid="button-apply-cards" className="text-sm">
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

      {/* Calculator */}
      <section id="calculator" className="py-24 bg-white" data-testid="section-calculator">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-3xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Income Calculator</h2>
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

      {/* Agent Infrastructure — expandable accordion style */}
      <section id="infrastructure" className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-4">What You Get</div>
              <h2 className="text-3xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Agent Infrastructure</h2>
            </div>
            
            <Accordion type="multiple" className="w-full space-y-4">
              {infrastructureItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`infra-${i}`}
                  className="gold-card border-0 overflow-visible px-0"
                  data-testid={`card-infrastructure-${i}`}
                >
                  <AccordionTrigger className="px-8 py-6 hover:no-underline [&[data-state=open]]:pb-2">
                    <div className="flex flex-col items-start text-left gap-1">
                      <h3 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                      <p className="text-[#0F172A]/45 text-sm font-normal">{item.summary}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-8 pt-2">
                    <div className="border-t border-[#C5A059]/10 pt-5">
                      <p className="text-[#0F172A]/60 text-sm leading-[1.8]">{item.detail}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white" data-testid="section-faq">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-medium mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Can I keep selling life with my current upline?", a: "Absolutely. We are not a life insurance platform and we don't onboard for life. We give you access to private healthcare carriers so you can help your existing clients (or new ones) secure health coverage. Your life business stays exactly where it is." },
              { q: "Do I need to be licensed?", a: "Preferred. If you're not licensed yet, we'll guide you through the licensing process — it typically takes 1-2 weeks." },
              { q: "What's the weekly call?", a: "A brief overview call covering expectations, next steps, and current opportunities. It's how we stay aligned." },
              { q: "How fast can I start?", a: "Depends on your licensing and contracting status. Licensed agents can start within days." },
              { q: "Do you provide leads?", a: "We provide access to vetted lead vendors at discounted rates and train you on organic lead generation. For agents hitting production targets, there's potential for lead costs to be partially covered at a reduced commission split." },
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
    </div>
  );
}

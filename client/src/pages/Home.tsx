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
import { LeadForm, type FormStage } from "@/components/LeadForm";
import { CommissionCalculator } from "@/components/CommissionCalculator";
import { CadenceTimeline, PipelineLadder, CommissionCurve } from "@/components/PlatformCharts";
import { ScrollProgress, Reveal, RevealStagger, RevealChild } from "@/components/motion";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import {
  Search,
  Shield,
  FileText,
  Phone,
  ChevronDown,
  Bot,
  CalendarCheck,
  Flame,
  RefreshCw,
  PhoneCall,
  Inbox,
  Columns3,
  CalendarDays,
  FileSearch,
  Stethoscope,
  Smartphone,
  Wallet,
  Table2,
  ShieldAlert,
  Calculator,
  Trophy,
  ScrollText,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";
// Updated Sakred Health app screenshots (2026-07-25) — served from the app's Supabase.
// Center = home screen (hero); sides = the policy-portal + document library screens.
const APP_SHOTS = "https://auth.sakredhealth.com/storage/v1/object/public/appdemoscreenshots";
const portalScreen1 = `${APP_SHOTS}/policy%20portal%20.jpeg`;
const portalScreen2 = `${APP_SHOTS}/homescreen%20.jpeg`;
const portalScreen3 = `${APP_SHOTS}/library%20overview%20.jpeg`;

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
        className={`gold-glow-btn inline-flex items-center justify-center whitespace-nowrap text-sm font-normal tracking-wide disabled:pointer-events-none disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
GoldButton.displayName = "GoldButton";

function LeadFormDialogContent({ onSuccess }: { onSuccess?: () => void }) {
  const [stage, setStage] = useState<FormStage>("form");
  return (
    <DialogContent className="sm:max-w-[500px] border-[#C5A059]/20">
      {stage === "form" && (
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Become A Sakred Agent</DialogTitle>
          <DialogDescription className="text-center">Complete the form below to schedule your introduction call.</DialogDescription>
        </DialogHeader>
      )}
      {stage === "calendar" && (
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Schedule Your Opportunity Call</DialogTitle>
          <DialogDescription className="text-center">Join an Opportunity Call with Sakred Health — we'll walk you through the platform on Zoom.</DialogDescription>
        </DialogHeader>
      )}
      {stage === "booked" && (
        <DialogHeader className="sr-only">
          <DialogTitle>Booked</DialogTitle>
          <DialogDescription>Your call is confirmed.</DialogDescription>
        </DialogHeader>
      )}
      <LeadForm onSuccess={onSuccess} onStageChange={setStage} />
    </DialogContent>
  );
}

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
    title: "The Sakred Platform",
    summary: "Our own CRM, AI assistant, dialer, and commission tracking",
    detail: "Every agent gets full access to the sales platform we built in-house — an AI assistant that texts and qualifies your leads the moment they land and books appointments straight onto your calendar, a power dialer with local caller ID, a 31-stage pipeline board, a unified inbox, quoting and underwriting tools, and commission tracking that shows you what each case pays before you write it. It's on your desktop and in your pocket on iPhone and Android. See the full breakdown in the Platform section above.",
  },
  {
    title: "Assigned Mentor",
    summary: "One-on-one guidance from day one",
    detail: "Every new agent is paired with an experienced mentor who has built their own healthcare book. Your mentor walks you through your first cases, reviews your quoting process, and is available for real-time support as you ramp up. This isn't a group chat — it's a direct relationship with someone who's done what you're doing."
  },
  {
    title: "Proprietary Training Platform",
    summary: "On-demand access to structured coursework",
    detail: "Our private training software covers everything from plan knowledge and compliance requirements to advanced sales techniques. Modules are self-paced with assessments, so you can train on your schedule. New content is added regularly as plans and guidelines change."
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
    detail: "Our step-by-step quoting workflow takes you from needs analysis through plan selection, comparison, client presentation, and enrollment submission. You'll know exactly what to do at each stage — no guesswork. Includes plan-specific submission checklists so nothing falls through the cracks."
  },
  {
    title: "Weekly Training & Team Calls",
    summary: "Live sessions on products, compliance, and strategy",
    detail: "Every week we run live training covering new plans, compliance updates, sales strategy, and real case studies. There's also a dedicated recruiting call for agents building teams. These aren't optional webinars — they're working sessions designed to keep you sharp and connected to what's happening in the market."
  },
];

const platformGroups = [
  {
    kicker: "Leads Work Themselves",
    heading: "An AI assistant on every lead",
    intro:
      "The moment a lead lands, it gets worked — not filed. You show up to conversations that are already warm.",
    features: [
      {
        icon: Bot,
        title: "AI Texts Every Lead Instantly",
        desc: "Our AI assistant opens the conversation the minute a lead comes in, answers questions, works through objections, and qualifies. Nights, weekends, holidays.",
      },
      {
        icon: CalendarCheck,
        title: "It Books — It Doesn't Hand Off",
        desc: "When a lead is ready, the AI puts the appointment straight on your calendar. You never sit in a message queue or babysit threads.",
      },
      {
        icon: Flame,
        title: "Hot Leads Worklist",
        desc: "A ranked call list every morning: who to call first, why they're hot, what the AI already learned about them, and a suggested opener.",
      },
      {
        icon: RefreshCw,
        title: "Follow-Up That Never Quits",
        desc: "Leads that go quiet get re-engaged automatically on a cadence tuned to the product. Nothing rots in your pipeline because you got busy.",
      },
    ],
  },
  {
    kicker: "Your Desk",
    heading: "Everything in one tab",
    intro:
      "Dialer, inbox, pipeline, calendar, quoting. No stitching together five subscriptions to run your day.",
    features: [
      {
        icon: PhoneCall,
        title: "Power Dialer",
        desc: "One-click dialing from a local number the lead recognizes, with voicemail drop, call recording, and dispositions logged as you go.",
      },
      {
        icon: Inbox,
        title: "Unified Inbox",
        desc: "Texts, emails, and call history for one person, in one thread. You always know what was already said before you pick up the phone.",
      },
      {
        icon: Columns3,
        title: "One Board, Every Stage",
        desc: "31 dispositions on a single pipeline board — including three appointment rounds tracked separately, each with its own no-show, reschedule, and sat-without-follow-up. Nothing gets filed under a vague \"follow up.\"",
      },
      {
        icon: CalendarDays,
        title: "Calendar & Personal Booking Link",
        desc: "Two-way Google Calendar sync, your own booking page, automatic reminders, and no-show follow-up handled for you.",
      },
      {
        icon: FileSearch,
        title: "Quoting & Policy Analyzer",
        desc: "Plan documents with age-banded pricing built in, a quoter that prices off them, and an analyzer that reads a prospect's current coverage and explains it in plain English.",
      },
      {
        icon: Stethoscope,
        title: "Underwriting Reference",
        desc: "A condition-by-category guide so you know how a case is likely to land before you spend a week submitting it.",
      },
      {
        icon: Smartphone,
        title: "iPhone & Android App",
        desc: "Your leads, inbox, dialer, and calendar in your pocket. Sakred CRM ships on the App Store and Google Play — the same system, on the road.",
      },
    ],
  },
  {
    kicker: "Your Money",
    heading: "You always know what you're owed",
    intro:
      "Most agents find out what a case paid when the deposit hits. You'll know before you write it.",
    features: [
      {
        icon: Table2,
        title: "See Your Comp Before You Sell",
        desc: "Your comp is published in the platform — what every plan and product pays you at your level, by age band. No guessing, no asking, no mystery grid.",
      },
      {
        icon: Wallet,
        title: "Commission Dashboard",
        desc: "Every policy you write, what it pays, what's advanced versus as-earned, and when it's scheduled to land.",
      },
      {
        icon: ShieldAlert,
        title: "Chargeback & Persistency Tracking",
        desc: "Early lapses get flagged and clawbacks get booked automatically, so a statement never surprises you and you can see which business is sticking.",
      },
      {
        icon: Calculator,
        title: "Calculator & 1099 Reports",
        desc: "Model a case before you write it, and get clean, organized numbers when it's time to file.",
      },
      {
        icon: Trophy,
        title: "Production Scoreboard",
        desc: "Where you stand, in real time. Healthy competition beats a monthly email nobody reads.",
      },
    ],
  },
  {
    kicker: "Handled For You",
    heading: "The parts you shouldn't have to think about",
    intro:
      "Compliance, training, and contracting run in the background so your day is selling, not admin.",
    features: [
      {
        icon: Shield,
        title: "Messaging Compliance, Automatic",
        desc: "Registration for business texting, quiet hours in the client's local time, opt-outs honored instantly, and messaging that goes out under the correct licensed business name for the state.",
      },
      {
        icon: GraduationCap,
        title: "Academy, Built In",
        desc: "Training modules on demand, organized by product line, right inside the platform you already work in.",
      },
      {
        icon: ClipboardCheck,
        title: "Contracting Tracker",
        desc: "See exactly where every appointment stands instead of emailing someone to ask.",
      },
      {
        icon: ScrollText,
        title: "Client Records That Stay Put",
        desc: "Policies, documents, service requests, and renewal dates live on the client record — so your book is an asset you can actually work, years later.",
      },
    ],
  },
];

// One figure per platform group, by index. Group 3 ("Handled For You") gets none
// — it's the section that should read as a short list, not another diagram.
const PLATFORM_FIGURES: (React.ReactNode | null)[] = [
  <CadenceTimeline />,
  <PipelineLadder />,
  <CommissionCurve />,
  null,
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#0F172A]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <ScrollProgress />
      <Navigation />

      {/* Hero — leads with the opportunity, not the audience */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-[#A68A4A] uppercase border border-[#C5A059]/30 rounded-full bg-[#C5A059]/5">
                Private Healthcare &middot; Recurring Commissions &middot; Custom CRM
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
              Every Sakred agent gets access to <strong className="font-medium text-[#0F172A]/80">Sakred CRM</strong> &mdash;
              our own custom-built CRM and AI sales platform &mdash; plus the contracts and
              training to build a book that pays you month after month.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <GoldButton data-testid="button-apply-hero" className="text-base min-w-[220px]">
                    Apply to Join
                  </GoldButton>
                </DialogTrigger>
                <LeadFormDialogContent />
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

            {/* Google's OAuth branding review rejected this domain for not explaining
                what the application is, so the hero states it plainly. It sits below
                the CTAs deliberately: the first paragraph already names Sakred CRM, and
                putting this block above the buttons pushed "Apply to Join" off a phone
                screen. The #about section carries the full statement and the
                Google-data justification — keep the three copies in sync. */}
            <motion.p variants={fadeInUp} className="text-base text-[#0F172A]/45 max-w-2xl mx-auto leading-relaxed pt-10" data-testid="text-hero-app-purpose">
              <strong className="font-medium text-[#0F172A]/60">Sakred CRM</strong> is the customer relationship
              management app our agents work in every day: track your clients and their policies, manage a
              sales pipeline, book and run appointments, place and receive calls, send and receive texts and
              email, run marketing campaigns, and track your commissions, renewals and payouts &mdash; with an
              AI assistant that texts new leads and books the appointment on your calendar.{" "}
              <button
                type="button"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="text-[#C5A059] hover:underline font-medium"
                data-testid="link-hero-about"
              >
                What the app does &rarr;
              </button>
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-12">
              <div className="inline-flex items-center max-w-full gap-3 px-5 py-3 sm:gap-6 sm:px-8 sm:py-4 border border-[#C5A059]/20 rounded-full bg-white/60 backdrop-blur-sm">
                <span className="text-sm font-medium text-[#0F172A]/70">Apply</span>
                <motion.span
                  className="text-[#C5A059]"
                  animate={{ x: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                >&#8594;</motion.span>
                <span className="text-sm font-medium text-[#0F172A]/70">Opportunity Call</span>
                <motion.span
                  className="text-[#C5A059]"
                  animate={{ x: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                >&#8594;</motion.span>
                <span className="text-sm font-medium text-[#0F172A]/70">Onboarding</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What the application is, and why it asks for Google data.
          Google's OAuth branding review rejected this site because the home page
          "does not explain the purpose of your app" — the rest of the page sells
          the agent opportunity and never says what the software does, or why it
          requests Calendar and Gmail access. That has to be stated plainly, in
          public, above the fold-ish, and it has to match the consent screen. */}
      <section id="about" className="py-16 bg-white border-y border-[#C5A059]/10" data-testid="section-about">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-4" data-testid="text-about-eyebrow">About the application</div>
              <h2 className="text-3xl md:text-4xl font-medium mb-6" style={{ fontFamily: "'Playfair Display', serif" }} data-testid="text-about-heading">
                What Sakred Agents is
              </h2>
              <div className="space-y-4 text-[#0F172A]/65 text-lg leading-relaxed">
                <p data-testid="text-about-summary">
                  <strong className="text-[#0F172A]">Sakred Agents</strong> is a customer relationship
                  management (CRM) and sales-automation application for licensed insurance agents. Agents
                  sign in to track their clients and the policies they hold, manage a sales pipeline from
                  new lead to issued policy, schedule and run appointments, place and receive calls, send
                  and receive text messages and email, run marketing campaigns, and track their commissions,
                  renewals and payouts. An AI assistant helps by texting new leads, answering their
                  questions, and booking the appointment on the agent&rsquo;s calendar.
                </p>
                <p data-testid="text-about-google">
                  Connecting a Google account is optional, and an agent can disconnect it at any time.
                  When an agent chooses to connect one, Sakred Agents uses it only to run the scheduling
                  and email features they enabled: it reads their Google Calendar availability so it only
                  offers times they are genuinely free, creates and updates appointments it books on that
                  calendar, sends their follow-up email from their own address, and — for agents who turn
                  it on — reads their own inbox to sort it and draft replies they review before sending.
                </p>
                <p data-testid="text-about-limited-use">
                  Google user data is never used to train any artificial-intelligence or machine-learning
                  model, and is never sold or shared for advertising. Our use of information received from
                  Google APIs adheres to the{" "}
                  <a
                    href="https://developers.google.com/terms/api-services-user-data-policy"
                    rel="noopener"
                    className="text-[#C5A059] hover:underline"
                    data-testid="link-about-google-policy"
                  >
                    Google API Services User Data Policy
                  </a>
                  , including the Limited Use requirements.
                </p>
                <p className="text-base" data-testid="text-about-links">
                  Read our{" "}
                  <a href="/privacy" className="text-[#C5A059] hover:underline" data-testid="link-about-privacy">Privacy Policy</a>
                  {" "}and{" "}
                  <a href="/terms" className="text-[#C5A059] hover:underline" data-testid="link-about-terms">Terms of Service</a>.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Client Types — who's buying and what they pay */}
      <section id="opportunity" className="py-16 bg-[#F9F9F7] border-y border-[#C5A059]/10" data-testid="section-opportunity">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-10">
              <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-4">The Market</div>
              <h2 className="text-3xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Types of Clients</h2>
            </Reveal>

            <Reveal delay={0.1}>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="pt-16 pb-12 bg-white" data-testid="section-calculator">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal className="text-center mb-10">
            <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-4">Project Your Earnings</div>
            <h2 className="text-3xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Income Calculator</h2>
            <p className="text-[#0F172A]/55 leading-relaxed text-lg max-w-2xl mx-auto mt-4">
              Model your residual income growth based on consistent monthly production.
            </p>
            <p className="text-[#0F172A]/40 text-sm leading-relaxed italic mt-2">
              Estimates only. Actual comp varies by plan, persistency, and contracting.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="max-w-4xl mx-auto">
            <CommissionCalculator />
          </Reveal>
        </div>
      </section>

      {/* Platform — the tech stack an agent gets */}
      <section id="platform" className="py-16 bg-[#F9F9F7] border-y border-[#C5A059]/10" data-testid="section-platform">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-4">
              <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-4">Your Tech Stack</div>
              <h2 className="text-3xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }} data-testid="text-platform-heading">
                You don&rsquo;t just get contracts.<br className="hidden md:block" /> You get the platform.
              </h2>
              <p className="text-[#0F172A]/55 text-lg leading-relaxed max-w-3xl mx-auto mt-6" data-testid="text-platform-intro">
                Most agencies hand you a login to someone else&rsquo;s CRM and wish you luck. We built our own — an
                insurance sales platform with an AI assistant that works your leads, a dialer, a 31-stage pipeline
                board, and commission tracking that shows you what you&rsquo;re owed. Every Sakred agent gets it.
              </p>
              <p className="text-[#0F172A]/40 text-sm leading-relaxed italic mt-3">
                Built in-house for our own agents. Not a reseller license.
              </p>
            </Reveal>

            <div className="space-y-14 mt-14">
              {platformGroups.map((group, gi) => (
                <div key={gi} data-testid={`group-platform-${gi}`}>
                  <Reveal className="mb-6">
                    <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-2">{group.kicker}</div>
                    <h3 className="text-2xl md:text-3xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {group.heading}
                    </h3>
                    <p className="text-[#0F172A]/55 leading-relaxed mt-3 max-w-2xl">{group.intro}</p>
                  </Reveal>

                  <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {group.features.map((feature, fi) => (
                      <RevealChild key={fi}>
                        <div className="portal-card p-7 space-y-4 h-full" data-testid={`card-platform-${gi}-${fi}`}>
                          <div className="w-10 h-10 rounded-lg bg-[#C5A059]/10 flex items-center justify-center">
                            <feature.icon className="w-5 h-5 text-[#C5A059]" />
                          </div>
                          <h4 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{feature.title}</h4>
                          <p className="text-[#0F172A]/55 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                      </RevealChild>
                    ))}
                  </RevealStagger>

                  {PLATFORM_FIGURES[gi] && (
                    <Reveal delay={0.1} className="mt-8">
                      {PLATFORM_FIGURES[gi]}
                    </Reveal>
                  )}
                </div>
              ))}
            </div>

            <Reveal className="text-center mt-14">
              <p className="text-[#0F172A]/55 leading-relaxed max-w-2xl mx-auto mb-6">
                We&rsquo;ll walk you through the whole platform, live, on your opportunity call.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <GoldButton data-testid="button-apply-platform" className="text-base min-w-[220px]">
                    See It On A Call
                  </GoldButton>
                </DialogTrigger>
                <LeadFormDialogContent />
              </Dialog>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Client Portal */}
      {/* overflow-x-clip: the rotated phone screenshots below extend a few px past
          the viewport at <=430px and made the whole page scroll sideways. `clip`
          rather than `hidden` so this doesn't become a scroll container. */}
      <section id="client-portal" className="pt-12 pb-16 bg-[#F9F9F7] overflow-x-clip" data-testid="section-client-portal">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="text-center mb-8"
            >
              <motion.div variants={fadeInUp}>
                <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-4" data-testid="text-portal-subtitle">What You Can Offer</div>
                <h2 className="text-3xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }} data-testid="text-portal-heading">Sakred Health Client Portal</h2>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-[#0F172A]/55 text-lg leading-relaxed max-w-3xl mx-auto mt-6" data-testid="text-portal-intro">
                You get the platform. Your clients get one too. As a Sakred Health insurance agent, you bring your clients more than just a policy — you give them a fully integrated healthcare portal built right into the Sakred Health wellness app.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="flex justify-center items-end mt-12 md:mt-16 mb-24"
              data-testid="portal-screenshots"
            >
              <div className="relative flex items-end justify-center pt-8" style={{ width: "100%", maxWidth: "600px" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="portal-glow rounded-full" style={{ width: "300px", height: "300px" }} />
                </div>
                <div className="relative z-10 -mr-6" style={{ transform: "rotate(-8deg) translateY(-10px)" }}>
                  <img
                    src={portalScreen1}
                    alt="Sakred Health app - policy portal"
                    className="w-36 md:w-44 rounded-2xl shadow-2xl border border-[#C5A059]/20"
                    data-testid="img-portal-screen-1"
                  />
                </div>
                <div className="relative z-20" style={{ transform: "translateY(-20px)" }}>
                  <img
                    src={portalScreen2}
                    alt="Sakred Health app - home screen"
                    className="w-40 md:w-52 rounded-2xl shadow-2xl border border-[#C5A059]/20"
                    data-testid="img-portal-screen-2"
                  />
                </div>
                <div className="relative z-10 -ml-6" style={{ transform: "rotate(8deg) translateY(-10px)" }}>
                  <img
                    src={portalScreen3}
                    alt="Sakred Health app - document library"
                    className="w-36 md:w-44 rounded-2xl shadow-2xl border border-[#C5A059]/20"
                    data-testid="img-portal-screen-3"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-6">
                <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-2">Client Experience</div>
                <h3 className="text-2xl md:text-3xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }} data-testid="text-for-clients-heading">
                  For Your Clients
                </h3>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: FileText, title: "Policy Overview at a Glance", desc: "Clients can view their active policies, plan info, and coverage details (deductibles, copays, out-of-pocket max) all in one place." },
                  { icon: Search, title: "Full-Text Policy Search", desc: "No more digging through PDFs. Clients can search their policy documents instantly for specific terms, coverage questions, or benefits details." },
                  { icon: Shield, title: "Secure Document Access", desc: "All policy documents stored securely with private signed links, accessible anytime from their phone." },
                  { icon: Phone, title: "Direct Support Access", desc: "Clients can submit support requests and schedule callback appointments with their assigned agent, all from within the app." },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="portal-card p-8 space-y-4"
                    data-testid={`card-client-feature-${i}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#C5A059]/10 flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-[#C5A059]" />
                    </div>
                    <h4 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{card.title}</h4>
                    <p className="text-[#0F172A]/55 text-sm leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Already Selling Life? — clean, on-brand */}
      <section className="py-16 bg-white border-y border-[#C5A059]/10">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal className="max-w-3xl mx-auto text-center space-y-6">
            <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase">For Life Insurance Agents</div>
            <h2 className="text-3xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
              Already selling life?
            </h2>
            <p className="text-[#0F172A]/55 text-lg leading-relaxed max-w-2xl mx-auto">
              Keep your book, your upline, your contracts. We're not a life platform. We give you healthcare access and infrastructure so you can add a recurring-commission line — without disrupting anything.
            </p>
            <div className="pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <GoldButton data-testid="button-apply-life-agents" className="text-base min-w-[220px]">
                    Apply to Join
                  </GoldButton>
                </DialogTrigger>
                <LeadFormDialogContent />
              </Dialog>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 md:px-6">
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <RevealChild>
            <Card className="bg-white border-[#C5A059]/20 shadow-lg shadow-[#C5A059]/5 h-full" data-testid="card-licensed">
              <CardContent className="p-10 space-y-5">
                <div className="text-xs font-medium tracking-[0.2em] text-[#A68A4A] uppercase">Fast Track</div>
                <h3 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Licensed Agents</h3>
                <p className="text-[#0F172A]/55 leading-relaxed">
                  You already hold a Life &amp; Health license. You want access to healthcare plans, higher splits, and real ownership of a compounding book.
                </p>
                <ul className="space-y-2 text-[#0F172A]/65 text-sm">
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Fast track onboarding</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Contracting guidance</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Quoting + enrollment workflow</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Full platform access from day one</li>
                  <li className="flex items-start gap-2"><span className="text-[#C5A059] mt-0.5">&#8226;</span> Mentor assignment + weekly cadence</li>
                </ul>
              </CardContent>
            </Card>
            </RevealChild>

            <RevealChild>
            <Card className="bg-white border-[#C5A059]/20 shadow-lg shadow-[#C5A059]/5 h-full" data-testid="card-not-licensed">
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
            </RevealChild>
          </RevealStagger>

          <div className="text-center mt-12">
            <Dialog>
              <DialogTrigger asChild>
                <GoldButton data-testid="button-apply-cards" className="text-sm">
                  Apply to Join
                </GoldButton>
              </DialogTrigger>
              <LeadFormDialogContent />
            </Dialog>
          </div>
        </div>
      </section>

      {/* Agent Infrastructure — expandable accordion style */}
      <section id="infrastructure" className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-10">
              <div className="text-xs font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-4">What You Get</div>
              <h2 className="text-3xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Agent Infrastructure</h2>
            </Reveal>

            <Reveal delay={0.1}>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white" data-testid="section-faq">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <Reveal>
          <h2 className="text-3xl md:text-5xl font-medium mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Can I keep selling life with my current upline?", a: "Absolutely. We are not a life insurance platform and we don't onboard for life. We give you access to private healthcare plans so you can help your existing clients (or new ones) secure health coverage. Your life business stays exactly where it is." },
              { q: "Do I need to be licensed?", a: "Preferred. If you're not licensed yet, we'll guide you through the licensing process — it typically takes 1-2 weeks." },
              { q: "What's the weekly call?", a: "A brief overview call covering expectations, next steps, and current opportunities. It's how we stay aligned." },
              { q: "How fast can I start?", a: "Depends on your licensing and contracting status. Licensed agents can start within days." },
              { q: "Do you provide leads?", a: "We provide access to vetted lead vendors at discounted rates and train you on organic lead generation. For agents hitting production targets, there's potential for lead costs to be partially covered at a reduced commission split." },
              { q: "Do I need my own CRM?", a: "No. Every Sakred agent gets access to the sales platform we built in-house — AI that works your leads, a power dialer, a 31-stage pipeline board, a unified inbox, quoting tools, and commission tracking. If you're already paying for a CRM, a dialer, and a texting tool, you can stop." },
              { q: "What does the AI actually do?", a: "It's an assistant, not a robot that replaces you. It texts every new lead the moment it lands, answers questions, works through objections, and qualifies. When the lead is ready, it books the appointment directly on your calendar — you don't sit in a message queue or chase cold leads. You show up to conversations that are already warm." },
              { q: "Can I see what a case pays before I write it?", a: "Yes. Your comp is published in the platform — what each plan and product pays you at your level, by age band — along with a calculator, a commission dashboard showing advanced versus as-earned, persistency and chargeback tracking, and 1099 reports at tax time." },
              { q: "Is this part-time possible?", a: "Yes. Many agents start part-time while transitioning. We prefer a plan to go full-time within 3-6 months." },
              { q: "Which states do you operate in?", a: "Varies by plan. We can discuss your specific state during the intro call." },
              { q: "What happens after I apply?", a: "You'll schedule an opportunity call right away. You'll get a confirmation email with a Zoom link and calendar invite. If you can't make it, we'll reach out to reschedule." },
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
          </Reveal>
        </div>
      </section>

      {/* Google's OAuth branding review checks the home page for the app name
          and a reachable privacy policy link. The page had neither — no footer
          existed at all — which is what failed the "Homepage requirements"
          check. The name here must stay exactly "Sakred Agents": it has to
          match the OAuth consent screen's app name character for character. */}
      <footer className="border-t border-[#C5A059]/15 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div
            className="text-lg font-semibold text-[#0F172A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="text-footer-brand"
          >
            Sakred Agents
          </div>
          {/* py-2.5 gives these a ~44px touch height on phones; they were 20px. */}
          <nav className="flex flex-wrap justify-center items-center gap-x-6 text-sm text-[#0F172A]/60">
            {/* Ties the marketing domain to the app domain. The OAuth redirect
                URIs are on sakredcrm.com while the consent screen's home page is
                here, and nothing on this site previously connected the two — a
                reviewer had no way to see they are one product. */}
            <a href="https://www.sakredcrm.com" rel="noopener" className="hover:text-[#C5A059] py-2.5" data-testid="link-footer-signin">
              Agent Sign In
            </a>
            <a href="/privacy" className="hover:text-[#C5A059] py-2.5" data-testid="link-footer-privacy">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-[#C5A059] py-2.5" data-testid="link-footer-terms">
              Terms of Service
            </a>
            <a href="/support" className="hover:text-[#C5A059] py-2.5" data-testid="link-footer-support">
              Support
            </a>
            <a href="/delete-account" className="hover:text-[#C5A059] py-2.5" data-testid="link-footer-delete">
              Delete Account
            </a>
          </nav>
          <div className="text-sm text-[#0F172A]/45">© 2026 Sakred Health</div>
        </div>
      </footer>
    </div>
  );
}

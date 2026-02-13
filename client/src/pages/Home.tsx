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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#0F172A] font-sans selection:bg-[#C5A059]/30">
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
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-[#C5A059] uppercase border border-[#C5A059]/30 rounded-full bg-[#C5A059]/5">
                Independent Agent Model
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] text-[#0F172A]">
              Build a recurring-income book in <span className="text-[#C5A059]">private healthcare.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed pt-4">
              A structured onboarding program for high-performers to own their own book of business. 
              Direct mentorship. High commissions. True independence.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="gold" size="xl" className="w-full sm:w-auto min-w-[200px]">
                    Apply to Join
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Start Your Application</DialogTitle>
                    <DialogDescription>
                      Complete the form below to schedule your introduction call.
                    </DialogDescription>
                  </DialogHeader>
                  <LeadForm />
                </DialogContent>
              </Dialog>
              <Button 
                variant="outline" 
                size="xl" 
                className="w-full sm:w-auto min-w-[200px] bg-transparent border-[#0F172A]/20 hover:bg-[#0F172A]/5"
                onClick={() => document.getElementById('opportunity')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Opportunity Section (3 Columns) */}
      <section id="opportunity" className="py-24 bg-white border-y border-[#C5A059]/10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-[2px] bg-[#C5A059] mb-6" />
              <h3 className="text-2xl font-serif font-bold text-[#0F172A]">Private Healthcare Market</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tap into a massive, underserved market. As public options become more expensive and restrictive, private plans offer healthier clients better coverage at lower rates.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-[2px] bg-[#C5A059] mb-6" />
              <h3 className="text-2xl font-serif font-bold text-[#0F172A]">Independent Agent Model</h3>
              <p className="text-muted-foreground leading-relaxed">
                You are not an employee. You own your book of business from day one. We provide the contracts, carrier access, and training infrastructure. You provide the drive.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-[2px] bg-[#C5A059] mb-6" />
              <h3 className="text-2xl font-serif font-bold text-[#0F172A]">Recurring Commissions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stop trading time for money. Build a compounding asset that pays you monthly for years. Our top agents build six-figure residuals within 18-24 months.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F172A] mb-4">Who This Is For</h2>
            <p className="text-muted-foreground">We look for character and drive, not just resumes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white border-[#C5A059]/20 shadow-lg shadow-[#C5A059]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-10 space-y-6">
                <div className="text-sm font-bold tracking-widest text-[#C5A059] uppercase">The Professional</div>
                <h3 className="text-3xl font-serif font-bold">Licensed Agents</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You're already in insurance but tired of captive restrictions, low splits, or bad leads. You want ownership, better products, and a system that respects your independence.
                </p>
                <div className="pt-4">
                  <span className="text-sm font-medium border-b border-[#0F172A] pb-1">Fast-track onboarding available</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0F172A] text-white border-none shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-10 space-y-6">
                <div className="text-sm font-bold tracking-widest text-[#C5A059] uppercase">The Entrepreneur</div>
                <h3 className="text-3xl font-serif font-bold">Sales Professionals</h3>
                <p className="text-gray-300 leading-relaxed">
                  You have a track record in sales, real estate, or business but want a vehicle with residual income. You're willing to get licensed (2 weeks) for a career with no ceiling.
                </p>
                <div className="pt-4">
                  <span className="text-sm font-medium border-b border-[#C5A059] pb-1 text-[#C5A059]">Full licensure support provided</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F172A]">Income Potential</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                This is not a "get rich quick" scheme. It is a "get wealthy for sure" model if you put in the work. 
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Use the calculator to model your residual income growth based on consistent monthly production.
              </p>
            </div>
            <div className="lg:col-span-8">
              <CommissionCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F172A] mb-16 text-center">The Process</h2>
            
            <div className="relative border-l border-[#C5A059]/30 ml-4 md:ml-12 space-y-12">
              <div className="relative pl-8 md:pl-16">
                <div className="absolute -left-[9px] top-2 w-[18px] h-[18px] rounded-full bg-[#C5A059] border-4 border-[#F9F9F7]" />
                <h3 className="text-2xl font-serif font-bold mb-2">1. Application & Review</h3>
                <p className="text-muted-foreground text-lg">Submit your details. We review every application to ensure we can support your goals before scheduling a call.</p>
              </div>
              
              <div className="relative pl-8 md:pl-16">
                <div className="absolute -left-[9px] top-2 w-[18px] h-[18px] rounded-full bg-[#0F172A] border-4 border-[#F9F9F7]" />
                <h3 className="text-2xl font-serif font-bold mb-2">2. Strategy Call</h3>
                <p className="text-muted-foreground text-lg">A 20-minute discussion to vet mutual fit. We'll be transparent about the work required.</p>
              </div>
              
              <div className="relative pl-8 md:pl-16">
                <div className="absolute -left-[9px] top-2 w-[18px] h-[18px] rounded-full bg-[#0F172A] border-4 border-[#F9F9F7]" />
                <h3 className="text-2xl font-serif font-bold mb-2">3. Contracting & Training</h3>
                <p className="text-muted-foreground text-lg">Get appointed with carriers and access our training portal. Start learning the products immediately.</p>
              </div>

              <div className="relative pl-8 md:pl-16">
                <div className="absolute -left-[9px] top-2 w-[18px] h-[18px] rounded-full bg-[#0F172A] border-4 border-[#F9F9F7]" />
                <h3 className="text-2xl font-serif font-bold mb-2">4. Launch</h3>
                <p className="text-muted-foreground text-lg">Your first month is guided. You'll have direct access to a mentor for deal structuring and underwriting support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F172A] mb-12 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium font-serif">Is this a salaried position?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                No. This is a 1099 independent contractor role. You are building your own business. The upside is uncapped, but there is no base salary. This model is for those who bet on themselves.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium font-serif">Do I need an insurance license?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Yes. You need a Health & Life insurance license in your resident state. If you are not licensed, we can guide you to the pre-licensing course (takes about 1-2 weeks to complete).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium font-serif">Are leads provided?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                We teach you how to generate your own high-intent leads and provide access to discounted lead vendors. We do not hand out "free leads" because free leads are usually low quality. We teach you to fish.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium font-serif">Can I do this part-time?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                It is possible to start part-time while transitioning, but to see significant results, this requires focus. We prefer candidates who have a plan to go full-time within 3-6 months.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="bg-[#0F172A] text-white py-24">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Ready to build your book?</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Applications are reviewed weekly. If you're ready to work, we're ready to build.
          </p>
          <div className="pt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="gold" size="xl" className="min-w-[240px]">
                  Apply Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl text-[#0F172A]">Start Your Application</DialogTitle>
                  <DialogDescription>
                    Complete the form below to schedule your introduction call.
                  </DialogDescription>
                </DialogHeader>
                <LeadForm />
              </DialogContent>
            </Dialog>
          </div>
          <div className="pt-20 text-sm text-gray-600 border-t border-gray-800 mt-12">
            © {new Date().getFullYear()} Recruit. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

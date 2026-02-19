import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "@assets/Sakred_(512_x_512_px_LOGO__1771013523114.png";

function NavLeadFormDialog({ onSuccess }: { onSuccess?: () => void }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  return (
    <DialogContent className="sm:max-w-[500px] border-[#C5A059]/20">
      {!formSubmitted && (
        <DialogHeader className="text-center">
          <DialogTitle className="font-serif text-2xl text-center">Become A Sakred Agent</DialogTitle>
          <DialogDescription className="text-center">
            Complete the form below to schedule your introduction call.
          </DialogDescription>
        </DialogHeader>
      )}
      {formSubmitted && (
        <DialogHeader className="sr-only">
          <DialogTitle>Schedule Your Opportunity Call</DialogTitle>
          <DialogDescription>Pick a time for your call.</DialogDescription>
        </DialogHeader>
      )}
      <LeadForm onSuccess={onSuccess} onSubmittedChange={setFormSubmitted} />
    </DialogContent>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Opportunity", id: "opportunity" },
    { label: "Calculator", id: "calculator" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav
      data-testid="nav-main"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F9F9F7]/95 backdrop-blur-md border-b border-[#C5A059]/15 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 z-50" data-testid="link-home">
          <img src={logoSrc} alt="Sakred Advisors" className="h-10 w-10 object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              data-testid={`link-nav-${link.id}`}
              className="text-sm font-medium text-[#0F172A]/60 hover:text-[#0F172A] transition-colors tracking-wide"
            >
              {link.label}
            </button>
          ))}
          
          <Dialog>
            <DialogTrigger asChild>
              <button
                data-testid="button-apply-nav"
                className="gold-glow-btn text-[#0F172A] font-normal tracking-wide text-sm"
              >
                Apply to Join
              </button>
            </DialogTrigger>
            <NavLeadFormDialog />
          </Dialog>
        </div>

        <button
          className="md:hidden p-2 text-[#0F172A] z-50"
          data-testid="button-mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <span className="text-xl font-light">&#10005;</span>
          ) : (
            <span className="text-xl">&#9776;</span>
          )}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 right-0 bg-[#F9F9F7] border-b border-[#C5A059]/15 p-6 pt-24 shadow-xl md:hidden flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-lg font-medium text-left py-2 border-b border-[#C5A059]/10"
                >
                  {link.label}
                </button>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    data-testid="button-apply-mobile"
                    className="w-full mt-4 gold-glow-btn text-[#0F172A] font-medium tracking-wide"
                  >
                    Apply to Join
                  </button>
                </DialogTrigger>
                <NavLeadFormDialog onSuccess={() => setMobileMenuOpen(false)} />
              </Dialog>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

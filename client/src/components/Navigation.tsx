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
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    { label: "Process", id: "process" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-[#0F172A] z-50">
          Recruit.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-[#0F172A] transition-colors"
            >
              {link.label}
            </button>
          ))}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="gold">Apply to Join</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-[#C5A059]/20">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Start Your Application</DialogTitle>
                <DialogDescription>
                  Complete the form below to schedule your introduction call.
                </DialogDescription>
              </DialogHeader>
              <LeadForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[#0F172A] z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 right-0 bg-white border-b border-gray-100 p-6 pt-24 shadow-xl md:hidden flex flex-col space-y-4"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-lg font-medium text-left py-2 border-b border-gray-50"
                >
                  {link.label}
                </button>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="gold" className="w-full mt-4">Apply to Join</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Start Your Application</DialogTitle>
                    <DialogDescription>
                      Complete the form below to schedule your introduction call.
                    </DialogDescription>
                  </DialogHeader>
                  <LeadForm onSuccess={() => setMobileMenuOpen(false)} />
                </DialogContent>
              </Dialog>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

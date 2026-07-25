/* ============================================================================
   Sakred Agents — motion layer
   ----------------------------------------------------------------------------
   Small, reusable framer-motion helpers so the whole page shares ONE motion
   vocabulary (the way the Virtual Closer landing page does): a gold scroll
   progress rail, staggered scroll-reveals, and reduced-motion respect.

   Everything degrades gracefully: with prefers-reduced-motion the content is
   shown at rest (no transforms), and nothing here gates whether text renders.
   ========================================================================== */
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* A thin gold rail across the top that fills with scroll position — the Sakred
   answer to VC's red "plate" HUD. Fixed, non-interactive, above everything. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(to right, #A68A4A, #C5A059, #EBD598)",
        boxShadow: "0 0 12px rgba(197,160,89,0.55)",
      }}
    />
  );
}

/* Single element that fades + rises into view once. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE, delay },
    },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/* Container that deals its direct <RevealChild> children in one at a time —
   a row of cards enters like a dealt hand rather than all at once. */
export function RevealStagger({
  children,
  className,
  amount = 0.2,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  stagger?: number;
}) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function RevealChild({
  children,
  className,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

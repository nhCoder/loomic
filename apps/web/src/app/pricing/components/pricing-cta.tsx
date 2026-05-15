"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { fadeInUp } from "./pricing-data";

export function PricingCTA() {
  return (
    <section className="px-6 py-20">
      {/* CTA Card */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="mx-auto max-w-4xl rounded-3xl bg-foreground px-8 py-16 text-center"
      >
        <h2 className="text-3xl font-bold text-primary-foreground">
          Ready to start creating?
        </h2>
        <p className="mt-3 text-base text-primary-foreground/60">
          Start free, no credit card required. Upgrade anytime to unlock more features.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-accent text-accent-foreground hover:bg-accent/90",
              )}
            >
              Start free
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/pricing#features"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/30 bg-transparent text-white hover:bg-white/10",
              )}
            >
              View all features
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 mb-8 text-center text-sm text-muted-foreground">
        <p>&copy; 2026 Loomic. All rights reserved.</p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy policy
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms of service
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/contact"
            className="transition-colors hover:text-foreground"
          >
            Contact us
          </Link>
        </div>
      </footer>
    </section>
  );
}

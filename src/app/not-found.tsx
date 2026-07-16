"use client";

import { Nav } from "@/components/Nav";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg-primary)] px-6 pt-16 text-center">
        <div className="max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Error 404
            </span>
            <h1 className="font-serif text-5xl font-medium tracking-tight text-[var(--color-text-primary)] md:text-6xl">
              Page Not Found
            </h1>
            <p className="font-sans text-base leading-relaxed text-[var(--color-text-secondary)]">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/" variant="primary">
              Go Back Home
            </Button>
          </motion.div>
        </div>
      </main>
    </>
  );
}

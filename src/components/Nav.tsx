"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { navLinks, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";
import "./Nav.css";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "nav-header",
        scrolled ? "nav-header--scrolled" : "nav-header--transparent",
      )}
    >
      <nav
        className="container-content flex h-16 items-center justify-between lg:h-[4.5rem]"
        aria-label="Main navigation"
      >
        <a href="#" className="nav-logo link-underline focus-ring">
          {siteConfig.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link link-underline focus-ring"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.resumeUrl}
              download
              className="nav-resume-btn focus-ring px-5 py-2"
              data-cursor="pointer"
            >
              <span className="relative z-10">Resume</span>
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="nav-menu-btn flex h-10 w-10 items-center justify-center md:hidden focus-ring"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <FontAwesomeIcon
            icon={mobileOpen ? faXmark : faBars}
            className="h-4 w-4"
          />
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="nav-mobile-panel px-5 pb-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-mobile-link block py-1 focus-ring"
                  data-cursor="pointer"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.resumeUrl}
                download
                className="nav-resume-btn focus-ring inline-block px-5 py-2.5"
                data-cursor="pointer"
              >
                <span className="relative z-10">Download Resume</span>
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
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
          <a href="#" className="nav-logo-container focus-ring">
            <img
              src="/images/icon-dark.webp"
              alt="Sachin Tadkale"
              className="nav-logo-icon"
            />
            <span className="nav-logo-text">{siteConfig.name}</span>
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
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
          </button>
        </nav>
      </header>

      {/* Full-screen Slide-out mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="nav-mobile-panel-fs md:hidden"
          >
            {/* Panel Header */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-border">
              <div className="nav-logo-container">
                <img
                  src="/images/icon-dark.webp"
                  alt="Sachin Tadkale"
                  className="nav-logo-icon"
                />
                <span className="nav-logo-text">{siteConfig.name}</span>
              </div>
              <button
                type="button"
                className="nav-menu-btn flex h-10 w-10 items-center justify-center focus-ring"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-8">
              <ul className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="nav-mobile-link focus-ring"
                      data-cursor="pointer"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mb-12">
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="nav-mobile-resume-btn focus-ring"
                  data-cursor="pointer"
                  onClick={() => setMobileOpen(false)}
                >
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

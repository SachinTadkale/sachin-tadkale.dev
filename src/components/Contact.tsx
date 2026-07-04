"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { SocialLinks } from "@/components/icons/SocialLinks";
import { fadeUp } from "@/lib/animations";
import { siteConfig } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./Contact.css";

export function Contact() {
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="contact lg:h-screen lg:min-h-[700px] flex items-center py-16 lg:py-0"
    >
      <div className="container-content w-full">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 items-center">
          {/* Left Column: Header & Info styled via Grid, no margins */}
          <motion.div
            variants={fadeUp}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8"
          >
            <div className="grid gap-3">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="heading-section">Let&apos;s talk</h2>
              <p className="text-secondary max-w-md">
                Looking for an engineer to build your next product? Need help
                scaling an existing one? Or just want to discuss AI, agents, and
                modern software? Send me a message—I&apos;m always happy to
                connect.
              </p>
            </div>

            <div className="contact__info-list">
              <a
                href={`mailto:${siteConfig.email}`}
                className="contact__info-link focus-ring"
              >
                <span className="contact__info-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span className="contact__info-text">{siteConfig.email}</span>
              </a>

              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="contact__info-link focus-ring"
              >
                <span className="contact__info-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <span className="contact__info-text">{siteConfig.phone}</span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  siteConfig.location,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__info-link focus-ring"
              >
                <span className="contact__info-icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <span className="contact__info-text">
                  {siteConfig.location}
                </span>
              </a>
            </div>

            <div className="flex">
              <SocialLinks />
            </div>
          </motion.div>

          {/* Right Column: Form Container */}
          <motion.div
            variants={fadeUp}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="contact__form-container"
          >
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="contact__group">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="contact__input focus-ring px-4 py-3.5"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="contact__label">
                    Name
                  </label>
                </div>

                <div className="contact__group">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="contact__input focus-ring px-4 py-3.5"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="contact__label">
                    Email
                  </label>
                </div>
              </div>

              <div className="contact__group">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="contact__input focus-ring px-4 py-3.5"
                  placeholder=" "
                />
                <label htmlFor="subject" className="contact__label">
                  Subject
                </label>
              </div>

              <div className="contact__group">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="contact__input contact__textarea focus-ring px-4 py-3.5"
                  placeholder=" "
                />
                <label htmlFor="message" className="contact__label">
                  Message
                </label>
              </div>

              <div className="flex">
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  data-cursor="pointer"
                  className="w-full sm:w-auto"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </Button>
              </div>

              {status === "sent" && (
                <p className="contact__status--success" role="status">
                  Message sent — thank you! I&apos;ll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="contact__status--error" role="alert">
                  Something went wrong. Please email me directly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

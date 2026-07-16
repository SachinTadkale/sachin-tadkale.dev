"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEnvelopeOpen,
  faLocationDot,
  faMapLocationDot,
  faPhone,
  faPhoneVolume,
  faSpinner,
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
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("sent");
        setStatusMessage(
          data.message || "Message sent — thank you! I'll be in touch soon.",
        );
        (e.target as HTMLFormElement).reset();

        setTimeout(() => {
          setStatus("idle");
        }, 1000);
      } else {
        setStatus("error");
        setStatusMessage(
          data.message || "Something went wrong. Please email me directly.",
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage("Unable to send your message. Please try again later.");
    }
  }

  return (
    <section
      id="contact"
      className="contact flex flex-col justify-between pt-8 lg:pt-12 pb-0 gap-12"
    >
      <div className="container-content w-full flex-grow flex items-center">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 items-center w-full">
          {/* Left Column: Header & Info styled via Grid, no margins */}
          <motion.div
            variants={fadeUp}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8"
          >
            <div className="grid gap-3">
              <h2 className="heading-section">
                Ready to build something meaningful?
              </h2>
              <p className="body-lg text-secondary max-w-md">
                Whether it's a full-time opportunity, a freelance project, or
                just a conversation about software and AI, I'd love to hear from
                you.
              </p>
            </div>

            <div className="contact__info-list">
              <a
                href={`mailto:${siteConfig.email}`}
                className="contact__info-link focus-ring"
              >
                <span className="contact__info-icon">
                  <span className="contact__envelope-wrapper">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="contact__icon-email contact__icon-email--closed"
                    />
                    <FontAwesomeIcon
                      icon={faEnvelopeOpen}
                      className="contact__icon-email contact__icon-email--open"
                    />
                  </span>
                </span>
                <span className="contact__info-text">{siteConfig.email}</span>
              </a>

              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="contact__info-link focus-ring"
              >
                <span className="contact__info-icon">
                  <span className="contact__phone-wrapper">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="contact__icon-phone contact__icon-phone--default"
                    />
                    <FontAwesomeIcon
                      icon={faPhoneVolume}
                      className="contact__icon-phone contact__icon-phone--active"
                    />
                  </span>
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
                  <span className="contact__location-wrapper">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="contact__icon-location contact__icon-location--default"
                    />
                    <FontAwesomeIcon
                      icon={faMapLocationDot}
                      className="contact__icon-location contact__icon-location--active"
                    />
                  </span>
                </span>
                <span className="contact__info-text">
                  {siteConfig.location}
                </span>
              </a>
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
                    className="contact__input px-4 py-3.5"
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
                    className="contact__input px-4 py-3.5"
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
                  className="contact__input px-4 py-3.5"
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
                  className="contact__input contact__textarea px-4 py-3.5"
                  placeholder=" "
                />
                <label htmlFor="message" className="contact__label">
                  Message
                </label>
              </div>

              <div className="flex">
                <Button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  data-cursor="pointer"
                  className="w-full flex items-center justify-center gap-2"
                >
                  {status === "sending" && (
                    <>
                      Sending…{" "}
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin h-4 w-4"
                      />
                    </>
                  )}
                  {status === "sent" && "Sent!"}
                  {status !== "sending" && status !== "sent" && "Send Message"}
                </Button>
              </div>

              {status === "sent" && (
                <p className="contact__status--success" role="status">
                  {statusMessage}
                </p>
              )}
              {status === "error" && (
                <p className="contact__status--error" role="alert">
                  {statusMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Integrated Closing Footer */}
      <footer className="container-content w-full mt-auto pt-6 pb-6 lg:pt-8 lg:pb-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="footer__appreciation text-secondary block mb-1 italic font-semibold text-xl">
              Thanks for stopping by. I appreciate you taking the time to
              explore my work.
            </span>
            <p className="footer__copyright mt-1 text-xs text-muted">
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
          </div>

          <SocialLinks />
        </div>
      </footer>
    </section>
  );
}

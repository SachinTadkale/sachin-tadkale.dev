"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePostHog } from "posthog-js/react";
import { Button } from "@/components/ui/Button";
import "./ConsentBanner.css";

export default function ConsentBanner() {
  const posthog = usePostHog();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem("portfolio_cookie_consent");
    if (!consent) {
      // By default PostHog is enabled (no action needed). Show banner so user can opt out if desired.
      setIsVisible(true);
    } else if (consent === "declined") {
      // Opt out if user explicitly rejected
      posthog?.opt_out_capturing();
    } else if (consent === "accepted") {
      // Keep opted in
      posthog?.opt_in_capturing();
    }
  }, [posthog]);

  const handleAccept = () => {
    localStorage.setItem("portfolio_cookie_consent", "accepted");
    posthog?.opt_in_capturing();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("portfolio_cookie_consent", "declined");
    posthog?.opt_out_capturing();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="consent-banner-container"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="consent-banner-inner container-content">
            <div className="consent-banner-content">
              <span className="consent-banner-title">Privacy & Analytics</span>
              <p className="consent-banner-text">
                I use anonymous analytics to understand how visitors interact with my portfolio so I can continuously improve it. 
                Contact form messages are sent directly to me via Resend (an email service provider) and are not stored in any database.
              </p>
            </div>
            <div className="consent-banner-actions">
              <Button onClick={handleDecline} variant="secondary" className="consent-btn-secondary">
                Decline
              </Button>
              <Button onClick={handleAccept} variant="primary" className="consent-btn-primary">
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

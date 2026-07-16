"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import React from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (posthogKey) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: "identified_only",
        capture_pageview: false, // handled manually via PostHogPageview
        capture_pageleave: true,
        loaded: (ph) => {
          if (localStorage.getItem("portfolio_cookie_consent") === "declined") {
            ph.opt_out_capturing();
          }
        },
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

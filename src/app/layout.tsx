import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import ChatWidget from "@/components/ChatWidget";
import { siteConfig } from "@/lib/content";
import "@/lib/fontawesome";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";
import PostHogPageview from "@/components/PostHogPageview";
import ConsentBanner from "@/components/ConsentBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sachin Tadkale",
    "SachinTadkale",
    "sachintadkale",
    "sachin tadkale",
    "sachin",
    "sachin.dev",
    "sachin-tadkale.dev",
    "sachin tadkale developer",
    "sachin tadkale engineer",
    "sachin tadkale Pune",
    "sachintadkale developer",
    "sachintadkale portfolio",
    "sachin tadkale portfolio",
    "Sachin Tadkale portfolio",
    "AI Engineer",
    "Full Stack Developer",
    "LeapArchy",
    "Angular",
    "FastAPI",
    "Spring Boot",
    "Flutter",
    "TypeScript",
    "Python",
    "PostgreSQL",
    "AI Agents",
    "Generative AI",
    "SaaS",
    "Business Automation",
    "Software Engineer Portfolio",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/case-study-portfolio.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - AI Engineer & Software Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@_SachinTadkale_",
    images: ["/images/case-study-portfolio.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    jobTitle: "AI Engineer & Software Developer",
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
    ],
    knowsAbout: [
      "AI Agents",
      "Generative AI",
      "SaaS",
      "Business Automation",
      "Angular",
      "FastAPI",
      "Spring Boot",
      "Flutter",
      "TypeScript",
      "Python",
      "PostgreSQL",
    ],
    brand: {
      "@type": "Brand",
      name: "LeapArchy",
      alternateName: "LeapArchy",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <PostHogProvider>
          <PostHogPageview />
          <LenisProvider>
            {children}
            <ChatWidget />
            <ConsentBanner />
          </LenisProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}

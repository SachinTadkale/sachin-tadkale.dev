import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";
import "./SocialLinks.css";

type SocialLinksProps = {
  size?: "sm" | "md";
  variant?: "default" | "muted";
  className?: string;
};

export function SocialLinks({ size = "md", variant = "default", className }: SocialLinksProps) {
  const iconSize = size === "sm" ? "0.875rem" : "1rem";

  const links = [
    { href: siteConfig.social.github, label: "GitHub", icon: faGithub },
    { href: siteConfig.social.linkedin, label: "LinkedIn", icon: faLinkedin },
    { href: siteConfig.social.twitter, label: "X (Twitter)", icon: faXTwitter },
  ];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={cn(
            "social-btn focus-ring",
            size === "sm" ? "social-btn--sm" : "social-btn--md",
            variant === "muted" && "social-btn--muted"
          )}
        >
          <span className="relative z-10 flex items-center justify-center">
            <FontAwesomeIcon icon={link.icon} style={{ width: iconSize, height: iconSize }} />
          </span>
        </a>
      ))}
    </div>
  );
}

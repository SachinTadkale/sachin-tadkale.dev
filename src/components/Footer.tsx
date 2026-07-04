import { SocialLinks } from "@/components/icons/SocialLinks";
import { navLinks, siteConfig } from "@/lib/content";
import "./Footer.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer py-10">
      <div className="container-content flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="footer__name">{siteConfig.name}</p>
          <p className="footer__copyright mt-1">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="footer__nav-link link-underline focus-ring" data-cursor="pointer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks size="sm" variant="muted" />
      </div>
    </footer>
  );
}

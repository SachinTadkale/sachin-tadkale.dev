import Link from "next/link";
import { cn } from "@/lib/utils";
import "./Button.css";

type ButtonBaseProps = {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const styles = cn(
    "btn focus-ring",
    variant === "primary" ? "btn--primary" : "btn--secondary",
    className
  );

  const content = <span className="btn__content">{children}</span>;

  if (href) {
    const linkProps = props as Omit<ButtonAsLink, keyof ButtonBaseProps | "href">;
    const isExternal = href.startsWith("http") || href.startsWith("#");
    const isDownload = "download" in linkProps && linkProps.download !== undefined;

    if (isExternal || isDownload) {
      return (
        <a href={href} className={styles} {...linkProps}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={styles} {...linkProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={styles} {...(props as ButtonAsButton)}>
      {content}
    </button>
  );
}

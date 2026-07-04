type SvgProps = { size?: number; className?: string };

export function NextJsIcon({ size = 18, className }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.5 2v8.5H2.05A10.04 10.04 0 0 1 11.5 2Zm1 0a10.04 10.04 0 0 1 9.45 8.5H12.5V2ZM2.05 13H11.5v8.5A10.04 10.04 0 0 1 2.05 13Zm10.45 8.5V13h9.45a10.04 10.04 0 0 1-9.45 8.5Z" />
    </svg>
  );
}

export function TypeScriptIcon({ size = 18, className }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 4h16v16H4V4zm3.2 3.2v1.6h1.6V7.2H7.2zm0 3.2v7.2h1.6v-2.4h1.6c1.76 0 3.2-1.44 3.2-3.2v-.8c0-1.76-1.44-3.2-3.2-3.2H7.2zm1.6 1.6h1.6c.88 0 1.6.72 1.6 1.6v.8c0 .88-.72 1.6-1.6 1.6H8.8v-4zm5.6 4.8h3.2v1.6h-4.8v-1.6l1.6-1.6c1.12-.96 1.6-1.52 1.6-2.4 0-.88-.72-1.6-1.6-1.6s-1.6.72-1.6 1.6H12c0-1.76 1.44-3.2 3.2-3.2s3.2 1.44 3.2 3.2c0 1.44-.8 2.4-2.4 3.68l-1.2 1.12z" />
    </svg>
  );
}

export function VercelIcon({ size = 18, className }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="m12 2 12 20H0L12 2z" />
    </svg>
  );
}

export function OpenAIIcon({ size = 18, className }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22.28 9.36a6.07 6.07 0 0 0-.51-4.98 6.12 6.12 0 0 0-6.56-2.92A6.07 6.07 0 0 0 12.01 0 6.07 6.07 0 0 0 8.8 1.46 6.12 6.12 0 0 0 2.24 4.38a6.07 6.07 0 0 0 .75 7.13 6.07 6.07 0 0 0 .51 4.98 6.12 6.12 0 0 0 6.56 2.92 6.07 6.07 0 0 0 3.21 1.46 6.12 6.12 0 0 0 6.56-2.92 6.07 6.07 0 0 0 .75-7.13ZM12.01 21.3a5.18 5.18 0 0 1-2.64-.72l.13-.08 4.43-2.56a.72.72 0 0 0 .36-.62V12.1l1.87 1.08a.07.07 0 0 1 .04.05v4.24a5.22 5.22 0 0 1-4.19 3.83ZM5.8 17.57a5.2 5.2 0 0 1-.62-3.5l.13.08 4.43 2.56a.72.72 0 0 0 .72 0l5.4-3.12v2.16a.07.07 0 0 1-.03.06l-4.47 2.58a5.22 5.22 0 0 1-5.56 0ZM4.57 8.53a5.2 5.2 0 0 1 2.72-2.29v5.18a.72.72 0 0 0 .36.62l5.4 3.12-1.87 1.08a.07.07 0 0 1-.07 0L6.44 13.66a5.22 5.22 0 0 1-1.87-5.13Zm15.86 3.68-5.4-3.12 1.87-1.08a.07.07 0 0 1 .07 0l4.47 2.58a5.2 5.2 0 0 1-.8 9.41v-5.18a.72.72 0 0 0-.21-.61Zm1.87-2.83-4.43-2.56a.72.72 0 0 0-.72 0l-5.4 3.12V9.74a.07.07 0 0 1 .03-.06l4.47-2.58a5.22 5.22 0 0 1 7.75 5.38h.3Zm-11.78 3.87-1.87-1.08V9.84a.07.07 0 0 1 .03-.06l4.47-2.58a5.2 5.2 0 0 1 8.16 2.5H12.1a.72.72 0 0 0-.72.36l-.73 1.26Z" />
    </svg>
  );
}

export function LangChainIcon({ size = 18, className }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M6 6h4v4H6zM14 6h4v4h-4zM6 14h4v4H6z" strokeLinejoin="round" />
      <path d="M10 8h4M8 10v4M16 10v4M10 16h4" strokeLinecap="round" />
    </svg>
  );
}

export function RedisIcon({ size = 18, className }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2 2 7l10 5 10-5-10-5zm0 7L2 14l10 5 10-5-10-5zm0 7L2 21l10 3 10-3-10-3z" />
    </svg>
  );
}

export function PostgresIcon({ size = 18, className }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.1 4.3c-1.2-.4-2.5-.3-3.6.2-1.2.6-2 1.7-2.2 3-.3 1.8.5 3.5 1.9 4.5-.8.5-1.4 1.2-1.8 2.1-.5 1.1-.6 2.3-.3 3.5.3 1.2 1 2.2 2 2.9 1.1.7 2.4 1 3.7.8 2.3-.4 4.2-2.1 4.8-4.4.4-1.4.2-2.9-.5-4.2-.7-1.3-1.9-2.3-3.3-2.8 1.1-1.1 1.6-2.7 1.3-4.2-.2-1-.8-1.9-1.6-2.5-.4-.3-.9-.5-1.4-.6zM12 6.5c.5 0 1 .2 1.4.5.4.4.6.9.6 1.5 0 .6-.2 1.1-.6 1.5-.4.4-.9.6-1.5.6s-1.1-.2-1.5-.6c-.4-.4-.6-.9-.6-1.5 0-.6.2-1.1.6-1.5.4-.3.9-.5 1.5-.5z" />
    </svg>
  );
}

export function RagIcon({ size = 18, className }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="3" y="4" width="8" height="10" rx="1" />
      <rect x="13" y="10" width="8" height="10" rx="1" />
      <path d="M11 9h2M11 9l2 2" strokeLinecap="round" />
    </svg>
  );
}

export function VectorDbIcon({ size = 18, className }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  );
}

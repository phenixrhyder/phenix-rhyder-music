import type { ReactNode } from 'react';
export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="eyebrow section-label"><span>{number}</span>{children}</p>;
}
export function VerifiedLink({ url, children, className = '' }: { url: string | null; children: ReactNode; className?: string }) {
  return url ? <a className={className} href={url} target="_blank" rel="noopener noreferrer">{children}<Arrow /></a> : <span className={`${className} pending`}>{children}<span className="pending-label">Link pending verification</span></span>;
}

export function SocialLink({ name, url }: { name: string; url: string }) {
  return <a className="social-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Phenix Rhyder on ${name} (opens in a new tab)`}>
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
      {name === 'YouTube' ? <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /> : <path d="M18.9 1.2h3.7l-8.1 9.3L24 22.8h-7.4l-5.8-7.6-6.7 7.6H.4l8.7-10L0 1.2h7.6l5.3 7 6-7Zm-1.3 19.4h2L6.5 3.3H4.3l13.3 17.3Z" />}
    </svg><span>{name}</span><Arrow />
  </a>;
}

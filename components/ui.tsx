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

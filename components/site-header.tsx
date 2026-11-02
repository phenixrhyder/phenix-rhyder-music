'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
export const navigation = [['Home', '/'], ['Music', '/music'], ['Projects', '/projects'], ['About', '/about'], ['Contact', '/contact']];
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const active = (href: string) => pathname === href || (href === '/projects' && pathname.startsWith('/projects/'));
  return <header className="header shell site-header" onKeyDown={event=>{if(event.key==='Escape' && open){setOpen(false);toggle.current?.focus();}}}>
    <Link className="wordmark" href="/" aria-label="Phenix Rhyder home" onClick={()=>setOpen(false)}>PR<span className="brand-dot" /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label,href])=><Link href={href} key={href} aria-current={active(href)?'page':undefined}>{label}</Link>)}</nav>
    <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?'Close menu':'Menu'} <span aria-hidden="true">{open?'×':'☰'}</span></button>
    <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>{navigation.map(([label,href])=><Link href={href} key={href} aria-current={active(href)?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</nav>
  </header>;
}

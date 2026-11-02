import { ReleaseGrid } from '@/components/release-grid';
import { artistStructuredData } from '@/content/structured-data';
import { site } from '@/content/site';
import { Arrow, SectionLabel, VerifiedLink, SocialLink } from '@/components/ui';
const nav = [['Music', '#music'], ['About', '#about'], ['Contact', '#contact']];
export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artistStructuredData).replace(/</g, '\\u003c') }} />
    <header className="header shell flex items-center justify-between"><a className="wordmark" href="#" aria-label="Phenix Rhyder home">PR<span className="brand-dot" /></a><nav aria-label="Main navigation" className="flex gap-6 sm:gap-10">{nav.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav><span className="header-note">Independent sound. Unbound.</span></header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="aurora" aria-hidden="true"><div className="orb" /><div className="light-line" /></div>
        <div className="shell hero-content"><p className="eyebrow"><span className="tiny-dot" /> THE OFFICIAL ARTIST WEBSITE</p><h1 id="hero-title">PHENIX<br /><span>RHYDER</span><span className="title-period">.</span></h1><div className="hero-bottom"><div><p className="hero-description">Sound beyond the familiar.</p><p className="muted genre-line">Ambient · Lo-fi · Experimental · Alternative · Indie · Electronic</p></div><a className="button" href="#platforms">Listen to music <Arrow /></a></div></div>
        <div className="hero-foot shell"><span>AN INDEPENDENT EXPLORATION OF SOUND</span><a href="#music">EXPLORE <span aria-hidden="true">↓</span></a></div>
      </section>
      <section id="music" className="shell section" aria-labelledby="music-title"><SectionLabel number="01">THE MUSIC</SectionLabel><div className="section-heading"><h2 id="music-title">A world in every sound.</h2><p className="muted">Featured music<br /><span className="small">{site.releases.map(release => `${release.title} — ${release.type}`).join(' · ')}</span></p></div><ReleaseGrid releases={site.releases} /></section>
      <section id="platforms" className="platform-section" aria-labelledby="platforms-title"><div className="shell section"><SectionLabel number="02">FIND YOUR FREQUENCY</SectionLabel><div className="section-heading"><h2 id="platforms-title">Listen your way.</h2><p className="muted small">Listen on Apple Music or Spotify.<br />Visit the official YouTube channel.</p></div><div className="platform-list">{site.platforms.map(platform => <VerifiedLink className="platform" key={platform.name} url={platform.url}><span className="platform-number">{platform.mark}</span><span className="platform-name">{platform.name}</span></VerifiedLink>)}</div></div></section>
      <section id="about" className="shell section about-grid" aria-labelledby="about-title">
        <div><SectionLabel number="03">THE ARTIST</SectionLabel><h2 id="about-title">{site.aboutHeading}</h2><p className="about-subheading">{site.aboutSubheading}</p><div className="about-art" aria-hidden="true"><span>PHENIX / RHYDER</span></div></div>
        <div className="about-copy approved-biography">{site.biography.split('\n\n').map((paragraph, index) => <p className={index === 0 ? 'intro' : 'muted bio'} key={paragraph}>{paragraph}</p>)}<div className="genre-tags">{['Ambient', 'Lo-fi', 'Experimental', 'Alternative', 'Indie', 'Electronic'].map(genre => <span key={genre}>{genre}</span>)}</div></div>
      </section>
      <section id="label" className="label-section shell"><p className="eyebrow">THE LABEL</p><div className="label-wordmark">PHENIX<span>RECORDS</span><span className="label-symbol" aria-hidden="true">◎</span></div><p className="muted">Independent artist. Independent label.</p></section>
      <section id="contact" className="shell section contact-grid" aria-labelledby="contact-title"><div><SectionLabel number="04">GET IN TOUCH</SectionLabel><h2 id="contact-title">Let’s make<br /><span className="serif">something resonate.</span></h2></div><div className="contact-copy"><p className="eyebrow">PROFESSIONAL INQUIRIES</p><p className="muted contact-description">For music inquiries, collaborations, licensing, and general correspondence, get in touch.</p><a className="contact-email" href={`mailto:${site.email}`}>{site.email} <Arrow /></a><a className="button contact-action" href={`mailto:${site.email}`}>Email Phenix Rhyder <Arrow /></a><div className="socials"><p className="eyebrow">FOLLOW PHENIX RHYDER</p><div className="social-links">{site.socials.map(social => <SocialLink key={social.name} name={social.name} url={social.url} />)}</div></div></div></section>
    </main>
    <footer className="shell footer"><div><a className="footer-brand" href="#">PHENIX RHYDER<span className="brand-dot" /></a><p className="small muted">© {new Date().getFullYear()} Phenix Rhyder. All rights reserved.</p></div><nav aria-label="Footer navigation" className="flex gap-6">{nav.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav><a href="#label" className="footer-label">PHENIX RECORDS <Arrow /></a></footer>
  </>;
}

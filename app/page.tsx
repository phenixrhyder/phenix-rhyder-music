import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/content/site';
import { Arrow, SectionLabel, VerifiedLink, SocialLink } from '@/components/ui';
import { pageMetadata } from '@/content/metadata';
import { ProjectCard } from '@/components/project-card';
export const metadata = pageMetadata('Phenix Rhyder — Independent Recording Artist & Songwriter', 'Official website of Phenix Rhyder, independent recording artist and songwriter. Explore music, creative projects including Prism, and official artist profiles.', '/');
export default function Home(){return <>      <section className="hero" aria-labelledby="hero-title">
        <div className="aurora" aria-hidden="true"><div className="orb" /><div className="light-line" /></div>
        <div className="shell hero-content"><p className="eyebrow"><span className="tiny-dot" /> THE OFFICIAL ARTIST WEBSITE</p><h1 id="hero-title">PHENIX<br /><span>RHYDER</span><span className="title-period">.</span></h1><div className="hero-bottom"><div><p className="hero-description">Sound beyond the familiar.</p><p className="muted genre-line">Ambient · Lo-fi · Experimental · Alternative · Indie · Electronic</p></div><a className="button" href="/music">Listen to music <Arrow /></a></div></div>
        <div className="hero-foot shell"><span>AN INDEPENDENT EXPLORATION OF SOUND</span><a href="/music">EXPLORE <span aria-hidden="true">↓</span></a></div>
      </section>
<section className="shell section" aria-labelledby="home-music"><SectionLabel number="01">SELECTED MUSIC</SectionLabel><div className="section-heading"><h2 id="home-music">Find your next atmosphere.</h2><Link className="text-link" href="/music">Explore all music <Arrow /></Link></div><div className="release-grid">{site.releases.map(release=><article key={release.slug}><Link className="artwork original-cover cover-link" href="/music" aria-label={`Explore ${release.title} — ${release.type}`}><Image src={release.artwork} alt={`${release.title} original cover artwork`} width={release.width} height={release.height} sizes="(max-width:600px) 90vw, 30vw" unoptimized /></Link><h3 className="release-title">{release.title}</h3><p className="small muted">{release.type}</p></article>)}</div></section>
<section className="shell section home-about" aria-labelledby="home-about"><SectionLabel number="02">THE ARTIST</SectionLabel><h2 id="home-about">Sound beyond the familiar.</h2><p className="intro">{site.biography.split('\n\n')[0]}</p><Link className="text-link" href="/about">About Phenix Rhyder <Arrow /></Link></section>
<section className="shell section" aria-labelledby="home-projects"><SectionLabel number="03">CREATIVE EXPLORATIONS</SectionLabel><div className="section-heading"><h2 id="home-projects">Beyond the recording.</h2><Link className="text-link" href="/projects">Explore projects <Arrow /></Link></div><ProjectCard /></section>
<section className="shell home-contact"><p className="muted">Music inquiries, collaborations, licensing, or a conversation.</p><Link className="button" href="/contact">Get in touch <Arrow /></Link></section>
</>;}

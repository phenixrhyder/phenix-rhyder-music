import { site } from '@/content/site';
import { Arrow, SectionLabel, VerifiedLink, SocialLink } from '@/components/ui';
import { pageMetadata } from '@/content/metadata';
export const metadata = pageMetadata('About Phenix Rhyder', site.metaDescription, '/about');
export default function AboutPage(){return <>      <section id="about" className="shell section about-grid" aria-labelledby="about-title">
        <div><SectionLabel number="03">THE ARTIST</SectionLabel><h1 id="about-title">{site.aboutHeading}</h1><p className="about-subheading">{site.aboutSubheading}</p><div className="about-art" aria-hidden="true"><span>PHENIX / RHYDER</span></div></div>
        <div className="about-copy approved-biography">{site.biography.split('\n\n').map((paragraph, index) => <p className={index === 0 ? 'intro' : 'muted bio'} key={paragraph}>{paragraph}</p>)}<div className="genre-tags">{['Ambient', 'Lo-fi', 'Experimental', 'Alternative', 'Indie', 'Electronic'].map(genre => <span key={genre}>{genre}</span>)}</div></div>
      </section>      <section id="label" className="label-section shell"><p className="eyebrow">THE LABEL</p><div className="label-wordmark">PHENIX<span>RECORDS</span><span className="label-symbol" aria-hidden="true">◎</span></div><p className="muted">Independent artist. Independent label.</p></section></>;}

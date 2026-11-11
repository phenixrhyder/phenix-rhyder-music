import Link from 'next/link';
import { formatr, prism } from '@/content/projects';
import { Arrow } from './ui';
export function ProjectCard(){return <Link className="project-card" href="/projects/prism"><div className="prism-mark" aria-hidden="true">PRISM<span>SOUND / MOTION</span></div><div className="project-card-copy"><p className="eyebrow">CREATIVE PROJECT</p><h3>{prism.title}</h3><p className="muted">{prism.subtitle}</p><p className="text-link">Explore Prism <Arrow /></p></div></Link>}

export function FormatrCard() {
  return (
    <a className="project-card" href={formatr.liveUrl} target="_blank" rel="noopener noreferrer">
      <div className="prism-mark" aria-hidden="true">Formatr<span>DISCORD / FORMATTING</span></div>
      <div className="project-card-copy">
        <p className="eyebrow">CREATIVE PROJECT</p>
        <h3>{formatr.title}</h3>
        <p className="muted">{formatr.description}</p>
        <p className="text-link">Launch Formatr <Arrow /></p>
      </div>
    </a>
  );
}

import Link from 'next/link';
import { prism } from '@/content/projects';
import { Arrow } from './ui';
export function ProjectCard(){return <Link className="project-card" href="/projects/prism"><div className="prism-mark" aria-hidden="true">PRISM<span>SOUND / MOTION</span></div><div className="project-card-copy"><p className="eyebrow">CREATIVE PROJECT</p><h3>{prism.title}</h3><p className="muted">{prism.subtitle}</p><p className="text-link">Explore Prism <Arrow /></p></div></Link>}

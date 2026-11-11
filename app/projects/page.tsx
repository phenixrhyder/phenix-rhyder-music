import { pageMetadata } from '@/content/metadata';
import { FormatrCard, ProjectCard } from '@/components/project-card';
export const metadata=pageMetadata('Projects — Phenix Rhyder','Explore creative projects by Phenix Rhyder, including Prism, an audio-reactive music visualizer connecting sound and visual design.','/projects');
export default function ProjectsPage(){return <div className="shell section"><div className="page-intro"><p className="eyebrow">PHENIX RHYDER / PROJECTS</p><h1>Sound is a starting point.</h1><p className="intro muted">Creative explorations in sound, motion, and visual design.</p></div><section className="grid gap-[25px]" aria-label="Creative projects"><ProjectCard /><FormatrCard /></section></div>}

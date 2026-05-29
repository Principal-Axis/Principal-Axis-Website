import { motion } from 'motion/react';
import { Layers, Github, ArrowUpRight, Zap, CodeXml } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  logoPath?: string;
}

export default function ProjectCard({ project, onSelect, logoPath }: ProjectCardProps) {
  // Styles for badges based on project status
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'live':
        return {
          bg: 'bg-red-500/10 border border-red-500/30 text-red-400',
          dot: 'bg-red-500 animate-ping',
          text: 'LIVE PRODUCTION'
        };
      case 'beta':
        return {
          bg: 'bg-rose-500/10 border border-rose-500/20 text-rose-400',
          dot: 'bg-rose-400',
          text: 'PUBLIC BETA'
        };
      case 'alpha':
        return {
          bg: 'bg-amber-500/10 border border-amber-500/20 text-amber-400',
          dot: 'bg-amber-400',
          text: 'CORE ALPHA'
        };
      case 'upcoming':
        return {
          bg: 'bg-purple-500/10 border border-purple-500/20 text-purple-400',
          dot: 'bg-purple-400 animate-pulse',
          text: 'ACTIVE SOON'
        };
      default: // concept
        return {
          bg: 'bg-slate-500/10 border border-slate-500/20 text-gray-400',
          dot: 'bg-slate-400',
          text: 'CONCEPT DESIGN'
        };
    }
  };

  const badgeObj = getBadgeStyle(project.status);

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer glass-panel rounded-2xl p-6 overflow-hidden flex flex-col justify-between h-[360px] glass-panel-hover"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative Grid Lines inside card */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      
      {/* Dynamic Crimson Hover Gradient */}
      <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-red-600/5 rounded-full filter blur-[50px] group-hover:bg-red-600/15 transition-all duration-700 pointer-events-none" />

      {/* CARD TOP ROW: Logo & Category Badges */}
      <div>
        <div className="flex items-center justify-between mb-5">
          {/* Logo Placeholder slot inside Card */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950/45 border border-red-500/20 flex items-center justify-center text-red-500 text-xs font-mono font-bold group-hover:border-red-500/45 transition-colors">
              {logoPath ? (
                <img 
                  src={logoPath} 
                  alt={`${project.name} Logo`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <CodeXml size={13} className="text-red-400" />
              )}
            </div>
            <span className="text-[10px] font-mono font-bold text-red-500/60 tracking-widest">{project.category.toUpperCase()}</span>
          </div>

          {/* Dynamic Status Badges parsed directly from JSON */}
          <div className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider ${badgeObj.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${badgeObj.dot}`} />
            <span>{badgeObj.text}</span>
          </div>
        </div>

        {/* Banner preview with heavy cinematic glass effect */}
        <div className="relative h-[110px] rounded-xl overflow-hidden mb-4 border border-red-950/20">
          <img
            src={project.bannerImage}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7] saturate-[0.8]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-2 left-3">
            <p className="text-[10px] font-mono text-red-400 font-semibold tracking-wider">{project.subtitle}</p>
          </div>
        </div>

        {/* Project display Title in PAGKAKI ALL CAPS */}
        <h3 className="text-lg font-black tracking-wider text-white pagkaki-heading transition-colors group-hover:text-red-400 mt-2">
          {project.name}
        </h3>
        
        {/* Core summary snippet */}
        <p className="text-xs text-gray-400 line-clamp-2 mt-2 font-sans font-light leading-relaxed">
          {project.summary}
        </p>
      </div>

      {/* CARD ROW BOTTOM: Tech Stack Tags & Interactive Action */}
      <div className="pt-4 border-t border-red-950/10 flex items-center justify-between">
        {/* Render a limit of 3 tag boxes to prevent design overflow */}
        <div className="flex flex-wrap gap-1.5 max-w-[70%]">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded bg-red-950/20 border border-red-950/30 text-[9px] font-mono text-gray-400 hover:text-white transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow Action element with dynamic slide-in */}
        <div className="flex items-center space-x-1 text-red-500 hover:text-red-400 transition-colors">
          <span className="text-[10px] font-mono font-bold tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            EXPLORE
          </span>
          <div className="w-7 h-7 rounded-full bg-red-950/20 border border-red-950/30 flex items-center justify-center text-red-500 group-hover:bg-red-500/20 group-hover:border-red-500/40 transition-all">
            <ArrowUpRight size={13} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

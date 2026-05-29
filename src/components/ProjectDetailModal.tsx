import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Layers, Calendar, Terminal, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  logoPath?: string;
}

export default function ProjectDetailModal({ project, onClose, logoPath }: ProjectDetailModalProps) {
  // Lock scroll background when modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div id="project-modal-mask" className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-black/80 backdrop-blur-xl">
        
        {/* Animated backdrop close block */}
        <motion.div
          className="absolute inset-0 cursor-default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          id="project-modal-body"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative z-10 w-full max-w-4xl glass-panel rounded-3xl overflow-hidden flex flex-col md:grid md:grid-cols-5 h-[90vh] md:h-[680px] mt-8"
        >
          {/* TOP RIGHT CLOSE TRIGGER BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-red-950/40 border border-red-500/20 hover:border-red-500/50 flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-md cursor-pointer"
          >
            <X size={15} />
          </button>

          {/* LEFT 3 COLS: Detailed Research Dossier */}
          <div className="md:col-span-3 flex flex-col h-full overflow-hidden border-b md:border-b-0 md:border-r border-red-500/10">
            {/* Header */}
            <div className="p-6 md:p-8 bg-red-950/20 border-b border-red-500/10 relative">
              <div className="absolute top-0 left-0 w-16 h-[1px] bg-red-500" />
              <div className="absolute top-0 left-0 w-[1px] h-16 bg-red-500" />
              
              <div className="flex items-center space-x-2.5 mb-2.5">
                <span className="text-[10px] font-mono text-red-500 font-bold tracking-widest bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  {project.category.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-gray-500 tracking-wider">
                  RELEASED: {project.launchDate}
                </span>
              </div>
              
              <h2 className="text-xl md:text-3xl font-black text-white pagkaki-heading tracking-wide">
                {project.name}
              </h2>
              <p className="text-xs md:text-sm text-red-400 font-mono tracking-wide mt-1 font-medium italic">
                {project.subtitle}
              </p>
            </div>

            {/* Scrolling Core Content Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar">
              
              {/* Introduction Paragraph */}
              <div>
                <h4 className="text-[10px] font-mono text-red-500/50 font-bold uppercase tracking-widest mb-2.5 flex items-center space-x-1.5">
                  <span>●</span> <span>Dossier Overview</span>
                </h4>
                <p className="text-xs md:text-sm text-gray-300 font-sans font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Case Study Paragraph Blocks */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-red-500/50 font-bold uppercase tracking-widest mb-2 flex items-center space-x-1.5">
                  <span>●</span> <span>Development Narrative</span>
                </h4>
                
                {project.fullCaseStudy.map((paragraph, index) => (
                  <div key={index} className="relative pl-3.5 border-l-2 border-red-950/40 hover:border-red-500/30 transition-colors">
                    <p className="text-xs text-gray-400 font-sans font-normal leading-relaxed">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dynamic Tech Architecture Details */}
              <div>
                <h4 className="text-[10px] font-mono text-red-500/50 font-bold uppercase tracking-widest mb-3 flex items-center space-x-1.5">
                  <span>●</span> <span>Selected Stack Components</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-1.5 px-3 py-1 rounded bg-[#181111] border border-red-950/30 text-xs font-mono text-gray-400 cursor-default hover:border-red-500/20 hover:text-white transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 2 COLS: Banners, Stats, Links */}
          <div className="md:col-span-2 flex flex-col h-full bg-[#120a0a]/40 relative">
            
            {/* Project Image Banner block */}
            <div className="h-[200px] md:h-[240px] relative overflow-hidden border-b border-red-500/10">
              <img
                src={project.bannerImage}
                alt={project.name}
                className="w-full h-full object-cover brightness-[0.7] saturate-[0.8]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120707] via-transparent to-transparent" />
            </div>

            {/* Stats and Action links panel */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar">
              
              {/* Stats Rows */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-red-500/50 font-bold uppercase tracking-widest mb-3">
                  STABILITY METRICS
                </h4>
                
                {project.stats && project.stats.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-red-950/10 border border-red-950/30 flex justify-between items-center">
                        <span className="text-[9px] font-mono text-red-400/40 font-semibold">{stat.label}</span>
                        <span className="text-sm font-semibold text-white font-mono tracking-tight">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-red-950/5 border border-red-950/20 text-center">
                    <span className="text-[10px] font-mono text-gray-400 italic">No live metrics compiled</span>
                  </div>
                )}
              </div>

              {/* ACTION LINKS ROW */}
              <div className="space-y-2 mt-8">
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-tr from-red-700 via-red-500 to-rose-400 hover:from-red-600 hover:via-red-400 hover:to-rose-300 text-white text-xs font-mono font-bold uppercase tracking-widest transition-all shadow-[0_5px_15px_rgba(239,68,68,0.3)] hover:shadow-[0_8px_20px_rgba(239,68,68,0.5)] group"
                  >
                    <span>LAUNCH SANDBOX</span>
                    <ExternalLink size={13} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-transparent border border-red-500/30 hover:border-red-500/60 text-white text-xs font-mono font-bold uppercase tracking-widest transition-all hover:bg-red-500/5 group"
                  >
                    <Github size={13} />
                    <span>GITHUB CLONE</span>
                  </a>
                )}
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

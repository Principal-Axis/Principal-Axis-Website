import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Users, BookOpen, Send, Sparkles, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface DynamicIslandProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
  logoPath?: string; // Users can specify the path here or modify this component
}

export default function DynamicIsland({
  activeSection,
  onNavigate,
  selectedCategory,
  onSelectCategory,
  categories,
  logoPath = "" // Leave empty for geometric fallback, easy to replace
}: DynamicIslandProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategoryPill, setShowCategoryPill] = useState(false);

  // Read scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show a mini badge in island when user filters categories on scroll
  useEffect(() => {
    if (selectedCategory !== 'All') {
      setShowCategoryPill(true);
      const timer = setTimeout(() => setShowCategoryPill(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory]);

  const navItems = [
    { id: 'story', label: 'STORY', icon: BookOpen },
    { id: 'projects', label: 'PROJECTS', icon: Layers },
    { id: 'team', label: 'TEAM', icon: Users },
    { id: 'join', label: 'JOIN US', icon: Send },
  ];

  return (
    <div id="dynamic-island-container" className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.div
        className="glass-pill flex items-center pointer-events-auto shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden"
        initial={{ width: '280px', height: '48px', borderRadius: '24px' }}
        animate={{
          width: isExpanded ? '460px' : showCategoryPill ? '320px' : isScrolled ? '180px' : '260px',
          height: isExpanded ? '110px' : '48px',
          borderRadius: isExpanded ? '28px' : '24px',
          borderColor: isExpanded ? 'rgba(255, 62, 62, 0.35)' : 'rgba(255, 62, 62, 0.15)',
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 30,
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onTouchStart={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-full h-full p-1.5 flex flex-col justify-between">
          
          {/* TOP ROW: Present in both states */}
          <div className="flex items-center justify-between w-full h-[36px] px-3.5">
            
            {/* Logo/Branding with Dynamic transitions */}
            <div className="flex items-center space-x-2.5">
              {/* Logo slot - swaps to image if logoPath provided, otherwise uses custom SVG */}
              <div className="relative w-7 h-7 flex items-center justify-center rounded-lg bg-red-950/40 border border-red-500/20 overflow-hidden">
                {logoPath ? (
                  <img 
                    src={logoPath} 
                    alt="Principal Axis Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // fallback back to SVG if image fails during local dev editing
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="12" y1="4" x2="12" y2="20" />
                    <circle cx="12" cy="12" r="3" fill="rgba(239,68,68,0.3)" />
                  </svg>
                )}
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </div>

              <AnimatePresence mode="wait">
                {!isScrolled || isExpanded ? (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-xs font-black tracking-widest text-white font-display uppercase whitespace-nowrap"
                  >
                    PRINCIPAL AXIS
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 0.8, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-[10px] font-bold tracking-widest text-red-500/80 font-mono"
                  >
                    PA // MENU
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Right Island Status Widget */}
            <div className="flex items-center space-x-2">
              <AnimatePresence mode="wait">
                {showCategoryPill && !isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[9px] font-mono text-red-400"
                  >
                    <span>{selectedCategory}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Glowing Pulse activity node */}
              <div className="relative flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="absolute w-3.5 h-3.5 rounded-full bg-red-500/20 animate-ping" />
              </div>
            </div>

          </div>

          {/* EXPANDED CONTENT VIEW */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="w-full border-t border-red-500/10 mt-1 pt-2 px-2.5 pb-1 flex flex-col space-y-2"
              >
                {/* Micro Category Switcher inside Dynamic Island */}
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-red-500/50 tracking-wider">NAV MODULES</span>
                  {selectedCategory !== 'All' && (
                    <button
                      onClick={() => onSelectCategory('All')}
                      className="text-[9px] font-mono hover:text-red-400 text-red-500/80 flex items-center space-x-1"
                    >
                      <span>Reset Filter ({selectedCategory})</span>
                    </button>
                  )}
                </div>

                {/* Main Nav Links Row */}
                <div className="grid grid-cols-4 gap-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          setIsExpanded(false);
                        }}
                        className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-red-950/50 border border-red-500/30 text-red-400' 
                            : 'hover:bg-red-900/15 border border-transparent text-gray-400 hover:text-white'
                        }`}
                      >
                        <Icon size={14} className={isActive ? 'text-red-400' : 'text-gray-400'} />
                        <span className="text-[9px] font-semibold font-mono tracking-widest mt-1">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}

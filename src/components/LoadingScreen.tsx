import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, ShieldAlert, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING PRINCIPAL AXIS SYSTEMS...",
  "RESOLVING PHOBIAS...",
  "LOADING CURIOUS INSTANCES...",
  "COMPILE SUCCESS: CURIOUS MODE LOADED (12ms)",
  "BOOTSTRAPPING WEBGPU COMPUTE SHADERS...",
  "CONFIGURING DYNAMIC ISLAND NAV CONTROLLER...",
  "SECURING CLIENT-SIDE KEY-VAL STORES...",
  "ESTABLISHING TEENAGER CO-FOUNDED CHANNELS...",
  "PRINCIPAL AXIS WEBSITE READY."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentLog, setCurrentLog] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Staggered log outputs
    const logInterval = setInterval(() => {
      setCurrentLog((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 280);

    // Smooth speedup progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsFinished(true);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        // Random increment for custom loading realism
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 90);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090505] text-white select-none overflow-hidden"
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Glowing Crimson Ambient Blurs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-600/15 rounded-full filter blur-[100px] pointer-events-none" />
          <div className="absolute top-12 left-12 w-[180px] h-[180px] bg-red-800/10 rounded-full filter blur-[80px] pointer-events-none" />

          {/* Core Content Container */}
          <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-8 flex flex-col items-center"
            >
              <div className="relative w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-tr from-red-950 to-[#120707] border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)] mb-3">
                <img 
                  src="/palogo.png" 
                  alt="Principal Axis Logo"
                  className="w-full h-full object-contain animate-pulse rounded-xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to absolute SVG rendering if image fails
                    (e.target as HTMLImageElement).style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) (fallback as HTMLElement).style.display = 'block';
                  }}
                />
                <svg className="w-8 h-8 text-red-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                  <circle cx="12" cy="12" r="4" fill="rgba(239,68,68,0.2)" />
                </svg>
                {/* Accent particles */}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              </div>
              
              <h1 className="text-2xl font-black tracking-widest text-red-500 pagkaki-heading text-center">
                PRINCIPAL AXIS
              </h1>
              <p className="text-xs text-red-400/60 font-mono mt-1 tracking-widest">
                EST. 2024 / TEEN FOUNDED
              </p>
            </motion.div>

            {/* Pseudo-terminal stream output */}
            <div className="w-full bg-[#120a0a]/80 backdrop-blur-md border border-red-950/50 rounded-lg p-4 font-mono text-[11px] text-red-400/80 mb-6 min-h-[110px] flex flex-col justify-end space-y-1.5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
              <div className="flex items-center space-x-2 text-red-500/40 pb-2 border-b border-red-950/20 mb-1.5">
                <Terminal size={12} />
                <span>SYSTEM LOG STREAM</span>
              </div>
              
              {/* Previous log line (dimmed) */}
              {currentLog > 0 && (
                <div className="opacity-40 text-red-500 truncate">
                  &gt; {BOOT_LOGS[currentLog - 1]}
                </div>
              )}
              
              {/* Current active log output */}
              <motion.div
                key={currentLog}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 font-semibold truncate flex items-center space-x-1"
              >
                <span className="text-red-500">&gt;</span>
                <span>{BOOT_LOGS[currentLog]}</span>
              </motion.div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-red-950/20 h-[5px] rounded-full overflow-hidden border border-red-950/30">
              <motion.div
                className="h-full bg-gradient-to-r from-red-700 via-red-500 to-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.6)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <div className="w-full flex justify-between items-center text-[10px] font-mono mt-2.5 text-red-500/50">
              <span className="flex items-center space-x-1">
                <Cpu size={10} className="animate-spin" />
                <span>MEM: CORES BALANCED</span>
              </span>
              <span>{progress}% SECURED</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Send, 
  Terminal, 
  Layers, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Network,
  ChevronRight,
  CodeXml,
  CheckCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

// Import local compiled data structures
import projectsData from './data/projects.json';
import teamData from './data/team.json';
import storyData from './data/story.json';

// Types
import { Project, TeamMember, Milestone } from './types';

// Subcomponents
import LoadingScreen from './components/LoadingScreen';
import DynamicIsland from './components/DynamicIsland';
import ProjectCard from './components/ProjectCard';
import ProjectDetailModal from './components/ProjectDetailModal';

// --- CONFIGURATION CONSTANTS (Paste your custom GitHub/Server URLs here) ---
const GLOBAL_LOGO_PATH = "/palogo.png"; // Load our generated high-resolution palogo.png by default!

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form state for waitlist
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic ticking clock for beautiful hacker details
  const [timeStr, setTimeStr] = useState('');

  // DOM Refs for scroll detection
  const storyRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync scroll positions with Dynamic Island active item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      if (joinRef.current && scrollPos >= joinRef.current.offsetTop) {
        setActiveSection('join');
      } else if (teamRef.current && scrollPos >= teamRef.current.offsetTop) {
        setActiveSection('team');
      } else if (projectsRef.current && scrollPos >= projectsRef.current.offsetTop) {
        setActiveSection('projects');
      } else if (storyRef.current && scrollPos >= storyRef.current.offsetTop) {
        setActiveSection('story');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    let targetRef: React.RefObject<HTMLDivElement | null> | null = null;
    if (sectionId === 'story') targetRef = storyRef;
    if (sectionId === 'projects') targetRef = projectsRef;
    if (sectionId === 'team') targetRef = teamRef;
    if (sectionId === 'join') targetRef = joinRef;

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    }
  };

  // Extract unique categories for filtering
  const categories = ['All', ...Array.from(new Set(projectsData.map((p) => p.category)))];

  // Filter project instances
  const filteredProjects = selectedCategory === 'All'
    ? (projectsData as Project[])
    : (projectsData as Project[]).filter((p) => p.category === selectedCategory);

  const handleSubmitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Clear inputs
      setEmailInput('');
      setNameInput('');
    }, 4000);
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-[#060404] text-gray-100 font-sans selection:bg-red-500/30 selection:text-white relative overflow-x-hidden">
      
      {/* 3D Glass Tech Grid overlay */}
      <div className="absolute inset-0 grid-lines opacity-[0.06] pointer-events-none z-0" />

      {/* Crimson Ambient Blur Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] red-glow-blob bg-red-950/15 z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] red-glow-blob bg-red-900/10 z-0" />
      <div className="absolute bottom-[15%] left-[10%] w-[55vw] h-[55vw] red-glow-blob bg-red-950/20 z-0" />

      {/* LOADING ELEMENT CONTROLLER */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col min-h-screen justify-between"
          >
            {/* DYNAMIC ISLAND MINIMALIST HEADER BAR */}
            <DynamicIsland
              activeSection={activeSection}
              onNavigate={navigateToSection}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categories={categories}
              logoPath={GLOBAL_LOGO_PATH}
            />

            {/* MAIN PORTAL BODY CONTENT */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 space-y-36">
              
              {/* ================= HERO GRAPHIC SECTION ================= */}
              <section id="hero-section" className="min-h-[85vh] flex flex-col justify-center items-center text-center relative py-12 md:py-20 select-none">
                
                {/* Upper Status strip */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex flex-wrap items-center justify-center gap-3 mb-6"
                >
                  <span className="px-3 py-1 rounded-full bg-red-950/45 border border-red-500/25 text-[10px] font-mono tracking-widest text-red-400 font-bold shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                    ● CORE ARCHITECTURE ONLINE
                  </span>
                  
                  {/* Dynamic ticking system clock indicator */}
                  <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#120808] border border-red-950/50 text-[10px] font-mono text-gray-500">
                    <Clock size={11} className="text-red-500/60 animate-pulse" />
                    <span>{timeStr || 'LOADING SYSTEM CLOCK'}</span>
                  </span>
                </motion.div>

                {/* Primary display logo placeholder headings with uppercase pagkaki */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="max-w-4xl relative"
                >
                  {/* Absolute visual axis indicator decoration (Anti-AI-slop layout honesty) */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-transparent to-red-600/50" />
                  
                  <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-none pagkaki-heading tracking-tight">
                    PRINCIPAL <span className="shimmer-text">AXIS</span>
                  </h1>
                </motion.div>

                {/* Humble descriptive core tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-6 text-sm sm:text-base md:text-lg text-gray-400 tracking-wide font-sans font-light max-w-2xl leading-relaxed"
                >
                  STABILIZING DEVELOPER WORKFLOWS. TEEN-FOUNDED CORE PIPELINES. BUILT FROM ABSOLUTE SCRATCH TO SATISFY ZERO-CONFIG OPTIMIZATION STANDARDS.
                </motion.p>

                {/* Interactive Launch Buttons & Terminal metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
                >
                  <button
                    onClick={() => navigateToSection('projects')}
                    className="group flex items-center justify-center space-x-2.5 px-7 py-3 rounded-2xl bg-gradient-to-tr from-red-700 via-red-500 to-rose-400 hover:from-red-600 hover:to-rose-300 text-white font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_10px_25px_rgba(239,68,68,0.35)] hover:shadow-[0_12px_30px_rgba(239,68,68,0.5)] transform hover:-translate-y-0.5"
                  >
                    <span>EXPLORE REPOSITORIES</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => navigateToSection('story')}
                    className="px-7 py-3 rounded-2xl bg-[#140b0b]/60 border border-red-500/20 hover:border-red-500/50 text-gray-300 hover:text-white font-mono font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    READ OUR ORIGIN
                  </button>
                </motion.div>

                {/* Mini System Info summary (Pure Honest human indicators) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-4 flex items-center space-x-1.5 text-[10px] font-mono text-gray-500 hover:text-red-500/40 transition-colors pointer-events-auto cursor-default"
                >
                  <Cpu size={11} className="animate-pulse" />
                  <span>PLATFORM VERSION 1.12 // RED CORES VERIFIED</span>
                </motion.div>

              </section>

              {/* ================= OUR STORY TIMELINE SEC ================= */}
              <section id="story-section" ref={storyRef} className="scroll-mt-24 space-y-12 select-none relative">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-red-950/20 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">● FOUNDING GENESIS</span>
                    <h2 className="text-2xl md:text-4xl font-black text-white pagkaki-heading tracking-wide mt-1">
                      OUR STORY
                    </h2>
                  </div>
                  <p className="text-xs font-mono text-gray-500 mt-2 md:mt-0 italic">
                    COMPILING DISRUPTIVE LAB ENGINE IDEAS SINCE 2024
                  </p>
                </div>

                {/* Staggered Vertical Timeline */}
                <div className="relative max-w-4xl mx-auto pl-6 md:pl-0">
                  {/* Center line helper */}
                  <div className="absolute top-0 bottom-0 left-2.5 md:left-1/2 w-[1px] bg-red-950/40" />

                  <div className="space-y-16">
                    {(storyData as Milestone[]).map((milestone, idx) => {
                      const isEven = idx % 2 === 0;
                      return (
                        <motion.div
                          key={milestone.id}
                          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-100px' }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className={`relative flex flex-col md:flex-row items-stretch md:justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                        >
                          {/* Circle Dot node */}
                          <div className="absolute top-2 left-[-16px] md:left-1/2 md:ml-[-13px] z-10 w-[26px] h-[26px] rounded-full bg-[#0a0505] border-2 border-red-500 flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          </div>

                          {/* Detail Glass Card */}
                          <div className="w-full md:w-[46%] pl-4 md:pl-0">
                            <div className="glass-panel rounded-2xl p-6 glass-panel-hover relative">
                              <span className="absolute top-4 right-4 text-[9px] font-mono font-bold tracking-wider text-red-500/50 bg-red-500/5 px-2 py-0.5 rounded border border-red-950/40">
                                {milestone.badge}
                              </span>

                              <span className="text-[10px] font-mono text-red-400 font-bold tracking-wider block">
                                {milestone.date}
                              </span>
                              
                              <h3 className="text-lg font-black text-white pagkaki-heading tracking-wide mt-2">
                                {milestone.title}
                              </h3>
                              <p className="text-xs font-mono text-red-400/70 mt-0.5">{milestone.subtitle}</p>

                              <p className="text-xs text-gray-400 font-normal leading-relaxed mt-3.5 pl-3 border-l border-red-950/60">
                                {milestone.description}
                              </p>
                            </div>
                          </div>

                          {/* Visual blank spacing row for desktop rendering symmetry */}
                          <div className="hidden md:block w-[46%]" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              </section>

              {/* ================= OUR PROJECTS SEC ================= */}
              <section id="projects-section" ref={projectsRef} className="scroll-mt-24 space-y-12">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-red-950/20 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">● DISRUPTIVE SOFTWARE</span>
                    <h2 className="text-2xl md:text-4xl font-black text-white pagkaki-heading tracking-wide mt-1">
                      OUR PRODUCTS
                    </h2>
                  </div>

                  {/* Cat Filter selection tool with sliding underline */}
                  <div className="mt-4 md:mt-0 flex flex-wrap gap-1 bg-[#120808]/50 p-1 rounded-xl border border-red-950/40 max-w-full overflow-x-auto no-scrollbar">
                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                            isSelected 
                              ? 'bg-red-950/80 text-red-400 border border-red-500/20' 
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Staggered project cards grids backed by layout transitions */}
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      >
                        <ProjectCard
                          project={project}
                          onSelect={setSelectedProject}
                          logoPath={GLOBAL_LOGO_PATH}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

              </section>

              {/* ================= ABOUT THE TEAM SEC ================= */}
              <section id="team-section" ref={teamRef} className="scroll-mt-24 space-y-12 select-none">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-red-950/20 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">● THE MIND COUNCIL</span>
                    <h2 className="text-2xl md:text-4xl font-black text-white pagkaki-heading tracking-wide mt-1">
                      THE TEEN TEAM
                    </h2>
                  </div>
                  <p className="text-xs font-mono text-gray-500 mt-2 md:mt-0 italic">
                    CORE CONTRIBUTORS REWRITING WEB TRADITIONS
                  </p>
                </div>

                {/* Bento layout Team grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(teamData as TeamMember[]).map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5 }}
                      className="group glass-panel rounded-2xl overflow-hidden flex flex-col justify-between h-[420px] glass-panel-hover"
                    >
                      {/* Avatar container with decorative background */}
                      <div className="relative h-[190px] overflow-hidden border-b border-red-950/10 bg-black">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#100b0b] via-transparent to-transparent" />
                        
                        {/* Core Skill tag overlay */}
                        <div className="absolute bottom-3 left-4">
                          <span className="px-2.5 py-0.5 rounded bg-[#0a0505] border border-red-500/20 text-[9px] font-mono text-red-400 font-semibold tracking-wider">
                            {member.coreSkill.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Bio Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] font-mono text-red-500 font-bold tracking-widest">{member.role}</p>
                          <h3 className="text-base font-black text-white pagkaki-heading tracking-wide mt-1 flex items-center space-x-1">
                            <span>{member.name}</span>
                          </h3>
                          <p className="text-xs text-gray-400 mt-2.5 leading-relaxed font-sans font-light line-clamp-3">
                            {member.bio}
                          </p>
                        </div>

                        {/* Social rows and awards */}
                        <div className="pt-4 border-t border-red-950/10 flex items-center justify-between">
                          <span className="text-[9px] font-mono text-gray-500 font-bold tracking-widest leading-none">
                            FT: {member.featuredIn || 'HACKER NEWS'}
                          </span>

                          <div className="flex items-center space-x-3 text-gray-400">
                            {member.github && (
                              <a href={member.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                <Github size={14} />
                              </a>
                            )}
                            {member.twitter && (
                              <a href={member.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                <Twitter size={14} />
                              </a>
                            )}
                            {member.linkedin && (
                              <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                <Linkedin size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </section>

              {/* ================= JOIN THE DIVISION / WAITLIST SEC ================= */}
              <section id="join-section" ref={joinRef} className="scroll-mt-24 select-none">
                
                {/* Absolute Grid details decoration inside waitlist boundary */}
                <div className="relative max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl overflow-hidden shadow-2xl">
                  {/* Glowing core background accent */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full filter blur-[100px] pointer-events-none" />
                  
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    
                    {/* Intro column */}
                    <div className="space-y-4">
                      <span className="text-xs font-mono text-red-500 font-bold tracking-widest flex items-center space-x-1.5">
                        <Network size={12} />
                        <span>COHERENT COMMITS ONLY</span>
                      </span>
                      
                      <h2 className="text-2xl md:text-3xl font-black text-white pagkaki-heading tracking-wide">
                        JOIN THE ACCESS WAITLIST
                      </h2>
                      
                      <p className="text-xs text-gray-400 leading-relaxed font-light">
                        We periodically allocate sandbox nodes to external developers, student researchers, and design contributors. Drop your email to lock down alpha node allocation and receive our zero-boilerplate releases.
                      </p>

                      <div className="pt-2 flex flex-col space-y-2 text-[10px] font-mono text-red-500/40">
                        <div className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span>NO NEWSLETTER SPAM GUARANTEE</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span>VIRTUAL WORKSPACE NODE ACCESS</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive waitlist sign-up card inspired by SAZABI Layout */}
                    <div>
                      <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                          <motion.form
                            key="waitlist-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onSubmit={handleSubmitWaitlist}
                            className="space-y-4 bg-black/40 p-6 rounded-2xl border border-red-950/30"
                          >
                            <div>
                              <label className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                                First Name / Identity
                              </label>
                              <input
                                type="text"
                                required
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                placeholder="e.g. Abhi"
                                className="w-full bg-[#120808]/80 text-white placeholder-red-950 border border-red-950/40 rounded-xl px-4 py-2 text-xs font-mono focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/15 transition-all text-transform"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                                Secure Email Address
                              </label>
                              <input
                                type="email"
                                required
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="developer@principalaxis.dev"
                                className="w-full bg-[#120808]/80 text-white placeholder-red-950 border border-red-950/40 rounded-xl px-4 py-2 text-xs font-mono focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/15 transition-all"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full mt-2 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-tr from-red-700 to-red-500 hover:from-red-600 hover:to-rose-400 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[0_5px_15px_rgba(239,68,68,0.2)]"
                            >
                              <span>SUBMIT APPLICATION</span>
                              <Send size={11} />
                            </button>
                          </motion.form>
                        ) : (
                          <motion.div
                            key="waitlist-success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-red-950/10 border border-red-500/25 p-8 rounded-2xl text-center flex flex-col items-center justify-center min-h-[220px]"
                          >
                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mb-4 animate-bounce">
                              <CheckCircle size={22} />
                            </div>
                            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                              ALLOCATION REQUEST FILED
                            </h3>
                            <p className="text-[10px] font-mono text-red-400/70 max-w-xs mt-2 leading-relaxed">
                              Thank you, <span className="text-white font-bold">{nameInput || 'Guest'}</span>! We have queued your core request for priority compilation. Our teenagers will route access details to your mail node soon.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

              </section>

            </main>

            {/* ================= PROJECT MODAL CONTROLLER ================= */}
            <ProjectDetailModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              logoPath={GLOBAL_LOGO_PATH}
            />

            {/* ================= FOOTER ================= */}
            <footer className="w-full border-t border-red-950/20 py-8 bg-[#090505] relative z-20">
              <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-500">
                
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded bg-red-950/40 border border-red-500/20 flex items-center justify-center text-red-500 text-[10px]">
                    ▲
                  </div>
                  <span>PRINCIPAL AXIS © 2026 // EST. BY TEEN AGENTS</span>
                </div>

                <div className="flex items-center space-x-6">
                  <a href="#story-section" onClick={() => navigateToSection('story')} className="hover:text-red-400 transition-colors">OUR STORY</a>
                  <a href="#projects-section" onClick={() => navigateToSection('projects')} className="hover:text-red-400 transition-colors">PROJECTS</a>
                  <a href="#team-section" onClick={() => navigateToSection('team')} className="hover:text-red-400 transition-colors">CONTRIBUTORS</a>
                  <a href="mailto:abhinitinspace@gmail.com" className="hover:text-red-400 transition-colors flex items-center space-x-1">
                    <Mail size={9} />
                    <span>SECURE NODE</span>
                  </a>
                </div>

              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

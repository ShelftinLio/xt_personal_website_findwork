import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Cpu,
  Globe,
  Layers,
  MessageSquare,
  Send,
  ArrowUp,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Zap,
  Shield,
  Palette,
  Github,
  Twitter,
  Linkedin,
  X,
  GraduationCap,
  Briefcase,
  Trophy,
  Activity,
  Music,
  Lightbulb,
  Smartphone,
  Home,
  Database,
  BarChart3,
  Search,
  Users,
  FileText,
  Sparkles,
  ZapOff,
  Fingerprint,
  Code2,
  Terminal as TerminalIcon,
  Languages,
  Target,
  Clock,
  Layout,
  MousePointer2,
  BookOpen,
  Share2,
  Award,
  Heart,
  Mic2,
  Circle,
  Map as MapIcon,
  Calendar,
  MoveRight,
  Star,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { xiaotianSkillService } from './src/services/xiaotianSkillService';
import { MarkdownRenderer } from './src/components/MarkdownRenderer';
import { NoteEntry } from './src/data/notesKnowledgeBase';

// --- Types & Constants ---
const DARK_BG = "bg-[#050505]";
const CARD_BG = "bg-white/5 backdrop-blur-xl border border-white/10";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="text-xl font-bold tracking-tighter flex items-center gap-3">
        {/* LIO Logo SVG */}
        <div className="w-8 h-8 relative flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Ring Segment (Black) - Simulating the large circle arc behind L */}
            <path d="M 25,50 A 25,25 0 1,1 75,50 A 25,25 0 1,1 25,50" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" className="opacity-90" />
            
            {/* Left Circle (Cyan) with L */}
            <circle cx="30" cy="50" r="18" fill="#0ea5e9" /> {/* Sky blue/cyan base */}
            <path d="M 22,42 V 58 H 38" fill="none" stroke="black" strokeWidth="6" strokeLinecap="square" />
            
            {/* Middle I (Vertical Bar) */}
            <rect x="52" y="35" width="6" height="30" rx="1" fill="white" className="opacity-90" />
            
            {/* Right O (Ring) */}
            <circle cx="78" cy="50" r="12" fill="none" stroke="white" strokeWidth="6" className="opacity-90" />
          </svg>
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 font-medium">XIAOTIAN LIU</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] text-white/40">
        <a href="#experience" className="hover:text-white transition-colors">实习经历</a>
        <a href="#education" className="hover:text-white transition-colors">教育背景</a>
        <a href="#capabilities" className="hover:text-white transition-colors">核心能力</a>
        <a href="#insights" className="hover:text-white transition-colors">学习笔记</a>
        <button
          onClick={() => document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-5 py-2 rounded-full bg-white text-black text-[10px] hover:bg-emerald-400 transition-all duration-300"
        >
          AI 助手
        </button>
      </div>
    </div>
  </nav>
);

const TERMINAL_DATA = {
  summary: {
    cmd: "lio --whoami",
    output: [
      { type: 'info', content: "Loading user profile... Done." },
      { type: 'success', label: "ROLE", content: "产品经理实习生（AI / 硬件 / 智能出行）" },
      { type: 'text', content: "追求极致的产品理想主义者，用技术深度定义产品的灵魂与体验。" },
      { type: 'warning', label: "FOCUS", content: ["AI Native（原生 AI）", "3C 硬件", "智能出行"] },
      { type: 'dim', content: "可运行下方模块查看更多..." }
    ]
  },
  ai: {
    cmd: "lio --module ai native",
    output: [
      { type: 'info', content: "Initializing AI Core... Connected." },
      { type: 'success', label: "VISION", content: "让大模型真正服务真实业务与真实用户" },
      { type: 'text', content: "关注交互范式从 GUI 走向 LUI（语言交互），让产品更自然、更高效。" },
      { type: 'warning', label: "STACK", content: ["Prompt 工程", "RAG 系统", "Agent 工作流"] },
      { type: 'dim', content: "Ref: 蔚来 AI 平台相关实践" }
    ]
  },
  hardware: {
    cmd: "lio --module 3c-hardware",
    output: [
      { type: 'info', content: "Scanning hardware specs... Done." },
      { type: 'success', label: "DOMAIN", content: "手机与智能穿戴（产品定义与体验打磨）" },
      { type: 'text', content: "拒绝平庸，用细节与审美打磨硬件体验：从选型到定义，从方案到落地。" },
      { type: 'warning', label: "SKILLS", content: ["竞品洞察", "产品定义", "用户场景"] },
      { type: 'dim', content: "Ref: 魅族 手机事业部" }
    ]
  },
  mobility: {
    cmd: "lio --module smart-mobility",
    output: [
      { type: 'info', content: "Connecting to vehicle bus... Signal Strong." },
      { type: 'success', label: "ACADEMIC", content: "机械工程背景（西南交通大学）" },
      { type: 'text', content: "把工程严谨与产品体验结合：面向智能座舱与出行场景，追求可靠与好用。" },
      { type: 'warning', label: "EXP", content: ["蔚来 实习经历", "智能座舱", "车辆工程"] },
      { type: 'dim', content: "Ref: 多项车端相关实践与项目" }
    ]
  }
};

const Terminal = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'ai' | 'hardware' | 'mobility'>('summary');
  const [displayedLines, setDisplayedLines] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cmdText, setCmdText] = useState("");
  
  const currentData = TERMINAL_DATA[activeTab];

  useEffect(() => {
    let isMounted = true;
    
    const runSequence = async () => {
      if (!isMounted) return;
      setIsTyping(true);
      setDisplayedLines([]);
      setCmdText("");

      // Type command
      const cmd = currentData.cmd;
      for (let i = 0; i <= cmd.length; i++) {
        if (!isMounted) return;
        setCmdText(cmd.slice(0, i));
        await new Promise(r => setTimeout(r, 30 + Math.random() * 30));
      }

      await new Promise(r => setTimeout(r, 300));
      if (!isMounted) return;

      // Show output lines one by one
      const lines = currentData.output;
      for (let i = 0; i < lines.length; i++) {
        if (!isMounted) return;
        setDisplayedLines(prev => [...prev, lines[i]]);
        await new Promise(r => setTimeout(r, 150));
      }
      setIsTyping(false);
    };

    runSequence();
    
    return () => { isMounted = false; };
  }, [activeTab]);

  return (
    <div className="w-full max-w-3xl mx-auto perspective-1000">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-emerald-500/10 ring-1 ring-white/5"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase">lio-terminal — zsh — 80x24</div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Terminal Tabs */}
        <div className="flex border-b border-white/5 bg-black/20 overflow-x-auto scrollbar-hide">
          {[
            { id: 'summary', label: 'MAIN', icon: TerminalIcon },
            { id: 'ai', label: 'AI NATIVE', icon: Sparkles, color: 'text-purple-400' },
            { id: 'hardware', label: '3C HARDWARE', icon: Smartphone, color: 'text-blue-400' },
            { id: 'mobility', label: 'SMART MOBILITY', icon: Zap, color: 'text-amber-400' },
          ].map((tab: any) => (
            <button
              key={tab.id}
              onClick={() => !isTyping && setActiveTab(tab.id as any)}
              disabled={isTyping}
              className={`
                flex items-center gap-2 px-6 py-3 text-[10px] font-bold tracking-wider transition-all whitespace-nowrap
                ${activeTab === tab.id ? 'bg-white/10 text-white border-b-2 border-emerald-500' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}
                ${isTyping ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              `}
            >
              <tab.icon size={12} className={tab.color || ""} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 font-mono text-sm md:text-base min-h-[320px] bg-black/40">
          <div className="flex items-center gap-3 text-emerald-400 mb-4">
            <span className="text-blue-400">➜</span>
            <span className="text-pink-400">~</span>
            <span>{cmdText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2.5 h-5 bg-emerald-500 block"
            />
          </div>

          <div className="space-y-3">
            {displayedLines.map((line, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 leading-relaxed"
              >
                {line.label && (
                  <span className={`
                    shrink-0 text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider w-fit
                    ${line.type === 'success' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : ''}
                    ${line.type === 'warning' ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' : ''}
                    ${line.type === 'info' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : ''}
                  `}>
                    {line.label}
                  </span>
                )}
                
                <div className={`
                  ${line.type === 'dim' ? 'text-white/30 italic text-xs mt-1' : 'text-white/80'}
                  ${Array.isArray(line.content) ? 'flex flex-wrap gap-2' : ''}
                `}>
                  {Array.isArray(line.content) ? (
                    line.content.map((tag: string, i: number) => (
                      <span key={i} className="text-xs border border-white/10 px-2 py-1 rounded bg-white/5 text-white/70">
                        {tag}
                      </span>
                    ))
                  ) : (
                    line.content
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
      <div className="absolute inset-0 z-0 bg-[#080808]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-emerald-500/[0.04] blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-blue-500/[0.04] blur-[140px] rounded-full animate-pulse delay-700" />
        
        {/* Mesh Gradient Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen opacity-20 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen opacity-20 animate-pulse delay-1000" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>
      
      <motion.div 
        style={{ y: y1 }}
        className="relative z-10 w-full px-6 max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-[0.2em] text-emerald-400 mb-6 uppercase"
          >
            <Sparkles size={12} /> The Pursuit of Ultimate Quality
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-[1.1]"
          >
            XIAOTIAN LIU<br />真诚&效率至上的理想主义产品经理
          </motion.h1>
        </div>

        <Terminal />
      </motion.div>
    </section>
  );
};

const ExperienceItem = ({ company, role, period, details, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`${CARD_BG} p-10 rounded-[48px] group hover:border-${color}-500/50 transition-all duration-500`}
  >
    <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
      <div>
        <div className={`text-${color}-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-3 opacity-80`}>{period}</div>
        <h3 className="text-3xl font-bold text-white mb-1 tracking-tighter">{company}</h3>
        <p className="text-white/40 font-medium text-lg italic">{role}</p>
      </div>
    </div>
    <ul className="space-y-5">
      {details.map((d: string, i: number) => (
        <li key={i} className="text-sm text-white/30 leading-relaxed flex gap-4 group-hover:text-white/60 transition-colors duration-300">
          <span className={`text-${color}-400/60 mt-1`}>—</span>
          {d}
        </li>
      ))}
    </ul>
  </motion.div>
);

const RoadmapMilestone = ({ event, themeColor, popDirection = 'up' }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = event.icon;
  const isHighImpact = event.impact === 'high';
  const colorClass = themeColor === 'emerald' ? 'emerald' : 'blue';

  return (
    <div 
      className={`relative flex flex-col items-center justify-center ${isHighImpact ? 'min-w-[220px]' : 'min-w-[170px]'} h-full transition-all duration-500 group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node Marker */}
      <div className="relative z-20 flex flex-col items-center">
        {isHighImpact && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-[-10px] bg-amber-400/20 blur-lg rounded-full"
          />
        )}
        
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.4 : (isHighImpact ? 1.15 : 1),
            borderColor: isHovered 
              ? (themeColor === 'emerald' ? '#34d399' : '#60a5fa') 
              : (isHighImpact ? '#fbbf24' : 'rgba(255,255,255,0.2)')
          }}
          className={`relative w-3.5 h-3.5 rounded-full bg-black border-2 transition-all duration-300 cursor-pointer ${isHighImpact ? 'shadow-[0_0_12px_rgba(251,191,36,0.4)]' : ''}`}
        >
          {isHighImpact && (
             <Star className={`absolute ${popDirection === 'up' ? '-top-5' : '-bottom-5'} left-1/2 -translate-x-1/2 text-amber-400`} size={10} fill="#fbbf24" />
          )}
        </motion.div>
      </div>

      {/* Label */}
      <div className={`absolute ${popDirection === 'up' ? 'top-[calc(50%+24px)]' : 'bottom-[calc(50%+24px)]'} text-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-40'}`}>
        <div className={`text-xs font-mono font-bold tracking-widest mb-2 ${isHighImpact ? 'text-amber-400/90' : 'text-white/40'}`}>
          {event.time}
        </div>
        <h4 className={`text-sm font-bold tracking-tight max-w-[160px] mx-auto leading-snug transition-colors ${isHighImpact ? 'text-amber-400' : 'text-white'}`}>
          {event.title}
        </h4>
      </div>

      {/* Detail Popover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: popDirection === 'up' ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: popDirection === 'up' ? 10 : -10, scale: 0.95 }}
            className={`absolute ${popDirection === 'up' ? 'bottom-[calc(50%+30px)]' : 'top-[calc(50%+30px)]'} z-40 w-[320px] pointer-events-none`}
          >
            <div className={`${CARD_BG} p-6 rounded-[24px] shadow-2xl border-${isHighImpact ? 'amber' : colorClass}-500/30 overflow-hidden`}>
              <div className="relative z-10">
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-${isHighImpact ? 'amber' : colorClass}-400 mb-4`}>
                  <Icon size={16} />
                </div>
                <h5 className={`text-base font-bold mb-2 tracking-tight leading-tight ${isHighImpact ? 'text-amber-400' : 'text-white'}`}>{event.title}</h5>
                <p className="text-sm text-white/60 font-light leading-relaxed">{event.subtitle}</p>
              </div>
              {isHighImpact && (
                <div className="absolute top-0 right-0 p-4 opacity-5 text-amber-400">
                   <Trophy size={40} />
                </div>
              )}
            </div>
            {/* Symmetrical Arrow */}
            <div className={`w-3 h-3 bg-[#0a0a0a] border-r border-b border-white/10 rotate-45 mx-auto ${popDirection === 'up' ? '-mt-1.5' : '-mb-1.5 -translate-y-[calc(100%+35px)] rotate-[225deg]'}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EducationSection = () => {
  const umEvents = [
    { time: "2025.06", title: "研究论文发表", subtitle: "《面向精准调控的负荷聚合商响应性能评价与市场出清方法》，第一作者，北大核心期刊", icon: BookOpen, impact: 'high' },
    { time: "2025.07", title: "腾讯产品创造营", subtitle: "腾讯未来产品经理创造营，深入探索 AI 时代下的产品 definition 与用户增长策略", icon: Target },
    { time: "2024.11", title: "“丝路”智能量测赛决赛三等奖", subtitle: "决赛三等奖，基于物联网数据的智能量测开发生态应用探索", icon: Trophy },
    { time: "2024.10", title: "“挑战杯”大学生创业计划竞赛国家铜奖", subtitle: "第十四届“挑战杯”秦创原中国大学生创业计划竞赛全国铜奖", icon: Award, impact: 'high' },
    { time: "2024.08", title: "澳门大学研究生会监事会监事", subtitle: "参与校级研究生组织合规监督与治理工作", icon: Shield },
    { time: "2023.11", title: "格兰披治元宇宙自动驾驶挑战赛第二名", subtitle: "格兰披治元宇宙自动驾驶挑战赛 (Macau Grand Prix) 全国第二名", icon: Cpu },
    { time: "2023.10", title: "“挑战杯”全国大学生课外学术科技作品竞赛国家一等奖", subtitle: "第十八届“挑战杯”全国大学生课外学术科技作品竞赛，全国一等奖", icon: Award, impact: 'high' }
  ];

  const swjtuEvents = [
    { time: "2023.06", title: "西南交大“优秀毕业生”", subtitle: "四年学业圆满完成，获得学校最高综合素质荣誉“优秀毕业生”", icon: GraduationCap },
    { time: "2023.05", title: "世界大学生运动会志愿者", subtitle: "成都第31届世界大学生夏季运动会官方志愿服务", icon: Heart },
    { time: "2022.06", title: "机械创新设计大赛国二", subtitle: "第九届全国大学生机械创新设计大赛二等奖，展示卓越的机械电子创新能力", icon: Lightbulb, impact: 'high' },
    { time: "2021.09", title: "青协协会会长", subtitle: "统筹学院青年志愿者协会工作，组织多项社会公益活动", icon: Users },
    { time: "2021.03", title: "校园十佳歌手", subtitle: "在西南交通大学校园十佳歌手大赛中获此荣誉", icon: Mic2 },
    { time: "2019.09", title: "班级班长", subtitle: "入学即担任班长，连续四年带领班级获得“特色班集体”称号", icon: Users }
  ];

  return (
    <section id="education" className="py-24 bg-[#020202] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-400/5 text-[10px] font-bold tracking-[0.3em] text-blue-400 mb-6 uppercase">
              <GraduationCap size={12} /> Education Background
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              教育背景
            </h2>
            <p className="text-white/30 text-sm md:text-base font-light max-w-xl">
              从机械电子的严谨基座，到物联网与 AI 前沿的跨代跃迁。金色标记代表核心学术荣誉。
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold text-white/10 tracking-widest uppercase pb-2">
            Horizontal Scroll <ChevronRight size={14} className="animate-pulse" />
          </div>
        </div>
      </div>

      <div className="relative w-full space-y-4">
        {/* Track 1: UM - Cards pop UP */}
        <div className="relative w-full overflow-x-auto custom-scrollbar-h">
          <div className="flex h-[340px] w-max items-center px-12 relative pt-20">
            {/* Guide Line */}
            <div className="absolute top-[210px] left-0 right-0 h-[1px] bg-emerald-500/10 z-0" />
            <div className="absolute top-[210px] left-0 right-0 h-[1px] bg-gradient-to-r from-emerald-500/20 via-emerald-400/5 to-transparent z-10" />
            
            <div className="sticky left-0 z-30 pr-12 translate-y-[20px]">
              <div className="px-6 py-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-xl min-w-[260px]">
                <h3 className="text-xl font-black tracking-tight text-emerald-400 uppercase">University of Macau</h3>
                <p className="text-[11px] text-white/80 font-bold tracking-tight">澳门大学</p>
                <div className="h-px w-8 bg-emerald-500/30 my-2" />
                <p className="text-[9px] text-white/30 font-bold tracking-[0.2em] uppercase">Master of IoT | 物联网硕士</p>
              </div>
              <div className="absolute top-1/2 right-0 w-12 h-px bg-emerald-500/10" />
            </div>

            <div className="flex h-full items-center pl-4">
              {umEvents.map((event, i) => (
                <RoadmapMilestone key={i} event={event} themeColor="emerald" popDirection="up" />
              ))}
            </div>
          </div>
        </div>

        {/* Dense Connection Bridge */}
        <div className="px-12 opacity-[0.03] -my-10 h-24 flex items-center">
           <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>

        {/* Track 2: SWJTU - Cards pop DOWN */}
        <div className="relative w-full overflow-x-auto custom-scrollbar-h">
          <div className="flex h-[340px] w-max items-center px-12 relative pb-20">
            {/* Guide Line */}
            <div className="absolute top-[130px] left-0 right-0 h-[1px] bg-blue-500/10 z-0" />
            <div className="absolute top-[130px] left-0 right-0 h-[1px] bg-gradient-to-r from-blue-500/20 via-blue-400/5 to-transparent z-10" />
            
            <div className="sticky left-0 z-30 pr-12 -translate-y-[20px]">
              <div className="px-6 py-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 backdrop-blur-xl min-w-[260px]">
                <h3 className="text-xl font-black tracking-tight text-blue-400 uppercase">Southwest Jiaotong</h3>
                <p className="text-[11px] text-white/80 font-bold tracking-tight">西南交通大学</p>
                <div className="h-px w-8 bg-blue-500/30 my-2" />
                <p className="text-[9px] text-white/30 font-bold tracking-[0.2em] uppercase">Traffic Equipment and Control Eng.</p>
                <p className="text-[9px] text-white/20 font-medium">交通设备与控制工程学士</p>
              </div>
              <div className="absolute top-1/2 right-0 w-12 h-px bg-blue-500/10" />
            </div>

            <div className="flex h-full items-center pl-4">
              {swjtuEvents.map((event, i) => (
                <RoadmapMilestone key={i} event={event} themeColor="blue" popDirection="down" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar-h::-webkit-scrollbar {
          height: 1px;
        }
        .custom-scrollbar-h::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-h::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar-h:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

const InsightsSection = () => {
  const notes = [
    { 
      title: "一文读懂RAG基础架构", 
      category: "RAG", 
      date: "2025/10/11",
      day: "Day 42/100",
      description: "Naive RAG 的核心三阶段：索引-检索-生成。深度解析 RAG 在大模型应用中的落地逻辑。",
      icon: <Database size={18} />,
      link: "https://www.xiaohongshu.com/discovery/item/68e0ee650000000005012a3a"
    },
    { 
      title: "AI智能体的“内存管理”艺术", 
      category: "Agent", 
      date: "2025/9/10",
      day: "Day 41/100",
      description: "探讨 AI 智能体的上下文工程策略，包括截断、总结与精准内存管理方案。",
      icon: <Cpu size={18} />,
      link: "https://www.xiaohongshu.com/discovery/item/68e0ee650000000005012a3a"
    },
    { 
      title: "十三种 Prompt 基本技巧", 
      category: "Prompt", 
      date: "2025/9/8",
      day: "Day 39/100",
      description: "系统梳理提示词工程的核心方法论，从 Few-shot 到 CoT 的实战进化路。",
      icon: <MessageSquare size={18} />,
      link: "https://www.xiaohongshu.com/discovery/item/68daa8de000000001302829b"
    },
    { 
      title: "Transformer 架构流程拆解", 
      category: "NLP", 
      date: "2025/8/31",
      day: "Day 31/100",
      description: "深度拆解 Transformer 架构，剖析 Encoder-Decoder 机制与注意力机制的底层数学逻辑。",
      icon: <Layers size={18} />,
      link: "https://www.xiaohongshu.com/discovery/item/68c0b059000000001d027a97"
    },
    { 
      title: "机器学习 决策树与随机森林", 
      category: "ML", 
      date: "2025/8/19",
      day: "Day 19/100",
      description: "回归基础，理解机器学习中分类问题的核心模型——决策树与集成学习。 ",
      icon: <BarChart3 size={18} />,
      link: "https://www.xiaohongshu.com/discovery/item/68a4b5bf000000001c01384f"
    },
    { 
      title: "Python 编程基础：面向对象篇", 
      category: "Python", 
      date: "2025/8/13",
      day: "Day 13/100",
      description: "Python 虚拟环境搭建与 OOP 编程范式，为 AI 开发构建坚实的工程底座。",
      icon: <TerminalIcon size={18} />,
      link: "https://www.xiaohongshu.com/discovery/item/689cb2bb000000001d025b2f"
    },
    { 
      title: "AI 主要任务与应用场景", 
      category: "General", 
      date: "2025/8/10",
      day: "Day 10/100",
      description: "全景式扫描人工智能应用领域，定义 AI 产品经理的通识知识边界。",
      icon: <Globe size={18} />,
      link: "https://www.xiaohongshu.com/discovery/item/6898c630000000002302ef88"
    },
    { 
      title: "产品与用户需求：洞察逻辑", 
      category: "Product", 
      date: "2025/8/2",
      day: "Day 2/100",
      description: "回归产品原点，探讨如何从海量用户反馈中提炼真需求，拒绝伪命题。",
      icon: <Lightbulb size={18} />,
      link: "https://www.xiaohongshu.com/discovery/item/688dfa3f000000002301b4cc"
    }
  ];

  return (
    <section id="insights" className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-pink-400/20 bg-pink-400/5 text-[10px] font-bold tracking-[0.3em] text-pink-400 mb-6 uppercase">
              <BookOpen size={12} /> Learning Insights
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
              学习笔记
            </h2>
            <p className="text-white/30 font-light max-w-xl">
              我在小红书同步分享《100 天成为 AI 产品经理》系列笔记，记录关于大模型、RAG 及 product 方法论的深度思考。
            </p>
          </div>
          <div className="flex gap-4">
            <a href="https://www.xiaohongshu.com" target="_blank" className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-emerald-400 transition-colors">
              Follow on Red <Share2 size={14} />
            </a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {notes.map((note, idx) => (
            <motion.a 
              key={idx}
              href={note.link}
              target="_blank"
              whileHover={{ y: -5 }}
              className={`${CARD_BG} p-8 rounded-[40px] flex flex-col justify-between group transition-all duration-500`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-emerald-400 transition-colors">
                    {note.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-[9px] font-bold tracking-wider text-white/30 uppercase group-hover:text-white/60 transition-colors">
                      {note.category}
                    </span>
                    <span className="text-[8px] font-mono text-emerald-400/50 uppercase tracking-tighter">{note.day}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-emerald-400 transition-colors">{note.title}</h3>
                <p className="text-xs text-white/30 leading-relaxed font-light mb-6 line-clamp-3">{note.description}</p>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-white/10 group-hover:text-white/20 transition-colors">
                <span>{note.date}</span>
                <ExternalLink size={12} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const InterviewScene = () => {
  const [messages, setMessages] = useState<Array<{role: 'lio' | 'hr', content: string}>>([
    { role: 'lio', content: "你好！我是刘小天(Lio)的 AI 助手 🤖。我对他的经历烂熟于心，您可以问我任何关于他的问题！" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const recommendedQuestions = [
    "如何评估 RAG 系统的检索质量？",
    "在 Prompt Engineering 中有哪些优化技巧？",
    "你是如何搭建企业级知识库的？",
    "如何通过数据埋点优化产品转化率？",
    "介绍一下你对 Agentic Workflow 的理解",
    "你在 PRD 撰写中如何确保逻辑闭环？",
    "能详细介绍一下在蔚来的实习经历吗？",
    "为什么选择从机械工程转行做产品？"
  ];

  const isOffTopicQuestion = (text: string) => {
    const t = text.trim().toLowerCase();
    const patterns: RegExp[] = [
      /(天气|温度|气温|下雨|降雨|晴天|台风|湿度|weather|temperature|forecast|rain)/i,
      /(女朋友|男朋友|对象|恋爱|感情|婚姻|结婚|单身|girlfriend|boyfriend|relationship)/i,
      /(今天(的)?天气|what'?s the weather|天气如何)/i,
      /(几点|现在(是)?(什么)?时间|今天几号|星期几|date|day of week|what time)/i,
    ];
    return patterns.some((p) => p.test(t));
  };

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages(prev => [...prev, { role: 'hr', content: trimmed }]);
    setInputValue("");

    if (isOffTopicQuestion(trimmed)) {
      setMessages(prev => [
        ...prev,
        {
          role: 'lio',
          content:
            "这个问题可能与刘小天的求职/项目/技能无关，我就不展开啦。你可以问我：他的实习经历、RAG 项目、产品方法论、获奖科研、或 100 天学习笔记等。"
        }
      ]);
      return;
    }

    setIsTyping(true);
    // Add temporary thinking state with calming message
    setMessages(prev => [...prev, { role: 'lio', content: "_正在深度思考中，请稍候... (Thinking deeply, please wait a moment...)_" }]);

    try {
      const response = await xiaotianSkillService.chat(trimmed);
      // Replace thinking message with actual response
      setMessages(prev => {
        const newMessages = [...prev];
        // Ensure we are replacing the last message which is the thinking state
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'lio') {
           newMessages[newMessages.length - 1] = { role: 'lio', content: response.answer };
        } else {
           newMessages.push({ role: 'lio', content: response.answer });
        }
        return newMessages;
      });
    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'lio') {
           newMessages[newMessages.length - 1] = { role: 'lio', content: "抱歉，我刚刚走神了，能再说一遍吗？" };
        }
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <section id="ai-chat" className="py-12 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 text-[10px] font-bold tracking-[0.3em] text-emerald-400 mb-4 uppercase">
            <Sparkles size={12} /> Interactive Interview
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
            AI 替我答
          </h2>
          <p className="text-white/30 text-sm md:text-base font-light">
            像玩游戏一样，与我的 AI 数字分身进行一场深度对话吧
          </p>
        </div>

        {/* Game Scene Container */}
        <div className="relative h-[65vh] min-h-[500px] max-h-[700px] w-full flex justify-between items-end gap-4 md:gap-10">
          
          {/* Lio (Left) */}
          <div className="hidden md:flex flex-col items-center justify-end w-1/4 h-full relative z-20 pointer-events-none">
             {/* Lio's Character Image */}
             <motion.img 
               src="/Lio.png" 
               alt="Lio Avatar" 
               className="w-full max-w-[280px] object-contain drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]"
               initial={{ x: -100, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.8 }}
             />
          </div>

          {/* Chat Area (Center) */}
          <div className="flex-1 h-full flex flex-col relative z-30 max-w-2xl mx-auto w-full">
            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6 mb-4 mask-gradient-top"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === 'hr' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[85%] md:max-w-[80%] p-5 rounded-3xl text-sm md:text-base leading-relaxed relative shadow-lg
                    ${msg.role === 'hr' 
                      ? 'bg-white text-gray-900 font-medium rounded-br-sm mr-2' 
                      : 'bg-[#1a1a1a] border border-white/10 text-white/90 rounded-bl-sm ml-2'
                    }
                  `}>
                    {/* Role Label */}
                    <div className={`
                      absolute -top-6 text-[10px] font-bold tracking-widest uppercase opacity-50
                      ${msg.role === 'hr' ? 'right-0 text-white' : 'left-0 text-white'}
                    `}>
                      {msg.role === 'hr' ? 'Interviewer (HR)' : 'Lio (AI Candidate)'}
                    </div>
                    
                    {/* Bubble Tail */}
                    <div className={`
                      absolute bottom-0 w-4 h-4 
                      ${msg.role === 'hr' 
                        ? '-right-2 bg-white [clip-path:polygon(0_0,0%_100%,100%_100%)]' 
                        : '-left-2 bg-[#1a1a1a] border-l border-b border-white/10 [clip-path:polygon(100%_0,0%_100%,100%_100%)]'
                      }
                    `} />
                    
                    <MarkdownRenderer content={msg.content} variant={msg.role === 'hr' ? 'dark' : 'light'} />
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] border border-white/10 p-4 rounded-3xl rounded-bl-sm ml-2 flex gap-2 items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
            </div>

            {/* Controls Area */}
            <div className="mt-auto">
              {/* Recommended Questions (Only show initially) */}
              {messages.length === 1 && !isTyping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {recommendedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 text-xs md:text-sm text-left transition-all text-white/60 hover:text-white"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  placeholder="向 Lio 提问..."
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 top-2 p-2 bg-emerald-500 rounded-xl text-black hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowUp size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* HR (Right) */}
          <div className="hidden md:flex flex-col items-center justify-end w-1/4 h-full relative z-20 pointer-events-none">
             {/* HR's Character Image */}
             <motion.img 
               src="/HR.png" 
               alt="HR Avatar" 
               className="w-full max-w-[280px] object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
               initial={{ x: 100, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.8 }}
             />
          </div>
        </div>
      </div>
    </section>
  );
};

const CapabilitiesSection = () => (
  <section id="capabilities" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="mb-24">
      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-400/5 text-[10px] font-bold tracking-[0.3em] text-amber-400 mb-6 uppercase">
        <Lightbulb size={12} /> Core Capabilities
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
        核心能力
      </h2>
      <p className="text-white/30 max-w-2xl font-light leading-relaxed">
        将深厚的技术底座与敏锐的产品感知相结合，打造具备灵魂的软硬件一体化体验。
      </p>
    </div>

    {/* Primary Vision & Insight Cards */}
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <div className={`${CARD_BG} p-10 rounded-[48px] group hover:border-emerald-400/50 transition-all duration-500`}>
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8 group-hover:scale-110 transition-transform"><Smartphone size={28} /></div>
        <h3 className="text-xl font-bold mb-4">3C 数码精品定义</h3>
        <p className="text-sm text-white/40 leading-relaxed font-light">
          深度参与头部品牌机型定义，擅长多维竞品对标，追求每一处硬件选型与工业设计的极致和谐。
        </p>
      </div>
      <div className={`${CARD_BG} p-10 rounded-[48px] group hover:border-blue-400/50 transition-all duration-500`}>
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform"><Fingerprint size={28} /></div>
        <h3 className="text-xl font-bold mb-4">产品感知与交互</h3>
        <p className="text-sm text-white/40 leading-relaxed font-light">
          从底层逻辑出发，构建直觉式交互体系，将复杂的技术内核转化为有温度、可触达的用户感知。
        </p>
      </div>
      <div className={`${CARD_BG} p-10 rounded-[48px] group hover:border-purple-400/50 transition-all duration-500`}>
        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 transition-transform"><BarChart3 size={28} /></div>
        <h3 className="text-xl font-bold mb-4">数据驱动与物联网洞察</h3>
        <p className="text-sm text-white/40 leading-relaxed font-light">
          依托物联网数据背景，通过理性的视角洞察用户行为逻辑，为产品决策提供坚实的数据支撑。
        </p>
      </div>
    </div>

    {/* Technical Deep Dives (AI, Data, Tools) */}
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <div className={`${CARD_BG} p-12 rounded-[56px] border-white/5 relative overflow-hidden group`}>
        <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity"><Zap size={100} /></div>
        <h4 className="text-[10px] font-bold tracking-[0.3em] text-emerald-400 uppercase mb-4">AI Proficiency</h4>
        <h3 className="text-2xl font-bold mb-6">AI 敏捷开发能力</h3>
        <p className="text-sm text-white/40 leading-relaxed mb-8 max-w-lg">
          擅长基于 Coze/Dify 快速搭建 Agentic RAG、ChatBI 等 MVP。深入理解 Prompt Engineering 与模型评估，具备企业内知识库搭建实战经验。
        </p>
        <div className="flex flex-wrap gap-2">
          {['RAG', 'Prompt', 'Agent', 'ML/DL', 'Model Evaluation'].map(s => (
            <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-white/30 font-mono group-hover:text-emerald-400 transition-colors">{s}</span>
          ))}
        </div>
      </div>
      <div className={`${CARD_BG} p-12 rounded-[56px] border-white/5 relative overflow-hidden group`}>
        <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity"><Palette size={100} /></div>
        <h4 className="text-[10px] font-bold tracking-[0.3em] text-amber-400 uppercase mb-4">Design & Efficiency</h4>
        <h3 className="text-2xl font-bold mb-6">原型美学与文档工匠</h3>
        <p className="text-sm text-white/40 leading-relaxed mb-8 max-w-lg">
          熟练掌握 Axure、Figma、墨刀。在 PRD 与原型设计中极度追求逻辑清晰与视觉美感，擅长优化复杂业务流并确保从 0 到 1 的 high-quality 落地。
        </p>
        <div className="flex flex-wrap gap-2">
          {['Axure', 'Figma', 'XMind', 'Visio', 'SQL/Python'].map(s => (
            <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-white/30 font-mono group-hover:text-amber-400 transition-colors">{s}</span>
          ))}
        </div>
      </div>
    </div>

    {/* Honors & Soft Skills Pills */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className={`${CARD_BG} p-8 rounded-[40px] text-center hover:border-emerald-500/30 transition-all`}>
        <div className="text-3xl font-bold text-emerald-400 mb-1">40+</div>
        <div className="text-[10px] text-white/20 font-bold tracking-widest">专业 PRD 文档</div>
      </div>
      <div className={`${CARD_BG} p-8 rounded-[40px] text-center hover:border-blue-500/30 transition-all`}>
        <div className="text-3xl font-bold text-blue-400 mb-1">IELTS 6.0</div>
        <div className="text-[10px] text-white/20 font-bold tracking-widest">英语流利沟通</div>
      </div>
      <div className={`${CARD_BG} p-8 rounded-[40px] text-center hover:border-red-500/30 transition-all`}>
        <div className="text-3xl font-bold text-red-400 mb-1">National 1st</div>
        <div className="text-[10px] text-white/20 font-bold tracking-widest">挑战杯国家级奖项</div>
      </div>
      <div className={`${CARD_BG} p-8 rounded-[40px] text-center hover:border-purple-500/30 transition-all`}>
        <div className="text-3xl font-bold text-purple-400 mb-1">National 2st</div>
        <div className="text-[10px] text-white/20 font-bold tracking-widest">机械创新与设计大赛</div>
      </div>
    </div>
  </section>
);

const App = () => {
  return (
    <div className={`min-h-screen ${DARK_BG} text-white font-sans selection:bg-emerald-500/30`}>
      <Navbar />
      
      <main>
        <Hero />

        {/* Career Experience */}
        <section id="experience" className="py-32 px-6 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/5 text-[10px] font-bold tracking-[0.3em] text-purple-400 mb-6 uppercase">
                  <Briefcase size={12} /> Professional Experience
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                  实习经历
                </h2>
                <p className="text-white/30 text-lg font-light">在顶级平台中，将理想转化为可见的产品价值</p>
              </div>
              <div className="px-6 py-2 rounded-full border border-white/5 text-[10px] text-white/20 font-mono tracking-widest uppercase">Methodology_Driven</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <ExperienceItem 
                company="魅族科技 (Meizu)"
                role="整机产品经理实习生 · 手机方向"
                period="2025.09 - 至今"
                color="blue"
                details={[
                  "深度拆解小米、Vivo 等头部品牌机型，从硬件选型到市场定价输出全维度竞品报告。",
                  "主导新机型软件功能需求梳理，负责核心卖点 PRD 撰写，协调跨部门技术评审。",
                  "参与硬件可行性评估，确保新品定义在技术实现与市场竞争力之间达到平衡。"
                ]}
              />
              <ExperienceItem 
                company="蔚来汽车 (NIO)"
                role="产品经理实习生 · 互联互通和加电方向"
                period="2025.01 - 2025.07"
                color="emerald"
                details={[
                  "策划并落地智能客服 RAG 方案，系统性提升外部合作方接入效率，人工替代率 70%。",
                  "主导加电 APP 用户增长组件迭代，通过 A/B 测试验证，实现次月会员 GMV 增长 22%。",
                  "负责互联互通协议对接与链路优化，打通跨平台充电数据闭环，大幅提升多场景下的连接成功率。"
                ]}
              />
              <ExperienceItem 
                company="京东集团 (JD)"
                role="产品经理实习生 · 搜索推荐场域"
                period="2024.07 - 2024.10"
                color="red"
                details={[
                  "负责京东 App 热搜榜功能优化，通过引入直播与热度值模块显著提升场域流量转化。",
                  "主导搜索模块埋点方案设计，规范化数据上报逻辑，提升指标监控的精度与响应速度。"
                ]}
              />
              <ExperienceItem 
                company="百威中国 (Budweiser)"
                role="产品经理实习生 · 数据平台"
                period="2023.06 - 2023.09"
                color="amber"
                details={[
                  "主导线上商城业务指标体系构建，推动 Algo Selling BI 产品在 ABI 猎豹平台的落地。",
                  "执行交易系统数据资产治理，整合核心数据链条，建立售点唯一 ID 基础架构。"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Dual-Track Education Roadmap Section */}
        <EducationSection />

        {/* Unified Capabilities Section */}
        <CapabilitiesSection />

        {/* Insights Section - Learning Notes */}
        <InsightsSection />

        <InterviewScene />

        {/* Footer */}
        <footer className="py-32 px-6 border-t border-white/5 relative bg-black">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
            <div className="max-w-md">
              <h3 className="text-6xl font-bold mb-6 tracking-tighter">LIU<br />XIAOTIAN</h3>
              <p className="text-white/20 mb-10 font-light italic leading-relaxed">
                "Defining product soul through technical depth and perception."
              </p>
              <div className="flex gap-10">
                <a href="https://github.com/ShelftinLio" className="text-white/20 hover:text-emerald-400 transition-colors duration-500"><Github size={28} /></a>
                <a href="mailto:173967285@qq.com" className="text-white/20 hover:text-emerald-400 transition-colors duration-500"><Send size={28} /></a>
              </div>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] text-white/10 mb-5 uppercase tracking-[0.5em] font-bold">Idealistic Product Manager Intern</p>
              <a 
                href="mailto:173967285@qq.com" 
                className="text-4xl md:text-7xl font-bold tracking-tighter hover:text-emerald-400 transition-all duration-700 block mb-4"
              >
                173967285@QQ.COM
              </a>
              <p className="text-white/10 text-xs font-mono">173967285@QQ.COM</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between text-[10px] tracking-[0.3em] text-white/10 uppercase font-bold">
            <p>© 2025 LIU XIAOTIAN (LIO) · PRODUCT MANAGER INTERN</p>
            <p>DESIGNED FOR PERCEPTION & INNOVATION · CHENGDU / MACAU</p>
          </div>
        </footer>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
        body {
          cursor: default;
          letter-spacing: -0.01em;
        }
        a, button {
          cursor: pointer;
        }
        ::selection {
          background: rgba(52, 211, 153, 0.2);
          color: white;
        }
      `}</style>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

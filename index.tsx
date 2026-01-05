import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Cpu,
  Globe,
  Layers,
  MessageSquare,
  Send,
  ExternalLink,
  ChevronRight,
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
  Terminal,
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
  Star
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { xiaotianSkillService } from './src/services/xiaotianSkillService';
import { MarkdownRenderer } from './src/components/MarkdownRenderer';

// --- Types & Constants ---
const DARK_BG = "bg-[#050505]";
const CARD_BG = "bg-white/5 backdrop-blur-xl border border-white/10";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-full shadow-lg shadow-emerald-500/20" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 font-medium">XIAOTIAN LIU</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase">
        <a href="#experience" className="hover:text-white transition-colors">Experience</a>
        <a href="#education" className="hover:text-white transition-colors">Education</a>
        <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
        <a href="#insights" className="hover:text-white transition-colors">Insights</a>
        <button 
          onClick={() => document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-5 py-2 rounded-full bg-white text-black text-[10px] hover:bg-emerald-400 transition-all duration-300"
        >
          AI CONSULTANT
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-[0.2em] text-emerald-400 mb-8 uppercase"
        >
          <Sparkles size={12} /> The Pursuit of Ultimate Quality
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-[1.1]"
        >
          追求极致<br />定义产品的本色
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-3xl mx-auto text-lg md:text-xl text-white/40 leading-relaxed font-light"
        >
          在 3C 数码、物联网以及 AI 驱动的智能终端 方向，我拒绝平庸的堆砌，坚持理想主义的产品审美。<br className="hidden md:block" />
          通过对底层逻辑的深度挖掘与对 AI 原生产品范式 的探索，将技术确定性打磨为触达灵魂的产品感知。
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center gap-5"
        >
          <a href="#ai-chat" className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:bg-emerald-400 transition-all text-sm tracking-tight">关于 Lio</a>
          <a href="#experience" className="px-10 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all backdrop-blur-sm text-sm tracking-tight">简历</a>
        </motion.div>
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
        <div className={`text-[8px] font-mono font-bold tracking-widest mb-1 ${isHighImpact ? 'text-amber-400/80' : 'text-white/30'}`}>
          {event.time}
        </div>
        <h4 className={`text-[10px] font-bold tracking-tight max-w-[130px] mx-auto leading-tight transition-colors ${isHighImpact ? 'text-amber-400' : 'text-white'}`}>
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
            className={`absolute ${popDirection === 'up' ? 'bottom-[calc(50%+30px)]' : 'top-[calc(50%+30px)]'} z-40 w-[280px] pointer-events-none`}
          >
            <div className={`${CARD_BG} p-5 rounded-[24px] shadow-2xl border-${isHighImpact ? 'amber' : colorClass}-500/30 overflow-hidden`}>
              <div className="relative z-10">
                <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-${isHighImpact ? 'amber' : colorClass}-400 mb-3`}>
                  <Icon size={14} />
                </div>
                <h5 className={`text-[13px] font-bold mb-1.5 tracking-tight leading-tight ${isHighImpact ? 'text-amber-400' : 'text-white'}`}>{event.title}</h5>
                <p className="text-[11px] text-white/50 font-light leading-relaxed">{event.subtitle}</p>
              </div>
              {isHighImpact && (
                <div className="absolute top-0 right-0 p-4 opacity-5 text-amber-400">
                   <Trophy size={32} />
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
    { time: "2025.06", title: "研究论文发表", subtitle: "《面向精准调控的负荷聚合商响应性能评价与市场出清方法》，第一作者，发表于北大核心《电力系统保护与控制》", icon: BookOpen, impact: 'high' },
    { time: "2025.07", title: "腾讯产品创造营", subtitle: "腾讯未来产品经理创造营，深入探索 AI 时代下的产品 definition 与用户增长策略", icon: Target },
    { time: "2024.11", title: "“丝路”智能量测赛", subtitle: "决赛三等奖，基于物联网数据的智能量测开发生态应用探索", icon: Trophy },
    { time: "2024.10", title: "“挑战杯”创业赛国铜", subtitle: "第十四届“挑战杯”秦创原中国大学生创业计划竞赛全国铜奖", icon: Award },
    { time: "2024.08", title: "研究生会监事会监事", subtitle: "参与校级研究生组织合规监督与治理工作", icon: Shield },
    { time: "2023.11", title: "自动驾驶赛全国第2", subtitle: "格兰披治元宇宙自动驾驶挑战赛 (Macau Grand Prix) 全国第二名", icon: Cpu },
    { time: "2023.10", title: "“挑战杯”学术赛国一", subtitle: "第十八届“挑战杯”全国大学生课外学术科技作品竞赛，全国一等奖", icon: Award, impact: 'high' }
  ];

  const swjtuEvents = [
    { time: "2023.06", title: "西南交大“优毕”", subtitle: "四年学业圆满完成，获得学校最高综合素质荣誉“优秀毕业生”", icon: GraduationCap },
    { time: "2023.05", title: "大运会志愿者", subtitle: "成都第31届世界大学生夏季运动会官方志愿服务", icon: Heart },
    { time: "2022.06", title: "机创设计大赛国二", subtitle: "第九届全国大学生机械创新设计大赛二等奖，展示卓越的机械电子创新能力", icon: Lightbulb, impact: 'high' },
    { time: "2021.09", title: "青协协会会长", subtitle: "统筹学院青年志愿者协会工作，组织多项社会公益活动", icon: Users },
    { time: "2021.03", title: "校园十佳歌手", subtitle: "在西南交通大学校园十佳歌手大赛中获此荣誉", icon: Mic2 },
    { time: "2019.09", title: "班级班长", subtitle: "入学即担任班长，连续四年带领班级获得“特色班集体”称号", icon: Users }
  ];

  return (
    <section id="education" className="py-24 bg-[#020202] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 text-[10px] font-bold tracking-[0.3em] text-emerald-400 mb-6 uppercase"
            >
              <MapIcon size={12} /> Academic Progression Path
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">学术进阶轨迹</h2>
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
            <div className="absolute top-[200px] left-0 right-0 h-[1px] bg-emerald-500/10 z-0" />
            <div className="absolute top-[200px] left-0 right-0 h-[1px] bg-gradient-to-r from-emerald-500/20 via-emerald-400/5 to-transparent z-10" />
            
            <div className="sticky left-0 z-30 pr-12 translate-y-[20px]">
              <div className="px-6 py-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-xl min-w-[220px]">
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
            <div className="absolute top-[120px] left-0 right-0 h-[1px] bg-blue-500/10 z-0" />
            <div className="absolute top-[120px] left-0 right-0 h-[1px] bg-gradient-to-r from-blue-500/20 via-blue-400/5 to-transparent z-10" />
            
            <div className="sticky left-0 z-30 pr-12 -translate-y-[20px]">
              <div className="px-6 py-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 backdrop-blur-xl min-w-[220px]">
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
      icon: <Terminal size={18} />,
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
            <h2 className="text-4xl font-bold mb-4 tracking-tighter">数字洞见 · 学习笔记</h2>
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

const AIChat = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: xiaotianSkillService.getInitialMessage() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await xiaotianSkillService.chat(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: '抱歉,我现在无法回答。请稍后再试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-chat" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tighter">对话 Lio AI</h2>
          <p className="text-white/20 italic text-sm tracking-widest uppercase font-mono">"Synergizing technical depth with product empathy."</p>
        </div>
        
        <div className={`${CARD_BG} rounded-[56px] overflow-hidden flex flex-col h-[650px] border-white/5 shadow-2xl`}>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-black/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-6 rounded-[32px] text-sm leading-relaxed overflow-hidden ${
                  m.role === 'user'
                  ? 'bg-white text-black font-medium'
                  : 'bg-white/5 text-white/70 border border-white/10'
                }`}>
                  {m.role === 'ai' ? (
                    <MarkdownRenderer content={m.text} />
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 p-4">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>
          
          <div className="p-8 border-t border-white/5 bg-black/60">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="询问关于我的 AI 原型能力、PRD 准则或物联网背景..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-10 text-sm focus:outline-none focus:border-emerald-400/50 transition-all placeholder:text-white/10"
              />
              <button 
                onClick={handleSend}
                className="absolute right-3 top-3 p-2.5 bg-emerald-500 rounded-full hover:bg-emerald-400 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CapabilitiesSection = () => (
  <section id="capabilities" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="mb-24 text-center">
      <h2 className="text-4xl font-bold mb-4 tracking-tighter">全栈产品核心胜任力</h2>
      <p className="text-white/30 max-w-2xl mx-auto font-light leading-relaxed">
        将深厚的技术底座 with 敏锐的产品感知相结合，打造具备灵魂的软硬件一体化体验。
      </p>
    </div>

    {/* Primary Vision & Insight Cards */}
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <div className={`${CARD_BG} p-10 rounded-[48px] group hover:border-emerald-400/50 transition-all duration-500`}>
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8 group-hover:scale-110 transition-transform"><Smartphone size={28} /></div>
        <h3 className="text-xl font-bold mb-4">3C 数码精品 definition</h3>
        <p className="text-sm text-white/40 leading-relaxed font-light">
          深度参与头部品牌机型 definition，擅长多维竞品对标，追求每一处硬件选型与工业设计的极致和谐。
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
        <div className="text-3xl font-bold text-red-400 mb-1">Nat. 1st</div>
        <div className="text-[10px] text-white/20 font-bold tracking-widest">挑战杯国家奖项</div>
      </div>
      <div className={`${CARD_BG} p-8 rounded-[40px] text-center hover:border-purple-500/30 transition-all`}>
        <div className="text-3xl font-bold text-purple-400 mb-1">目标导向</div>
        <div className="text-[10px] text-white/20 font-bold tracking-widest">解决复杂问题</div>
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
                <h2 className="text-5xl font-bold mb-4 tracking-tighter">职场履历</h2>
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
                  "参与硬件可行性评估，确保新品 definition 在技术实现与市场竞争力之间达到平衡。"
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

        <AIChat />

        {/* Insights Section - Moved to End */}
        <InsightsSection />

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
                <a href="mailto:xiaotian.lio@um.edu.mo" className="text-white/20 hover:text-emerald-400 transition-colors duration-500"><Send size={28} /></a>
              </div>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] text-white/10 mb-5 uppercase tracking-[0.5em] font-bold">Idealistic Product Manager Intern</p>
              <a 
                href="mailto:xiaotian.lio@um.edu.mo" 
                className="text-4xl md:text-7xl font-bold tracking-tighter hover:text-emerald-400 transition-all duration-700 block mb-4"
              >
                LIO@UM.MACAU
              </a>
              <p className="text-white/10 text-xs font-mono">XIAOTIAN.LIO@UM.EDU.MO</p>
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
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Server, Shield, Zap, Code2, Users, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "FiveM Scripts",
    subtitle: "Production-Ready Infrastructure",
    description: "Enterprise-grade Lua scripts optimized for high-concurrency environments. Built for servers running 200+ players without compromise.",
    icon: Server,
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    accent: "text-cyan-400",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80",
    stats: [
      { label: "Active Servers", value: "150+" },
      { label: "Avg Response", value: "0.01ms" },
    ]
  },
  {
    id: 2,
    title: "Anti-Cheat Systems",
    subtitle: "Exploit-Hardened Security",
    description: "Military-grade protection against injection, executor exploits, and resource manipulation. Updated weekly against emerging threats.",
    icon: Shield,
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    accent: "text-orange-400",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80",
    stats: [
      { label: "Threats Blocked", value: "99.9%" },
      { label: "Zero-Day Response", value: "<24h" },
    ]
  },
  {
    id: 3,
    title: "Performance Core",
    subtitle: "Optimized Runtime",
    description: "Tick-perfect execution with async patterns, smart caching, and resource pooling. Your server stays smooth under any load.",
    icon: Zap,
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    accent: "text-yellow-400",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
    stats: [
      { label: "CPU Overhead", value: "<2%" },
      { label: "Memory Footprint", value: "Minimal" },
    ]
  },
  {
    id: 4,
    title: "Developer Tools",
    subtitle: "Build Faster, Ship Sooner",
    description: "Complete SDK with debugging utilities, hot-reload support, and automated testing frameworks. Development velocity, maximized.",
    icon: Code2,
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    accent: "text-violet-400",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80",
    stats: [
      { label: "Setup Time", value: "<5min" },
      { label: "Documentation", value: "100%" },
    ]
  },
  {
    id: 5,
    title: "Community Ecosystem",
    subtitle: "Trusted by Thousands",
    description: "Join a network of professional server owners and developers. Active Discord, premium support, and continuous updates.",
    icon: Users,
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    accent: "text-emerald-400",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80",
    stats: [
      { label: "Community", value: "12k+" },
      { label: "Support Rating", value: "4.9/5" },
    ]
  },
];

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const contentVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image with Parallax */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
            <div className={cn("absolute inset-0 bg-gradient-to-br", slide.gradient)} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Animated Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-8"
              >
                {/* Icon Badge */}
                <motion.div 
                  className={cn(
                    "inline-flex items-center gap-3 px-4 py-2 rounded-full",
                    "bg-white/5 backdrop-blur-xl border border-white/10"
                  )}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className={cn("p-2 rounded-lg bg-white/10", slide.accent)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={cn("font-medium", slide.accent)}>{slide.subtitle}</span>
                </motion.div>

                {/* Title */}
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                  {slide.description}
                </p>

                {/* Stats */}
                <div className="flex gap-8">
                  {slide.stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="space-y-1"
                    >
                      <div className={cn("text-3xl font-bold font-mono", slide.accent)}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Visual */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:block relative"
              >
                {/* Glassmorphic Card */}
                <div className="relative">
                  {/* Glow Effect */}
                  <div className={cn(
                    "absolute -inset-4 rounded-3xl blur-3xl opacity-30",
                    slide.gradient.replace('/20', '/40').replace('/10', '/30')
                  )} />
                  
                  {/* Main Card */}
                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 overflow-hidden">
                    {/* Terminal Header */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="ml-4 text-xs text-muted-foreground font-mono">cfx.re/ecosystem</span>
                    </div>

                    {/* Code Preview */}
                    <div className="font-mono text-sm space-y-2 text-white/70">
                      <div><span className="text-purple-400">const</span> ecosystem <span className="text-cyan-400">=</span> {`{`}</div>
                      <div className="pl-4"><span className="text-green-400">scripts</span>: <span className="text-orange-400">"production-ready"</span>,</div>
                      <div className="pl-4"><span className="text-green-400">security</span>: <span className="text-orange-400">"exploit-hardened"</span>,</div>
                      <div className="pl-4"><span className="text-green-400">performance</span>: <span className="text-orange-400">"0.01ms"</span>,</div>
                      <div className="pl-4"><span className="text-green-400">support</span>: <span className="text-orange-400">"24/7"</span></div>
                      <div>{`}`};</div>
                      <div className="mt-4">
                        <span className="text-purple-400">export default</span> ecosystem;
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[100px]" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-[80px]" />
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Cpu className={cn("h-8 w-8", slide.accent)} />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        {/* Prev Button */}
        <button
          onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
          className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToSlide(i)}
              className="group relative"
            >
              <div className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === currentSlide 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-white/30 hover:bg-white/50"
              )} />
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-xl rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {s.title}
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
          className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentSlide}
        />
      </div>
    </div>
  );
}

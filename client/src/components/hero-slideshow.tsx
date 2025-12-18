import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Code2, Layout, Wrench, Sparkles, Rocket, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "Quality Code",
    subtitle: "Professional Development",
    description: "Clean, maintainable code built with modern best practices. Every project is crafted to perform in production environments.",
    icon: Code2,
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    accent: "text-violet-400",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80",
    stats: [
      { label: "Projects Shipped", value: "50+" },
      { label: "Code Quality", value: "A+" },
    ]
  },
  {
    id: 2,
    title: "Web Templates",
    subtitle: "Modern UI/UX Design",
    description: "Beautiful, responsive templates built with React, Tailwind, and the latest frameworks. Ready to customize and deploy.",
    icon: Layout,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accent: "text-cyan-400",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    stats: [
      { label: "Templates", value: "20+" },
      { label: "Responsive", value: "100%" },
    ]
  },
  {
    id: 3,
    title: "Developer Tools",
    subtitle: "Build Faster, Ship Sooner",
    description: "Utilities, SDKs, and automation tools to supercharge your workflow. Tested and documented for seamless integration.",
    icon: Wrench,
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    accent: "text-amber-400",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
    stats: [
      { label: "Setup Time", value: "<5min" },
      { label: "Documentation", value: "100%" },
    ]
  },
  {
    id: 4,
    title: "Game Scripts",
    subtitle: "FiveM & Gaming Resources",
    description: "Production-ready game modifications and server scripts. Optimized for performance and tested on live environments.",
    icon: Sparkles,
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    accent: "text-emerald-400",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80",
    stats: [
      { label: "Active Users", value: "1000+" },
      { label: "Uptime", value: "99.9%" },
    ]
  },
  {
    id: 5,
    title: "Custom Solutions",
    subtitle: "Tailored Development",
    description: "Need something unique? Custom applications built to your specifications with ongoing support and maintenance.",
    icon: Rocket,
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    accent: "text-rose-400",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80",
    stats: [
      { label: "Client Satisfaction", value: "100%" },
      { label: "Support", value: "24/7" },
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

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
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

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-8"
              >
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

                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                  {slide.description}
                </p>

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

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:block relative"
              >
                <div className="relative">
                  <div className={cn(
                    "absolute -inset-4 rounded-3xl blur-3xl opacity-30",
                    slide.gradient.replace('/20', '/40').replace('/10', '/30')
                  )} />
                  
                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 overflow-hidden">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="ml-4 text-xs text-muted-foreground font-mono">daniel.domain</span>
                    </div>

                    <div className="font-mono text-sm space-y-2 text-white/70">
                      <div><span className="text-purple-400">const</span> developer <span className="text-cyan-400">=</span> {`{`}</div>
                      <div className="pl-4"><span className="text-green-400">name</span>: <span className="text-orange-400">"Daniel"</span>,</div>
                      <div className="pl-4"><span className="text-green-400">focus</span>: <span className="text-orange-400">"quality code"</span>,</div>
                      <div className="pl-4"><span className="text-green-400">products</span>: <span className="text-orange-400">"templates, tools, scripts"</span>,</div>
                      <div className="pl-4"><span className="text-green-400">quality</span>: <span className="text-orange-400">"production-ready"</span></div>
                      <div>{`}`};</div>
                      <div className="mt-4">
                        <span className="text-purple-400">export default</span> developer;
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[100px]" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-[80px]" />
                  </div>

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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        <button
          onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
          className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

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
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-xl rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {s.title}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
          className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

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

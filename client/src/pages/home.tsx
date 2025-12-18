import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { portfolioProjects } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Disc, Filter, Loader2, Shield, CheckCircle2, Zap, Users, Code2, Server, Sparkles, Layout, SlidersHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@shared/schema";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type ProductCategory = 'All' | 'FiveM Resources' | 'Applications' | 'Web Templates' | 'Developer Tools' | 'Misc';
type PriceSort = 'default' | 'low-high' | 'high-low' | 'free-first';

// Category styling with full theme
const categoryConfig: Record<ProductCategory, { 
  accent: string; 
  icon: typeof Server; 
  gradient: string;
  bg: string;
  border: string;
  glow: string;
  badge: string;
}> = {
  'All': { 
    accent: 'text-white', 
    icon: Sparkles, 
    gradient: 'from-white/10 via-primary/10 to-transparent',
    bg: 'bg-white/5',
    border: 'border-white/20',
    glow: 'shadow-white/10',
    badge: 'bg-white/10 text-white border-white/20'
  },
  'FiveM Resources': { 
    accent: 'text-cyan-400', 
    icon: Server, 
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
  },
  'Applications': { 
    accent: 'text-orange-400', 
    icon: Shield, 
    gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
    badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30'
  },
  'Web Templates': { 
    accent: 'text-violet-400', 
    icon: Layout, 
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    glow: 'shadow-violet-500/20',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/30'
  },
  'Developer Tools': { 
    accent: 'text-amber-400', 
    icon: Code2, 
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-500/20',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  },
  'Misc': { 
    accent: 'text-emerald-400', 
    icon: Sparkles, 
    gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
};

const priceSortOptions: { value: PriceSort; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'low-high', label: 'Price: Low to High' },
  { value: 'high-low', label: 'Price: High to Low' },
  { value: 'free-first', label: 'Free First' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [priceSort, setPriceSort] = useState<PriceSort>('default');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const categories: ProductCategory[] = [
    'All',
    'FiveM Resources',
    'Applications',
    'Web Templates',
    'Developer Tools',
    'Misc'
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = activeCategory === 'All' 
      ? [...products] 
      : products.filter((p: Product) => p.category === activeCategory);
    
    switch (priceSort) {
      case 'low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'free-first':
        result.sort((a, b) => (a.price === 0 ? -1 : b.price === 0 ? 1 : 0));
        break;
    }
    
    return result;
  }, [products, activeCategory, priceSort]);

  const currentConfig = categoryConfig[activeCategory];
  const CurrentIcon = currentConfig.icon;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 px-5 py-2 bg-white/5 backdrop-blur-xl text-primary border-primary/30 rounded-full font-medium">
              <Shield className="h-4 w-4 mr-2" />
              Production-Ready Standard
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Ship Production-Ready Scripts.<br/>
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
                Without the Hassle.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Most servers fail because their scripts were never meant to scale. 
              <span className="text-white font-medium"> Yours won't.</span>
            </p>
            <Button 
              size="lg" 
              className="h-16 px-12 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-2xl shadow-white/20 font-semibold hover:scale-105 transition-all duration-300" 
              asChild
            >
              <a href="#mortal-plugins">
                Explore Live-Ready Tools <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Quality Guarantee Section */}
      <section className="py-8 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-amber-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white">Production-Ready Guarantee</span>
                <p className="text-sm text-muted-foreground">Every script battle-tested</p>
              </div>
            </motion.div>
            <div className="hidden md:block h-12 w-px bg-white/10" />
            <motion.p 
              className="text-sm text-muted-foreground max-w-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Tested on live servers with 100+ concurrent players. 
              <span className="text-white font-medium"> If it breaks, we fix it within 24 hours.</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mortal Plugins (Products) Section */}
      <section id="mortal-plugins" className="py-24 relative overflow-hidden">
        {/* Dynamic background */}
        <motion.div 
          className={cn("absolute inset-0 transition-all duration-700 bg-gradient-to-b to-transparent", currentConfig.gradient)}
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-secondary/40" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header - Color coded */}
          <motion.div 
            className={cn(
              "mb-12 p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500",
              currentConfig.bg,
              currentConfig.border,
              `shadow-2xl ${currentConfig.glow}`
            )}
            key={activeCategory + '-header'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "h-16 w-16 rounded-2xl flex items-center justify-center border",
                  currentConfig.bg,
                  currentConfig.border
                )}>
                  <CurrentIcon className={cn("h-8 w-8", currentConfig.accent)} />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                    {activeCategory === 'All' ? 'Mortal Plugins' : activeCategory}
                  </h2>
                  <p className="text-muted-foreground">
                    {activeCategory === 'All' 
                      ? 'Browse all production-ready resources' 
                      : `${filteredAndSortedProducts.length} products available`}
                  </p>
                </div>
              </div>
              
              {/* Price Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "rounded-xl border backdrop-blur-xl gap-2 h-12 px-5",
                      currentConfig.border,
                      "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    <ArrowUpDown className={cn("h-4 w-4", currentConfig.accent)} />
                    <span className="hidden sm:inline">Sort by:</span>
                    <span className={cn("font-medium", currentConfig.accent)}>
                      {priceSortOptions.find(o => o.value === priceSort)?.label}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-background/95 backdrop-blur-xl border-white/10"
                >
                  {priceSortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setPriceSort(option.value)}
                      className={cn(
                        "cursor-pointer",
                        priceSort === option.value && currentConfig.accent
                      )}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          {/* Categories - Enhanced pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => {
              const config = categoryConfig[cat];
              const Icon = config.icon;
              const isActive = activeCategory === cat;
              return (
                <Button
                  key={cat}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-6 py-3 h-auto transition-all duration-300 gap-2",
                    isActive 
                      ? cn("backdrop-blur-xl border shadow-lg", config.bg, config.border, config.glow, config.accent)
                      : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? config.accent : "")} />
                  {cat}
                  {isActive && (
                    <Badge variant="secondary" className={cn("ml-1 h-5 px-2 text-xs", config.badge)}>
                      {filteredAndSortedProducts.length}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="relative">
                  <Loader2 className={cn("h-12 w-12 animate-spin", currentConfig.accent)} />
                  <div className={cn("absolute inset-0 blur-xl animate-pulse", currentConfig.bg)} />
                </div>
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  key={activeCategory + priceSort}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredAndSortedProducts.map((product: Product, index: number) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
                
                {filteredAndSortedProducts.length === 0 && (
                  <motion.div 
                    className="flex flex-col items-center justify-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className={cn("h-24 w-24 rounded-3xl flex items-center justify-center mb-6", currentConfig.bg, currentConfig.border, "border")}>
                      <Filter className={cn("h-12 w-12 opacity-50", currentConfig.accent)} />
                    </div>
                    <p className="text-lg text-muted-foreground">No products in this category.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-background to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header - Violet themed */}
          <motion.div 
            className="mb-12 p-8 rounded-3xl bg-violet-500/10 border border-violet-500/30 backdrop-blur-xl shadow-2xl shadow-violet-500/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-violet-400" />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Selected Works</h2>
                <p className="text-muted-foreground">Real systems running in production. Not concepts.</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-amber-500/5" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-1.5 bg-white/5 text-white border-white/20 rounded-full">
              <Users className="h-3.5 w-3.5 mr-2" />
              Community
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Trusted by Developers</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Commits", value: "4,200+", accent: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", gradient: "from-cyan-500/20" },
              { label: "Servers", value: "150+", accent: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", gradient: "from-violet-500/20" },
              { label: "Community", value: "12k", accent: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", gradient: "from-amber-500/20" },
              { label: "Uptime", value: "99.9%", accent: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", gradient: "from-emerald-500/20" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={cn(
                  "relative text-center p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500",
                  stat.bg,
                  stat.border,
                  "hover:scale-105 hover:shadow-2xl"
                )}>
                  <div className={cn("font-display text-4xl md:text-5xl font-bold mb-2", stat.accent)}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Philosophy */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.p 
            className="text-2xl md:text-4xl lg:text-5xl font-display text-center max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-muted-foreground">If your server is live,</span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 bg-clip-text text-transparent font-bold">
              your code should be ready.
            </span>
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="space-y-6 max-w-sm">
              <h3 className="font-display text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Danielillis.Domain
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The standard for production-ready FiveM infrastructure. Built for developers who ship.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Github, color: 'hover:text-white hover:border-white/30' },
                  { icon: Twitter, color: 'hover:text-cyan-400 hover:border-cyan-500/30' },
                  { icon: Disc, color: 'hover:text-violet-400 hover:border-violet-500/30' }
                ].map((social, i) => (
                  <Button 
                    key={i}
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "h-12 w-12 rounded-xl bg-white/5 border border-white/10 transition-all duration-300",
                      social.color
                    )}
                  >
                    <social.icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-16 text-sm">
              <div>
                <h4 className="font-display font-bold text-white mb-4">Products</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="hover:text-cyan-400 cursor-pointer transition-colors flex items-center gap-2">
                    <Server className="h-3.5 w-3.5" /> FiveM Scripts
                  </li>
                  <li className="hover:text-violet-400 cursor-pointer transition-colors flex items-center gap-2">
                    <Layout className="h-3.5 w-3.5" /> Web Templates
                  </li>
                  <li className="hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5" /> Dev Tools
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-display font-bold text-white mb-4">Support</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="hover:text-white cursor-pointer transition-colors">Discord</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Docs</li>
                  <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Daniel Domain. All rights reserved.</p>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

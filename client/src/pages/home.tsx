import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { portfolioProjects } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Disc, Filter, Loader2, Shield, CheckCircle2, Zap, Users, Code2, Server, Sparkles, Layout } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@shared/schema";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { motion } from "framer-motion";

type ProductCategory = 'All' | 'FiveM Resources' | 'Applications' | 'Web Templates' | 'Developer Tools' | 'Misc';

// Category styling
const categoryConfig: Record<ProductCategory, { accent: string; icon: typeof Server; gradient: string }> = {
  'All': { accent: 'text-white', icon: Sparkles, gradient: 'from-white/20' },
  'FiveM Resources': { accent: 'text-cyan-400', icon: Server, gradient: 'from-cyan-500/20' },
  'Applications': { accent: 'text-orange-400', icon: Shield, gradient: 'from-orange-500/20' },
  'Web Templates': { accent: 'text-violet-400', icon: Layout, gradient: 'from-violet-500/20' },
  'Developer Tools': { accent: 'text-amber-400', icon: Code2, gradient: 'from-amber-500/20' },
  'Misc': { accent: 'text-emerald-400', icon: Sparkles, gradient: 'from-emerald-500/20' },
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');

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

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter((p: Product) => p.category === activeCategory);

  const currentConfig = categoryConfig[activeCategory];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* CTA Section - Enhanced */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)`,
            }}
          />
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

      {/* Quality Guarantee Banner - Enhanced */}
      <section className="py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-amber-500/10" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="font-display text-xl font-bold text-white">Production-Ready Guarantee</span>
            </motion.div>
            <div className="hidden md:block h-8 w-px bg-white/10" />
            <motion.p 
              className="text-sm text-muted-foreground max-w-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Every script tested on live servers with 100+ concurrent players. 
              <span className="text-white font-medium"> If it breaks, we fix it within 24 hours.</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mortal Plugins (Products) - Enhanced */}
      <section id="mortal-plugins" className="py-24 relative overflow-hidden">
        {/* Dynamic background based on category */}
        <div className={cn(
          "absolute inset-0 transition-all duration-700 bg-gradient-to-b",
          currentConfig.gradient,
          "to-transparent opacity-30"
        )} />
        <div className="absolute inset-0 bg-secondary/30" />
        
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
          <motion.div 
            className="max-w-2xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Mortal</span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Plugins</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Stop debugging broken scripts. <span className="text-white font-medium">Start shipping features.</span>
            </p>
          </motion.div>

          {/* Categories - Enhanced pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => {
              const config = categoryConfig[cat];
              const Icon = config.icon;
              return (
                <Button
                  key={cat}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-5 py-2.5 h-auto transition-all duration-300",
                    activeCategory === cat 
                      ? cn("bg-white/10 backdrop-blur-xl border border-white/20", config.accent)
                      : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  <Icon className={cn("h-4 w-4 mr-2", activeCategory === cat ? config.accent : "")} />
                  {cat}
                </Button>
              );
            })}
          </div>

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
                </div>
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : (
              <>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  layout
                >
                  {filteredProducts.map((product: Product, index: number) => (
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
                
                {filteredProducts.length === 0 && (
                  <motion.div 
                    className="flex flex-col items-center justify-center py-20 text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="h-20 w-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                      <Filter className="h-10 w-10 opacity-30" />
                    </div>
                    <p className="text-lg">No products in this category.</p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio - Enhanced */}
      <section id="work" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-500/5 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-2xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-4 py-1.5 bg-violet-500/10 text-violet-400 border-violet-500/30 rounded-full">
              Portfolio
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Selected</span>{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Real systems running in production. <span className="text-white font-medium">Not concepts.</span>
            </p>
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

      {/* Stats - Enhanced with colors */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-amber-500/5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Trusted by the Community</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Commits", value: "4,200+", accent: "text-cyan-400", gradient: "from-cyan-500/20" },
              { label: "Servers", value: "150+", accent: "text-violet-400", gradient: "from-violet-500/20" },
              { label: "Community", value: "12k", accent: "text-amber-400", gradient: "from-amber-500/20" },
              { label: "Uptime", value: "99.9%", accent: "text-emerald-400", gradient: "from-emerald-500/20" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  stat.gradient,
                  "to-transparent"
                )} />
                <div className="relative text-center p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
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

      {/* Closing Philosophy Line - Enhanced */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.p 
            className="text-2xl md:text-4xl font-display text-center max-w-3xl mx-auto leading-relaxed"
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

      {/* Footer - Enhanced */}
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
                  { icon: Github, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Disc, href: "#" }
                ].map((social, i) => (
                  <Button 
                    key={i}
                    variant="ghost" 
                    size="icon" 
                    className="h-11 w-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
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
                  <li className="hover:text-cyan-400 cursor-pointer transition-colors">FiveM Scripts</li>
                  <li className="hover:text-violet-400 cursor-pointer transition-colors">Web Templates</li>
                  <li className="hover:text-amber-400 cursor-pointer transition-colors">Dev Tools</li>
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
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { portfolioProjects } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Disc, Loader2, Shield, CheckCircle2, Zap, Users, Code2, Server, Sparkles, Layout, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@shared/schema";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { motion } from "framer-motion";

const sectionConfig: Record<string, { title: string; categories: string[] }> = {
  'core': { 
    title: 'Core Systems',
    categories: ['Game Scripts']
  },
  'utilities': { 
    title: 'Utilities & Tools',
    categories: ['Developer Tools', 'Applications']
  },
  'assets': { 
    title: 'Templates & Assets',
    categories: ['Web Templates', 'Misc']
  },
};

const featuredProductNames = [
  "Anti-Cheat Core (Lua)",
  "Mortal Economy Core",
  "Mortal Admin Panel"
];

export default function Home() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const productsBySection = useMemo(() => {
    const sections: Record<string, Product[]> = {
      core: [],
      utilities: [],
      assets: []
    };
    
    products.forEach((product: Product) => {
      for (const [key, config] of Object.entries(sectionConfig)) {
        if (config.categories.includes(product.category)) {
          sections[key].push(product);
          break;
        }
      }
    });
    
    return sections;
  }, [products]);

  const featuredProducts = useMemo(() => {
    return products.filter((p: Product) => featuredProductNames.includes(p.name));
  }, [products]);

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
              <Code2 className="h-4 w-4 mr-2" />
              Professional Developer
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Quality Code, Ready to Ship.<br/>
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
                Built by a Pro.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Templates, tools, and scripts crafted with care. 
              <span className="text-white font-medium"> Production-ready from day one.</span>
            </p>
            <Button 
              size="lg" 
              className="h-16 px-12 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-2xl shadow-white/20 font-semibold hover:scale-105 transition-all duration-300" 
              asChild
            >
              <a href="#products">
                Browse Products <ArrowRight className="ml-2 h-5 w-5" />
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
                <span className="font-display text-xl font-bold text-white">Quality Guaranteed</span>
                <p className="text-sm text-muted-foreground">Every product tested & documented</p>
              </div>
            </motion.div>
            <div className="hidden md:block h-12 w-px bg-white/10" />
            <motion.p 
              className="text-sm text-muted-foreground max-w-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Clean code, proper documentation, and responsive support. 
              <span className="text-white font-medium"> Issues get fixed fast.</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
          {/* Simple Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              All Products
            </h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-white"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {/* Visual Anchor with Accent Underline */}
          <div className="mb-16">
            <p className="text-white/50 text-sm mb-3">
              Every product below is actively used in live environments.
            </p>
            <div className="h-px w-32 bg-gradient-to-r from-cyan-500/60 to-transparent" />
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <div className="space-y-24">
              {/* Featured Products - Core Systems */}
              {featuredProducts.length > 0 && (
                <div>
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Core Systems
                    </h3>
                    <p className="text-white/40 text-sm mb-3">Mission-critical systems for live servers</p>
                    <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProducts.map((product: Product, index: number) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={index === 0 ? "lg:col-span-2" : ""}
                      >
                        <ProductCard product={product} featured />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Utilities Section */}
              {productsBySection.utilities.length > 0 && (
                <div>
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Utilities & Tools
                    </h3>
                    <p className="text-white/40 text-sm mb-3">Lightweight tools that solve specific problems</p>
                    <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsBySection.utilities
                      .filter((p: Product) => !featuredProductNames.includes(p.name))
                      .slice(0, 6)
                      .map((product: Product, index: number) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}

              {/* Assets Section */}
              {productsBySection.assets.length > 0 && (
                <div>
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Templates & Assets
                    </h3>
                    <p className="text-white/40 text-sm mb-3">Ready-to-use designs and visual components</p>
                    <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsBySection.assets.slice(0, 6).map((product: Product, index: number) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Game Scripts Section */}
              {productsBySection.core.length > 0 && (
                <div>
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Game Scripts
                    </h3>
                    <p className="text-white/40 text-sm mb-3">Optimized scripts for game servers</p>
                    <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsBySection.core
                      .filter((p: Product) => !featuredProductNames.includes(p.name))
                      .slice(0, 6)
                      .map((product: Product, index: number) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
              { label: "Projects", value: "50+", accent: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", gradient: "from-cyan-500/20" },
              { label: "Happy Clients", value: "200+", accent: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", gradient: "from-violet-500/20" },
              { label: "Downloads", value: "5k+", accent: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", gradient: "from-amber-500/20" },
              { label: "Satisfaction", value: "100%", accent: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", gradient: "from-emerald-500/20" }
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
            <span className="text-muted-foreground">Great projects deserve</span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 bg-clip-text text-transparent font-bold">
              great code.
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
                Daniel.Domain
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Quality code, templates, and tools. Built by a professional developer who ships.
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
                  <li className="hover:text-violet-400 cursor-pointer transition-colors flex items-center gap-2">
                    <Layout className="h-3.5 w-3.5" /> Web Templates
                  </li>
                  <li className="hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5" /> Developer Tools
                  </li>
                  <li className="hover:text-cyan-400 cursor-pointer transition-colors flex items-center gap-2">
                    <Server className="h-3.5 w-3.5" /> Game Scripts
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

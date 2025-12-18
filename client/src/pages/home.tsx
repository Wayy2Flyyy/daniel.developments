import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { heroImage, portfolioProjects } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Github, Twitter, Disc, Filter, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { Product } from "@shared/schema";

type ProductCategory = 'All' | 'FiveM Resources' | 'Applications' | 'Web Templates' | 'Developer Tools' | 'Misc';

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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Abstract Background" 
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        </div>
        
        <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/50 text-primary bg-primary/10 backdrop-blur-md text-sm font-medium tracking-wide">
              v3.0.0 Online
            </Badge>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
          >
            Danielillis<br/>Domain
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-light"
          >
            Showroom, sales surface, and credibility engine. <br className="hidden md:block"/>
            Building high-performance systems for the next generation of communities.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10" asChild>
              <a href="#mortal-plugins">
                Browse Plugins <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md" asChild>
              <a href="#work">
                View Portfolio
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Selected Works / Portfolio */}
      <section id="work" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Selected Works</h2>
              <p className="text-muted-foreground max-w-md text-lg">
                Proof of work across the FiveM ecosystem, Discord automation, and desktop software.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-white/5 hover:bg-white/10">All</Badge>
              <Badge variant="outline" className="border-white/10 text-muted-foreground hover:text-white">Engineering</Badge>
              <Badge variant="outline" className="border-white/10 text-muted-foreground hover:text-white">Design</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <ProductCard key={project.id} product={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Mortal Plugins (Products) */}
      <section id="mortal-plugins" className="py-32 bg-secondary/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">Mortal Plugins</Badge>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">Commercial Grade Tools</h2>
            <p className="text-muted-foreground text-lg">
              Production-ready resources for your community. Instant delivery, documentation included, and supported via Discord.
            </p>
          </div>

          {/* Categories / Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full border-white/10",
                  activeCategory === cat 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {filteredProducts.map((product: Product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </motion.div>
                </AnimatePresence>
                
                {filteredProducts.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                    <Filter className="h-12 w-12 mb-4 opacity-20" />
                    <p>No products found in this category.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats / Credibility */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Commits Pushed", value: "4,200+" },
              { label: "Active Servers", value: "150+" },
              { label: "Discord Members", value: "12k" },
              { label: "Uptime", value: "99.9%" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black text-white border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="space-y-6 max-w-sm">
              <h3 className="font-display text-2xl font-bold">Danielillis.Domain</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building the infrastructure for the next generation of digital communities. 
                Focusing on performance, security, and user experience.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/10 hover:text-white">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/10 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/10 hover:text-white">
                  <Disc className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="font-bold mb-6 text-white">Ecosystem</h4>
                <ul className="space-y-4 text-muted-foreground text-sm">
                  <li className="hover:text-primary transition-colors cursor-pointer">Mortal Plugins</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">100Racks</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Discord Bots</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Documentation</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-6 text-white">Legal</h4>
                <ul className="space-y-4 text-muted-foreground text-sm">
                  <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Licenses</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Support</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Daniel Domain. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

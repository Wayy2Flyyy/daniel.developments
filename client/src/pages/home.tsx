import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { heroImage, portfolioProjects } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Github, Twitter, Disc, Filter, Loader2, Shield, Zap, Users } from "lucide-react";
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Optimized for clarity */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="" 
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        
        <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
          {/* Single dominant headline - direct promise */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white max-w-4xl leading-[1.1]">
            Ship Production-Ready Scripts.<br/>
            <span className="text-primary">Without the Hassle.</span>
          </h1>

          {/* Supporting line - one sentence */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Premium FiveM resources, web templates, and developer tools. Tested, documented, and ready to deploy.
          </p>

          {/* One primary CTA */}
          <Button 
            size="lg" 
            className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 font-semibold" 
            asChild
          >
            <a href="#mortal-plugins">
              Browse Products <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>

          {/* Trust signals - immediate credibility */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>150+ Active Servers</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>0.01ms Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Exploit Protected</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </div>
      </section>

      {/* Mortal Plugins (Products) - Primary content */}
      <section id="mortal-plugins" className="py-24 bg-secondary/20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Mortal Plugins</h2>
            <p className="text-muted-foreground text-lg">
              Production-ready resources. Instant delivery. Discord support included.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full",
                  activeCategory === cat 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="min-h-[300px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <Filter className="h-10 w-10 mb-4 opacity-20" />
                    <p>No products in this category.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio - Secondary */}
      <section id="work" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Selected Works</h2>
            <p className="text-muted-foreground text-lg">
              FiveM ecosystems, Discord automation, and desktop software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <ProductCard key={project.id} product={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Social proof */}
      <section className="py-20 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Commits", value: "4,200+" },
              { label: "Servers", value: "150+" },
              { label: "Community", value: "12k" },
              { label: "Uptime", value: "99.9%" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-16 bg-black text-white border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4 max-w-xs">
              <h3 className="font-display text-xl font-bold">Danielillis.Domain</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                High-performance systems for digital communities.
              </p>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/10">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/10">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/10">
                  <Disc className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex gap-12 text-sm">
              <div>
                <h4 className="font-medium mb-3">Products</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="hover:text-white cursor-pointer">FiveM Scripts</li>
                  <li className="hover:text-white cursor-pointer">Web Templates</li>
                  <li className="hover:text-white cursor-pointer">Dev Tools</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Support</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="hover:text-white cursor-pointer">Discord</li>
                  <li className="hover:text-white cursor-pointer">Docs</li>
                  <li className="hover:text-white cursor-pointer">FAQ</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-muted-foreground">
            <p>© 2024 Daniel Domain</p>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>Online</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

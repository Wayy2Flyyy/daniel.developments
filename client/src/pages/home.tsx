import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { portfolioProjects, type Product as LocalProduct } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Disc, Filter, Loader2, Shield, CheckCircle2, Quote, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@shared/schema";
import { HeroSlideshow } from "@/components/hero-slideshow";

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

  // Featured project for early proof
  const featuredProject = portfolioProjects[0];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Slideshow - Advanced FiveM/CFX.re Ecosystem Showcase */}
      <HeroSlideshow />

      {/* CTA Section - Bridge from slideshow to products */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/20 border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/30 rounded-full font-medium">
            <Shield className="h-3.5 w-3.5 mr-2" />
            Production-Ready Standard
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
            Ship Production-Ready Scripts. <span className="text-primary">Without the Hassle.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Most servers fail because their scripts were never meant to scale. 
            <span className="text-white/70"> Yours won't.</span>
          </p>
          <Button 
            size="lg" 
            className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 font-semibold" 
            asChild
          >
            <a href="#mortal-plugins">
              Explore Live-Ready Tools <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Featured Proof - BEFORE products (proof-before-purchase loop) */}
      <section className="py-16 border-b border-white/5 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
              <img 
                src={featuredProject.image} 
                alt={featuredProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/30 text-primary">Featured Case</Badge>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{featuredProject.name}</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete ecosystem overhaul. From scattered scripts to unified architecture. 
                Result: 80% reduction in admin overhead, zero exploits in 6 months.
              </p>
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                View Case Study <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Quote */}
      <section className="py-16 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-10 w-10 text-primary/30 mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-6">
              "Switched from three different script packs to Mortal's ecosystem. Setup went from 8 hours to 45 minutes. 
              No exploits in 6 months of running 100+ players."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                M
              </div>
              <div className="text-left">
                <p className="font-medium text-white">Marcus R.</p>
                <p className="text-sm text-muted-foreground">100Racks Server Owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Guarantee Banner */}
      <section className="py-8 bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <span className="font-medium text-white">Production-Ready Guarantee</span>
            </div>
            <div className="hidden md:block h-6 w-px bg-white/10" />
            <p className="text-sm text-muted-foreground max-w-md">
              Every script tested on live servers with 100+ concurrent players. 
              If it breaks, we fix it within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Mortal Plugins (Products) */}
      <section id="mortal-plugins" className="py-24 bg-secondary/20 border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Mortal Plugins</h2>
            <p className="text-muted-foreground text-lg">
              Stop debugging broken scripts. Start shipping features.
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

      {/* Portfolio */}
      <section id="work" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Selected Works</h2>
            <p className="text-muted-foreground text-lg">
              Real systems running in production. Not concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.slice(1).map((project) => (
              <ProductCard key={project.id} product={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Closing Philosophy Line */}
      <section className="py-12 text-center border-b border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-xl md:text-2xl font-display text-white/80 max-w-2xl mx-auto">
            If your server is live, your code should be ready.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black text-white border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4 max-w-xs">
              <h3 className="font-display text-xl font-bold">Danielillis.Domain</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The standard for production-ready FiveM infrastructure.
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

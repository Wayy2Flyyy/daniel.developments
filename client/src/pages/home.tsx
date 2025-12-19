import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { portfolioProjects } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Disc, Loader2, Shield, CheckCircle2, Zap, Users, Code2, Server, Sparkles, Layout, SlidersHorizontal, Package, Search, X, Filter, Grid3X3, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@shared/schema";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const categoryTabs = [
  { id: 'all', label: 'All', icon: Grid3X3 },
  { id: 'Web Templates', label: 'Web Templates', icon: Layout },
  { id: 'Developer Tools', label: 'Developer Tools', icon: Code2 },
  { id: 'Game Scripts', label: 'Game Scripts', icon: Server },
  { id: 'Applications', label: 'Applications', icon: Package },
  { id: 'Misc', label: 'Misc', icon: Sparkles },
];

const priceTiers = [
  { id: 'free', label: 'Free', min: 0, max: 0 },
  { id: 'budget', label: 'Under $25', min: 1, max: 24 },
  { id: 'mid', label: '$25 - $50', min: 25, max: 50 },
  { id: 'premium', label: '$50+', min: 51, max: Infinity },
];

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

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceTiers, setSelectedPriceTiers] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const featuredProducts = useMemo(() => {
    return products.filter((p: Product) => featuredProductNames.includes(p.name));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (activeTab !== 'all') {
      filtered = filtered.filter((p: Product) => p.category === activeTab);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p: Product) => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }
    
    if (selectedPriceTiers.length > 0) {
      filtered = filtered.filter((p: Product) => {
        return selectedPriceTiers.some(tierId => {
          const tier = priceTiers.find(t => t.id === tierId);
          if (!tier) return false;
          return p.price >= tier.min && p.price <= tier.max;
        });
      });
    }
    
    return filtered;
  }, [products, activeTab, searchQuery, selectedPriceTiers]);

  const togglePriceTier = (tierId: string) => {
    setSelectedPriceTiers(prev => 
      prev.includes(tierId) 
        ? prev.filter(id => id !== tierId)
        : [...prev, tierId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPriceTiers([]);
  };

  const hasActiveFilters = searchQuery.trim() || selectedPriceTiers.length > 0;

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return products.length;
    return products.filter((p: Product) => p.category === categoryId).length;
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-background to-background" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
          {/* Hero-Style Section Header */}
          <motion.div 
            className="mb-12 p-8 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-500/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <Package className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Product Catalog</h2>
                  <p className="text-muted-foreground">Production-ready code, tested in live environments</p>
                </div>
              </div>
              
              {/* Stats Chips */}
              <div className="flex flex-wrap gap-3">
                <motion.div 
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-cyan-400 font-bold">{products.length}</span>
                  <span className="text-white/60 ml-2 text-sm">Products</span>
                </motion.div>
                <motion.div 
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-emerald-400 font-bold">{categoryTabs.length - 1}</span>
                  <span className="text-white/60 ml-2 text-sm">Categories</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs + Smart Filter */}
          <div className="mb-10">
            {/* Tabs Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              <div className="flex flex-wrap gap-2">
                {categoryTabs.map((tab, index) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;
                  const count = getCategoryCount(tab.id);
                  
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "relative px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300",
                        isActive 
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" 
                          : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      data-testid={`tab-${tab.id}`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className={cn(
                        "ml-1 px-1.5 py-0.5 rounded-md text-xs",
                        isActive ? "bg-cyan-500/30 text-cyan-300" : "bg-white/10 text-white/40"
                      )}>
                        {count}
                      </span>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-cyan-500/50"
                          layoutId="activeTab"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Search + Filter Controls */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[200px] lg:w-[260px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-500/50"
                    data-testid="input-search"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={cn(
                        "gap-2 bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white",
                        selectedPriceTiers.length > 0 && "border-cyan-500/40 text-cyan-400"
                      )}
                      data-testid="button-filter"
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                      {selectedPriceTiers.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/30 text-xs">
                          {selectedPriceTiers.length}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-72 bg-background/95 backdrop-blur-xl border-white/10 p-4"
                    align="end"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-cyan-400" />
                          Price Range
                        </h4>
                        {hasActiveFilters && (
                          <button 
                            onClick={clearFilters}
                            className="text-xs text-white/50 hover:text-white"
                          >
                            Clear all
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {priceTiers.map((tier) => {
                          const isSelected = selectedPriceTiers.includes(tier.id);
                          const count = products.filter((p: Product) => 
                            p.price >= tier.min && p.price <= tier.max &&
                            (activeTab === 'all' || p.category === activeTab)
                          ).length;
                          
                          return (
                            <button
                              key={tier.id}
                              onClick={() => togglePriceTier(tier.id)}
                              className={cn(
                                "px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center justify-between",
                                isSelected 
                                  ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400"
                                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                              )}
                              data-testid={`filter-${tier.id}`}
                            >
                              <span>{tier.label}</span>
                              <span className="text-xs opacity-60">({count})</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Active Filters Display */}
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.div 
                  className="flex flex-wrap items-center gap-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className="text-white/40 text-sm">Active filters:</span>
                  {searchQuery && (
                    <Badge 
                      variant="secondary" 
                      className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 gap-1"
                    >
                      "{searchQuery}"
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                    </Badge>
                  )}
                  {selectedPriceTiers.map(tierId => {
                    const tier = priceTiers.find(t => t.id === tierId);
                    return tier && (
                      <Badge 
                        key={tierId}
                        variant="secondary" 
                        className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 gap-1"
                      >
                        {tier.label}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => togglePriceTier(tierId)} />
                      </Badge>
                    );
                  })}
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-white/50 hover:text-white ml-2"
                  >
                    Clear all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="font-mono text-sm text-white/50 flex items-center gap-2">
                <span className="text-cyan-400">&gt;</span>
                <span>fetching products</span>
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </div>
              <div className="w-48 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="inline-block p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
                <div className="font-mono text-sm text-white/40 space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">&gt;</span>
                    <span>query: "{searchQuery || activeTab}"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">!</span>
                    <span>0 results found</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/30">
                    <span>&nbsp;</span>
                    <span>try adjusting filters</span>
                  </div>
                </div>
              </div>
              <Button onClick={clearFilters} variant="outline" className="gap-2 font-mono text-xs">
                <X className="h-3 w-3" />
                reset --filters
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-16">
              {/* Featured Products - Show only on "All" tab */}
              {activeTab === 'all' && featuredProducts.length > 0 && !hasActiveFilters && (
                <div>
                  <div className="mb-8 flex items-center gap-4">
                    <h3 className="font-mono text-xs font-medium text-white/60 uppercase tracking-[0.2em]">
                      // CORE_SYSTEMS
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                    <span className="font-mono text-[10px] text-cyan-400/60 uppercase tracking-wider">
                      mission-critical
                    </span>
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

              {/* All Products Grid */}
              <div>
                {activeTab === 'all' && !hasActiveFilters && (
                  <div className="mb-8 flex items-center gap-4">
                    <h3 className="font-mono text-xs font-medium text-white/60 uppercase tracking-[0.2em]">
                      // ALL_PRODUCTS
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                      {filteredProducts.length} items
                    </span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts
                      .filter((p: Product) => activeTab !== 'all' || hasActiveFilters || !featuredProductNames.includes(p.name))
                      .map((product: Product, index: number) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: index * 0.03, duration: 0.3 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Production-Ready Standard - Signature Section */}
      <section className="py-20 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-background to-background" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-5xl">
          <motion.div
            className="relative p-8 md:p-12 rounded-2xl border border-emerald-500/20 backdrop-blur-sm"
            style={{
              background: 'linear-gradient(180deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.02) 100%)'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Terminal-style header */}
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="font-mono text-xs text-white/40 ml-2">production-ready.standard</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* What We Test */}
              <div>
                <h3 className="font-mono text-xs text-emerald-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> WHAT WE TEST
                </h3>
                <ul className="space-y-3 font-mono text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400/60 mt-0.5">→</span>
                    <span>Stress-tested under real load conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400/60 mt-0.5">→</span>
                    <span>Security audit for common exploits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400/60 mt-0.5">→</span>
                    <span>Documentation completeness check</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400/60 mt-0.5">→</span>
                    <span>Clean code review, no spaghetti</span>
                  </li>
                </ul>
              </div>

              {/* What We Reject */}
              <div>
                <h3 className="font-mono text-xs text-red-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="text-red-400">✕</span> WHAT WE REJECT
                </h3>
                <ul className="space-y-3 font-mono text-sm text-white/40">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400/60 mt-0.5">→</span>
                    <span>Copy-paste code with no understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400/60 mt-0.5">→</span>
                    <span>Missing error handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400/60 mt-0.5">→</span>
                    <span>Hardcoded values without config</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400/60 mt-0.5">→</span>
                    <span>Undocumented dependencies</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Status bar */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 font-mono text-[10px] text-white/30 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                standard active
              </span>
              <span>|</span>
              <span>last audit: dec 2024</span>
              <span>|</span>
              <span>support: discord</span>
            </div>
          </motion.div>
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

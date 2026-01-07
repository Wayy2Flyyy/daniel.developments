import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { portfolioProjects, products as storeProducts } from "@/lib/products";
import { ProductFilters, applyFilters, buildInitialFilterState } from "@/components/product-filters";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Disc, Loader2, Shield, CheckCircle2, Zap, Users, Code2, Server, SlidersHorizontal, Package, Layout, Sparkles, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { motion } from "framer-motion";

export default function Home() {
  type CoreProductCategory = {
    title: string;
    icon: LucideIcon;
    who: string;
    problem?: string;
    deliver: string[];
    built?: string[];
    timeline?: string;
    pricing: string[];
    upgrades?: string[];
    note?: string;
  };

  // Advanced product filters state
  const [filters, setFilters] = useState(() => buildInitialFilterState(storeProducts));
  const filteredProducts = useMemo(() => applyFilters(storeProducts, filters), [filters]);

  // Browse vs Filter view
  const [viewMode, setViewMode] = useState<"browse" | "filter">("browse");

  // Auto-categorised groups for Browse mode
  const autoGroups = useMemo(() => {
    const isFeature = (p: any, f: string) => p.features?.includes(f);
    const featured = storeProducts.filter((p) => p.name.toLowerCase() === "secure vault");
    const rest = storeProducts.filter((p) => p.name.toLowerCase() !== "secure vault");
    const csharp = rest.filter((p) => isFeature(p, "C#"));
    const python = rest.filter((p) => isFeature(p, "Python"));

    return [
      { key: "featured", title: "Secure Vault (Main Project)", items: featured },
      { key: "csharp", title: "C# Applications", items: csharp },
      { key: "python", title: "Python Tools (Budget)", items: python },
    ].filter((g) => g.items.length > 0);
  }, []);

  const coreProductCategories = useMemo(() => {
    return [
      {
        title: "Custom Software Systems",
        icon: SlidersHorizontal,
        who: "Businesses that need internal tools, dashboards, admin systems, or automation.",
        problem: "Manual work, slow operations, messy data, poor internal UX.",
        deliver: [
          "Custom dashboards",
          "Admin panels",
          "Internal tools",
          "Automation systems",
          "Secure data handling",
          "Scalable architecture",
        ],
        built: [
          "TypeScript / C# / Go / Python (project-dependent)",
          "Clean architecture",
          "Modular systems",
          "Long-term maintainability",
        ],
        timeline: "2–6 weeks depending on scope",
        pricing: ["From £1,200", "Typical projects: £2,500–£6,000"],
        upgrades: ["Ongoing support", "Feature expansions", "Hosting & monitoring"],
      },
      {
        title: "UI/UX Engineering",
        icon: Layout,
        who: "Teams with ugly, clunky, or inefficient interfaces.",
        problem: "Bad usability, poor flow, low trust, unfinished feel.",
        deliver: [
          "Interface redesigns",
          "Interaction systems",
          "Component libraries",
          "Layout restructuring",
          "Animation logic",
          "UX logic tied to real usage",
        ],
        note: "Practical UI changes that improve clarity and trust.",
        timeline: "1–3 weeks",
        pricing: ["From £600", "Full systems: £1,500–£3,500"],
      },
      {
        title: "Websites",
        icon: Package,
        who: "Businesses that need credibility, conversion, and speed.",
        problem: "Outdated sites, poor structure, low trust.",
        deliver: [
          "Custom front-end builds",
          "SEO-ready structure",
          "Performance-focused layout",
          "Mobile-first systems",
          "CMS or static builds depending on needs",
        ],
        timeline: "1–4 weeks",
        pricing: ["From £500", "Advanced builds: £1,500+"],
      },
      {
        title: "Automation & Tooling",
        icon: Zap,
        who: "Businesses wasting time on repetitive tasks.",
        problem: "Manual work, errors, inefficiency.",
        deliver: [
          "Workflow automation",
          "Custom scripts",
          "API integrations",
          "Data syncing",
          "Monitoring tools",
        ],
        timeline: "3 days – 2 weeks",
        pricing: ["From £350", "Retainers available"],
      },
      {
        title: "Ongoing Engineering Support (Retainers)",
        icon: Users,
        who: "Clients who already have systems and need a reliable engineer.",
        deliver: [
          "Feature updates",
          "Fixes",
          "Optimisation",
          "Advice",
          "Priority access",
        ],
        pricing: ["£400 / month (light)", "£800+ / month (core support)"],
        note: "Reliable support for ongoing updates and fixes.",
      },
    ] satisfies CoreProductCategory[];
  }, []);

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
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Core Product Categories</h2>
                  <p className="text-muted-foreground">High-value engineering services — scoped, shipped, maintained</p>
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
                  <span className="text-cyan-400 font-bold">{coreProductCategories.length}</span>
                  <span className="text-white/60 ml-2 text-sm">Categories</span>
                </motion.div>
                <motion.div 
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-emerald-400 font-bold">UK</span>
                  <span className="text-white/60 ml-2 text-sm">Pricing</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Core Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreProductCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className={index === 0 ? "lg:col-span-2" : ""}
                >
                  <div className="group h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.06] hover:border-white/20">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="h-12 w-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-2xl font-bold text-white leading-tight">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.2em] mb-2">WHO IT’S FOR</p>
                          <p className="text-muted-foreground leading-relaxed">{category.who}</p>
                        </div>

                        {category.problem && (
                          <div>
                            <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.2em] mb-2">WHAT PROBLEM IT SOLVES</p>
                            <p className="text-muted-foreground leading-relaxed">{category.problem}</p>
                          </div>
                        )}

                        {category.note && (
                          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                            <p className="text-sm text-white/70 leading-relaxed">{category.note}</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        <div>
                          <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.2em] mb-3">WHAT YOU DELIVER</p>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {category.deliver.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="text-cyan-400/70 mt-1">→</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {category.built && (
                          <div>
                            <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.2em] mb-3">HOW IT’S BUILT</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {category.built.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                  <span className="text-emerald-400/70 mt-1">✓</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {(category.timeline || category.pricing || category.upgrades) && (
                          <div className="grid gap-4">
                            {category.timeline && (
                              <div className="p-4 rounded-2xl bg-black/20 border border-white/10">
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-1">TIMELINE</p>
                                <p className="text-sm text-white/70 leading-snug">{category.timeline}</p>
                              </div>
                            )}
                            {category.pricing && (
                              <div className="p-4 rounded-2xl bg-black/20 border border-white/10">
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-1">PRICING</p>
                                <div className="text-sm text-white/70 space-y-1 leading-snug">
                                  {category.pricing.map((line) => {
                                    const trimmed = line.trim();

                                    if (trimmed.toLowerCase().startsWith("from ")) {
                                      const value = trimmed.slice(5).trim();
                                      return (
                                        <div
                                          key={line}
                                          className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
                                        >
                                          <span className="text-white/60 whitespace-nowrap">From</span>
                                          <span className="ml-auto text-white font-semibold tabular-nums whitespace-nowrap">{value}</span>
                                        </div>
                                      );
                                    }

                                    const colonIndex = trimmed.indexOf(":");
                                    if (colonIndex > -1 && colonIndex < trimmed.length - 1) {
                                      const label = trimmed.slice(0, colonIndex + 1);
                                      const value = trimmed.slice(colonIndex + 1).trim();
                                      return (
                                        <div
                                          key={line}
                                          className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
                                        >
                                          <span className="text-white/60 whitespace-nowrap">{label}</span>
                                          <span className="ml-auto text-white/70 tabular-nums whitespace-nowrap">{value}</span>
                                        </div>
                                      );
                                    }

                                    return (
                                      <p key={line} className="text-white/70">
                                        {trimmed}
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {category.upgrades && (
                          <div>
                            <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.2em] mb-3">UPGRADES</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {category.upgrades.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                  <span className="text-violet-400/70 mt-1">+</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Store Products (Purchasable) */}
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-4">
              <h3 className="font-mono text-xs font-medium text-white/60 uppercase tracking-[0.2em]">
                // STORE_PRODUCTS
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                click a product for details
              </span>
            </div>

            {/* View mode toggle */}
            <div className="mb-4 flex items-center gap-2">
              <button
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs border",
                  viewMode === "browse" ? "bg-white/10 border-white/20" : "bg-transparent border-white/10"
                )}
                onClick={() => setViewMode("browse")}
              >
                Browse
              </button>
              <button
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs border",
                  viewMode === "filter" ? "bg-white/10 border-white/20" : "bg-transparent border-white/10"
                )}
                onClick={() => setViewMode("filter")}
              >
                Filter
              </button>
            </div>

            {viewMode === "browse" ? (
              <div className="space-y-12">
                {autoGroups.map((group, gi) => (
                  <div key={group.key}>
                    <div className="flex items-center gap-3 mb-4">
                      <h4 className="font-mono text-xs text-white/60 uppercase tracking-[0.2em]">{group.title}</h4>
                      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {group.items.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <ProductFilters products={storeProducts} state={filters} onChange={setFilters} variant="minimal" className="mb-8" />
                <div className="mb-4 text-sm text-white/60 font-mono">
                  Showing {filteredProducts.length} of {storeProducts.length}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
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
                Daniel Developments
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
            <p>© 2024 Daniel Developments. All rights reserved.</p>
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

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Package, FileText, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProductDetailDialog } from "@/components/product-detail-dialog";
import { cn } from "@/lib/utils";

interface BaseProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  features: string[];
  type: string;
}

const signatureLines: Record<string, { outcome: string; guardrail: string }> = {
  "Mortal Admin Panel": { outcome: "Full server control", guardrail: "Doesn't break under load" },
  "Mortal HUD System": { outcome: "Deploys in 5 minutes", guardrail: "0.01ms CPU overhead" },
  "Mortal Chat iOS": { outcome: "Eliminates spam", guardrail: "Zero config needed" },
  "Mortal Economy Core": { outcome: "Exploit-proof economy", guardrail: "Audit logs baked in" },
  "Advanced Robbery System": { outcome: "Engaging heists", guardrail: "No setup pain" },
  "Server Launcher Pro": { outcome: "White-label branding", guardrail: "Zero dev time" },
  "Log Viewer Desktop": { outcome: "Find issues 10x faster", guardrail: "Regex built-in" },
  "Texture Compressor Tool": { outcome: "Cut load times 40%", guardrail: "Lossless mode" },
  "Nexus Community Portal": { outcome: "Full community site", guardrail: "One afternoon setup" },
  "Status Page Modern": { outcome: "Live uptime display", guardrail: "15 min deploy" },
  "Loading Screen V4": { outcome: "First impressions stick", guardrail: "Video + music" },
  "Discord Bot Boilerplate (Python)": { outcome: "Bot live in an hour", guardrail: "Error handling pre-built" },
  "Anti-Cheat Core (Lua)": { outcome: "Blocks 99% exploits", guardrail: "Minimal overhead" },
  "Data Scraper Script": { outcome: "Automate research", guardrail: "Proxy rotation" },
  "Ultimate VSCode Theme": { outcome: "Code longer", guardrail: "Eye strain reduced" },
  "Server Config Generator": { outcome: "Best practices applied", guardrail: "Zero effort" },
  "Stream Deck Icons Pack": { outcome: "Professional stream setup", guardrail: "200+ icons" },
};

const proofArtifacts: Record<string, { docs: boolean; deployTime: string; updated: string }> = {
  "Mortal Admin Panel": { docs: true, deployTime: "~10 min", updated: "Dec 2024" },
  "Mortal Economy Core": { docs: true, deployTime: "~15 min", updated: "Dec 2024" },
  "Anti-Cheat Core (Lua)": { docs: true, deployTime: "~5 min", updated: "Dec 2024" },
  "Mortal HUD System": { docs: true, deployTime: "~5 min", updated: "Nov 2024" },
  "Mortal Chat iOS": { docs: true, deployTime: "~5 min", updated: "Nov 2024" },
  "Nexus Community Portal": { docs: true, deployTime: "~30 min", updated: "Oct 2024" },
};

const featuredProducts = [
  "Anti-Cheat Core (Lua)",
  "Mortal Economy Core", 
  "Mortal Admin Panel"
];

interface ProductCardProps {
  product: BaseProduct;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const signature = signatureLines[product.name] || { outcome: "Production-ready code", guardrail: "Tested & documented" };
  const proof = proofArtifacts[product.name];
  const isFeatured = featured || featuredProducts.includes(product.name);

  if (product.type === 'project') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Card 
          className="h-full bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300 group cursor-pointer" 
          onClick={() => setIsDetailOpen(true)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block mb-2 px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/10 text-white/70 border border-white/20 backdrop-blur-md rounded">
                  {product.category}
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {product.name}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>
          </CardContent>
        </Card>
        <ProductDetailDialog 
          product={product} 
          open={isDetailOpen} 
          onOpenChange={setIsDetailOpen} 
        />
      </motion.div>
    );
  }

  return (
    <>
      <Card 
        className={cn(
          "relative overflow-hidden group transition-all duration-300 h-full flex flex-col cursor-pointer",
          isFeatured 
            ? "border-2 border-white/20 min-h-[320px]" 
            : "border border-white/[0.08] min-h-[260px]",
          isHovered && !isFeatured && "border-cyan-500/30",
          isHovered && isFeatured && "border-cyan-500/40"
        )}
        onClick={() => setIsDetailOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid={`card-product-${product.id}`}
        style={{
          background: isFeatured
            ? `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`
            : `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)`,
          boxShadow: isHovered 
            ? isFeatured 
              ? '0 0 0 1px rgba(6,182,212,0.3), 0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(6,182,212,0.1)' 
              : '0 0 0 1px rgba(6,182,212,0.2), 0 8px 32px rgba(0,0,0,0.3)' 
            : isFeatured
              ? 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.2)'
              : 'inset 0 1px 0 0 rgba(255,255,255,0.06)'
        }}
      >
        {/* Top edge accent glow */}
        <div 
          className={cn(
            "absolute top-0 left-0 right-0 h-px transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.5) 50%, transparent 100%)' }}
        />

        <CardContent className={cn(
          "flex flex-col relative z-10 h-full",
          isFeatured ? "p-8" : "p-6"
        )}>
          <div className="flex items-start gap-3 mb-4">
            <div 
              className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300",
                "border border-white/10"
              )}
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
              }}
            >
              <Package className="h-4 w-4 text-white/50" />
            </div>
            {isFeatured && (
              <div className="ml-auto relative overflow-hidden">
                <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 rounded">
                  <span className="relative z-10">Verified</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                  />
                </span>
              </div>
            )}
          </div>
          
          {/* Title with hover shift */}
          <motion.h3 
            className={cn(
              "font-display font-bold text-white mb-2 line-clamp-1",
              isFeatured ? "text-xl" : "text-lg"
            )}
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {product.name}
          </motion.h3>
          
          {/* Signature line: Outcome + Guardrail */}
          <p className={cn(
            "text-white/50 mb-3 line-clamp-2",
            isFeatured ? "text-sm leading-relaxed" : "text-sm leading-relaxed"
          )}>
            {signature.outcome}. <span className="text-white/30">{signature.guardrail}.</span>
          </p>

          {/* Proof artifacts */}
          {proof && (
            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wide text-white/30 mb-auto">
              {proof.docs && (
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Docs
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {proof.deployTime}
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {proof.updated}
              </span>
            </div>
          )}
          
          {!proof && <div className="mb-auto" />}

          <div className="flex items-end justify-between mt-4 pt-4 border-t border-white/5">
            <span className="text-sm text-white/40 font-mono tracking-tight">
              {product.price === 0 ? '$0' : `$${product.price}`}
            </span>
            <motion.button
              className={cn(
                "inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white px-3 py-1.5 rounded-lg transition-colors duration-150",
                "hover:bg-white/5"
              )}
              animate={{ 
                scale: isPressed ? 0.97 : 1,
                y: isPressed ? 1 : 0
              }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
              onClick={(e) => {
                e.stopPropagation();
                setIsDetailOpen(true);
              }}
              data-testid={`button-view-${product.id}`}
            >
              <span className="font-medium">View</span>
              <motion.span
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ArrowRight className={cn(
                  "h-3.5 w-3.5 transition-colors duration-200",
                  isHovered ? "text-cyan-400" : "text-white/40"
                )} />
              </motion.span>
            </motion.button>
          </div>
        </CardContent>
      </Card>

      <ProductDetailDialog 
        product={product} 
        open={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
      />
    </>
  );
}

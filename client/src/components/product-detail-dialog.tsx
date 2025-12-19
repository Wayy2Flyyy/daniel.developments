import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Check, X, FileText, Calendar, GitBranch, Server, Shield, Layout, Code2, Sparkles, Folder, File, Users, Headphones, RefreshCw, BookOpen, MessageCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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

const categoryStyles: Record<string, {
  accent: string;
  badge: string;
  gradient: string;
  icon: typeof Server;
  path: string;
}> = {
  "Game Scripts": {
    accent: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    icon: Server,
    path: "Scripts → Game → FiveM"
  },
  "Applications": {
    accent: "text-orange-400",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    icon: Shield,
    path: "Apps → Desktop → Windows"
  },
  "Web Templates": {
    accent: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    icon: Layout,
    path: "Templates → Web → React"
  },
  "Developer Tools": {
    accent: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    icon: Code2,
    path: "Tools → Developer → Utilities"
  },
  "Misc": {
    accent: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    icon: Sparkles,
    path: "Assets → Misc"
  },
};

const defaultStyle = categoryStyles["Misc"];

function generateFileTree(product: BaseProduct): { tree: string; explanations: { file: string; desc: string }[] } {
  const slug = product.name.toLowerCase().replace(/\s+/g, '-');
  
  const categoryTrees: Record<string, { tree: string; explanations: { file: string; desc: string }[] }> = {
    "Game Scripts": {
      tree: `/${slug}/
├── README.md
├── LICENSE.txt
├── fxmanifest.lua
├── config/
│   ├── config.lua
│   └── permissions.lua
├── client/
│   ├── main.lua
│   └── utils.lua
├── server/
│   ├── main.lua
│   ├── database.lua
│   └── callbacks.lua
├── ui/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── docs/
    └── setup-guide.md`,
      explanations: [
        { file: "README.md", desc: "Installation steps, configuration guide, and troubleshooting." },
        { file: "config.lua", desc: "All customizable settings with detailed comments." },
        { file: "fxmanifest.lua", desc: "Resource manifest with all dependencies listed." },
      ]
    },
    "Applications": {
      tree: `/${slug}/
├── README.md
├── LICENSE.txt
├── installer.exe
├── src/
│   ├── main.js
│   ├── preload.js
│   └── renderer/
│       ├── index.html
│       └── app.js
├── assets/
│   ├── icons/
│   └── themes/
└── docs/
    └── user-manual.pdf`,
      explanations: [
        { file: "README.md", desc: "Quick start guide and system requirements." },
        { file: "installer.exe", desc: "One-click Windows installer with auto-updates." },
        { file: "src/", desc: "Full source code for customization and white-labeling." },
      ]
    },
    "Web Templates": {
      tree: `/${slug}/
├── README.md
├── LICENSE.txt
├── package.json
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── sections/
│   ├── styles/
│   │   └── globals.css
│   └── lib/
│       └── utils.ts
├── public/
│   └── assets/
└── docs/
    └── customization.md`,
      explanations: [
        { file: "README.md", desc: "Setup instructions and deployment guide." },
        { file: "package.json", desc: "All dependencies with exact versions pinned." },
        { file: "components/", desc: "Modular, reusable React components." },
      ]
    },
    "Developer Tools": {
      tree: `/${slug}/
├── README.md
├── LICENSE.txt
├── main.py
├── requirements.txt
├── src/
│   ├── core.py
│   ├── utils.py
│   └── handlers/
├── config/
│   └── settings.yaml
├── tests/
│   └── test_core.py
└── docs/
    └── api-reference.md`,
      explanations: [
        { file: "README.md", desc: "Usage examples and CLI documentation." },
        { file: "requirements.txt", desc: "Python dependencies with version locks." },
        { file: "tests/", desc: "Unit tests with 90%+ coverage." },
      ]
    },
    "Misc": {
      tree: `/${slug}/
├── README.md
├── LICENSE.txt
├── assets/
│   ├── icons/
│   │   ├── dark/
│   │   └── light/
│   ├── svg/
│   └── png/
├── source/
│   └── editable.psd
└── previews/
    └── showcase.png`,
      explanations: [
        { file: "README.md", desc: "Usage guidelines and attribution requirements." },
        { file: "source/", desc: "Editable source files (PSD/AI) for customization." },
        { file: "assets/", desc: "Production-ready files in multiple formats." },
      ]
    }
  };
  
  return categoryTrees[product.category] || categoryTrees["Misc"];
}

function generateUseCases(product: BaseProduct): string[] {
  const categoryUseCases: Record<string, string[]> = {
    "Game Scripts": [
      "Server owners running FiveM communities",
      "Developers extending roleplay frameworks",
      "Admins managing player moderation",
      "Custom server monetization systems"
    ],
    "Applications": [
      "Server administrators managing infrastructure",
      "Developers automating deployment workflows",
      "Teams monitoring live server metrics",
      "White-label solutions for gaming networks"
    ],
    "Web Templates": [
      "Gaming communities needing web presence",
      "Developers launching SaaS products",
      "Agencies delivering client projects",
      "Startups needing production-ready frontends"
    ],
    "Developer Tools": [
      "Developers automating repetitive tasks",
      "Teams integrating Discord workflows",
      "Analysts scraping public data sources",
      "Admins monitoring server health"
    ],
    "Misc": [
      "Content creators building stream overlays",
      "Developers customizing Stream Deck layouts",
      "Server admins creating branded materials",
      "Teams standardizing visual assets"
    ]
  };
  
  return categoryUseCases[product.category] || categoryUseCases["Misc"];
}

function generateTechSpecs(product: BaseProduct): { label: string; value: string }[] {
  const baseSpecs = [
    { label: "License", value: "Commercial + Personal" },
    { label: "Support", value: "Discord included" },
    { label: "Updates", value: "Lifetime free" },
  ];
  
  const categorySpecs: Record<string, { label: string; value: string }[]> = {
    "Game Scripts": [
      { label: "Framework", value: "ESX / QBCore" },
      { label: "Database", value: "MySQL / oxmysql" },
      { label: "Performance", value: "< 0.05ms" },
      ...baseSpecs
    ],
    "Applications": [
      { label: "Platform", value: "Windows 10/11" },
      { label: "Runtime", value: "Electron / Node" },
      { label: "Auto-Update", value: "Yes" },
      ...baseSpecs
    ],
    "Web Templates": [
      { label: "Stack", value: "React + Tailwind" },
      { label: "TypeScript", value: "Full coverage" },
      { label: "Mobile", value: "Responsive" },
      ...baseSpecs
    ],
    "Developer Tools": [
      { label: "Language", value: "Python 3.10+" },
      { label: "Test Coverage", value: "90%+" },
      { label: "CLI", value: "Included" },
      ...baseSpecs
    ],
    "Misc": [
      { label: "Formats", value: "PNG, SVG, PSD" },
      { label: "Resolution", value: "72x72, 144x144" },
      { label: "Variants", value: "Dark + Light" },
      ...baseSpecs
    ]
  };
  
  return categorySpecs[product.category] || categorySpecs["Misc"];
}

interface ProductDetailDialogProps {
  product: BaseProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({ product, open, onOpenChange }: ProductDetailDialogProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  const style = categoryStyles[product.category] || defaultStyle;
  const Icon = style.icon;
  const { tree, explanations } = generateFileTree(product);
  const useCases = generateUseCases(product);
  const techSpecs = generateTechSpecs(product);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[720px] max-h-[90vh] bg-background/98 backdrop-blur-2xl border-white/10 p-0 overflow-hidden gap-0">
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </VisuallyHidden>
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 md:p-8">
            
            {/* Technical Header */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-white/40 mb-2 tracking-wider">
                    {style.path}
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white truncate">
                    {product.name}
                  </h2>
                </div>
                <DialogClose className="rounded-lg bg-white/5 p-2 text-white/60 hover:bg-white/10 hover:text-white transition-all border border-white/10">
                  <X className="h-4 w-4" />
                </DialogClose>
              </div>
              
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <Badge variant="outline" className={cn("font-mono", style.badge)}>
                  <Icon className="h-3 w-3 mr-1.5" />
                  {product.category}
                </Badge>
                <span className="flex items-center gap-1.5 text-white/40 font-mono">
                  <GitBranch className="h-3 w-3" />
                  v1.2.0
                </span>
                <span className="flex items-center gap-1.5 text-white/40 font-mono">
                  <Calendar className="h-3 w-3" />
                  Dec 2024
                </span>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                  Production-Ready
                </Badge>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-8" />

            {/* What You Get - File Tree */}
            <motion.section 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Folder className={cn("h-4 w-4", style.accent)} />
                WHAT_YOU_GET
              </h3>
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto">
                <pre className="font-mono text-xs text-white/70 leading-relaxed whitespace-pre">
                  {tree}
                </pre>
              </div>
            </motion.section>

            {/* File Explanations */}
            <motion.section 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <div className="space-y-3">
                {explanations.map((exp, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className={cn("mt-0.5 h-5 w-5 rounded flex items-center justify-center flex-shrink-0", style.badge)}>
                      <File className="h-3 w-3" />
                    </div>
                    <div>
                      <span className="font-mono text-white/80">{exp.file}</span>
                      <p className="text-white/40 text-xs mt-0.5">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

            {/* Designed For */}
            <motion.section 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Users className={cn("h-4 w-4", style.accent)} />
                DESIGNED_FOR
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {useCases.map((useCase, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <span className={cn("text-xs", style.accent)}>→</span>
                    {useCase}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Technical Specs */}
            <motion.section 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <h3 className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <FileText className={cn("h-4 w-4", style.accent)} />
                TECH_SPECS
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {techSpecs.map((spec, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-1">
                      {spec.label}
                    </p>
                    <p className="font-mono text-sm text-white/80">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Support & Updates */}
            <motion.section 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Headphones className={cn("h-4 w-4", style.accent)} />
                SUPPORT_&_UPDATES
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: BookOpen, label: "Docs included" },
                  { icon: MessageCircle, label: "Discord support" },
                  { icon: RefreshCw, label: "Free updates" },
                  { icon: Shield, label: "Bug fixes" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <item.icon className={cn("h-4 w-4", style.accent)} />
                    <span className="font-mono text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

            {/* Pricing Section - At Bottom */}
            <motion.section 
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-center md:text-left">
                  <p className="font-mono text-xs text-white/40 uppercase tracking-wider mb-1">
                    One-time purchase
                  </p>
                  <p className={cn("font-mono text-4xl font-bold", style.accent)}>
                    {product.price === 0 ? 'Free' : `$${product.price}`}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button 
                    variant="outline" 
                    className="border-white/10 hover:bg-white/5 rounded-xl h-12 px-6 font-mono text-sm" 
                    onClick={() => onOpenChange(false)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to products
                  </Button>
                  <Button 
                    className={cn(
                      "rounded-xl h-12 px-8 font-bold transition-all duration-300",
                      "bg-white text-black hover:bg-white/90 hover:scale-[1.02]",
                      added && "bg-emerald-500 text-white hover:bg-emerald-500"
                    )}
                    onClick={handleAddToCart}
                    disabled={added}
                  >
                    <AnimatePresence mode="wait">
                      {added ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center"
                        >
                          <Check className="mr-2 h-5 w-5" /> Added
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center"
                        >
                          <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </div>
              
              {/* Microcopy */}
              <p className="text-center font-mono text-[10px] text-white/30 mt-3 tracking-wider">
                Instant download • No DRM • Lifetime access
              </p>
            </motion.section>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

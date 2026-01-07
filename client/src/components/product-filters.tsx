import React from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

export type SortKey = "relevance" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export interface ProductFiltersState {
  query: string;
  price: [number, number];
  features: Set<string>;
  sort: SortKey;
}

export function buildInitialFilterState(products: Product[]): ProductFiltersState {
  const prices = products.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return {
    query: "",
    price: [min, max],
    features: new Set<string>(),
    sort: "relevance",
  };
}

const TECH_TAGS = ["C#", "Python", "TypeScript", "JavaScript", "Lua", "Go"] as const;
const PLATFORM_TAGS = ["Windows Native", "Python Based", "Web Interface", "Multi-Platform"] as const;

export function groupFeatures(products: Product[]): {
  tech: string[];
  platform: string[];
  capabilities: string[];
} {
  const all = new Set<string>();
  products.forEach((p) => p.features.forEach((f) => all.add(f)));

  const tech = Array.from(all).filter((f) => TECH_TAGS.includes(f as any));
  const platform = Array.from(all).filter((f) => PLATFORM_TAGS.includes(f as any));
  const capabilities = Array.from(all)
    .filter((f) => !tech.includes(f) && !platform.includes(f))
    .sort((a, b) => a.localeCompare(b));

  // Order tech/platform logically
  const techOrdered = TECH_TAGS.filter((t) => tech.includes(t as any)) as unknown as string[];
  const platformOrdered = PLATFORM_TAGS.filter((t) => platform.includes(t as any)) as unknown as string[];

  return { tech: techOrdered, platform: platformOrdered, capabilities };
}

export function ProductFilters({
  products,
  state,
  onChange,
  className,
  variant = "full",
}: {
  products: Product[];
  state: ProductFiltersState;
  onChange: (next: ProductFiltersState) => void;
  className?: string;
  variant?: "minimal" | "full";
}) {
  const grouped = React.useMemo(() => groupFeatures(products), [products]);
  const [localQuery, setLocalQuery] = React.useState(state.query);

  React.useEffect(() => {
    const t = setTimeout(() => {
      if (localQuery !== state.query) onChange({ ...state, query: localQuery });
    }, 250);
    return () => clearTimeout(t);
  }, [localQuery]);

  const toggleFeature = (f: string) => {
    const next = new Set(state.features);
    if (next.has(f)) next.delete(f);
    else next.add(f);
    onChange({ ...state, features: next });
  };

  const clearAll = () => onChange(buildInitialFilterState(products));

  const [minPrice, maxPrice] = React.useMemo(() => {
    const ps = products.map((p) => p.price);
    return [Math.min(...ps), Math.max(...ps)];
  }, [products]);

  const hasAnyFilter = Boolean(
    state.query ||
    state.features.size > 0 ||
    state.price[0] !== minPrice ||
    state.price[1] !== maxPrice ||
    state.sort !== "relevance"
  );

  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 md:p-6", className)}>
      {/* Top row: Search (primary), Sort (compact), contextual Reset */}
      <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-4">
        <div className="flex-1">
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">Search</label>
          <Input
            placeholder="Search products, tech, capabilities..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
          />
        </div>

        <div className="w-full md:w-56">
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">Sort</label>
          <select
            className="w-full h-9 rounded-md border border-white/10 bg-white/10 text-sm text-white px-2"
            value={state.sort}
            onChange={(e) => onChange({ ...state, sort: e.target.value as SortKey })}
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>

        {hasAnyFilter && (
          <div className="md:ml-auto">
            <Button variant="ghost" className="h-9 text-xs" onClick={clearAll}>Reset filters</Button>
          </div>
        )}
      </div>

      {/* Price (hidden by default in minimal) */}
      {variant === "full" && (
        <div className="mt-4">
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
            Price (£{state.price[0]} - £{state.price[1]})
          </label>
          <Slider
            value={[state.price[0], state.price[1]]}
            min={minPrice}
            max={maxPrice}
            step={1}
            onValueChange={([lo, hi]) => onChange({ ...state, price: [lo as number, hi as number] })}
          />
        </div>
      )}

      {/* Grouped feature filters */}
      <div className="mt-4 grid gap-4">
        {/* Tech */}
        {grouped.tech.length > 0 && (
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">Tech</div>
            <div className="flex flex-wrap gap-2">
              {grouped.tech.map((f) => {
                const active = state.features.has(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFeature(f)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-md border text-xs",
                      active
                        ? "bg-primary/15 border-primary/30 text-white"
                        : "bg-white/5 border-white/10 text-white/80"
                    )}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Platform */}
        {grouped.platform.length > 0 && (
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">Platform</div>
            <div className="flex flex-wrap gap-2">
              {grouped.platform.map((f) => {
                const active = state.features.has(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFeature(f)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-md border text-xs",
                      active
                        ? "bg-primary/15 border-primary/30 text-white"
                        : "bg-white/5 border-white/10 text-white/80"
                    )}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* In minimal: hide capabilities & price under accordion; in full: accordion only for capabilities */}
        {grouped.capabilities.length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="capabilities" className="border-white/10">
              <AccordionTrigger className="text-xs font-mono uppercase tracking-wider text-white/70">
                {variant === "minimal" ? "More filters" : "Capabilities"} ({grouped.capabilities.length})
              </AccordionTrigger>
              <AccordionContent>
                {variant === "minimal" && (
                  <div className="mb-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Price (£{state.price[0]} - £{state.price[1]})
                    </div>
                    <Slider
                      value={[state.price[0], state.price[1]]}
                      min={minPrice}
                      max={maxPrice}
                      step={1}
                      onValueChange={([lo, hi]) => onChange({ ...state, price: [lo as number, hi as number] })}
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {grouped.capabilities.map((f) => (
                    <label key={f} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2">
                      <Checkbox checked={state.features.has(f)} onCheckedChange={() => toggleFeature(f)} />
                      <span className="text-xs text-white/80">{f}</span>
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>

      {/* Active chips */}
      {hasAnyFilter && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {state.query && (
            <Badge variant="secondary" className="bg-white/10 border-white/10">
              query: {state.query}
            </Badge>
          )}
          {Array.from(state.features).map((f) => (
            <button key={f} onClick={() => toggleFeature(f)}>
              <Badge variant="secondary" className="bg-primary/10 border-primary/20">
                {f} ×
              </Badge>
            </button>
          ))}
          {(state.price[0] !== minPrice || state.price[1] !== maxPrice) && (
            <Badge variant="secondary" className="bg-white/10 border-white/10">
              £{state.price[0]} - £{state.price[1]}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export function applyFilters(products: Product[], state: ProductFiltersState): Product[] {
  const query = state.query.trim().toLowerCase();
  const inPrice = (p: Product) => p.price >= state.price[0] && p.price <= state.price[1];
  const hasFeatures = (p: Product) => {
    if (state.features.size === 0) return true;
    const set = new Set(p.features.map((f) => f.toLowerCase()));
    for (const f of state.features) if (!set.has(f.toLowerCase())) return false;
    return true;
  };
  const matchesQuery = (p: Product) => {
    if (!query) return true;
    const hay = `${p.name} ${p.description} ${p.category} ${p.features.join(" ")}`.toLowerCase();
    return hay.includes(query);
  };

  let out = products.filter((p) => p.type === "product").filter(inPrice).filter(hasFeatures).filter(matchesQuery);

  switch (state.sort) {
    case "price-asc":
      out = out.slice().sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out = out.slice().sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      out = out.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      out = out.slice().sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "relevance":
    default:
      // Basic relevance: query presence + feature overlap + lower price preference
      out = out
        .slice()
        .sort((a, b) => {
          let sa = 0;
          let sb = 0;
          if (query) {
            const qa = `${a.name} ${a.description}`.toLowerCase();
            const qb = `${b.name} ${b.description}`.toLowerCase();
            if (qa.includes(query)) sa += 2;
            if (qb.includes(query)) sb += 2;
          }
          if (state.features.size) {
            const fa = a.features.filter((f) => state.features.has(f)).length;
            const fb = b.features.filter((f) => state.features.has(f)).length;
            sa += fa;
            sb += fb;
          }
          // Bias slightly towards cheaper items
          sa += 1 / Math.max(1, a.price);
          sb += 1 / Math.max(1, b.price);
          return sb - sa;
        });
      break;
  }

  return out;
}

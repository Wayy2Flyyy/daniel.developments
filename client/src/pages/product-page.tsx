import { Navbar } from "@/components/navbar";
import { useRoute } from "wouter";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { ChevronLeft, Star, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import NotFound from "@/pages/not-found";

export default function ProductPage() {
  const [match, params] = useRoute("/product/:id");
  const { addToCart } = useCart();

  if (!match) return <NotFound />;

  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
            <ChevronLeft className="h-4 w-4 mr-2" /> Back to Shop
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-secondary/30">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {/* Placeholder thumbnails */}
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className={`aspect-square rounded-lg bg-secondary/30 overflow-hidden cursor-pointer ${i === 1 ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'}`}>
                   <img src={product.image} className="h-full w-full object-cover" />
                 </div>
               ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-secondary px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider text-secondary-foreground">
                  {product.category}
                </span>
                <div className="flex items-center text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-muted-foreground text-xs ml-2 text-black">(24 reviews)</span>
                </div>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-medium text-primary">${product.price}</p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <Button size="lg" className="flex-1 h-14 text-lg" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="px-6 h-14">
                  <Star className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30">
                  <Truck className="h-5 w-5 mt-1 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">Free Shipping</h4>
                    <p className="text-xs text-muted-foreground">On all orders over $150</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30">
                  <ShieldCheck className="h-5 w-5 mt-1 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">2 Year Warranty</h4>
                    <p className="text-xs text-muted-foreground">Full coverage against defects</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-serif text-xl font-bold mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

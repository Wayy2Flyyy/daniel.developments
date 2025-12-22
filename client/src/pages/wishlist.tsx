import { Navbar } from "@/components/navbar";
import { useWishlist } from "@/lib/wishlist-context";
import { useAuth } from "@/lib/auth-context";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, LogIn, Terminal } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const { user } = useAuth();
  const { items, isLoading } = useWishlist();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-rose-400" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-white">Wishlist</h1>
                <p className="text-white/50 text-sm font-mono">
                  {user ? `${items.length} saved items` : 'Login to save items'}
                </p>
              </div>
            </div>
          </div>

          {/* Not logged in state */}
          {!user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto">
                <div className="h-16 w-16 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-rose-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Login Required</h2>
                <p className="text-white/50 mb-6">
                  Create an account or log in to save products for later.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link href="/login">
                    <Button variant="outline" className="border-white/10" data-testid="button-login">
                      <LogIn className="h-4 w-4 mr-2" />
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-white text-black hover:bg-white/90" data-testid="button-register">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading state */}
          {user && isLoading && (
            <div className="text-center py-20">
              <div className="font-mono text-sm text-white/40">
                <span className="text-cyan-400">&gt;</span> fetching wishlist
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </div>
            </div>
          )}

          {/* Empty wishlist */}
          {user && !isLoading && items.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 max-w-lg mx-auto">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="font-mono text-xs text-white/40 ml-2">wishlist.status</span>
                </div>
                <div className="font-mono text-sm text-left space-y-2 mb-6">
                  <p className="text-white/40">
                    <span className="text-cyan-400">&gt;</span> query: SELECT * FROM wishlist
                  </p>
                  <p className="text-amber-400">
                    <span className="text-cyan-400">&gt;</span> result: 0 rows returned
                  </p>
                  <p className="text-white/30">
                    <span className="text-cyan-400">&gt;</span> hint: Browse products and click the heart icon to save
                  </p>
                </div>
                <Link href="/#products">
                  <Button className="bg-white text-black hover:bg-white/90" data-testid="button-browse">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Browse Products
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Wishlist items */}
          {user && !isLoading && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={item.product} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Back to products link */}
          {user && items.length > 0 && (
            <div className="mt-12 text-center">
              <Link href="/#products">
                <Button variant="outline" className="border-white/10" data-testid="button-back">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

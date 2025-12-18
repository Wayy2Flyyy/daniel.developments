import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { products, heroImage } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Minimalist Living Room" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative container mx-auto h-full flex items-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-white p-8 md:p-12 rounded-2xl bg-black/10 backdrop-blur-sm border border-white/10"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Curated Living.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-lg font-light">
              Discover a collection of timeless essentials designed to elevate your everyday life. Simple, functional, and beautiful.
            </p>
            <Button size="lg" className="h-14 px-8 text-lg bg-white text-black hover:bg-white/90 rounded-full" asChild>
              <a href="#featured">
                Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-24 px-4 container mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Latest Arrivals</h2>
            <p className="text-muted-foreground max-w-md">
              Hand-picked items that blend form and function seamlessly.
            </p>
          </div>
          <Button variant="link" className="hidden md:flex">View All Products</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter / Brand Section */}
      <section className="bg-secondary py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Designed for life.</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            We believe that good design should be accessible to everyone. Our products are ethically sourced and built to last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button variant="outline" className="h-12 px-8">Read Our Story</Button>
             <Button className="h-12 px-8">Join the Community</Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">Lumina</h3>
            <p className="text-primary-foreground/70 text-sm">
              © 2024 Lumina Inc. <br />
              All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-primary-foreground/70 text-sm">
              <li>All Products</li>
              <li>Home Decor</li>
              <li>Electronics</li>
              <li>Kitchen</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/70 text-sm">
              <li>FAQ</li>
              <li>Shipping & Returns</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          
          <div>
             <h4 className="font-bold mb-4">Stay Connected</h4>
             <p className="text-primary-foreground/70 text-sm mb-4">
               Subscribe to receive updates, access to exclusive deals, and more.
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

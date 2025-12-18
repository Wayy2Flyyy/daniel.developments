import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Lock, ArrowLeft, CreditCard, Loader2, ShieldCheck, Terminal, CheckCircle, Zap, RefreshCcw } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { createOrder } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email"),
  cardNumber: z.string().min(19, "Card number is too short"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid date (MM/YY)"),
  cvc: z.string().min(3, "Invalid CVC").max(4),
  name: z.string().min(2, "Name required"),
});

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      name: "",
    },
  });

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast({
        title: "Transaction Successful",
        description: "Your digital assets are being prepared for download.",
      });
      clearCart();
      setLocation("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    orderMutation.mutate({
      email: data.email,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: Math.round(cartTotal * 100),
    });
  };

  const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 16);
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    form.setValue('cardNumber', val);
  };

  const formatExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    form.setValue('expiry', val);
  };

  const formatCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 4);
    form.setValue('cvc', val);
  };

  // Get first item name for reminder
  const itemsSummary = items.length === 1 
    ? items[0].name 
    : `${items[0]?.name || 'Items'} + ${items.length - 1} more`;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          className="text-center space-y-6 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="h-20 w-20 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Terminal className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <div>
            <h1 className="font-display text-2xl text-white mb-2">Session Empty</h1>
            <p className="text-muted-foreground">No items in your cart to checkout.</p>
          </div>
          <Link href="/">
            <Button className="bg-white text-black hover:bg-white/90">Return to Store</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header with terminal status */}
      <div className="border-b border-white/5 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <Link href="/">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors cursor-pointer group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Cancel Payment</span>
            </div>
          </Link>
          
          {/* Terminal status - reinforces controlled environment */}
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">SECURE_SESSION_ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ENCRYPTED</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-6 py-12 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Order Summary */}
            <div className="text-center space-y-4 mb-12">
              <p className="text-muted-foreground text-sm uppercase tracking-widest">Total Due</p>
              <h1 className="font-mono text-5xl md:text-6xl font-bold text-white">${cartTotal.toFixed(2)}</h1>
              {/* Product reminder - reconnects value at decision moment */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-medium">{itemsSummary} — Lifetime Access</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Email Address" 
                            {...field} 
                            className="h-14 bg-white/5 border-white/10 focus:border-primary/50 text-lg rounded-xl"
                            disabled={orderMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Card Details Box */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-xl">
                      {/* Card header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-muted-foreground">PAYMENT_DETAILS</span>
                        <div className="flex gap-1">
                          <div className="w-8 h-5 rounded bg-gradient-to-r from-blue-600 to-blue-400" />
                          <div className="w-8 h-5 rounded bg-gradient-to-r from-red-500 to-yellow-400" />
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <CreditCard className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                                <Input 
                                  placeholder="0000 0000 0000 0000" 
                                  {...field} 
                                  onChange={formatCardNumber}
                                  className="pl-12 h-14 bg-white/5 border-white/10 font-mono text-lg tracking-wider rounded-xl"
                                  maxLength={19}
                                  disabled={orderMutation.isPending}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  placeholder="MM/YY" 
                                  {...field} 
                                  onChange={formatExpiry}
                                  className="h-14 bg-white/5 border-white/10 font-mono text-center text-lg rounded-xl"
                                  maxLength={5}
                                  disabled={orderMutation.isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  placeholder="CVC" 
                                  {...field} 
                                  type="password"
                                  onChange={formatCVC}
                                  className="h-14 bg-white/5 border-white/10 font-mono text-center text-lg rounded-xl"
                                  maxLength={4}
                                  disabled={orderMutation.isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input 
                                placeholder="Cardholder Name" 
                                {...field} 
                                className="h-14 bg-white/5 border-white/10 rounded-xl"
                                disabled={orderMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Trust signals before button */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/10">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span>Instant access after payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/10">
                    <RefreshCcw className="h-4 w-4 text-emerald-400" />
                    <span>Lifetime updates included</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className={cn(
                    "w-full h-16 text-lg font-bold rounded-xl shadow-2xl shadow-white/10 mt-4 transition-all duration-300",
                    "bg-white text-black hover:bg-white/90 hover:scale-[1.02]"
                  )}
                  disabled={orderMutation.isPending}
                >
                  {orderMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Complete Secure Purchase
                    </>
                  )}
                </Button>

                {/* Final trust line */}
                <div className="text-center space-y-3 pt-4">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>Encrypted via Stripe. No payment data stored.</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    One-time payment. No recurring charges. No hidden fees.
                  </p>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

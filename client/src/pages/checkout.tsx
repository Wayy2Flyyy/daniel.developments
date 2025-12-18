import { Navbar } from "@/components/navbar";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Lock, ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { createOrder } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl">Cart Empty</h1>
          <Link href="/">
            <Button variant="link" className="text-primary">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center">
           <Link href="/">
             <div className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors cursor-pointer">
               <ArrowLeft className="h-4 w-4" />
               <span className="text-sm font-medium">Cancel Payment</span>
             </div>
           </Link>
           <div className="ml-auto flex items-center gap-2 text-sm font-mono text-muted-foreground">
             <Lock className="h-3 w-3" />
             SECURE_CHECKOUT_V3
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
            <div className="text-center mb-10">
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">Total Due</p>
              <h1 className="font-mono text-5xl font-bold text-white">${cartTotal.toFixed(2)}</h1>
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
                            className="h-12 bg-white/5 border-white/10 focus:border-primary/50 text-lg"
                            disabled={orderMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-black/40 border border-white/10 rounded-lg p-6 space-y-4 backdrop-blur-md">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                <Input 
                                  placeholder="0000 0000 0000 0000" 
                                  {...field} 
                                  onChange={formatCardNumber}
                                  className="pl-10 h-12 bg-white/5 border-white/10 font-mono text-lg tracking-wider"
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
                                  className="h-12 bg-white/5 border-white/10 font-mono text-center text-lg"
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
                                  className="h-12 bg-white/5 border-white/10 font-mono text-center text-lg"
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
                                className="h-12 bg-white/5 border-white/10"
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

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-lg font-bold bg-white text-black hover:bg-white/90 shadow-lg shadow-white/5 mt-8"
                  disabled={orderMutation.isPending}
                >
                  {orderMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  Encrypted via Stripe. No payment data is stored on our servers.
                </p>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
